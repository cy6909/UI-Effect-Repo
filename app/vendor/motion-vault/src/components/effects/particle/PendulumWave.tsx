import { useEffect, useRef } from 'react';

const DOTS = 15;
/** full pattern repeats every CYCLE seconds: dot i completes 51 + i oscillations per cycle */
const CYCLE = 60;
const BASE_OSCILLATIONS = 51;

/**
 * The classic pendulum wave: 15 dots oscillate vertically with slightly
 * detuned periods, so the row weaves snake -> double helix -> chaos -> unison.
 * Trails are painted by fading the previous frame with a translucent rect.
 */
export default function PendulumWave() {
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
    const t0 = performance.now();

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // repaint a solid base so trails restart cleanly after resize
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);
    }

    function tick(now: number) {
      // fade previous frame -> motion trails
      ctx.fillStyle = 'rgba(9, 9, 11, 0.08)';
      ctx.fillRect(0, 0, width, height);

      const t = (now - t0) / 1000;
      const padX = 30;
      const amplitude = Math.max(20, height / 2 - 40);
      const cy = height / 2;
      const spacing = DOTS > 1 ? (width - padX * 2) / (DOTS - 1) : 0;

      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i < DOTS; i++) {
        const period = CYCLE / (BASE_OSCILLATIONS + i);
        const phase = (2 * Math.PI * t) / period;
        pts.push({
          x: padX + i * spacing,
          y: cy + Math.sin(phase) * amplitude,
        });
      }

      // hairline through the dots reveals the emerging wave pattern
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.22)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      pts.forEach((p, i) => {
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      });
      ctx.stroke();

      // glowing white dots
      for (const p of pts) {
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
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
