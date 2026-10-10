import { useState } from 'react';
import { motion } from 'framer-motion';

const ROW_H = 56;
const DIGITS = Array.from({ length: 10 }, (_, n) => n);

const STATS = [
  { value: '52', label: '收录效果' },
  { value: '07', label: '效果分类' },
  { value: '6', label: '交互方式' },
];

/** One odometer column: a 0-9 strip that springs up to its target digit. */
function DigitStrip({ digit, delay }: { digit: number; delay: number }) {
  return (
    <span className="inline-block overflow-hidden" style={{ height: ROW_H }}>
      <motion.span
        className="flex flex-col will-change-transform"
        initial={{ y: 0 }}
        animate={{ y: -digit * ROW_H }}
        transition={{ type: 'spring', stiffness: 80, damping: 20, delay }}
      >
        {DIGITS.map((n) => (
          <span
            key={n}
            aria-hidden
            className="flex items-center justify-center font-mono text-[44px] font-medium text-zinc-950"
            style={{ height: ROW_H, width: 30 }}
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

/** Effect — odometer digits roll up from 0 on mount (in-view); click anywhere to replay. */
export default function RollingCounterPreview() {
  const [run, setRun] = useState(0);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="滚动数字统计，点击重播"
      onClick={() => setRun((r) => r + 1)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') setRun((r) => r + 1);
      }}
      className="flex h-full w-full cursor-pointer items-center justify-center gap-10 sm:gap-14"
    >
      {STATS.map((stat, si) => (
        <div key={stat.label} className="flex flex-col items-center gap-2.5">
          <div className="flex" aria-label={`${stat.value} ${stat.label}`}>
            {stat.value.split('').map((ch, i) => (
              <DigitStrip key={`${run}-${si}-${i}`} digit={Number(ch)} delay={i * 0.1} />
            ))}
          </div>
          <span className="text-xs text-zinc-400">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
