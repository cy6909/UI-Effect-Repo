import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const HEADLINE = '灵感会发光';
const MAX_SPARKLES = 12;
const SPAWN_INTERVAL = 170;
const AMBER = '#E8B04B';
const ZINC = '#A1A1AA';

type Sparkle = {
  id: number;
  /** % offsets relative to the headline box (may bleed outside) */
  x: number;
  y: number;
  size: number;
  rotate: number;
  color: string;
  /** full lifecycle in seconds (in + twinkle + out) */
  duration: number;
};

function randomSparkle(id: number): Sparkle {
  return {
    id,
    x: -6 + Math.random() * 112,
    y: -45 + Math.random() * 170,
    size: 10 + Math.random() * 12,
    rotate: -30 + Math.random() * 60,
    color: Math.random() < 0.75 ? AMBER : ZINC,
    duration: 0.8 + Math.random() * 0.7,
  };
}

/** Four-point star (pure SVG, no icon lib). */
function Star({ size, color }: { size: number; color: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 0c.85 6.5 5.5 11.15 12 12-6.5.85-11.15 5.5-12 12-.85-6.5-5.5-11.15-12-12C6.5 11.15 11.15 6.5 12 0Z"
        fill={color}
      />
    </svg>
  );
}

/** Effect — tiny 4-point stars continuously spawn, twinkle and fade around the headline. */
export default function SparklesTextPreview() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);
  const idRef = useRef(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      const sparkle = randomSparkle(idRef.current++);
      setSparkles((prev) => (prev.length >= MAX_SPARKLES ? prev : [...prev, sparkle]));
      const timer = window.setTimeout(() => {
        setSparkles((cur) => cur.filter((s) => s.id !== sparkle.id));
      }, sparkle.duration * 1000);
      timersRef.current.push(timer);
    }, SPAWN_INTERVAL);

    return () => {
      window.clearInterval(interval);
      timersRef.current.forEach((t) => window.clearTimeout(t));
      timersRef.current = [];
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <span className="relative inline-block" aria-label={HEADLINE}>
        <span className="text-[40px] font-semibold tracking-[-0.02em] text-zinc-950">
          {HEADLINE}
        </span>
        <AnimatePresence>
          {sparkles.map((s) => (
            <motion.span
              key={s.id}
              aria-hidden
              className="pointer-events-none absolute will-change-transform"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              initial={{ scale: 0, opacity: 0, rotate: s.rotate - 45 }}
              animate={{
                scale: [0, 1.15, 0.9, 1],
                opacity: [0, 1, 0.55, 1],
                rotate: [s.rotate - 45, s.rotate, s.rotate + 18, s.rotate + 28],
                transition: {
                  duration: s.duration * 0.68,
                  times: [0, 0.32, 0.68, 1],
                  ease: 'easeOut',
                },
              }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: s.rotate + 60,
                transition: { duration: Math.max(0.26, s.duration * 0.32), ease: 'easeIn' },
              }}
            >
              <Star size={s.size} color={s.color} />
            </motion.span>
          ))}
        </AnimatePresence>
      </span>
    </div>
  );
}
