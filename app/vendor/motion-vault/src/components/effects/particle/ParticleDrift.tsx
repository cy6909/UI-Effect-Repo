import { useEffect, useRef } from 'react';

type Mote = {
  baseX: number;
  y: number;
  radius: number;
  speed: number;
  swayAmp: number;
  swayPeriod: number;
  swayPhase: number;
  breathPeriod: number;
  breathPhase: number;
};

/** Ambient dust particles drifting upward with sine sway and breathing opacity. */
export default function ParticleDrift() {
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
    let motes: Mote[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // density = base * width / 800, reduced on small screens
      const density = (60 * width) / 800;
      const count = Math.max(20, Math.round(density * (width < 640 ? 0.6 : 1)));
      motes = Array.from({ length: count }, () => ({
        baseX: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 2.2,
        speed: 0.1 + Math.random() * 0.25,
        swayAmp: 10 + Math.random() * 15,
        swayPeriod: 3 + Math.random() * 4,
        swayPhase: Math.random() * Math.PI * 2,
        breathPeriod: 2 + Math.random() * 3,
        breathPhase: Math.random() * Math.PI * 2,
      }));
    }

    function tick(now: number) {
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      for (const m of motes) {
        m.y -= m.speed;
        if (m.y < -m.radius) {
          m.y = height + m.radius;
          m.baseX = Math.random() * width;
        }
        const x = m.baseX + Math.sin((t / m.swayPeriod) * Math.PI * 2 + m.swayPhase) * m.swayAmp;
        const breath = 0.5 + 0.5 * Math.sin((t / m.breathPeriod) * Math.PI * 2 + m.breathPhase);
        ctx.globalAlpha = 0.1 + breath * 0.5;
        ctx.beginPath();
        ctx.arc(x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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
