import { useEffect, useRef } from 'react';

type Bubble = {
  x: number;
  y: number;
  r: number;
  speed: number;
  swayPhase: number;
  swaySpeed: number;
  wobblePhase: number;
  tint: string;
  /** last drawn x (base x + sine sway), used for click hit-testing */
  drawX: number;
};
type Droplet = { x: number; y: number; vx: number; vy: number; r: number; born: number; life: number; tint: string };
type Ring = { x: number; y: number; r0: number; r1: number; born: number };

const TINTS = [
  'rgba(161, 161, 170, 0.85)', // zinc-400
  'rgba(161, 161, 170, 0.85)',
  'rgba(161, 161, 170, 0.85)',
  'rgba(56, 189, 248, 0.6)', // sky-400 @ 40%-ish saturation feel
  'rgba(251, 113, 133, 0.55)', // rose-400
];
const MIN_ALIVE = 8;
const MAX_ALIVE = 14;

/**
 * Iridescent bubbles float up from the bottom with a sine sway; click one and
 * it pops into a burst of droplets plus a quick expanding ring. Light theme.
 */
export default function BubblePop() {
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
    let bubbles: Bubble[] = [];
    const droplets: Droplet[] = [];
    const rings: Ring[] = [];

    function makeBubble(fromBottom = true): Bubble {
      const r = 12 + Math.random() * 28;
      return {
        x: r + Math.random() * (width - r * 2),
        y: fromBottom ? height + r + Math.random() * 40 : Math.random() * height,
        r,
        speed: 0.35 + Math.random() * 0.55 + r * 0.006,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: 0.6 + Math.random() * 0.9,
        wobblePhase: Math.random() * Math.PI * 2,
        tint: TINTS[Math.floor(Math.random() * TINTS.length)],
        drawX: 0,
      };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bubbles = Array.from({ length: MIN_ALIVE + 2 }, () => makeBubble(false));
      droplets.length = 0;
      rings.length = 0;
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);
      const t = now / 1000;

      // keep 8-14 alive
      if (bubbles.length < MIN_ALIVE) {
        bubbles.push(makeBubble());
      } else if (bubbles.length < MAX_ALIVE && Math.random() < 0.02) {
        bubbles.push(makeBubble());
      }

      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        b.y -= b.speed;
        if (b.y < -b.r - 12) {
          bubbles.splice(i, 1); // drifted off the top
          continue;
        }
        const x = b.x + Math.sin(t * b.swaySpeed + b.swayPhase) * 10;
        const wob = Math.sin(t * 2.4 + b.wobblePhase) * 0.05;
        const rx = b.r * (1 + wob);
        const ry = b.r * (1 - wob);

        // translucent body
        ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
        ctx.beginPath();
        ctx.ellipse(x, b.y, rx, ry, 0, 0, Math.PI * 2);
        ctx.fill();
        // thin iridescent rim
        ctx.strokeStyle = b.tint;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.ellipse(x, b.y, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        // highlight arc, upper-left
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.85)';
        ctx.lineWidth = 1.5;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.arc(x - rx * 0.32, b.y - ry * 0.36, b.r * 0.32, Math.PI * 0.85, Math.PI * 1.55);
        ctx.stroke();

        // remember drawn x for hit testing
        b.drawX = x;
      }

      // pop droplets
      for (let i = droplets.length - 1; i >= 0; i--) {
        const d = droplets[i];
        const p = (now - d.born) / d.life;
        if (p >= 1) {
          droplets.splice(i, 1);
          continue;
        }
        d.x += d.vx;
        d.y += d.vy;
        d.vy += 0.12;
        ctx.globalAlpha = 1 - p;
        ctx.fillStyle = d.tint;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // expanding pop rings
      for (let i = rings.length - 1; i >= 0; i--) {
        const ring = rings[i];
        const p = (now - ring.born) / 300;
        if (p >= 1) {
          rings.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(113, 113, 122, ${0.45 * (1 - p)})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.arc(ring.x, ring.y, ring.r0 + (ring.r1 - ring.r0) * p, 0, Math.PI * 2);
        ctx.stroke();
      }

      raf = requestAnimationFrame(tick);
    }

    function onClick(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      const now = performance.now();
      for (let i = bubbles.length - 1; i >= 0; i--) {
        const b = bubbles[i];
        const bx = b.drawX || b.x;
        if (Math.hypot(cx - bx, cy - b.y) > b.r) continue;
        // pop!
        bubbles.splice(i, 1);
        const n = 8 + Math.floor(Math.random() * 3);
        for (let k = 0; k < n; k++) {
          const a = Math.random() * Math.PI * 2;
          const s = 1.5 + Math.random() * 2;
          droplets.push({
            x: bx,
            y: b.y,
            vx: Math.cos(a) * s,
            vy: Math.sin(a) * s - 0.6,
            r: 1.4 + Math.random() * 1.2,
            born: now,
            life: 450 + Math.random() * 200,
            tint: b.tint,
          });
        }
        rings.push({ x: bx, y: b.y, r0: b.r * 0.5, r1: b.r * 1.6, born: now });
      }
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'pointer' }}
    />
  );
}
