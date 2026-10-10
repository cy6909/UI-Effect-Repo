import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type BlurFadeInProps = {
  text: string;
  className?: string;
  /** 'auto' splits by spaces when present, otherwise per character */
  split?: 'auto' | 'word' | 'char';
  /** seconds before the first unit starts */
  delay?: number;
  /** seconds between units */
  stagger?: number;
  /** per-unit duration in seconds */
  duration?: number;
  /** restart the whole animation on an interval */
  loop?: boolean;
  loopInterval?: number;
};

export default function BlurFadeIn({
  text,
  className,
  split = 'auto',
  delay = 0,
  stagger = 0.12,
  duration = 0.7,
  loop = false,
  loopInterval = 4200,
}: BlurFadeInProps) {
  const byWord = split === 'word' || (split === 'auto' && text.trim().includes(' '));
  const units = byWord ? text.split(' ').filter(Boolean) : Array.from(text);

  const [cycle, setCycle] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!loop) return;
    intervalRef.current = window.setInterval(() => setCycle((c) => c + 1), loopInterval);
    return () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
    };
  }, [loop, loopInterval]);

  return (
    <span className={className} aria-label={text}>
      {units.map((unit, i) => (
        <motion.span
          key={`${cycle}-${i}`}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, filter: 'blur(8px)', y: 10 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration,
            delay: delay + i * stagger,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
        >
          {unit}
          {byWord && i < units.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </span>
  );
}
