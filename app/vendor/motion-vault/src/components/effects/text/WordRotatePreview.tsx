import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const WORDS = ['动感', '节奏', '生命力', '惊喜'];
const INTERVAL_MS = 2200;

/** Effect 06 — one slot in a fixed sentence rotates through words; click advances immediately. */
export default function WordRotatePreview() {
  const [index, setIndex] = useState(0);
  const advance = () => setIndex((i) => (i + 1) % WORDS.length);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center px-6"
      onClick={advance}
    >
      <span className="flex items-baseline text-[28px] font-semibold tracking-[-0.01em] text-zinc-950">
        为界面注入
        <span className="relative ml-2 inline-block h-[1.4em] w-[3.4em] overflow-hidden align-baseline">
          <AnimatePresence initial={false}>
            <motion.span
              key={index}
              className="absolute left-0 top-[0.14em] inline-block will-change-transform"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {WORDS[index]}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
    </div>
  );
}
