import { memo } from 'react';
import { motion } from 'framer-motion';

const POINTS: [number, number][] = [
  [60, 118],
  [108, 82],
  [156, 96],
  [204, 58],
  [252, 36],
];

const LINE_D = `M ${POINTS.map(([x, y]) => `${x} ${y}`).join(' L ')}`;
const AREA_D = `${LINE_D} L 252 145 L 60 145 Z`;
const LINE_MS = 1800;
const LINE_DELAY = 0.2;

/** Dot appears when the growing line reaches its x position. */
function dotDelay(x: number) {
  return LINE_DELAY + ((x - 60) / 192) * (LINE_MS / 1000);
}

/** Infinite pulse ring — isolated + memoized so it never restarts from parent re-renders. */
const PulseRing = memo(function PulseRing({ cx, cy }: { cx: number; cy: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="none"
      stroke="#09090B"
      strokeWidth={1}
      initial={{ r: 5, opacity: 0.45 }}
      animate={{ r: 16, opacity: 0 }}
      transition={{ duration: 1.4, ease: 'easeOut', repeat: Infinity, delay: dotDelay(cx) + 0.35 }}
    />
  );
});

/** Effect — axes draw in, then the polyline grows left→right while dots pop in sync; area fades in after. */
export default function LineChartPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <svg viewBox="0 0 320 180" className="w-full max-w-[360px]" aria-label="折线图生长动画">
        <defs>
          <linearGradient id="lineChartArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#09090B" stopOpacity={0.08} />
            <stop offset="100%" stopColor="#09090B" stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* faint grid */}
        {[115, 80, 45].map((y, i) => (
          <motion.line
            key={y}
            x1={40}
            y1={y}
            x2={292}
            y2={y}
            stroke="#E4E4E7"
            strokeWidth={1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          />
        ))}

        {/* axes draw in (200ms) */}
        <motion.line
          x1={40}
          y1={145}
          x2={292}
          y2={145}
          stroke="#A1A1AA"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />
        <motion.line
          x1={40}
          y1={145}
          x2={40}
          y2={20}
          stroke="#A1A1AA"
          strokeWidth={1}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />

        {/* area fade-in under the line */}
        <motion.path
          d={AREA_D}
          fill="url(#lineChartArea)"
          stroke="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: dotDelay(252), ease: 'easeOut' }}
        />

        {/* polyline grows left → right */}
        <motion.path
          d={LINE_D}
          fill="none"
          stroke="#09090B"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: LINE_MS / 1000, delay: LINE_DELAY, ease: 'easeOut' }}
        />

        {/* data dots pop as the line reaches them */}
        {POINTS.map(([x, y]) => (
          <motion.circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={3.5}
            fill="#FFFFFF"
            stroke="#09090B"
            strokeWidth={2}
            style={{ originX: '50%', originY: '50%' }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 18, delay: dotDelay(x) }}
          />
        ))}

        {/* soft pulse on the last dot */}
        <PulseRing cx={252} cy={36} />
      </svg>
    </div>
  );
}
