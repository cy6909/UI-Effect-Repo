import { useEffect } from 'react';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

const TARGET = 78;
const R = 52;
const TICKS = Array.from({ length: 24 }, (_, i) => (i * 360) / 24);

/** Effect — progress arc sweeps to 78% while the center mono number springs up; subtle tick ring. */
export default function RingProgressPreview() {
  const progress = useMotionValue(0);
  const display = useTransform(progress, (v) => `${Math.round(v)}%`);

  useEffect(() => {
    const controls = animate(progress, TARGET, { type: 'spring', stiffness: 60, damping: 16, delay: 0.15 });
    return () => controls.stop();
  }, [progress]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[160px] w-[160px]">
        <svg viewBox="0 0 160 160" className="h-full w-full">
          {/* tick marks */}
          {TICKS.map((angle) => (
            <line
              key={angle}
              x1={80 + 66}
              y1={80}
              x2={80 + (angle % 90 === 0 ? 60 : 63)}
              y2={80}
              stroke="#D4D4D8"
              strokeWidth={1}
              transform={`rotate(${angle} 80 80)`}
            />
          ))}
          {/* track */}
          <circle cx={80} cy={80} r={R} fill="none" stroke="#E4E4E7" strokeWidth={6} />
          {/* progress arc */}
          <motion.circle
            cx={80}
            cy={80}
            r={R}
            fill="none"
            stroke="#09090B"
            strokeWidth={6}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: TARGET / 100 }}
            transition={{ duration: 1.6, ease: 'easeOut', delay: 0.15 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span className="font-mono text-2xl font-medium tracking-tight text-zinc-950">
            {display}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
