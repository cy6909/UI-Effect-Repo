// Trace the fused outline of a Field into an SVG path.
//
// We sample the field's signed distance on a grid, then run marching squares at
// the iso-contour 0 (the surface). Each grid cell looks at its 4 corners'
// inside/outside state (16 cases) and emits 0, 1, or 2 short edges; we place each
// edge endpoint by LINEAR INTERPOLATION along the cell edge (where the field
// actually crosses 0), not at the midpoint — that's what turns a blocky staircase
// into a smooth curve. Then we stitch the loose segments into closed loops and
// CHAIKIN-smooth them so the path reads as fluid, not faceted, and doesn't wobble
// frame-to-frame while shapes move.
//
// Output: a single `d` string (possibly multiple subpaths if the group has
// disconnected islands).

const fmt = v => v.toFixed(2);

// Marching-squares edge table. For each of the 16 corner-mask cases, which cell
// edges the contour crosses, as pairs [edgeA, edgeB]. Edges: 0=top,1=right,2=bottom,
// 3=left. Corner bit order: 0=TL,1=TR,2=BR,3=BL (bit set = INSIDE, field < 0).
// Cases 5 and 10 are saddles → two segments; we resolve them by the cell-center sign.
const EDGES = [
  [], // 0000
  [[3, 2]], // 0001 BL
  [[2, 1]], // 0010 BR
  [[3, 1]], // 0011 BL+BR
  [[0, 1]], // 0100 TR
  [
    [3, 2],
    [0, 1]
  ], // 0101 saddle
  [[0, 2]], // 0110 TR+BR
  [[3, 0]], // 0111 TR+BR+BL
  [[3, 0]], // 1000 TL
  [[0, 2]], // 1001 TL+BL
  [
    [3, 0],
    [2, 1]
  ], // 1010 saddle
  [[0, 1]], // 1011 TL+BL+BR
  [[3, 1]], // 1100 TL+TR
  [[2, 1]], // 1101 TL+TR+BL
  [[3, 2]], // 1110 TL+TR+BR
  [] // 1111
];

// interpolate the 0-crossing along a cell edge between two corner samples
function lerpEdge(x0, y0, v0, x1, y1, v1) {
  const denom = v0 - v1;
  const t = Math.abs(denom) < 1e-6 ? 0.5 : v0 / denom; // where field hits 0
  const tc = Math.max(0, Math.min(1, t));
  return { x: x0 + (x1 - x0) * tc, y: y0 + (y1 - y0) * tc };
}

/** Marching squares → array of closed loops (each a list of points). */
export function contour(field, opts = {}) {
  const cell = Math.max(2, opts.cell ?? 6);
  const b = field.bounds();
  const w = b.maxX - b.minX;
  const h = b.maxY - b.minY;
  if (w <= 0 || h <= 0) return [];

  const cols = Math.ceil(w / cell) + 1;
  const rows = Math.ceil(h / cell) + 1;
  if (cols * rows > 400_000) return []; // safety cap

  // sample the field once per grid vertex
  const val = new Float32Array(cols * rows);
  for (let j = 0; j < rows; j++) {
    const y = b.minY + j * cell;
    for (let i = 0; i < cols; i++) {
      val[j * cols + i] = field.eval(b.minX + i * cell, y);
    }
  }
  const at = (i, j) => val[j * cols + i];

  // collect loose segments (each: two points); we key endpoints to stitch them.
  const segs = [];

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {
      const x0 = b.minX + i * cell;
      const y0 = b.minY + j * cell;
      const x1 = x0 + cell;
      const y1 = y0 + cell;
      const vTL = at(i, j);
      const vTR = at(i + 1, j);
      const vBR = at(i + 1, j + 1);
      const vBL = at(i, j + 1);
      // inside = field < 0
      let mask = 0;
      if (vTL < 0) mask |= 8;
      if (vTR < 0) mask |= 4;
      if (vBR < 0) mask |= 2;
      if (vBL < 0) mask |= 1;
      if (mask === 0 || mask === 15) continue;

      // point on each edge (lazily)
      const edgePt = edge => {
        switch (edge) {
          case 0:
            return lerpEdge(x0, y0, vTL, x1, y0, vTR); // top
          case 1:
            return lerpEdge(x1, y0, vTR, x1, y1, vBR); // right
          case 2:
            return lerpEdge(x0, y1, vBL, x1, y1, vBR); // bottom
          default:
            return lerpEdge(x0, y0, vTL, x0, y1, vBL); // left
        }
      };

      let cases = EDGES[mask];
      // saddle disambiguation via the cell-center sample
      if (mask === 5 || mask === 10) {
        const center = field.eval((x0 + x1) / 2, (y0 + y1) / 2);
        if (mask === 5)
          cases = center < 0
            ? [
                [3, 0],
                [2, 1]
              ]
            : [
                [3, 2],
                [0, 1]
              ];
        else
          cases = center < 0
            ? [
                [3, 2],
                [0, 1]
              ]
            : [
                [3, 0],
                [2, 1]
              ];
      }
      for (const [ea, eb] of cases) segs.push([edgePt(ea), edgePt(eb)]);
    }
  }

  return stitch(segs, cell);
}

