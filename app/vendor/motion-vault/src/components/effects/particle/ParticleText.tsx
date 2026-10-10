import { useEffect, useRef } from 'react';

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
};

const WORD = '灵感';

/** Text assembled from ~1500 particles; the pointer scatters them and they spring back. */
export default function ParticleText() {
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
    const mouse = { x: -9999, y: -9999 };
    let particles: P[] = [];

    function rebuild() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // sample target points from an offscreen render of the word
      const off = document.createElement('canvas');
      off.width = Math.max(1, Math.floor(width));
      off.height = Math.max(1, Math.floor(height));
      const offCtx = off.getContext('2d');
      if (!offCtx) return;
      const fontSize = Math.min(120, width / (WORD.length * 1.15));
      offCtx.fillStyle = '#ffffff';
      offCtx.font = `700 ${fontSize}px "Noto Sans SC", sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillText(WORD, width / 2, height / 2);
      const data = offCtx.getImageData(0, 0, off.width, off.height).data;

      // pick a sampling step that lands roughly in the 1200-1800 point range
      let step = 3;
      const countAt = (s: number) => {
        let n = 0;
        for (let y = 0; y < off.height; y += s) {
          for (let x = 0; x < off.width; x += s) {
            if (data[(y * off.width + x) * 4 + 3] > 128) n++;
          }
        }
        return n;
      };
      while (countAt(step) > 1800 && step < 10) step++;
      while (countAt(step) < 1200 && step > 1) step--;

      const targets: Array<{ x: number; y: number }> = [];
      for (let y = 0; y < off.height; y += step) {
        for (let x = 0; x < off.width; x += step) {
          if (data[(y * off.width + x) * 4 + 3] > 128) targets.push({ x, y });
        }
      }
      particles = targets.map((t) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        tx: t.x,
        ty: t.y,
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = '#ffffff';
      for (const p of particles) {
        // spring toward target
        p.vx += (p.tx - p.x) * 0.06;
        p.vy += (p.ty - p.y) * 0.06;
        // pointer repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 60 * 60 && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const force = (1 - d / 60) * 8;
          p.vx += (dx / d) * force;
          p.vy += (dy / d) * force;
        }
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        ctx.fillRect(p.x - 0.6, p.y - 0.6, 1.2, 1.2);
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

    rebuild();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(rebuild);
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
    <>
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
      />
      <span className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-zinc-500">
        移动鼠标打散文字
      </span>
    </>
  );
}
