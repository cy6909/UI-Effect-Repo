import { useRef } from 'react';

const DOT_BASE =
  'radial-gradient(circle, #E4E4E7 1px, transparent 1px)'; // zinc-200
const DOT_TOP =
  'radial-gradient(circle, #27272A 1.4px, transparent 1.4px)'; // zinc-800, slightly larger = subtle scale-up

/**
 * Linear-style spotlight grid: a light dot grid with a darker layer revealed
 * through a radial-gradient mask that follows the pointer via CSS variables.
 */
export default function SpotlightGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }

  function onPointerLeave() {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--x', '-9999px');
    el.style.setProperty('--y', '-9999px');
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden bg-white"
      style={{ ['--x' as string]: '-9999px', ['--y' as string]: '-9999px' }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {/* base grid layer (zinc-200 dots at intersections, 28px spacing) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: DOT_BASE, backgroundSize: '28px 28px' }}
      />
      {/* darker layer (zinc-800) revealed through a 180px radial mask at the pointer */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: DOT_TOP,
          backgroundSize: '28px 28px',
          WebkitMaskImage:
            'radial-gradient(circle 180px at var(--x) var(--y), black 0%, transparent 100%)',
          maskImage:
            'radial-gradient(circle 180px at var(--x) var(--y), black 0%, transparent 100%)',
        }}
      />
      {/* mock page content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">鼠标点亮网格</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
