import { useEffect, useRef } from 'react';

const W = 288;
const H = 176;
const CELL = 8;

/**
 * Pixel surge card: a canvas overlay of 8px pixels ripples outward from the
 * hovered point with random per-pixel delays (opacity 0 → 1 → 0), like a
 * digital tide washing over the card. Canvas-driven, no React state in the
 * pointer path; the rAF loop stops once the surge fades after pointer leave.
 */
export default function PixelCard() {
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

    const cols = Math.ceil(W / CELL);
    const rows = Math.ceil(H / CELL);
    const seeds = Array.from({ length: cols * rows }, () => Math.random());

    let raf = 0;
    let start = 0;
    let mx = W / 2;
    let my = H / 2;
    let hovering = false;
    let intensity = 0;

    const draw = (now: number) => {
      if (!start) start = now;
      const t = (now - start) / 1500; // one full wave period
      intensity += ((hovering ? 1 : 0) - intensity) * 0.07;
      ctx.clearRect(0, 0, W, H);

      if (intensity > 0.01) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const i = r * cols + c;
            const cx = c * CELL + CELL / 2;
            const cy = r * CELL + CELL / 2;
            const dist = Math.hypot(cx - mx, cy - my) / 110;
            let phase = (t + seeds[i] * 0.9 - dist) % 1.1;
            if (phase < 0) phase += 1.1;
            if (phase >= 1) continue;
            const a = Math.sin(phase * Math.PI) * intensity;
            if (a <= 0.03) continue;
            ctx.fillStyle = `rgba(24,24,27,${(a * 0.92).toFixed(3)})`;
            ctx.fillRect(c * CELL + 0.5, r * CELL + 0.5, CELL - 1, CELL - 1);
          }
        }
      }

      if (hovering || intensity > 0.01) {
        raf = requestAnimationFrame(draw);
      } else {
        raf = 0;
        ctx.clearRect(0, 0, W, H);
      }
    };

    const kick = () => {
      if (!raf) {
        start = 0;
        raf = requestAnimationFrame(draw);
      }
    };
    const onMove = (e: PointerEvent) => {
      const b = wrap.getBoundingClientRect();
      mx = ((e.clientX - b.left) / b.width) * W;
      my = ((e.clientY - b.top) / b.height) * H;
    };
    const onEnter = () => {
      hovering = true;
      kick();
    };
    const onLeave = () => {
      hovering = false;
      kick();
    };

    wrap.addEventListener('pointerenter', onEnter);
    wrap.addEventListener('pointermove', onMove);
    wrap.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('pointerenter', onEnter);
      wrap.removeEventListener('pointermove', onMove);
      wrap.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        ref={wrapRef}
        className="relative h-44 w-72 cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white"
      >
        <div className="relative flex h-full flex-col justify-between p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
            pixel / surge
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-950">Pixel Surge</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
              悬停之处，像素如潮水般
              <br />
              自指尖泛起又退去。
            </p>
          </div>
        </div>
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
