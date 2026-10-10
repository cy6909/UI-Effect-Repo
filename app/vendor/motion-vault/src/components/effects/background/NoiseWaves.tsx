import { useEffect, useRef } from 'react';

type Wave = {
  offsetY: number; // fraction offsets resolved at draw time
  amp1: number;
  amp2: number;
  lambda1: number;
  lambda2: number;
  speed1: number; // cycles per second
  speed2: number;
  phase1: number;
  phase2: number;
  alpha: number;
  middle: boolean;
};

/** Five layered sine waves flowing slowly across a white background. */
export default function NoiseWaves() {
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
    const mouse = { y: 0.5 }; // normalized 0..1

    const waves: Wave[] = Array.from({ length: 5 }, (_, i) => ({
      offsetY: (i - 2) * 60, // spread across the middle band (+/-120px)
      amp1: 8 + Math.random() * 10,
      amp2: 4 + Math.random() * 10,
      lambda1: 200 + Math.random() * 200,
      lambda2: 200 + Math.random() * 200,
      speed1: 0.2 + Math.random() * 0.3,
      speed2: 0.2 + Math.random() * 0.3,
      phase1: Math.random() * Math.PI * 2,
      phase2: Math.random() * Math.PI * 2,
      alpha: 0.06 + (i / 4) * 0.08,
      middle: i >= 1 && i <= 3,
    }));
    // keep combined amplitude within 12-28px
    for (const w of waves) {
      const total = w.amp1 + w.amp2;
      const scale = total > 28 ? 28 / total : total < 12 ? 12 / total : 1;
      w.amp1 *= scale;
      w.amp2 *= scale;
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function tick(now: number) {
      const t = now / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1.5;
      // cursor y subtly scales the middle waves' amplitude (+/-30%)
      const mouseScale = 1 + (mouse.y * 2 - 1) * 0.3;
      for (const w of waves) {
        const ampScale = w.middle ? mouseScale : 1;
        const baseY = height / 2 + w.offsetY;
        ctx.strokeStyle = `rgba(9, 9, 11, ${w.alpha})`;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 4) {
          const y =
            baseY +
            (Math.sin((x / w.lambda1) * Math.PI * 2 + t * w.speed1 * Math.PI * 2 + w.phase1) * w.amp1 +
              Math.sin((x / w.lambda2) * Math.PI * 2 - t * w.speed2 * Math.PI * 2 + w.phase2) * w.amp2) *
              ampScale;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.y = Math.min(1, Math.max(0, (e.clientY - rect.top) / rect.height));
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
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
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">噪声波纹</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
