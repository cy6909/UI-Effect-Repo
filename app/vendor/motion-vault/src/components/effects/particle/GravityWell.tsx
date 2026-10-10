import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; r: number; alpha: number };
type Ring = { x: number; y: number; born: number };

const COUNT = 150;
const WELL_RADIUS = 200;
const REPULSE_MS = 400;

/**
 * 150 drifting motes; the cursor is a gravity well that captures nearby
 * particles into orbits (tangential push + mild attraction). Clicking turns
 * the well into a 400ms repulsor that blasts particles outward with a ring flash.
 */
export default function GravityWell() {
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
    let particles: Particle[] = [];
    const rings: Ring[] = [];
    const mouse = { x: -9999, y: -9999 };
    let repulseUntil = 0;

    function spawn() {
      particles = Array.from({ length: COUNT }, () => {
        const a = Math.random() * Math.PI * 2;
        const s = 0.15 + Math.random() * 0.3;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          r: 1 + Math.random() * 1.4,
          alpha: 0.35 + Math.random() * 0.5,
        };
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

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);
      const repulsing = now < repulseUntil;
      const hasMouse = mouse.x > -999;

      // faint reach of the well
      if (hasMouse) {
        ctx.strokeStyle = repulsing ? 'rgba(251, 113, 133, 0.10)' : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, WELL_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
      }

      for (const p of particles) {
        if (hasMouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (repulsing && dist < 260) {
            // blast outward
            const f = 3.2 * (1 - dist / 260);
            p.vx -= (dx / dist) * f;
            p.vy -= (dy / dist) * f;
          } else if (!repulsing && dist < WELL_RADIUS) {
            const falloff = 1 - dist / WELL_RADIUS;
            // mild attraction
            p.vx += (dx / dist) * 0.045 * falloff;
            p.vy += (dy / dist) * 0.045 * falloff;
            // tangential push -> orbit instead of collapse
            p.vx += (-dy / dist) * 0.14 * falloff;
            p.vy += (dx / dist) * 0.14 * falloff;
            // never fall into the singularity
            if (dist < 34) {
              p.vx -= (dx / dist) * 0.3;
              p.vy -= (dy / dist) * 0.3;
            }
          }
        }

        // damping + speed cap keep orbits stable
        p.vx *= 0.985;
        p.vy *= 0.985;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 4) {
          p.vx = (p.vx / speed) * 4;
          p.vy = (p.vy / speed) * 4;
        }
        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -6) p.x = width + 6;
        else if (p.x > width + 6) p.x = -6;
        if (p.y < -6) p.y = height + 6;
        else if (p.y > height + 6) p.y = -6;

        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // well core marker
      if (hasMouse) {
        ctx.strokeStyle = repulsing ? 'rgba(251, 113, 133, 0.7)' : 'rgba(255, 255, 255, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // repulse flash rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        const p = (now - ring.born) / REPULSE_MS;
        if (p >= 1) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 * (1 - p)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, 10 + p * 110, 0, Math.PI * 2);
        ctx.stroke();
      }

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
    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.x = x;
      mouse.y = y;
      repulseUntil = performance.now() + REPULSE_MS;
      rings.push({ x, y, born: performance.now() });
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
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
