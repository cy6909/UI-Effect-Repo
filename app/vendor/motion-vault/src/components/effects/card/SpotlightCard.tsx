import { useRef } from 'react';
import type { PointerEvent } from 'react';

/**
 * Dark card with a radial-gradient spotlight that follows the cursor.
 * Cursor position is written to CSS custom properties --x/--y directly on the
 * element (no state, no re-render on pointermove).
 */
export default function SpotlightCard() {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-zinc-950">
      <div
        ref={ref}
        onPointerMove={onMove}
        className="group relative h-44 w-72 cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900"
      >
        {/* spotlight wash */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.08), transparent 100%)',
          }}
        />
        {/* border brightening near cursor — gradient masked to the 1px ring */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl p-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(180px circle at var(--x, 50%) var(--y, 50%), rgba(255,255,255,0.4), transparent 100%)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        {/* content */}
        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="h-2 w-10 rounded-full bg-white/80" />
          <div>
            <div className="text-sm font-semibold text-zinc-50">Spotlight</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              move to reveal
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
