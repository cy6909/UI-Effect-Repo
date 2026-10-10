import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const CYCLE = 1.6;

/**
 * 沙漏翻转 — an hourglass outline (two triangles apex-to-apex) rotates 180°
 * every 1.6s with a spring settle. Inside, the sand: the upper triangle
 * drains (scaleY 1 → 0, origin at the apex) while the lower one fills
 * (scaleY 0 → 1); each flip swaps them, so the cycle restarts seamlessly.
 */
export default function Hourglass() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView || reduced) return;
    const t = setInterval(() => setCycle((c) => c + 1), CYCLE * 1000);
    return () => clearInterval(t);
  }, [inView, reduced]);

  const drain = {
    duration: 1.05,
    delay: 0.45,
    ease: 'easeIn' as const,
  };

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <motion.div
        animate={reduced ? undefined : { rotate: cycle * 180 }}
        transition={{ type: 'spring', stiffness: 160, damping: 15 }}
        className="flex"
      >
        <svg viewBox="0 0 32 36" width={40} height={45} aria-hidden>
          {/* outline: top bulb, bottom bulb, caps */}
          <path
            d="M 5 2 H 27 M 5 34 H 27 M 6 2 L 26 2 L 16 18 Z M 6 34 L 26 34 L 16 18 Z"
            fill="none"
            stroke="#09090b"
            strokeWidth={1.6}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* upper sand: drains toward the apex */}
          <motion.polygon
            key={`top-${cycle}`}
            points="8.5,4.5 23.5,4.5 16,16.5"
            fill="#09090b"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            initial={reduced ? undefined : { scaleY: 1 }}
            animate={reduced ? undefined : { scaleY: 0 }}
            transition={drain}
          />
          {/* lower sand: piles up from the base */}
          <motion.polygon
            key={`bottom-${cycle}`}
            points="8.5,31.5 23.5,31.5 16,19.5"
            fill="#09090b"
            style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
            initial={reduced ? undefined : { scaleY: 0 }}
            animate={reduced ? undefined : { scaleY: 1 }}
            transition={drain}
          />
        </svg>
      </motion.div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        hourglass
      </span>
    </div>
  );
}
