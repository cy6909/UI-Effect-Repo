import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

const TEXT = '极光流动';

/**
 * Low-saturation teal → blue → violet wash, wrapped back to the first stop
 * so a linear 300% background-position sweep loops seamlessly every 6s.
 */
const GRADIENT =
  'linear-gradient(90deg, #8ED4C4 0%, #9DC3E6 33%, #BFB0E4 66%, #8ED4C4 100%)';

const gradientText: CSSProperties = {
  backgroundImage: GRADIENT,
  backgroundSize: '300% 100%',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
} as CSSProperties;

const flow = { backgroundPosition: ['0% 50%', '300% 50%'] };
const flowTransition = {
  duration: 6,
  ease: 'linear' as const,
  repeat: Number.POSITIVE_INFINITY,
};

/** Effect — aurora-filled headline next to a plain muted comparison line. */
export default function AuroraFlowPreview() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5 px-6">
      <motion.span
        className="text-[44px] font-bold leading-none tracking-[-0.02em]"
        style={gradientText}
        animate={flow}
        transition={flowTransition}
        aria-label={TEXT}
      >
        {TEXT}
      </motion.span>
      <span className="flex items-baseline gap-3">
        <span className="text-sm text-zinc-400">同一句话，静态灰的对照</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-300">
          Static · Zinc-400
        </span>
      </span>
    </div>
  );
}
