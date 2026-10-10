import { useState } from 'react';
import { motion } from 'framer-motion';

const TEXT = 'MotionVault';

/** Effect 02 — letters spring up one by one; hovering the preview replays. */
export default function LetterStaggerPreview() {
  const [cycle, setCycle] = useState(0);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center px-6"
      onMouseEnter={() => setCycle((c) => c + 1)}
    >
      <span
        aria-label={TEXT}
        className="text-[32px] font-semibold tracking-[-0.02em] text-zinc-950"
      >
        {Array.from(TEXT).map((ch, i) => (
          <motion.span
            key={`${cycle}-${i}`}
            className="inline-block will-change-transform"
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: i * 0.04 }}
          >
            {ch}
          </motion.span>
        ))}
      </span>
    </div>
  );
}
