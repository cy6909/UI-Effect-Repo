import { useEffect, useRef } from 'react';

type Star = { x: number; y: number; radius: number; alpha: number };
type Meteor = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  head: number;
  tail: number;
  alpha: number;
};

/** ~35deg from vertical, falling down-left */
const ANGLE = (35 * Math.PI) / 180;

/** Dark night sky with a static star field and staggered diagonal meteors with fading tails. */
export default function Meteors() {
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
    let stars: Star[] = [];
    let meteors: Meteor[] = [];
    let lastSpawn = 0;
    let nextDelay = 300 + Math.random() * 600;

    function spawnMeteor(big = Math.random() < 0.22) {
      // start along the top, padded to the right so the down-left path stays visible
      const x = width * 0.25 + Math.random() * (width * 0.85);
      const y = -20 - Math.random() * 40;
      const speed = (big ? 6.5 : 4) + Math.random() * (big ? 1.5 : 4);
      meteors.push({
        x,
        y,
        dx: -Math.sin(ANGLE) * speed,
        dy: Math.cos(ANGLE) * speed,
        head: big ? 2.6 : 2,
        tail: big ? 170 : 120,
        alpha: big ? 1 : 0.75 + Math.random() * 0.25,
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.5 + Math.random() * 0.9,
        alpha: 0.15 + Math.random() * 0.45,
      }));
      meteors = [];
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);

      // static star field
      for (const s of stars) {
        ctx.globalAlpha = s.alpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // staggered spawning, max ~8 alive
      if (now - lastSpawn > nextDelay && meteors.length < 8) {
        spawnMeteor();
        lastSpawn = now;
        nextDelay = 300 + Math.random() * 600;
      }

      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += m.dx;
        m.y += m.dy;
        if (m.y - m.tail > height || m.x + m.tail < 0) {
          meteors.splice(i, 1);
          continue;
        }
        // fading gradient tail (white -> transparent), opposite the travel direction
        const tx = m.x - m.dx * (m.tail / Math.hypot(m.dx, m.dy));
        const ty = m.y - m.dy * (m.tail / Math.hypot(m.dx, m.dy));
        const grad = ctx.createLinearGradient(m.x, m.y, tx, ty);
        grad.addColorStop(0, `rgba(255, 255, 255, ${0.6 * m.alpha})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.head;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
        // glowing head dot
        ctx.save();
        ctx.globalAlpha = m.alpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.head / 2 + 0.8, 0, Math.PI * 2);
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
