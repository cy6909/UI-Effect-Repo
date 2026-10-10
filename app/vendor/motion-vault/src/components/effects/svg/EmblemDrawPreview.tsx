import { useState } from 'react';
import { motion } from 'framer-motion';

const DRAW = 0.5; // each segment draws in 500ms
const STEP = 0.42; // stagger step between segments

const strokeProps = {
  fill: 'none',
  stroke: '#09090B',
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function drawTransition(delay: number) {
  return { duration: DRAW, delay, ease: 'easeInOut' as const };
}

/**
 * Emblem draw: a small badge (outer ring, mountain, sun, bottom wave) whose
 * four segments draw in with a progressive stagger, then the whole badge
 * breathes softly. Click anywhere to replay.
 */
export default function EmblemDrawPreview() {
  const [runId, setRunId] = useState(0);

  return (
    <button
      type="button"
      onClick={() => setRunId((n) => n + 1)}
      className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-3"
      aria-label="重播徽章描绘动画"
    >
      <svg key={runId} viewBox="0 0 120 120" className="h-36 w-36" aria-hidden>
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{
            duration: 2.6,
            ease: 'easeInOut',
            repeat: Infinity,
            delay: STEP * 3 + DRAW + 0.2,
          }}
        >
          {/* 1. outer ring */}
          <motion.circle
            cx={60}
            cy={60}
            r={40}
            {...strokeProps}
            transform="rotate(-90 60 60)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(0)}
          />
          {/* 2. mountain */}
          <motion.path
            d="M 34 80 L 50 54 L 60 68 L 68 58 L 86 80"
            {...strokeProps}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(STEP)}
          />
          {/* 3. sun */}
          <motion.circle
            cx={78}
            cy={42}
            r={5.5}
            {...strokeProps}
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(STEP * 2)}
          />
          {/* 4. bottom wave */}
          <motion.path
            d="M 36 92 Q 44 86 52 92 T 68 92 T 84 92"
            {...strokeProps}
            strokeWidth={2}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={drawTransition(STEP * 3)}
          />
        </motion.g>
      </svg>
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-zinc-400">
        Replay ↻
      </span>
    </button>
  );
}
