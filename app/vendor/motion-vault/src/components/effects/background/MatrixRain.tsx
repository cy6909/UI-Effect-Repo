import { useEffect, useRef } from 'react';

const COL_W = 14; // px per column
const ROW_H = 12; // px per glyph row
const FADE = 0.08; // translucent black per frame -> trail fade speed
const ACTIVE_RATIO = 0.6; // only ~60% of columns ever run
const TRAIL = 14; // rows before a column is considered finished
const GLYPHS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789';

type Column = { active: boolean; y: number; speed: number };

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/**
 * A whisper of the matrix: slow, sparse katakana rain on zinc-950. Tiny 10px
 * glyphs, zinc-500 trails left behind via a translucent-black fade, soft white
 * heads at 80% opacity, 1.5-3 rows/s, only ~60% of columns active.
 */
export default function MatrixRain() {
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
    let rows = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let columns: Column[] = [];

    function resetColumn(c: Column, initial: boolean) {
      c.active = Math.random() < ACTIVE_RATIO;
      c.y = initial ? Math.random() * (rows + TRAIL) - TRAIL : -Math.random() * rows * 0.8;
      c.speed = 1.5 + Math.random() * 1.5; // rows per second
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '10px "JetBrains Mono", ui-monospace, monospace';
      ctx.textBaseline = 'top';
      rows = Math.ceil(height / ROW_H) + 1;
      const count = Math.ceil(width / COL_W);
      columns = Array.from({ length: count }, () => {
        const c: Column = { active: false, y: 0, speed: 2 };
        resetColumn(c, true);
        return c;
      });
      // start from a clean dark base so the fade-fill has something to erase
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);
    }

    let lastT = 0;
    function tick(now: number) {
      const dt = Math.min(0.1, lastT ? (now - lastT) / 1000 : 0.016);
      lastT = now;

      // fade existing glyphs toward the background -> trails
      ctx.fillStyle = `rgba(9, 9, 11, ${FADE})`;
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns.length; i++) {
        const c = columns[i];
        if (!c.active) {
          // idle columns occasionally wake up
          if (Math.random() < 0.002) resetColumn(c, false);
          continue;
        }
        const prevRow = Math.floor(c.y);
        c.y += c.speed * dt;
        const headRow = Math.floor(c.y);

        // only draw when the head crosses into a new row (keeps it SLOW and crisp)
        if (headRow !== prevRow && headRow >= 0 && headRow < rows) {
          const x = i * COL_W + 2;
          const y = headRow * ROW_H;
          // zinc-500 trail glyph one row behind the head
          if (headRow > 0) {
            ctx.fillStyle = 'rgba(113, 113, 122, 0.75)';
            ctx.fillText(randomGlyph(), x, y - ROW_H);
          }
          // soft white head at 80% opacity
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
          ctx.fillText(randomGlyph(), x, y);
        }

        if (headRow - TRAIL > rows) resetColumn(c, false);
      }

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
    <div className="absolute inset-0 overflow-hidden bg-zinc-950">
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      />
      {/* mock page content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-white">字符雨</span>
        <span className="flex h-8 items-center rounded-lg bg-white px-4 text-[13px] font-medium text-zinc-950">
          开始使用
        </span>
      </div>
    </div>
  );
}
