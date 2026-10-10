import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const WORDS = ['DESIGN', 'MOTION', 'CRAFT'];
const COLS = 6;
/** 2s hold + ~1s of ripple/flap time per cycle */
const CYCLE_MS = 3000;

/** One split-flap cell: dark board tile whose letter folds down around a middle hinge. */
function FlapCell({ char, col }: { char: string; col: number }) {
  return (
    <div
      className="relative h-14 w-10 overflow-hidden rounded-md bg-zinc-900"
      style={{ perspective: 400, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), 0 1px 2px rgba(9,9,11,0.18)' }}
    >
      <motion.span
        key={char}
        className="absolute inset-0 flex items-center justify-center font-mono text-2xl font-medium text-white will-change-transform"
        style={{ transformOrigin: '50% 50%', backfaceVisibility: 'hidden' }}
        initial={{ rotateX: -90, opacity: 0.35 }}
        animate={{ rotateX: 0, opacity: 1 }}
        transition={{ duration: 0.45, delay: col * 0.08, ease: [0.2, 0.7, 0.3, 1] }}
      >
        {char === ' ' ? ' ' : char}
      </motion.span>
      {/* subtle flap shading on the upper half */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.07] to-transparent"
      />
      {/* middle hinge line */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/60" />
    </div>
  );
}

/** Effect — airport split-flap board cycling through words with an 80ms per-column ripple. */
export default function SplitFlapPreview() {
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % WORDS.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, []);

  const letters = WORDS[wordIdx].padEnd(COLS, ' ').split('');

  return (
    <div className="flex h-full w-full items-center justify-center" aria-label={`翻牌显示，当前词 ${WORDS[wordIdx]}`}>
      <div className="flex gap-1.5">
        {letters.map((ch, col) => (
          <FlapCell key={`${wordIdx}-${col}`} char={ch} col={col} />
        ))}
      </div>
    </div>
  );
}
