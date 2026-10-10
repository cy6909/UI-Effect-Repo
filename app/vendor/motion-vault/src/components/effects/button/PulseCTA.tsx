import { memo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * Breathing halo: two soft rings (1.5px zinc-400) continuously emanate
 * outward from a black pill button's edge — scale 1 → 1.5 while fading
 * opacity 0.6 → 0 over 2.2s; the second ring is delayed 1.1s. Calm,
 * attention-guiding pulse. Transform/opacity only.
 */
const PulseRing = memo(function PulseRing({ delay }: { delay: number }) {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-0 rounded-full border-[1.5px] border-zinc-400"
      initial={{ scale: 1, opacity: 0 }}
      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
      transition={{ duration: 2.2, ease: 'easeOut', repeat: Infinity, delay }}
    />
  );
});

export default function PulseCTA() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        {!reduced && (
          <>
            <PulseRing delay={0} />
            <PulseRing delay={1.1} />
          </>
        )}
        <button
          type="button"
          className="relative h-11 rounded-full bg-zinc-950 px-7 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          开始免费试用
        </button>
      </div>
    </div>
  );
}
