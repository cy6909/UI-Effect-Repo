import { useEffect, useRef } from 'react';

const W = 320;
const H = 200;
const CHUNK = 10;
const COLS = Math.ceil(W / CHUNK);
const ROWS = Math.ceil(H / CHUNK);
const RADIUS = 64;

/** Pre-render the card content into an offscreen canvas. */
function renderContent(): HTMLCanvasElement {
  const off = document.createElement('canvas');
  off.width = W;
  off.height = H;
  const c = off.getContext('2d');
  if (!c) return off;

  // dark face
  c.fillStyle = '#18181B';
  c.fillRect(0, 0, W, H);
  // soft gradient orb
  const orb = c.createRadialGradient(232, 58, 4, 232, 58, 90);
  orb.addColorStop(0, 'rgba(228,228,231,0.85)');
  orb.addColorStop(0.45, 'rgba(113,113,122,0.4)');
  orb.addColorStop(1, 'rgba(113,113,122,0)');
  c.fillStyle = orb;
  c.fillRect(0, 0, W, H);
  // ring around the orb
  c.strokeStyle = 'rgba(255,255,255,0.22)';
  c.lineWidth = 1;
  c.beginPath();
  c.arc(232, 58, 46, 0, Math.PI * 2);
  c.stroke();
  // mono label
  c.fillStyle = '#71717A';
  c.font = '11px "JetBrains Mono", monospace';
  c.fillText('D E C A Y', 22, 34);
  // title
  c.fillStyle = '#FAFAFA';
  c.font = '600 22px Inter, sans-serif';
  c.fillText('Pixel Decay', 22, 150);
  // skeleton bars
  c.fillStyle = 'rgba(255,255,255,0.22)';
  c.fillRect(22, 164, 150, 6);
  c.fillStyle = 'rgba(255,255,255,0.12)';
  c.fillRect(22, 176, 96, 6);

  return off;
}

/**
 * Pixel decay card: the content is pre-rendered into an offscreen canvas and
 * drawn as 10px chunks. While hovering, chunks near the cursor get kicked
 * with random displacement + fade impulses, then spring back into place when
 * the pointer leaves — disintegrate and reassemble. One canvas, no React
 * state in the pointer path.
 */
export default function DecayCard() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const off = renderContent();
    const count = COLS * ROWS;
    const ox = new Float32Array(count);
    const oy = new Float32Array(count);
    const vx = new Float32Array(count);
    const vy = new Float32Array(count);
    const al = new Float32Array(count).fill(1);
    const va = new Float32Array(count);

    let raf = 0;

    const settled = () => {
      for (let i = 0; i < count; i++) {
        if (Math.abs(ox[i]) > 0.2 || Math.abs(oy[i]) > 0.2 || al[i] < 0.995) return false;
      }
      return true;
    };

    const drawFull = () => {
      ctx.clearRect(0, 0, W, H);
      ctx.drawImage(off, 0, 0);
    };

    const step = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < count; i++) {
        // spring back to origin / full opacity
        vx[i] += -ox[i] * 0.055;
        vy[i] += -oy[i] * 0.055;
        vx[i] *= 0.88;
        vy[i] *= 0.88;
        ox[i] += vx[i];
        oy[i] += vy[i];
        va[i] += (1 - al[i]) * 0.07;
        va[i] *= 0.82;
        al[i] += va[i];

        const sx = (i % COLS) * CHUNK;
        const sy = Math.floor(i / COLS) * CHUNK;
        if (Math.abs(ox[i]) < 0.2 && Math.abs(oy[i]) < 0.2 && al[i] > 0.995) {
          ctx.drawImage(off, sx, sy, CHUNK, CHUNK, sx, sy, CHUNK, CHUNK);
        } else {
          ctx.globalAlpha = Math.max(0, Math.min(1, al[i]));
          ctx.drawImage(off, sx, sy, CHUNK, CHUNK, sx + ox[i], sy + oy[i], CHUNK, CHUNK);
        }
      }
      ctx.globalAlpha = 1;

      if (settled()) {
        raf = 0;
        drawFull();
      } else {
        raf = requestAnimationFrame(step);
      }
    };

    const kick = (px: number, py: number) => {
      for (let i = 0; i < count; i++) {
        const cx = (i % COLS) * CHUNK + CHUNK / 2;
        const cy = Math.floor(i / COLS) * CHUNK + CHUNK / 2;
        const dx = cx - px;
        const dy = cy - py;
        const d = Math.hypot(dx, dy);
        if (d > RADIUS) continue;
        const f = 1 - d / RADIUS;
        const ang = d > 0.001 ? Math.atan2(dy, dx) : Math.random() * Math.PI * 2;
        const push = f * (6 + Math.random() * 10);
        vx[i] += Math.cos(ang) * push + (Math.random() - 0.5) * 4 * f;
        vy[i] += Math.sin(ang) * push + (Math.random() - 0.5) * 4 * f;
        va[i] -= f * (0.25 + Math.random() * 0.45);
      }
      if (!raf) raf = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      kick(((e.clientX - b.left) / b.width) * W, ((e.clientY - b.top) / b.height) * H);
    };

    drawFull();
    wrap.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        ref={wrapRef}
        className="relative cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]"
        style={{ width: W, height: H, maxWidth: '100%' }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
          }}
        />
      </div>
    </div>
  );
}
