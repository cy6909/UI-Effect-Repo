import { useEffect, useRef } from 'react';

type Piece = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rotation: number;
  rotationSpeed: number;
  flipPeriod: number;
  flipPhase: number;
  color: string;
  isRect: boolean;
  born: number;
};

const COLORS = ['#F43F5E', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6'];
const LIFE_MS = 1200;

/** Click anywhere to explode a burst of confetti from the pointer. */
export default function ConfettiBurst() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const piecesRef = useRef<Piece[]>([]);

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
      const pieces = piecesRef.current;
      for (let i = pieces.length - 1; i >= 0; i--) {
        const p = pieces[i];
        const age = now - p.born;
        if (age > LIFE_MS) {
          pieces.splice(i, 1);
          continue;
        }
        p.vy += 0.15; // gravity
        p.vx *= 0.98; // air drag
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        // fade out before landing
        ctx.globalAlpha = Math.max(0, 1 - age / LIFE_MS);
        ctx.fillStyle = p.color;
        if (p.isRect) {
          // fake 3D tumble: oscillating scaleX
          const flip = Math.sin((age / p.flipPeriod) * Math.PI * 2 + p.flipPhase);
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.scale(1, 0.2 + 0.8 * Math.abs(flip));
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.w / 2, 0, Math.PI * 2);
          ctx.fill();
        }
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
      piecesRef.current = [];
    };
  }, []);

  function burst(clientX: number, clientY: number) {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    // density scale: base count * width / 800, reduced on small screens
    const scale = (rect.width / 800) * (rect.width < 640 ? 0.6 : 1);
    const count = Math.round((80 + Math.random() * 40) * Math.max(0.5, scale));
    const now = performance.now();
    for (let i = 0; i < count; i++) {
      // upward fan: -90deg center, +/- 50deg spread
      const angle = -Math.PI / 2 + ((Math.random() - 0.5) * 100 * Math.PI) / 180;
      const speed = 3 + Math.random() * 6;
      const isRect = Math.random() < 0.7;
      piecesRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        w: isRect ? 4 + Math.random() * 4 : 3 + Math.random() * 3,
        h: 6 + Math.random() * 5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        flipPeriod: 180 + Math.random() * 260,
        flipPhase: Math.random() * Math.PI * 2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        isRect,
        born: now,
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
      <button
        type="button"
        className="absolute left-1/2 top-1/2 z-10 h-9 -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white px-4 text-[13px] font-medium text-zinc-950 transition-transform active:scale-[0.98]"
      >
        点我庆祝
      </button>
      <span className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-zinc-500">
        点击任意处爆发彩带
      </span>
    </div>
  );
}
