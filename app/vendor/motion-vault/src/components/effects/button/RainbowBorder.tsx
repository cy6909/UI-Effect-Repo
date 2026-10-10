const PASTEL =
  'conic-gradient(from 0deg, #F9A8D4, #FCD34D, #6EE7B7, #7DD3FC, #C4B5FD, #F9A8D4)';

const css = `
.rb-rotor {
  animation: rb-spin 8s linear infinite;
  will-change: transform;
}
@keyframes rb-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .rb-rotor { animation: none; }
}
`;

function SpinLayer({ className }: { className: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="absolute left-1/2 top-1/2 aspect-square w-[240%] -translate-x-1/2 -translate-y-1/2">
        <div className="rb-rotor h-full w-full" style={{ background: PASTEL }} />
      </div>
    </div>
  );
}

/**
 * A slowly rotating pastel rainbow ring around a pure white pill button.
 * Two identical spinners: a crisp one clipped to the 2px ring, and a
 * blurred copy blooming a soft halo just outside it. Saturation is kept
 * pastel-low; the spinner is nested one level below the centering translate
 * so the rotate animation never overrides it.
 */
export default function RainbowBorder() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative rounded-full p-[2px]">
        <style>{css}</style>
        {/* crisp pastel ring */}
        <SpinLayer className="absolute inset-0 overflow-hidden rounded-full" />
        {/* soft halo */}
        <SpinLayer className="absolute -inset-[4px] overflow-hidden rounded-full opacity-60 blur-[7px]" />
        <button
          type="button"
          className="relative rounded-full bg-white px-7 py-2.5 text-sm font-medium text-zinc-900 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.97]"
        >
          彩虹边框
        </button>
      </div>
    </div>
  );
}
