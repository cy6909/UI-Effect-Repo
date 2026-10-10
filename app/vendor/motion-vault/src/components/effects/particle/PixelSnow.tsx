import { useEffect, useRef } from 'react';

type Flake = {
  x: number;
  y: number;
  size: number; // 2-4 px square
  speed: number; // fall speed px/frame
  swayAmp: number;
  swayPeriod: number; // ms
  swayPhase: number;
  alpha: number;
  shade: number; // 0..1 whiteness mix
};

function makeFlake(width: number, fromTop: boolean): Flake {
  return {
    x: Math.random() * width,
    y: fromTop ? -6 - Math.random() * 20 : Math.random() * 400,
    size: 2 + Math.floor(Math.random() * 3), // 2, 3 or 4 px
    speed: 0.35 + Math.random() * 0.85,
    swayAmp: 4 + Math.random() * 14,
    swayPeriod: 2400 + Math.random() * 3600,
    swayPhase: Math.random() * Math.PI * 2,
    alpha: 0.35 + Math.random() * 0.6,
    shade: Math.random(),
  };
}

/** Square pixel snowflakes drifting down a deep blue-black night sky. */
export default function PixelSnow() {
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
    let flakes: Flake[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function targetCount() {
      // density scales with container width
      return Math.round(Math.min(140, Math.max(40, width / 6)));
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = targetCount();
      flakes = Array.from({ length: n }, () => {
        const f = makeFlake(width, false);
        f.y = Math.random() * height;
        return f;
      });
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);
      // illusion of a slowly accumulating snow layer at the bottom
      const driftH = Math.min(14, height * 0.05);
      const grad = ctx.createLinearGradient(0, height - driftH * 3, 0, height);
      grad.addColorStop(0, 'rgba(228,228,231,0)');
      grad.addColorStop(1, 'rgba(228,228,231,0.14)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, height - driftH * 3, width, driftH * 3);

      const ground = height - driftH;
      for (const f of flakes) {
        f.y += f.speed;
        const sway = Math.sin((now / f.swayPeriod) * Math.PI * 2 + f.swayPhase) * f.swayAmp;
        const x = f.x + sway;
        if (f.y > ground + 6) {
          Object.assign(f, makeFlake(width, true));
          continue;
        }
        // fade out as the flake nears the ground layer
        const nearGround = Math.min(1, Math.max(0, (ground - f.y) / 40));
        const a = f.alpha * (0.15 + 0.85 * nearGround);
        // different whiteness: zinc-300 to pure white
        const v = Math.round(212 + f.shade * 43);
        ctx.fillStyle = `rgba(${v},${v},${Math.min(255, v + 4)},${a})`;
        ctx.fillRect(x, f.y, f.size, f.size);
      }
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
