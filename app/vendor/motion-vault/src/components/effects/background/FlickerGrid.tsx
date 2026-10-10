import { useEffect, useRef } from 'react';

type Cell = { alpha: number };
type Anim = { index: number; start: number; duration: number; peak: number };

const CELL = 16;
const GAP = 2;
const PITCH = CELL + GAP;
const BASE_ALPHA = 0.04;
const ACTIVE_RATIO = 0.06;

/** Calm "digital rain" of tiles: random grid squares gently fade up and back over a white base. */
export default function FlickerGrid() {
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
    let cols = 0;
    let rows = 0;
    let cells: Cell[] = [];
    let anims: Anim[] = [];
    let centerFactor: number[] = [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / PITCH) + 1;
      rows = Math.ceil(height / PITCH) + 1;
      cells = Array.from({ length: cols * rows }, () => ({ alpha: BASE_ALPHA }));
      // radial falloff: center livelier than edges (1 -> 0.35)
      centerFactor = Array.from({ length: cols * rows }, (_, i) => {
        const cx = ((i % cols) * PITCH) / Math.max(1, width) - 0.5;
        const cy = (Math.floor(i / cols) * PITCH) / Math.max(1, height) - 0.5;
        const d = Math.min(1, Math.hypot(cx, cy) * 1.6);
        return 1 - d * 0.65;
      });
      anims = [];
    }

    function tick(now: number) {
      ctx.clearRect(0, 0, width, height);
      const total = cells.length;
      const targetActive = Math.max(1, Math.round(total * ACTIVE_RATIO));

      // retire finished animations
      for (let i = anims.length - 1; i >= 0; i--) {
        const a = anims[i];
        if (now - a.start >= a.duration) {
          cells[a.index].alpha = BASE_ALPHA;
          anims.splice(i, 1);
        }
      }
      // keep ~6% of cells active
      while (anims.length < targetActive) {
        const index = Math.floor(Math.random() * total);
        if (anims.some((a) => a.index === index)) continue;
        anims.push({
          index,
          start: now + Math.random() * 400,
          duration: 1000 + Math.random() * 2000, // 1-3s fade up and back
          peak: 0.25 + Math.random() * 0.25,
        });
      }
      // apply running animations (smooth sine in/out)
      for (const a of anims) {
        const t = (now - a.start) / a.duration;
        if (t < 0) continue;
        const wave = Math.sin(Math.PI * Math.min(1, t));
        cells[a.index].alpha = BASE_ALPHA + (a.peak - BASE_ALPHA) * wave;
      }

      ctx.fillStyle = '#18181B'; // zinc-900
      for (let i = 0; i < total; i++) {
        const alpha = cells[i].alpha * centerFactor[i];
        if (alpha < 0.005) continue;
        ctx.globalAlpha = alpha;
        ctx.fillRect((i % cols) * PITCH, Math.floor(i / cols) * PITCH, CELL, CELL);
      }
      ctx.globalAlpha = 1;

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
    <div className="absolute inset-0 overflow-hidden bg-white">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* mock page content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">闪烁方格</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
