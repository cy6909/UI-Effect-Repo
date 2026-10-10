// The signed-distance field that powers the liquid fusion.
//
// The whole trick is one idea: don't stack shapes, take the UNION of their
// signed-distance fields with a SMOOTH minimum. A plain min() gives a hard union
// (shapes touch at a sharp seam); a smooth-min blends the fields near the seam,
// and that blend IS the concave (inverse) fillet where two shapes meet. Turn the
// blend `k` up and the fillet grows into a full gooey neck — so a single knob
// spans "crisp inverse-rounded joint" -> "organic metaball melt".
//
// Convention: the field is NEGATIVE inside a shape, 0 on the surface, POSITIVE
// outside (standard SDF). The fused outline is the iso-contour at 0.

/** Signed distance from point (px,py) to an axis-aligned rounded box. `hw`,`hh`
 *  are half-extents, `r` the corner radius. */
export function sdRoundBox(px, py, cx, cy, hw, hh, r) {
  // clamp the radius so it never exceeds the box
  const rr = Math.min(r, Math.min(hw, hh));
  const qx = Math.abs(px - cx) - hw + rr;
  const qy = Math.abs(py - cy) - hh + rr;
  const ax = Math.max(qx, 0);
  const ay = Math.max(qy, 0);
  const outside = Math.hypot(ax, ay);
  const inside = Math.min(Math.max(qx, qy), 0);
  return outside + inside - rr;
}

/** Signed distance to a capsule (a line segment of radius `r`) from (ax,ay) to
 *  (bx,by). Used for explicit "bridges" that connect two shapes with a pipe. */
export function sdCapsule(px, py, ax, ay, bx, by, r) {
  const pax = px - ax;
  const pay = py - ay;
  const bax = bx - ax;
  const bay = by - ay;
  const denom = bax * bax + bay * bay || 1e-6;
  // projection of P onto AB, clamped to the segment
  const h = Math.max(0, Math.min(1, (pax * bax + pay * bay) / denom));
  const dx = pax - bax * h;
  const dy = pay - bay * h;
  return Math.hypot(dx, dy) - r;
}

/** Polynomial smooth-minimum (the fillet maker). k=0 → hard min (sharp seam);
 *  larger k → wider blend → bigger concave fillet / gooey neck. */
export function smin(a, b, k) {
  if (k <= 0) return Math.min(a, b);
  const h = Math.max(0, Math.min(1, 0.5 + (0.5 * (b - a)) / k));
  return b * (1 - h) + a * h - k * h * (1 - h);
}

export function shapeSD(s, px, py) {
  return s.kind === 'box'
    ? sdRoundBox(px, py, s.cx, s.cy, s.hw, s.hh, s.r)
    : sdCapsule(px, py, s.ax, s.ay, s.bx, s.by, s.r);
}

/** The whole group as one field: the smooth-union of every shape. `eval` returns
 *  the fused signed distance at (x,y). Proximity auto-fuse is automatic — two boxes
 *  close enough that their k-blend overlaps merge with a fillet, with no explicit
 *  connection. */
export class Field {
  constructor(shapes = [], k = 12) {
    this.shapes = shapes;
    this.k = k;
  }

  eval(x, y) {
    const { shapes, k } = this;
    if (shapes.length === 0) return Infinity;
    let d = shapeSD(shapes[0], x, y);
    for (let i = 1; i < shapes.length; i++) {
      d = smin(d, shapeSD(shapes[i], x, y), k);
    }
    return d;
  }

  /** Axis-aligned bounds of the whole group, padded so the fused skin (which bulges
   *  OUTSIDE each box by up to ~k at the fillets) is fully contained in the sample
   *  grid. Without the pad the marching-squares grid would clip the blend. */
  bounds(pad = 0) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    const grow = pad + this.k; // the smin bulge reaches ~k past a box edge
    for (const s of this.shapes) {
      if (s.kind === 'box') {
        minX = Math.min(minX, s.cx - s.hw - grow);
        minY = Math.min(minY, s.cy - s.hh - grow);
        maxX = Math.max(maxX, s.cx + s.hw + grow);
        maxY = Math.max(maxY, s.cy + s.hh + grow);
      } else {
        minX = Math.min(minX, Math.min(s.ax, s.bx) - s.r - grow);
        minY = Math.min(minY, Math.min(s.ay, s.by) - s.r - grow);
        maxX = Math.max(maxX, Math.max(s.ax, s.bx) + s.r + grow);
        maxY = Math.max(maxY, Math.max(s.ay, s.by) + s.r + grow);
      }
    }
    if (!isFinite(minX)) return { minX: 0, minY: 0, maxX: 0, maxY: 0 };
    return { minX, minY, maxX, maxY };
  }
}
