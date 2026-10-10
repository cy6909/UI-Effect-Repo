import { useState } from 'react';
import { motion } from 'framer-motion';

/** Effect — circle outline draws itself, then the check mark, ending with a scale pop and a green tint fade-in. Click to replay. */
export default function DrawCheckPreview() {
  const [runId, setRunId] = useState(0);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        aria-label="重新播放打勾动画"
        onClick={() => setRunId((r) => r + 1)}
        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-zinc-100"
      >
        <svg key={runId} viewBox="0 0 64 64" className="h-16 w-16">
          <motion.g
            style={{ originX: '50%', originY: '50%' }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 0.35, delay: 0.95, times: [0, 0.55, 1], ease: 'easeOut' }}
          >
            {/* green tint fill, fades in at the end */}
            <motion.circle
              cx={32}
              cy={32}
              r={27}
              fill="#16A34A"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.08 }}
              transition={{ duration: 0.4, delay: 0.95, ease: 'easeOut' }}
            />
            {/* circle outline */}
            <motion.circle
              cx={32}
              cy={32}
              r={27}
              fill="none"
              stroke="#09090B"
              strokeWidth={2.5}
              strokeLinecap="round"
              transform="rotate(-90 32 32)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
            />
            {/* check mark */}
            <motion.path
              d="M 21 33 L 28.5 40.5 L 44 24"
              fill="none"
              stroke="#09090B"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.35, delay: 0.6, ease: 'easeOut' }}
            />
          </motion.g>
        </svg>
      </button>
    </div>
  );
}
