import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { RotateCcw } from 'lucide-react';

const W = 320;
const H = 200;
const RADIUS = 28; // erase circle radius
const GRID_X = 24; // coarse grid used to estimate scratched ratio
const GRID_Y = 15;
const DONE_RATIO = 0.45; // auto-fade the rest past 45% scratched

/**
 * A prize card hidden under a scratch-off foil. The foil is a canvas painted
 * with a zinc metallic gradient + subtle noise + a '刮开惊喜' hint; dragging
 * erases 28px-radius circles with 'destination-out' compositing. Past 45%
 * scratched the remaining foil fades out automatically.
 */
export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scratching = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const cells = useRef<boolean[]>([]);
  const erasedCount = useRef(0);
  const [done, setDone] = useState(false);

  function paintFoil() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    // metallic zinc gradient
    const g = ctx.createLinearGradient(0, 0, W, H);
    g.addColorStop(0, '#d4d4d8');
    g.addColorStop(0.35, '#e4e4e7');
    g.addColorStop(0.5, '#f4f4f5');
    g.addColorStop(0.65, '#d4d4d8');
    g.addColorStop(1, '#a1a1aa');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    // subtle noise
    for (let i = 0; i < 1400; i++) {
      const light = Math.random() > 0.5;
      ctx.fillStyle = light
        ? `rgba(255,255,255,${Math.random() * 0.35})`
        : `rgba(113,113,122,${Math.random() * 0.18})`;
      ctx.fillRect(Math.random() * W, Math.random() * H, 1.2, 1.2);
    }
    // hint
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#71717a';
    ctx.font = '600 16px "JetBrains Mono", ui-monospace, monospace';
    ctx.fillText('刮 开 惊 喜', W / 2, H / 2 - 10);
    ctx.fillStyle = '#a1a1aa';
    ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';
    ctx.fillText('S C R A T C H   H E R E', W / 2, H / 2 + 14);
    // reset tracking
    cells.current = new Array(GRID_X * GRID_Y).fill(false);
    erasedCount.current = 0;
  }

  useEffect(() => {
    paintFoil();
  }, []);

  function toLocal(e: PointerEvent<HTMLCanvasElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * W,
      y: ((e.clientY - rect.top) / rect.height) * H,
    };
  }

  function eraseAt(x: number, y: number) {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
    ctx.fill();
    // mark coarse cells whose center falls inside the circle
    const cw = W / GRID_X;
    const ch = H / GRID_Y;
    for (let gy = 0; gy < GRID_Y; gy++) {
      for (let gx = 0; gx < GRID_X; gx++) {
        const idx = gy * GRID_X + gx;
        if (cells.current[idx]) continue;
        const cx = (gx + 0.5) * cw;
        const cy = (gy + 0.5) * ch;
        if ((cx - x) ** 2 + (cy - y) ** 2 <= RADIUS * RADIUS) {
          cells.current[idx] = true;
          erasedCount.current += 1;
        }
      }
    }
    if (erasedCount.current / (GRID_X * GRID_Y) > DONE_RATIO) setDone(true);
  }

  function onPointerDown(e: PointerEvent<HTMLCanvasElement>) {
    if (done) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    scratching.current = true;
    const p = toLocal(e);
    last.current = p;
    eraseAt(p.x, p.y);
  }

  function onPointerMove(e: PointerEvent<HTMLCanvasElement>) {
    if (!scratching.current || done) return;
    const p = toLocal(e);
    const prev = last.current ?? p;
    // interpolate so fast drags erase a continuous stroke
    const dist = Math.hypot(p.x - prev.x, p.y - prev.y);
    const steps = Math.max(1, Math.ceil(dist / (RADIUS / 2)));
    for (let i = 1; i <= steps; i++) {
      eraseAt(prev.x + ((p.x - prev.x) * i) / steps, prev.y + ((p.y - prev.y) * i) / steps);
    }
    last.current = p;
  }

  function onPointerUp() {
    scratching.current = false;
    last.current = null;
  }

  function reset() {
    setDone(false);
    paintFoil();
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[200px] w-[320px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_10px_28px_-12px_rgba(0,0,0,0.12)]">
        {/* prize layer beneath the foil */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-amber-500">you win</span>
          <span className="text-2xl font-bold tracking-wide text-zinc-900">再来一瓶 🎉</span>
          <span className="font-mono text-[11px] tracking-wider text-zinc-400">MotionVault 勋章 · NO.052</span>
        </div>
        {/* scratch-off foil */}
        <canvas
          ref={canvasRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          style={{
            position: 'absolute',
            inset: 0,
            width: W,
            height: H,
            touchAction: 'none',
            cursor: done ? 'default' : 'crosshair',
            opacity: done ? 0 : 1,
            pointerEvents: done ? 'none' : 'auto',
            transition: 'opacity 700ms ease',
          }}
        />
        {/* reset */}
        {done && (
          <button
            type="button"
            onClick={reset}
            className="absolute bottom-2.5 right-2.5 flex h-7 items-center gap-1 rounded-md border border-zinc-200 bg-white/85 px-2 font-mono text-[10px] uppercase tracking-wider text-zinc-500 backdrop-blur transition-colors hover:text-zinc-950"
          >
            <RotateCcw className="h-3 w-3" />
            再来一次
          </button>
        )}
      </div>
    </div>
  );
}
