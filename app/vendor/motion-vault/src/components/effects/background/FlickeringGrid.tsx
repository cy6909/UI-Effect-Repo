import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';

const CELL = 36;
const MAX_ALIVE = 16;

const GRID_BG =
  'linear-gradient(to right, rgba(24,24,27,0.05) 1px, transparent 1px),' +
  'linear-gradient(to bottom, rgba(24,24,27,0.05) 1px, transparent 1px)';

const css = `
.fg-cell {
  animation: fg-pulse var(--dur, 1.5s) ease-in-out both;
  will-change: opacity, transform;
}
@keyframes fg-pulse {
  0%   { opacity: 0; transform: scale(0.7); }
  42%  { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.85); }
}
@media (prefers-reduced-motion: reduce) {
  .fg-cell { animation: none; opacity: 0.15; transform: none; }
}
`;

type Cell = {
  id: number;
  x: number;
  y: number;
  dur: number;
  alpha: number;
  born: number;
};

let seq = 0;

/**
 * A quiet regular grid over which random cells gently light up and fade —
 * distant city lights. Low-frequency state updates (every 420ms, ~16 cells
 * max), each cell plays a one-shot CSS pulse and is then pruned. A centered
 * mock heading proves foreground text stays readable.
 */
export default function FlickeringGrid() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [cells, setCells] = useState<Cell[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect) setSize({ w: rect.width, h: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!size.w || !size.h) return;
    const cols = Math.max(1, Math.floor(size.w / CELL));
    const rows = Math.max(1, Math.floor(size.h / CELL));
    const iv = window.setInterval(() => {
      setCells((prev) => {
        const now = performance.now();
        const alive = prev.filter((c) => now - c.born < c.dur * 1000);
        const next = [...alive];
        const spawn = 1 + Math.floor(Math.random() * 2);
        for (let i = 0; i < spawn && next.length < MAX_ALIVE; i++) {
          next.push({
            id: ++seq,
            x: Math.floor(Math.random() * cols) * CELL,
            y: Math.floor(Math.random() * rows) * CELL,
            dur: 0.9 + Math.random() * 1.6,
            alpha: 0.18 + Math.random() * 0.3,
            born: now,
          });
        }
        return next;
      });
    }, 420);
    return () => window.clearInterval(iv);
  }, [size]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <style>{css}</style>
      {/* base grid lines */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: GRID_BG, backgroundSize: `${CELL}px ${CELL}px` }}
      />
      {/* flickering cells */}
      {cells.map((c) => (
        <span
          key={c.id}
          aria-hidden
          className="fg-cell absolute rounded-[4px]"
          style={
            {
              left: c.x + 3,
              top: c.y + 3,
              width: CELL - 6,
              height: CELL - 6,
              background: `rgba(113,113,122,${c.alpha})`,
              '--dur': `${c.dur}s`,
            } as CSSProperties
          }
        />
      ))}
      {/* mock heading — readability check */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-900">网格明灭</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-zinc-400">
          City Lights
        </span>
      </div>
    </div>
  );
}
