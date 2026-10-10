import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const WORDS = ['灵感', '动效'];
/** one full morph cycle */
const CYCLE_MS = 1800;

/**
 * Effect — two bold 64px words morph into each other through a blur(12px→0)
 * + opacity + scale cross-dissolve; words are absolutely centered so the
 * width difference between them never causes layout shift.
 */
export default function MorphingTextPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % WORDS.length), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center px-6">
      <span
        className="relative flex h-[104px] w-[260px] items-center justify-center"
        aria-label={WORDS[index]}
      >
        <AnimatePresence initial={false}>
          <motion.span
            key={index}
            className="absolute inline-block whitespace-nowrap text-[64px] font-bold leading-none tracking-[-0.02em] text-zinc-950 will-change-transform"
            initial={{ opacity: 0, scale: 1.18, filter: 'blur(12px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            {WORDS[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </div>
  );
}
