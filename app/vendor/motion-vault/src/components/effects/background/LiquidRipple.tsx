import { useEffect, useRef } from 'react';

const SIM_CELL = 6; // px per simulation cell
const DOT_GAP = 24; // px between rendered dots
const DOT_R = 1.5;
const DAMPING = 0.985;
const BASE_ALPHA = 0.4;

/**
 * Tactile liquid ripple: a fine zinc dot grid over zinc-50 whose dots are
 * displaced and brightened by a 2-buffer water heightfield. Moving the pointer
 * injects gentle ripples; clicking injects a big one. Dampens back to rest.
 */
export default function LiquidRipple() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // pointer injections queue (sim-grid coords + strength), consumed by the loop
  const splashes = useRef<{ x: number; y: number; r: number; s: number }[]>([]);
  const lastMove = useRef<{ x: number; y: number } | null>(null);

  function toLocal(e: React.PointerEvent<HTMLDivElement>) {
    const el = rootRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const p = toLocal(e);
    if (!p) return;
    const last = lastMove.current;
    lastMove.current = p;
    // throttle: inject a gentle drop every ~10px of travel
    if (last && Math.hypot(p.x - last.x, p.y - last.y) >= 10) {
      splashes.current.push({ x: p.x / SIM_CELL, y: p.y / SIM_CELL, r: 2, s: 2.2 });
    }
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    const p = toLocal(e);
    if (!p) return;
    splashes.current.push({ x: p.x / SIM_CELL, y: p.y / SIM_CELL, r: 4, s: 9 });
  }

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
    let simW = 0;
    let simH = 0;
    let cur = new Float32Array(0);
    let prev = new Float32Array(0);

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      simW = Math.max(4, Math.ceil(width / SIM_CELL) + 2);
      simH = Math.max(4, Math.ceil(height / SIM_CELL) + 2);
      cur = new Float32Array(simW * simH);
      prev = new Float32Array(simW * simH);
    }

    function step() {
      // consume queued splashes into the current buffer
      for (const sp of splashes.current) {
        const cx = Math.round(sp.x);
        const cy = Math.round(sp.y);
        for (let dy = -sp.r; dy <= sp.r; dy++) {
          for (let dx = -sp.r; dx <= sp.r; dx++) {
            const x = cx + dx;
            const y = cy + dy;
            if (x < 1 || y < 1 || x >= simW - 1 || y >= simH - 1) continue;
            const fall = 1 - Math.hypot(dx, dy) / (sp.r + 0.5);
            if (fall > 0) cur[y * simW + x] += sp.s * fall;
          }
        }
      }
      splashes.current.length = 0;

      // classic 2-buffer wave propagation + damping
      for (let y = 1; y < simH - 1; y++) {
        const row = y * simW;
        for (let x = 1; x < simW - 1; x++) {
          const i = row + x;
          prev[i] = (cur[i - 1] + cur[i + 1] + cur[i - simW] + cur[i + simW]) / 2 - prev[i];
          prev[i] *= DAMPING;
        }
      }
      const swap = cur;
      cur = prev;
      prev = swap;
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#A1A1AA'; // zinc-400
      const cols = Math.ceil(width / DOT_GAP);
      const rows = Math.ceil(height / DOT_GAP);
      for (let gy = 0; gy <= rows; gy++) {
        const py = gy * DOT_GAP;
        const sy = Math.min(simH - 2, Math.max(1, Math.round(py / SIM_CELL)));
        for (let gx = 0; gx <= cols; gx++) {
          const px = gx * DOT_GAP;
          const sx = Math.min(simW - 2, Math.max(1, Math.round(px / SIM_CELL)));
          const h = cur[sy * simW + sx];
          const ah = Math.abs(h);
          const dy = Math.max(-12, Math.min(12, h * 3.5));
          const alpha = BASE_ALPHA + Math.min(0.6, ah * 0.22);
          const r = DOT_R + Math.min(1.2, ah * 0.12);
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(px, py + dy, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }

    function tick() {
      step();
      draw();
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
    <div
      ref={rootRef}
      className="absolute inset-0 cursor-crosshair overflow-hidden bg-zinc-50"
      onPointerMove={onPointerMove}
      onPointerDown={onPointerDown}
    >
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* mock page content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">液态波纹</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
