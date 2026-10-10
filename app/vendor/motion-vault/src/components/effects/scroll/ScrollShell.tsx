import { useRef } from 'react';
import type { ReactNode, RefObject } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const css = `
.mv-scroll {
  scrollbar-width: thin;
  scrollbar-color: #d4d4d8 transparent;
}
.mv-scroll::-webkit-scrollbar {
  width: 4px;
}
.mv-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.mv-scroll::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 999px;
}
`;

export type ScrollCtx = {
  scrollerRef: RefObject<HTMLDivElement | null>;
  progress: MotionValue<number>;
};

type ScrollShellProps = {
  children: (ctx: ScrollCtx) => ReactNode;
  /** extra classes for the inner scroller (width / background overrides) */
  className?: string;
};

/**
 * Internal-scroll-container pattern shared by every scroll-narrative preview:
 * a 320px overflow-y viewport (page scroll is never hijacked) with a thin
 * custom scrollbar, a scroll-progress hairline pinned to the top, and a
 * "向下滚动" hint pill that fades out as soon as scrolling starts.
 * Children receive the container ref + a 0→1 scrollYProgress MotionValue.
 */
export default function ScrollShell({ children, className }: ScrollShellProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: scrollerRef });
  const hintOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <style>{css}</style>
      <div className="relative flex w-full justify-center">
        <div
          ref={scrollerRef}
          /* Lenis 会在文档级劫持 wheel 事件，导致此容器只能拖滚动条；
             data-lenis-prevent 让滚轮在此容器内恢复原生滚动。 */
          data-lenis-prevent
          className={cn(
            'mv-scroll relative h-[320px] w-[400px] max-w-full overflow-y-auto overscroll-contain rounded-xl border border-zinc-200 bg-white',
            className,
          )}
        >
          <motion.div
            className="sticky top-0 z-40 h-0.5 origin-left bg-zinc-950/80"
            style={{ scaleX: scrollYProgress }}
          />
          {children({ scrollerRef, progress: scrollYProgress })}
        </div>
        <motion.div
          style={{ opacity: hintOpacity }}
          className="pointer-events-none absolute bottom-3 left-1/2 z-40 flex -translate-x-1/2 items-center gap-1.5 rounded-full border border-zinc-200 bg-white/90 px-2.5 py-1 text-[11px] text-zinc-500 shadow-sm backdrop-blur"
        >
          <motion.span
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
            className="flex"
          >
            <ArrowDown className="h-3 w-3" />
          </motion.span>
          向下滚动
        </motion.div>
      </div>
    </div>
  );
}
