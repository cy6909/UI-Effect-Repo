import { useRef } from 'react';

/**
 * Magic UI Magic Card: a soft radial glow hugs the card's inner border and
 * follows the cursor — like light grazing the inside of the frame. Driven
 * purely by CSS custom properties (el.style.setProperty), zero setState in
 * the pointer path.
 */
export default function MagicCard() {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div className="flex h-full w-full items-center justify-center">
      {/* outer shell: 1px padding paints the glowing border ring */}
      <div
        ref={ref}
        onPointerMove={(e) => {
          const el = ref.current;
          if (!el) return;
          const b = el.getBoundingClientRect();
          el.style.setProperty('--mouse-x', `${e.clientX - b.left}px`);
          el.style.setProperty('--mouse-y', `${e.clientY - b.top}px`);
        }}
        className="relative h-48 w-80 max-w-full rounded-xl p-px"
        style={{
          background:
            'radial-gradient(240px circle at var(--mouse-x, 50%) var(--mouse-y, -80px), rgba(161,161,170,0.55), transparent 70%), #E4E4E7',
        }}
      >
        <div className="relative h-full w-full overflow-hidden rounded-[11px] bg-white">
          {/* inner glow wash following the same CSS vars (inherited) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(280px circle at var(--mouse-x, 50%) var(--mouse-y, -80px), rgba(161,161,170,0.14), transparent 65%)',
            }}
          />
          <div className="relative flex h-full flex-col justify-between p-5">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
              magic / border
            </span>
            <div>
              <div className="text-sm font-semibold text-zinc-950">Magic Card</div>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
                移动鼠标，光晕沿着边框内侧游走，
                <br />
                像一束贴着轮廓的柔光。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
