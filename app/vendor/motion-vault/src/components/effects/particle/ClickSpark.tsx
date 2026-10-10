import { useEffect, useRef } from 'react';

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number; // streak length in px
  width: number;
  color: string;
  born: number;
  life: number; // ms
};

const ZINC_950 = '#09090B';
const ZINC_500 = '#71717A';
const AMBER = '#F59E0B';

/** Click anywhere to burst radial spark streaks with gravity and fade. */
export default function ClickSpark() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);

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
      const sparks = sparksRef.current;
      ctx.lineCap = 'round';
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        const age = now - s.born;
        if (age > s.life) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += 0.16; // gravity pull
        s.vx *= 0.985; // air drag
        s.vy *= 0.985;
        s.x += s.vx;
        s.y += s.vy;
        const fade = 1 - age / s.life;
        // streak: short line trailing behind the velocity direction
        const mag = Math.hypot(s.vx, s.vy) || 1;
        const tail = (s.len * fade) / mag;
        ctx.globalAlpha = fade;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.width;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * tail, s.y - s.vy * tail);
        ctx.stroke();
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
      sparksRef.current = [];
    };
  }, []);

  function burst(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const now = performance.now();
    const count = 8 + Math.floor(Math.random() * 5); // 8-12 sparks
    for (let i = 0; i < count; i++) {
      // evenly spread radial directions with jitter
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const speed = 2.2 + Math.random() * 3.4;
      // mostly monochrome, one in ~4 sparks is amber
      const color = Math.random() < 0.25 ? AMBER : Math.random() < 0.7 ? ZINC_950 : ZINC_500;
      sparksRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.6, // slight upward bias
        len: 7 + Math.random() * 7,
        width: 1.2 + Math.random() * 0.9,
        color,
        born: now,
        life: 480 + Math.random() * 320,
      });
    }
  }

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onClick={(e) => burst(e.clientX, e.clientY)}
      role="presentation"
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      <span className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-zinc-400">
        点击任意位置
      </span>
    </div>
  );
}
