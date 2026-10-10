import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const FILL = 2.4;
const HOLD = 0.8;
const CYCLE = FILL + HOLD + 0.5; // fill + hold + fade-out gap

/**
 * 流光进度 — a 240px hairline track whose fill eases to 100% over 2.4s
 * while a highlight keeps sweeping inside the fill; on completion a small
 * '完成' fades in, holds 0.8s, then the cycle resets.
 */
export default function LoadingBar() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setCycle((c) => c + 1), CYCLE * 1000);
    return () => clearInterval(t);
  }, [inView, reduced]);

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="flex w-[240px] flex-col items-center gap-3">
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-zinc-200">
          {/* fill */}
          <motion.div
            key={cycle}
            className="absolute inset-y-0 left-0 overflow-hidden rounded-full bg-zinc-950"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: FILL, ease: 'easeInOut' }}
          >
            {/* sweeping highlight inside the fill */}
            <motion.span
              className="absolute inset-y-0 w-12"
              style={{
                background:
                  'linear-gradient(100deg, transparent, rgba(255,255,255,0.55), transparent)',
              }}
              animate={reduced ? undefined : { x: [-48, 240] }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />
          </motion.div>
        </div>

        <div className="flex h-4 items-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={cycle}
              className="text-[11px] font-medium text-zinc-950"
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -3 }}
              transition={{ delay: FILL + 0.05, duration: 0.3 }}
            >
              完成
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        loading bar
      </span>
    </div>
  );
}
