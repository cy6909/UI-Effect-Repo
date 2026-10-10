import { useEffect, useRef } from 'react';

const TILE = 144;
const FRAMES = 6;
const GRAIN_FPS = 12;

type Scratch = { x: number; born: number; life: number };

/**
 * Old-film overlay: pre-rendered grain tiles cycled at 12fps (projector
 * judder is the charm), a slow-breathing vignette, and sparse vertical
 * scratches that jitter and vanish. Monochrome and subtle.
 */
export default function FilmGrain() {
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
    const scratches: Scratch[] = [];
    let nextScratch = 0;
    let lastDust = 0;

    // pre-render grain frames
    const tiles: HTMLCanvasElement[] = [];
    for (let f = 0; f < FRAMES; f++) {
      const tile = document.createElement('canvas');
      tile.width = TILE;
      tile.height = TILE;
      const tc = tile.getContext('2d');
      if (!tc) continue;
      const img = tc.createImageData(TILE, TILE);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() * 255;
        img.data[i] = v;
        img.data[i + 1] = v;
        img.data[i + 2] = v;
        img.data[i + 3] = 13 + Math.random() * 28; // alpha 0.05 - 0.16
      }
      tc.putImageData(img, 0, 0);
      tiles.push(tile);
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
      ctx.fillStyle = '#0C0C0E';
      ctx.fillRect(0, 0, width, height);

      // grain: cycle pre-rendered tiles at 12fps
      if (tiles.length > 0) {
        const frame = Math.floor(t * GRAIN_FPS) % FRAMES;
        const pattern = ctx.createPattern(tiles[frame], 'repeat');
        if (pattern) {
          ctx.fillStyle = pattern;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // vertical scratches: jittering hairlines that come and go
      if (now > nextScratch) {
        nextScratch = now + 1500 + Math.random() * 2500;
        if (scratches.length < 2 && Math.random() < 0.8) {
          scratches.push({ x: Math.random() * width, born: now, life: 400 + Math.random() * 800 });
        }
      }
      for (let i = scratches.length - 1; i >= 0; i--) {
        const s = scratches[i];
        if (now - s.born > s.life) {
          scratches.splice(i, 1);
          continue;
        }
        const jx = s.x + (Math.random() - 0.5) * 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(jx, 0);
        ctx.lineTo(jx, height);
        ctx.stroke();
      }

      // occasional dust flicker
      if (now - lastDust > 9000) {
        lastDust = now;
        for (let i = 0; i < 7; i++) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
          ctx.beginPath();
          ctx.arc(Math.random() * width, Math.random() * height, 1 + Math.random() * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // breathing vignette
      const edge = 0.32 + 0.12 * (0.5 + 0.5 * Math.sin((t / 7) * Math.PI * 2));
      const g = ctx.createRadialGradient(
        width / 2, height / 2, Math.min(width, height) * 0.32,
        width / 2, height / 2, Math.max(width, height) * 0.72,
      );
      g.addColorStop(0, 'rgba(0,0,0,0)');
      g.addColorStop(1, `rgba(0,0,0,${edge.toFixed(3)})`);
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

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
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
