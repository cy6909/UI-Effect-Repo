import { useEffect, useRef } from 'react';

const SPACING = 76;
const SCALE = 0.25; // coarse render buffer, upscaled for softness

type Seed = { bx: number; by: number; amp: number; period: number; phase: number; phase2: number };

/**
 * Underwater light caustics: a jittered Voronoi web computed on a coarse
 * buffer (bright where the two nearest seeds are equidistant), upscaled so
 * the light net stays soft. Seeds drift on slow sine orbits — a quiet pool.
 */
export default function Caustics() {
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
    let seeds: Seed[] = [];
    let seedCols = 0;
    let seedRows = 0;
    let buf: HTMLCanvasElement | null = null;
    let bctx: CanvasRenderingContext2D | null = null;
    let bw = 0;
    let bh = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      seedCols = Math.ceil(width / SPACING) + 3;
      seedRows = Math.ceil(height / SPACING) + 3;
      seeds = [];
      for (let sy = 0; sy < seedRows; sy++) {
        for (let sx = 0; sx < seedCols; sx++) {
          seeds.push({
            bx: (sx - 1) * SPACING + (Math.random() - 0.5) * 62,
            by: (sy - 1) * SPACING + (Math.random() - 0.5) * 62,
            amp: 8 + Math.random() * 6,
            period: 5 + Math.random() * 6,
            phase: Math.random() * Math.PI * 2,
            phase2: Math.random() * Math.PI * 2,
          });
        }
      }

      bw = Math.max(2, Math.floor(width * SCALE));
      bh = Math.max(2, Math.floor(height * SCALE));
      buf = document.createElement('canvas');
      buf.width = bw;
      buf.height = bh;
      bctx = buf.getContext('2d');
    }

    function tick(now: number) {
      const t = now / 1000;
      if (!buf || !bctx) return;

      // current seed positions (slow sine orbits)
      const px = new Float32Array(seeds.length);
      const py = new Float32Array(seeds.length);
      for (let i = 0; i < seeds.length; i++) {
        const s = seeds[i];
        px[i] = s.bx + Math.sin((t / s.period) * Math.PI * 2 + s.phase) * s.amp;
        py[i] = s.by + Math.cos((t / s.period) * Math.PI * 2 + s.phase2) * s.amp;
      }

      const img = bctx.createImageData(bw, bh);
      const data = img.data;
      const inv = 1 / SPACING;
      for (let y = 0; y < bh; y++) {
        const wy = y / SCALE;
        const csy = Math.min(seedRows - 1, Math.max(0, Math.floor(wy * inv) + 1));
        for (let x = 0; x < bw; x++) {
          const wx = x / SCALE;
          const csx = Math.min(seedCols - 1, Math.max(0, Math.floor(wx * inv) + 1));
          // nearest two seeds among the surrounding 3x3 cells
          let f1 = Infinity;
          let f2 = Infinity;
          for (let dy = -1; dy <= 1; dy++) {
            const sy = csy + dy;
            if (sy < 0 || sy >= seedRows) continue;
            for (let dx = -1; dx <= 1; dx++) {
              const sx = csx + dx;
              if (sx < 0 || sx >= seedCols) continue;
              const i = sy * seedCols + sx;
              const ddx = px[i] - wx;
              const ddy = py[i] - wy;
              const d = Math.sqrt(ddx * ddx + ddy * ddy);
              if (d < f1) {
                f2 = f1;
                f1 = d;
              } else if (d < f2) {
                f2 = d;
              }
            }
          }
          let v = 1 - (f2 - f1) / 12;
          v = v < 0 ? 0 : v;
          v = Math.pow(v, 4.0);
          // large-scale light modulation so the web pools into bright
          // patches and dark lulls instead of a uniform net
          v *= 0.42 * (0.55 + 0.45 * Math.sin(wx * 0.014 + t * 0.7) * Math.sin(wy * 0.011 - t * 0.53));
          // deeper = darker base, pale aqua web on top
          const depth = 1 - (y / bh) * 0.45;
          const o = (y * bw + x) * 4;
          data[o] = 11 * depth + 140 * v;
          data[o + 1] = 27 * depth + 220 * v;
          data[o + 2] = 42 * depth + 210 * v;
          data[o + 3] = 255;
        }
      }
      bctx.putImageData(img, 0, 0);

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(buf, 0, 0, bw, bh, 0, 0, width, height);

      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
