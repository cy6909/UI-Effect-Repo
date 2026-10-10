import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Black button with a diagonal (45deg) white gradient band sweeping across
 * every 3.5s — and once immediately on hover (re-key restarts the sweep).
 */
export default function ShineSweep() {
  const reduced = useReducedMotion();
  const [sweepKey, setSweepKey] = useState(0);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        onMouseEnter={() => setSweepKey((k) => k + 1)}
        className="relative h-11 overflow-hidden rounded-lg bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        {!reduced && (
          <motion.span
            key={sweepKey}
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 h-[220%] w-[40%]"
            style={{ translateY: '-50%' }}
            initial={{ x: '-150%' }}
            animate={{ x: '300%' }}
            transition={{ duration: 0.8, ease: 'easeInOut', repeat: Infinity, repeatDelay: 2.7 }}
          >
            <span
              className="block h-full w-full rotate-45"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) 100%)',
              }}
            />
          </motion.span>
        )}
        <span className="relative z-10">立即下载</span>
      </button>
    </div>
  );
}
