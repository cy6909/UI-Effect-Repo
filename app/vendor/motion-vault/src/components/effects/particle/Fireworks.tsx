import { useEffect, useRef } from 'react';

type Rocket = {
  x: number;
  targetX: number;
  y: number;
  targetY: number;
  vy: number;
  wobblePhase: number;
  trail: { x: number; y: number; alpha: number }[];
  hues: string[];
};

type Spark = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  life: number;
  maxLife: number;
  color: string;
};

/** Muted harmonious palette: amber / rose / sky — 2-3 hues picked per burst */
const PALETTE = [
  ['#F59E0B', '#FBBF24', '#FDE68A'], // amber
  ['#F43F5E', '#FB7185', '#FDA4AF'], // rose
  ['#0EA5E9', '#38BDF8', '#7DD3FC'], // sky
];

const GRAVITY = 0.04;
const DRAG = 0.96;
const IDLE_MS = 2500;

/** Click to launch a rocket that bursts into radial sparks; auto-launches when idle. */
export default function Fireworks() {
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
    let rockets: Rocket[] = [];
    let sparks: Spark[] = [];
    let lastLaunch = performance.now();

    function launch(x: number, targetY: number) {
      const groupCount = 2 + Math.floor(Math.random() * 2); // 2-3 harmonious hues
      const group = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      const hues = [...group].sort(() => Math.random() - 0.5).slice(0, groupCount);
      rockets.push({
        x,
        targetX: x,
        y: height + 4,
        targetY,
        vy: -(8 + Math.random() * 2.5),
        wobblePhase: Math.random() * Math.PI * 2,
        trail: [],
        hues,
      });
      lastLaunch = performance.now();
    }

    function explode(r: Rocket) {
      const count = 60 + Math.floor(Math.random() * 31); // 60-90 radial particles
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4.2;
        sparks.push({
          x: r.x,
          y: r.y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: 1.2 + Math.random() * 1.4,
          life: 0,
          maxLife: 75 + Math.random() * 25, // fade over ~1.5s
          color: r.hues[i % r.hues.length],
        });
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      rockets = [];
      sparks = [];
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);

      // idle auto-launch
      if (now - lastLaunch > IDLE_MS && rockets.length === 0) {
        launch(width * 0.15 + Math.random() * width * 0.7, height * 0.15 + Math.random() * height * 0.4);
      }

      // rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.vy;
        r.wobblePhase += 0.18;
        r.x = r.targetX + Math.sin(r.wobblePhase) * 3;
        r.trail.push({ x: r.x, y: r.y, alpha: 0.5 });
        if (r.trail.length > 8) r.trail.shift();

        for (const t of r.trail) {
          ctx.globalAlpha = t.alpha;
          ctx.fillStyle = '#FDE68A';
          ctx.beginPath();
          ctx.arc(t.x, t.y, 1, 0, Math.PI * 2);
          ctx.fill();
          t.alpha *= 0.9;
        }
        ctx.globalAlpha = 1;
        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(253, 230, 138, 0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        if (r.y <= r.targetY) {
          explode(r);
          rockets.splice(i, 1);
        }
      }

      // sparks
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.life += 1;
        if (s.life >= s.maxLife) {
          sparks.splice(i, 1);
          continue;
        }
        s.vy += GRAVITY;
        s.vx *= DRAG;
        s.vy *= DRAG;
        s.x += s.vx;
        s.y += s.vy;
        const t = s.life / s.maxLife;
        ctx.globalAlpha = 1 - t;
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, Math.max(0.3, s.radius * (1 - t * 0.7)), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = Math.min(e.clientY - rect.top, height - 24);
      launch(x, Math.max(16, y));
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
    />
  );
}
