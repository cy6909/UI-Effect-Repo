import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const SENTENCE = '动效是界面的呼吸，让每一次交互都拥有生命。';
const MASK =
  'radial-gradient(circle 140px at var(--sx) var(--sy), black 0%, black 42%, transparent 100%)';

const TEXT_CLASS =
  'select-none text-center text-[28px] font-medium leading-[1.65] tracking-[-0.01em]';

/** Effect — the sentence lights up only inside a 140px radial mask that follows the pointer via CSS vars (no re-render). */
export default function SpotlightTextPreview() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(false);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--sx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--sy', `${e.clientY - rect.top}px`);
    if (!lit) setLit(true);
  }

  function onPointerLeave() {
    const el = rootRef.current;
    if (!el) return;
    el.style.setProperty('--sx', '-9999px');
    el.style.setProperty('--sy', '-9999px');
  }

  return (
    <div
      ref={rootRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      className="relative flex h-full w-full cursor-crosshair items-center justify-center px-10"
      style={{ ['--sx' as string]: '-9999px', ['--sy' as string]: '-9999px' }}
      aria-label={`${SENTENCE}，移动鼠标照亮文字`}
    >
      <div className="relative max-w-[520px]">
        {/* base layer — faint */}
        <p className={cn(TEXT_CLASS, 'text-zinc-300')}>{SENTENCE}</p>
        {/* lit layer — revealed only inside the pointer mask */}
        <p
          aria-hidden
          className={cn(TEXT_CLASS, 'absolute inset-0 text-zinc-950')}
          style={{ WebkitMaskImage: MASK, maskImage: MASK }}
        >
          {SENTENCE}
        </p>
      </div>
      {/* hint — fades after the first pointer move */}
      <span
        className={cn(
          'pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400 transition-opacity duration-500',
          lit ? 'opacity-0' : 'opacity-100',
        )}
      >
        移动鼠标阅读
      </span>
    </div>
  );
}