// Stitch loose segments into closed loops by snapping near-equal endpoints together.
function stitch(segs, cell) {
  const eps = cell * 0.5;
  const key = p => `${Math.round(p.x / eps)},${Math.round(p.y / eps)}`;
  // adjacency: endpoint key -> list of {seg index, which end}
  const map = new Map();
  segs.forEach((s, idx) => {
    for (const end of [0, 1]) {
      const k = key(s[end]);
      const arr = map.get(k);
      if (arr) arr.push({ seg: idx, end });
      else map.set(k, [{ seg: idx, end }]);
    }
  });

  const used = new Array(segs.length).fill(false);
  const loops = [];

  for (let start = 0; start < segs.length; start++) {
    if (used[start]) continue;
    const loop = [];
    let cur = start;
    let end = 0;
    let guard = 0;
    while (!used[cur] && guard++ < segs.length + 2) {
      used[cur] = true;
      const a = segs[cur][end];
      const bEnd = end === 0 ? 1 : 0;
      const bPt = segs[cur][bEnd];
      loop.push(a);
      // find an unused segment sharing bPt
      const cands = map.get(key(bPt)) ?? [];
      let next = -1;
      let nextEnd = 0;
      for (const c of cands) {
        if (!used[c.seg]) {
          next = c.seg;
          nextEnd = c.end;
          break;
        }
      }
      if (next === -1) break;
      cur = next;
      end = nextEnd;
    }
    if (loop.length >= 3) loops.push(loop);
  }
  return loops;
}

// Chaikin corner-cutting: each pass replaces every point with two points 1/4 and
// 3/4 along its edges, rounding the polyline. Closed-loop variant.
function chaikin(pts, passes) {
  let out = pts;
  for (let p = 0; p < passes; p++) {
    const next = [];
    const n = out.length;
    for (let i = 0; i < n; i++) {
      const a = out[i];
      const b = out[(i + 1) % n];
      next.push({ x: a.x * 0.75 + b.x * 0.25, y: a.y * 0.75 + b.y * 0.25 });
      next.push({ x: a.x * 0.25 + b.x * 0.75, y: a.y * 0.25 + b.y * 0.75 });
    }
    out = next;
  }
  return out;
}

/** Full pipeline: field → contour loops → smoothed → one SVG path `d`.
 *  Coordinates are in the field's own space unless `alignTo` is given, which
 *  translates the path so the bounds' top-left lands at (alignTo.x, alignTo.y).
 *  Returns the path plus the bounds used, so the caller can size the <svg>. */
export function fieldToPath(field, opts = {}) {
  const b = field.bounds();
  const loops = contour(field, opts);
  const smooth = opts.smooth ?? 2;
  const dx = opts.alignTo ? opts.alignTo.x - b.minX : 0;
  const dy = opts.alignTo ? opts.alignTo.y - b.minY : 0;
  const parts = [];
  for (const loop of loops) {
    const s = smooth > 0 ? chaikin(loop, smooth) : loop;
    if (s.length < 3) continue;
    parts.push(
      `M ${fmt(s[0].x + dx)} ${fmt(s[0].y + dy)} ` +
        s
          .slice(1)
          .map(p => `L ${fmt(p.x + dx)} ${fmt(p.y + dy)}`)
          .join(' ') +
        ' Z'
    );
  }
  return {
    d: parts.join(' '),
    minX: b.minX + dx,
    minY: b.minY + dy,
    width: b.maxX - b.minX,
    height: b.maxY - b.minY
  };
}
