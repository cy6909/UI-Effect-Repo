import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const TEXT = '极光掠过字句';

/** Low-saturation aurora palette, wrapped back to the first stop for a seamless drift. */
const GRADIENT =
  'linear-gradient(90deg, #7DD3C0 0%, #93C5E8 25%, #C4B5E8 50%, #E8B4C8 75%, #7DD3C0 100%)';

const gradientText: CSSProperties = {
  backgroundImage: GRADIENT,
  backgroundSize: '300% 300%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as CSSProperties;

const drift = {
  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
};

const driftTransition = {
  duration: 8,
  ease: 'easeInOut' as const,
  repeat: Number.POSITIVE_INFINITY,
};

/** Effect — large gradient text with a slowly drifting aurora wash + a faint blur-glow behind. */
export default function AuroraTextPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <span className="relative inline-block" aria-label={TEXT}>
        {/* barely-visible blur-glow copy */}
        <motion.span
          aria-hidden
          className="absolute inset-0 select-none text-[40px] font-semibold tracking-[-0.02em] opacity-20 blur-md"
          style={gradientText}
          animate={drift}
          transition={driftTransition}
        >
          {TEXT}
        </motion.span>
        <motion.span
          className="relative text-[40px] font-semibold tracking-[-0.02em]"
          style={gradientText}
          animate={drift}
          transition={driftTransition}
        >
          {TEXT}
        </motion.span>
      </span>
    </div>
  );
}
