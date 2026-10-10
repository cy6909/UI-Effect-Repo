import { useEffect, useRef } from 'react';

type Ghost = {
  x: number;
  y: number;
  born: number;
  size: number;
  shape: 0 | 1; // 0 circle, 1 square
  color: string;
  rot: number;
};

const LIFE_MS = 800;
const SPEED_THRESHOLD = 0.9; // px per ms — slow movement spawns nothing
const COLORS = ['#A1A1AA', '#71717A', '#52525B', '#D4D4D8'];

/**
 * Cursor image-trail variant: fast pointer movement leaves small dots / blocks
 * behind that pop in, then scale-fade out over 0.8s. A speed threshold keeps
 * slow movement silent.
 */
export default function ImageTrail() {
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
    const ghosts: Ghost[] = [];
    const last = { x: 0, y: 0, t: 0 };
    let toggle = 0;

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
      for (let i = ghosts.length - 1; i >= 0; i--) {
        const g = ghosts[i];
        const age = now - g.born;
        if (age > LIFE_MS) {
          ghosts.splice(i, 1);
          continue;
        }
        const p = age / LIFE_MS;
        const pop = Math.min(1, age / 110); // quick pop-in
        const scale = pop * (1 - p * 0.35);
        ctx.save();
        ctx.translate(g.x, g.y);
        ctx.rotate(g.rot);
        ctx.globalAlpha = (1 - p) * 0.9;
        ctx.fillStyle = g.color;
        const s = g.size * scale;
        if (g.shape === 0) {
          ctx.beginPath();
          ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillRect(-s / 2, -s / 2, s, s);
        }
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const now = performance.now();
      const dt = now - last.t;
      if (dt > 0 && last.t > 0) {
        const dist = Math.hypot(x - last.x, y - last.y);
        const speed = dist / dt;
        if (speed > SPEED_THRESHOLD && dist > 14) {
          toggle = 1 - toggle;
          ghosts.push({
            x,
            y,
            born: now,
            size: 9 + Math.random() * 14,
            shape: toggle as 0 | 1,
            color:
              Math.random() < 0.1 ? '#F59E0B' : COLORS[Math.floor(Math.random() * COLORS.length)],
            rot: Math.random() * Math.PI,
          });
          if (ghosts.length > 60) ghosts.shift();
          last.x = x;
          last.y = y;
          last.t = now;
          return;
        }
      }
      last.x = x;
      last.y = y;
      last.t = now;
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
