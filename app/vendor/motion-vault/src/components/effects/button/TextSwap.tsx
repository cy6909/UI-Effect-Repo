/**
 * Text swap: outlined button whose label slides up and out on hover while
 * a second label slides up in from below (280ms cubic-bezier(0.22,1,0.36,1));
 * reverses on leave. Crisp typographic micro-interaction, transform only.
 */
export default function TextSwap() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        className="group h-11 rounded-lg border border-zinc-950 bg-white px-6 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50"
      >
        <span className="block h-5 overflow-hidden leading-5">
          <span className="block transition-transform duration-[280ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-1/2">
            <span className="block">了解更多</span>
            <span className="block">免费试用 →</span>
          </span>
        </span>
      </button>
    </div>
  );
}
