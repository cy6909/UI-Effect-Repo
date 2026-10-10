const css = `
.pb-ring {
  position: absolute;
  inset: 0;
  border-radius: 0.5rem;
  border: 1.5px solid rgba(113, 113, 122, 0.55);
  pointer-events: none;
  animation: pb-pulse 2s cubic-bezier(0.16, 1, 0.3, 1) var(--delay, 0s) infinite;
  will-change: transform, opacity;
}
@keyframes pb-pulse {
  0%   { transform: scale(1); opacity: 0.5; }
  100% { transform: scale(1.8); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .pb-ring { animation: none; opacity: 0; }
}
`;

/**
 * Two pulse rings expand outward from the button on a 2s loop, staggered
 * 1s apart (scale 1 → 1.8, opacity 0.5 → 0) — a sonar-like call for
 * attention. The button itself stays perfectly still; the contrast does
 * the work. Transform + opacity only.
 */
export default function PulseButton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <style>{css}</style>
      <div className="relative">
        <span aria-hidden className="pb-ring" style={{ '--delay': '0s' } as React.CSSProperties} />
        <span aria-hidden className="pb-ring" style={{ '--delay': '1s' } as React.CSSProperties} />
        <button
          type="button"
          className="relative h-11 cursor-pointer rounded-lg bg-zinc-950 px-8 text-sm font-medium text-white transition-colors duration-200 hover:bg-zinc-800 active:scale-[0.97]"
        >
          立即订阅
        </button>
      </div>
    </div>
  );
}
