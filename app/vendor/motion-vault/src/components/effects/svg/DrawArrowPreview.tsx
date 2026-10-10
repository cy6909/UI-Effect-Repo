import { motion } from 'framer-motion';

/** Hand-drawn wobbly curve from top-left winding down to bottom-right. */
const CURVE_D = 'M 44 42 C 46 96 96 58 146 88 C 196 118 220 84 262 124';
/** Arrowhead at the tip (262,124), two short barbs. */
const HEAD_D = 'M 246 122 L 262 124 L 254 108';

const LOOP = 2.7; // 1.2s draw + 1s hold + 0.5s erase

/**
 * Hand-drawn guide arrow: the curve draws itself in 1.2s (arrowhead joins
 * near the end), holds 1s, then erases backwards in 0.5s — looping forever.
 */
export default function DrawArrowPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center px-6">
      <svg viewBox="0 0 320 180" className="w-full max-w-[360px]" aria-label="手绘引导箭头循环描绘">
        <motion.path
          d={CURVE_D}
          fill="none"
          stroke="#09090B"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 1, 0] }}
          transition={{
            duration: LOOP,
            times: [0, 0.44, 0.81, 1],
            ease: ['easeInOut', 'linear', 'easeInOut'],
            repeat: Infinity,
          }}
        />
        <motion.path
          d={HEAD_D}
          fill="none"
          stroke="#09090B"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 0, 1, 1, 0] }}
          transition={{
            duration: LOOP,
            times: [0, 0.34, 0.44, 0.8, 1],
            ease: ['linear', 'easeOut', 'linear', 'easeIn'],
            repeat: Infinity,
          }}
        />
      </svg>
    </div>
  );
}
