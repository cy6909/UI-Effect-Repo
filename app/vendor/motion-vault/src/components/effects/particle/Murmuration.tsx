import { useEffect, useRef } from 'react';

type Bird = { x: number; y: number; vx: number; vy: number };

const COUNT = 130;
const NEIGHBOR_R = 60;
const SEPARATE_R = 24;
const MIN_SPEED = 1.6;
const MAX_SPEED = 3.3;
const MAX_TURN = 0.14;

/**
 * Boids murmuration: a flock of starlings steered by separation / alignment /
 * cohesion around a wandering attractor, so the swarm roams as one body.
 * The pointer acts as a predator — the flock splits around it and swirls
 * back together.
 */
export default function Murmuration() {
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
    let birds: Bird[] = [];
    const mouse = { x: -9999, y: -9999 };

    function spawn() {
      birds = Array.from({ length: COUNT }, () => {
        const a = Math.random() * Math.PI * 2;
        const s = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
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
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);
      ctx.lineCap = 'round';
      spawn();
    }

    function tick(now: number) {
      const t = now / 1000;
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);

      // wandering attractor: Lissajous orbit around the center
      const ax = width / 2 + Math.cos(t * 0.11) * width * 0.31;
      const ay = height / 2 + Math.sin(t * 0.073) * height * 0.22;
      const hasMouse = mouse.x > -999;

      const next: { vx: number; vy: number }[] = [];
      for (let i = 0; i < birds.length; i++) {
        const b = birds[i];
        let sepX = 0;
        let sepY = 0;
        let aliX = 0;
        let aliY = 0;
        let cohX = 0;
        let cohY = 0;
        let n = 0;

        for (let j = 0; j < birds.length; j++) {
          if (i === j) continue;
          const o = birds[j];
          const dx = o.x - b.x;
          const dy = o.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > NEIGHBOR_R * NEIGHBOR_R) continue;
          n++;
          aliX += o.vx;
          aliY += o.vy;
          cohX += o.x;
          cohY += o.y;
          if (d2 < SEPARATE_R * SEPARATE_R) {
            const d = Math.sqrt(d2) || 1;
            sepX -= dx / d;
            sepY -= dy / d;
          }
        }

        let fx = sepX * 0.075;
        let fy = sepY * 0.075;
        if (n > 0) {
          // alignment: steer toward average neighbor heading
          fx += (aliX / n - b.vx) * 0.055;
          fy += (aliY / n - b.vy) * 0.055;
          // cohesion: barely-there drift toward neighbor centroid —
          // enough to keep stragglers attached, too weak to collapse
          fx += (cohX / n - b.x) * 0.0002;
          fy += (cohY / n - b.y) * 0.0002;
        }
        // very loose pull toward the wandering attractor — alignment does
        // the flocking; a per-bird jitter keeps the swarm from collapsing
        // into a stable orbit ball
        fx += (ax - b.x) * 0.0005 + (Math.random() - 0.5) * 0.06;
        fy += (ay - b.y) * 0.0005 + (Math.random() - 0.5) * 0.06;

        // predator: flee the cursor
        if (hasMouse) {
          const dx = b.x - mouse.x;
          const dy = b.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 120 && dist > 0.01) {
            const f = 0.9 * (1 - dist / 120);
            fx += (dx / dist) * f;
            fy += (dy / dist) * f;
          }
        }

        let vx = b.vx + fx;
        let vy = b.vy + fy;

        // limit turn rate so headings bend smoothly
        const prevA = Math.atan2(b.vy, b.vx);
        let nextA = Math.atan2(vy, vx);
        let da = nextA - prevA;
        while (da > Math.PI) da -= Math.PI * 2;
        while (da < -Math.PI) da += Math.PI * 2;
        nextA = prevA + Math.max(-MAX_TURN, Math.min(MAX_TURN, da));

        const speed = Math.max(MIN_SPEED, Math.min(MAX_SPEED, Math.hypot(vx, vy)));
        next.push({ vx: Math.cos(nextA) * speed, vy: Math.sin(nextA) * speed });
      }

      ctx.strokeStyle = 'rgba(203, 213, 225, 0.75)';
      ctx.lineWidth = 1.1;
      const M = 24;
      for (let i = 0; i < birds.length; i++) {
        const b = birds[i];
        b.vx = next[i].vx;
        b.vy = next[i].vy;
        b.x += b.vx;
        b.y += b.vy;
        if (b.x < -M) b.x = width + M;
        else if (b.x > width + M) b.x = -M;
        if (b.y < -M) b.y = height + M;
        else if (b.y > height + M) b.y = -M;

        // tiny chevron oriented along velocity
        const a = Math.atan2(b.vy, b.vx);
        const wing = (70 * Math.PI) / 180 / 2;
        ctx.beginPath();
        ctx.moveTo(b.x - Math.cos(a - wing) * 3.4, b.y - Math.sin(a - wing) * 3.4);
        ctx.lineTo(b.x, b.y);
        ctx.lineTo(b.x - Math.cos(a + wing) * 3.4, b.y - Math.sin(a + wing) * 3.4);
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
