import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const WORD = 'MOTION';
const CELL_W = 62;
const CELL_H = 46;
/** cursor influence radius in px */
const RADIUS = 170;
/** max tangential displacement in px */
const MAX_OFFSET = 24;
const MAX_ROT = Math.PI / 3;

const FAR = { r: 161, g: 161, b: 170 }; // zinc-400
const NEAR = { r: 9, g: 9, b: 11 }; // zinc-950

type Cell = {
  bx: number;
  by: number;
  ch: string;
  /** springed state */
  ox: number;
  oy: number;
  rot: number;
  inf: number;
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

/**
 * Effect — a canvas grid tiled with the word 'MOTION'. The cursor forms a
 * vortex: nearby glyphs are pushed tangentially and rotated with distance
 * falloff (smoothstep), then spring back to the grid when the cursor leaves.
 * zinc-400 at rest, zinc-950 near the cursor. rAF gated by useInView.
 */
export default function VortexTextPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!inView) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    let raf = 0;
    let width = 0;
    let height = 0;
    let cells: Cell[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      const el = canvas;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      el.width = Math.max(1, Math.floor(width * dpr));
      el.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(width / CELL_W) + 1;
      const rows = Math.ceil(height / CELL_H) + 1;
      cells = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          cells.push({
            bx: c * CELL_W + CELL_W / 2,
            by: r * CELL_H + CELL_H / 2,
            ch: WORD[(r * cols + c) % WORD.length],
            ox: 0,
            oy: 0,
            rot: 0,
            inf: 0,
          });
        }
      }
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      ctx.font = '500 13px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const hasMouse = mouse.x > -999;

      for (const cell of cells) {
        let tx = 0;
        let ty = 0;
        let trot = 0;
        let tinf = 0;
        if (hasMouse) {
          const dx = mouse.x - cell.bx;
          const dy = mouse.y - cell.by;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS && d > 0.001) {
            const f = 1 - d / RADIUS;
            const s = f * f * (3 - 2 * f); // smoothstep falloff
            // tangential (perpendicular) direction around the cursor
            tx = (-dy / d) * MAX_OFFSET * s;
            ty = (dx / d) * MAX_OFFSET * s;
            trot = MAX_ROT * s;
            tinf = s;
          }
        }
        // spring toward targets — returns home when the cursor leaves
        cell.ox += (tx - cell.ox) * 0.14;
        cell.oy += (ty - cell.oy) * 0.14;
        cell.rot += (trot - cell.rot) * 0.14;
        cell.inf += (tinf - cell.inf) * 0.14;

        const t = Math.min(1, cell.inf);
        ctx.fillStyle = `rgb(${Math.round(lerp(FAR.r, NEAR.r, t))}, ${Math.round(
          lerp(FAR.g, NEAR.g, t),
        )}, ${Math.round(lerp(FAR.b, NEAR.b, t))})`;
        ctx.save();
        ctx.translate(cell.bx + cell.ox, cell.by + cell.oy);
        ctx.rotate(cell.rot);
        ctx.fillText(cell.ch, 0, 0);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const el = canvas;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
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
  }, [inView]);

  return (
    <div ref={ref} className="relative h-full w-full" aria-label="文字漩涡，移动鼠标扰动字符网格">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
      />
    </div>
  );
}
