import { useState } from 'react';
import { motion } from 'framer-motion';

const TEXT_PROPS = {
  x: 160,
  y: 94,
  textAnchor: 'middle' as const,
  fontSize: 62,
  fontWeight: 700,
  letterSpacing: '0.06em',
  style: { fontFamily: 'Inter, sans-serif' },
};

/**
 * Stroke hover (Aceternity Text Hover): big 'STROKE' sits as a pale thin
 * outline; on hover a low-saturation gradient highlight sweeps along the
 * glyph strokes (via a soft-edged mask rect) while the fill briefly lights
 * up, then settles back to the quiet outline.
 */
export default function StrokeHoverPreview() {
  const [runId, setRunId] = useState(0);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setRunId((n) => n + 1)}
    >
      <svg viewBox="0 0 320 140" className="w-full max-w-[340px] select-none" aria-label="描边文字点亮动画">
        <defs>
          <linearGradient id="strokeHoverGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A1A1AA" stopOpacity={0} />
            <stop offset="42%" stopColor="#71717A" />
            <stop offset="55%" stopColor="#18181B" />
            <stop offset="68%" stopColor="#71717A" />
            <stop offset="100%" stopColor="#A1A1AA" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="strokeHoverMaskGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0} />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity={0} />
          </linearGradient>
          <mask id="strokeHoverMask">
            <motion.rect
              key={runId}
              y={0}
              width={110}
              height={140}
              fill="url(#strokeHoverMaskGrad)"
              initial={{ x: -120 }}
              animate={{ x: 330 }}
              transition={{ duration: 1.15, ease: 'easeInOut' }}
            />
          </mask>
        </defs>

        {/* resting pale outline */}
        <text {...TEXT_PROPS} fill="none" stroke="#D4D4D8" strokeWidth={1}>
          STROKE
        </text>

        {/* gradient highlight sweeping along the strokes */}
        <g mask="url(#strokeHoverMask)">
          <text {...TEXT_PROPS} fill="none" stroke="url(#strokeHoverGrad)" strokeWidth={2.2}>
            STROKE
          </text>
        </g>

        {/* brief fill flash, settling to a faint tint */}
        <motion.text
          key={`fill-${runId}`}
          {...TEXT_PROPS}
          fill="#18181B"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.12] }}
          transition={{ duration: 1.15, times: [0, 0.55, 1], ease: 'easeInOut' }}
        >
          STROKE
        </motion.text>
      </svg>
    </div>
  );
}
