import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Magic UI-style shimmer: a soft 120px-wide light band (white at ~15%
 * opacity) continuously sweeps across a dark zinc-950 pill every 3s,
 * plus a subtle 1px inner highlight ring. Restrained and premium.
 */
const ShimmerBand = memo(function ShimmerBand() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute left-0 top-1/2 h-[220%] w-[120px]"
      style={{ translateY: '-50%' }}
      initial={{ x: -160 }}
      animate={{ x: 360 }}
      transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.8 }}
    >
      <span
        className="block h-full w-full -skew-x-12"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)',
        }}
      />
    </motion.span>
  );
});

export default function ShimmerButton() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        className="relative h-11 overflow-hidden rounded-full bg-zinc-950 px-7 text-sm font-medium text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),inset_0_0_0_1px_rgba(255,255,255,0.08)] transition-colors hover:bg-zinc-900"
      >
        {!reduced && <ShimmerBand />}
        <span className="relative z-10">立即开始</span>
      </button>
    </div>
  );
}
