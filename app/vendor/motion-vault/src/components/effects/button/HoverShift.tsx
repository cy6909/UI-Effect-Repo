import { ArrowRight } from 'lucide-react';

/**
 * On hover the original label slides up and out while a new label (with an
 * arrow) slides in from below through an overflow-hidden window; the fill
 * simultaneously lightens one step (zinc-950 → zinc-800). Both transitions
 * share 0.3s cubic-bezier(0.22,1,0.36,1). Pure CSS group-hover, transform
 * + color only.
 */
export default function HoverShift() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        className="group relative h-11 cursor-pointer overflow-hidden rounded-lg bg-zinc-950 px-8 text-sm font-medium text-white transition-[background-color,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-zinc-800 active:scale-[0.97]"
      >
        <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[180%]">
          开始使用
        </span>
        <span
          aria-hidden
          className="absolute inset-0 flex translate-y-[180%] items-center justify-center gap-1.5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
        >
          进入文档
          <ArrowRight className="h-3.5 w-3.5" />
        </span>
      </button>
    </div>
  );
}
