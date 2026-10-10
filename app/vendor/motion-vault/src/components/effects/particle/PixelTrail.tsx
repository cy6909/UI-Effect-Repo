import { useEffect, useRef } from 'react';

type Cell = { born: number; color: string };

const GRID = 8;
const LIFE_MS = 1200;
const MAX_CELLS = 240;
const COLORS = ['#27272A', '#27272A', '#27272A', '#3F3F46', '#52525B'];

/**
 * Pixel trail: the pointer stamps 8px grid-aligned cells as it moves — each
 * cell locks in place and fades out over 1.2s, so continuous movement draws a
 * dashed snake of pixels.
 */
export default function PixelTrail() {
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
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const cells = new Map<string, Cell>();

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);
      for (const [key, cell] of cells) {
        const age = now - cell.born;
        if (age > LIFE_MS) {
          cells.delete(key);
          continue;
        }
        const [cx, cy] = key.split(',').map(Number);
        ctx.globalAlpha = (1 - age / LIFE_MS) * 0.9;
        ctx.fillStyle = cell.color;
        ctx.fillRect(cx * GRID + 0.5, cy * GRID + 0.5, GRID - 1, GRID - 1);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const cx = Math.floor((e.clientX - rect.left) / GRID);
      const cy = Math.floor((e.clientY - rect.top) / GRID);
      const key = `${cx},${cy}`;
      const now = performance.now();
      const existing = cells.get(key);
      if (existing && now - existing.born < LIFE_MS * 0.5) return; // already fresh
      cells.set(key, {
        born: now,
        color:
          Math.random() < 0.08 ? '#F59E0B' : COLORS[Math.floor(Math.random() * COLORS.length)],
      });
      if (cells.size > MAX_CELLS) {
        const oldest = cells.keys().next().value;
        if (oldest !== undefined) cells.delete(oldest);
      }
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
    />
  );
}
