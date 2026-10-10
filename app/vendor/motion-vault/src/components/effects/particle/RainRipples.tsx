import { useEffect, useRef } from 'react';

type Drop = { x: number; y: number; speed: number; big: boolean; targetY: number };
type Ripple = { x: number; y: number; born: number; delay: number; maxR: number; life: number; alpha: number };
type Droplet = { x: number; y: number; vx: number; vy: number; born: number; life: number };

/**
 * Quiet rainy-night water: short rain streaks fall onto a horizon line and
 * bloom into fading ellipse ripples. Click to send down a big drop that
 * splashes 3 concentric ripples and a spray of droplets.
 */
export default function RainRipples() {
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
    let horizon = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const drops: Drop[] = [];
    const ripples: Ripple[] = [];
    const droplets: Droplet[] = [];
    let lastSpawn = 0;
    let nextDelay = 120;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      horizon = height * 0.7;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function land(drop: Drop, now: number) {
      if (drop.big) {
        // 3 staggered concentric ripples + droplet spray
        for (let k = 0; k < 3; k++) {
          ripples.push({
            x: drop.x,
            y: drop.targetY,
            born: now,
            delay: k * 120,
            maxR: 64,
            life: 1200,
            alpha: 0.55,
          });
        }
        for (let k = 0; k < 12; k++) {
          const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 0.9;
          const s = 1.5 + Math.random() * 2.8;
          droplets.push({
            x: drop.x,
            y: drop.targetY,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s,
            born: now,
            life: 500 + Math.random() * 250,
          });
        }
      } else {
        ripples.push({
          x: drop.x,
          y: drop.targetY,
          born: now,
          delay: 0,
          maxR: 46,
          life: 1200,
          alpha: 0.4,
        });
        // tiny splash
        for (let k = 0; k < 2; k++) {
          droplets.push({
            x: drop.x,
            y: drop.targetY,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -1 - Math.random(),
            born: now,
            life: 280,
          });
        }
      }
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);

      // horizon line
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.stroke();

      // spawn rain every 80-200ms
      if (now - lastSpawn > nextDelay) {
        drops.push({
          x: Math.random() * width,
          y: -8,
          speed: 11 + Math.random() * 4,
          big: false,
          targetY: horizon,
        });
        lastSpawn = now;
        nextDelay = 80 + Math.random() * 120;
      }

      // falling drops (6px streaks; big drop is longer + brighter)
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        d.y += d.speed;
        if (d.big) d.speed = Math.min(d.speed + 0.15, 14);
        if (d.y >= d.targetY) {
          land(d, now);
          drops.splice(i, 1);
          continue;
        }
        const len = d.big ? 12 : 6;
        ctx.strokeStyle = d.big ? 'rgba(255, 255, 255, 0.85)' : 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = d.big ? 1.6 : 1;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(d.x, d.y - len);
        ctx.lineTo(d.x, d.y);
        ctx.stroke();
        if (d.big) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.beginPath();
          ctx.arc(d.x, d.y, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // ripples: expanding perspective ellipses that fade out
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const p = (now - r.born - r.delay) / r.life;
        if (p < 0) continue;
        if (p >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        const radius = r.maxR * p;
        ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * (1 - p)})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, radius, radius * 0.32, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // splash droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        const p = (now - d.born) / d.life;
        if (p >= 1) {
          droplets.splice(i, 1);
          continue;
        }
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.22;
        ctx.globalAlpha = 0.75 * (1 - p);
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(d.x, d.y, 1.3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(tick);
    }

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      drops.push({
        x,
        y: -16,
        speed: 9,
        big: true,
        targetY: Math.max(y, horizon + 6),
      });
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
