import { useState } from 'react';
import { motion } from 'framer-motion';

const TEXT = 'MotionVault';

/**
 * Effect — hovering a letter springs it up; direct neighbours inherit 15% of
 * the displacement for a rubber-band feel. Springs back on leave.
 */
export default function LetterHoverPreview() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center px-6"
      onMouseLeave={() => setHovered(null)}
    >
      <span
        aria-label={TEXT}
        className="text-[32px] font-semibold tracking-[-0.02em] text-zinc-950"
      >
        {Array.from(TEXT).map((ch, i) => {
          const distance = hovered === null ? Number.POSITIVE_INFINITY : Math.abs(i - hovered);
          const strength = distance === 0 ? 1 : distance === 1 ? 0.15 : 0;
          const direction = i % 2 === 0 ? 1 : -1;
          return (
            <motion.span
              key={`${ch}-${i}`}
              className="inline-block will-change-transform"
              onMouseEnter={() => setHovered(i)}
              animate={{
                scale: 1 + 0.4 * strength,
                y: -8 * strength,
                rotate: direction * 6 * strength,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 15 }}
            >
              {ch}
            </motion.span>
          );
        })}
      </span>
    </div>
  );
}
