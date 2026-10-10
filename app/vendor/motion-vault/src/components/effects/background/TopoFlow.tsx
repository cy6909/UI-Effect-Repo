import { useEffect, useRef } from 'react';

const GRID = 10; // marching-squares sampling step (px)
const LEVELS = 9;

/**
 * Living topographic map: an analytic pseudo-noise height field slowly
 * evolves while marching squares traces its contour lines in real time.
 * The pointer presses a soft hill into the terrain. Light theme.
 */
export default function TopoFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas: HTMLCanvasElement = el;
    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const hill = { x: -9999, y: -9999, tx: -9999, ty: -9999, amp: 0 };

    function field(x: number, y: number, t: number) {
      let h =
        Math.sin(x * 0.011 + t * 0.16) * Math.cos(y * 0.013 - t * 0.11) +
        0.6 * Math.sin((x + y) * 0.007 + t * 0.23) +
        0.4 * Math.cos((x - y) * 0.009 - t * 0.19);
      if (hill.amp > 0.001) {
        const dx = x - hill.x;
        const dy = y - hill.y;
        h += hill.amp * 0.9 * Math.exp(-(dx * dx + dy * dy) / (2 * 110 * 110));
      }
      return h; // roughly -2 .. +2.9
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick(now: number) {
      const t = now / 1000;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);

      // pointer hill follows with a springy lag, eases in/out
      const inside = hill.tx > -999;
      if (inside) {
        hill.x += (hill.tx - hill.x) * 0.1;
        hill.y += (hill.ty - hill.y) * 0.1;
        if (hill.x < -999) {
          hill.x = hill.tx;
          hill.y = hill.ty;
        }
      }
      hill.amp += ((inside ? 1 : 0) - hill.amp) * 0.08;

      const cols = Math.ceil(width / GRID) + 1;
      const rows = Math.ceil(height / GRID) + 1;

      // sample the field once per grid vertex
      const H = new Float32Array(cols * rows);
      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          H[gy * cols + gx] = field(gx * GRID, gy * GRID, t);
        }
      }

      // marching squares per contour level
      for (let li = 0; li < LEVELS; li++) {
        const thr = -1.6 + (li / (LEVELS - 1)) * 3.6;
        const isIndex = li % 3 === 0; // every 3rd = map "index contour"
        const alpha = isIndex ? 0.28 : 0.05 + (li / (LEVELS - 1)) * 0.17;
        ctx.strokeStyle = `rgba(63, 63, 70, ${alpha.toFixed(3)})`;
        ctx.lineWidth = isIndex ? 1.2 : 1;
        ctx.beginPath();
        for (let gy = 0; gy < rows - 1; gy++) {
          for (let gx = 0; gx < cols - 1; gx++) {
            const h0 = H[gy * cols + gx];
            const h1 = H[gy * cols + gx + 1];
            const h2 = H[(gy + 1) * cols + gx + 1];
            const h3 = H[(gy + 1) * cols + gx];
            let code = 0;
            if (h0 > thr) code |= 1;
            if (h1 > thr) code |= 2;
            if (h2 > thr) code |= 4;
            if (h3 > thr) code |= 8;
            if (code === 0 || code === 15) continue;

            const x = gx * GRID;
            const y = gy * GRID;
            // edge crossing points, linearly interpolated
            const lerpT = (a: number, b: number) => (thr - a) / (b - a || 1e-9);
            const top = { x: x + GRID * lerpT(h0, h1), y };
            const right = { x: x + GRID, y: y + GRID * lerpT(h1, h2) };
            const bottom = { x: x + GRID * lerpT(h3, h2), y: y + GRID };
            const left = { x, y: y + GRID * lerpT(h0, h3) };

            const seg = (p: { x: number; y: number }, q: { x: number; y: number }) => {
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
            };
            switch (code) {
              case 1: case 14: seg(left, top); break;
              case 2: case 13: seg(top, right); break;
              case 3: case 12: seg(left, right); break;
              case 4: case 11: seg(right, bottom); break;
              case 5: seg(left, top); seg(right, bottom); break;
              case 6: case 9: seg(top, bottom); break;
              case 7: case 8: seg(left, bottom); break;
              case 10: seg(top, right); seg(left, bottom); break;
            }
          }
        }
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      hill.tx = e.clientX - rect.left;
      hill.ty = e.clientY - rect.top;
    }
    function onLeave() {
      hill.tx = -9999;
      hill.ty = -9999;
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
