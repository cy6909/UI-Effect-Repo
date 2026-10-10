import { useEffect, useRef } from 'react';

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number; r: number };

const COUNT = 40;
const RANGE = 150;

/**
 * Antigravity dots: 40 motes float weightlessly; the cursor repels them with a
 * force that falls off with the square of distance, and a soft spring eases
 * each dot back home once the cursor moves away.
 */
export default function Antigravity() {
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
    let dots: Dot[] = [];
    const mouse = { x: -9999, y: -9999 };

    function spawn() {
      dots = Array.from({ length: COUNT }, () => {
        const hx = 30 + Math.random() * (width - 60);
        const hy = 30 + Math.random() * (height - 60);
        return { hx, hy, x: hx, y: hy, vx: 0, vy: 0, r: 2.2 + Math.random() * 1.8 };
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      const hasMouse = mouse.x > -999;

      for (const d of dots) {
        if (hasMouse) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < RANGE && dist > 0.01) {
            // inverse-square repulsion, capped
            const f = Math.min(0.9, 1400 / (dist * dist));
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
        // spring home + damping
        d.vx += (d.hx - d.x) * 0.012;
        d.vy += (d.hy - d.y) * 0.012;
        d.vx *= 0.92;
        d.vy *= 0.92;
        d.x += d.vx;
        d.y += d.vy;

        const displaced = Math.hypot(d.x - d.hx, d.y - d.hy);
        ctx.fillStyle = displaced > 14 ? '#52525B' : '#71717A';
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
        // faint home anchor
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(d.hx, d.hy, 1.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
    />
  );
}
