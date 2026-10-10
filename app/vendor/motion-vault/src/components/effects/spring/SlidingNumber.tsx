import { useState } from 'react';
import { motion } from 'framer-motion';

const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

/**
 * Sliding number: a 4-digit mono counter where every digit lives in its own
 * 0-9 column (1em window, overflow hidden). Incrementing scrolls each column
 * vertically — old digit slides up out, new one slides up in — settled by a
 * spring (stiffness 300, damping 24) with a 40ms per-digit stagger running
 * from the ones place outward (odometer carry feel). Leading zeros padded.
 */
export default function SlidingNumber() {
  const [value, setValue] = useState(0);
  const digits = String(value % 10000)
    .padStart(4, '0')
    .split('')
    .map(Number);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-8">
      <div
        role="status"
        aria-label={`计数器 ${String(value % 10000).padStart(4, '0')}`}
        className="flex select-none font-mono text-5xl font-medium leading-none tracking-tight text-zinc-950"
      >
        {digits.map((digit, i) => (
          <div key={i} className="h-[1em] w-[0.62em] overflow-hidden">
            <motion.div
              initial={false}
              animate={{ y: `${-digit}em` }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 24,
                delay: (digits.length - 1 - i) * 0.04,
              }}
              className="flex flex-col"
            >
              {DIGITS.map((n) => (
                <span
                  key={n}
                  aria-hidden="true"
                  className="flex h-[1em] w-[0.62em] items-center justify-center leading-none"
                >
                  {n}
                </span>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setValue((v) => v + 1)}
          className="rounded-lg bg-zinc-950 px-5 py-2 font-mono text-sm font-medium text-white transition-transform duration-100 active:scale-95"
        >
          +1
        </button>
        <button
          type="button"
          onClick={() => setValue((v) => v + 10)}
          className="rounded-lg border border-zinc-300 bg-white px-5 py-2 font-mono text-sm font-medium text-zinc-950 transition-colors duration-150 hover:border-zinc-400 active:scale-95"
        >
          +10
        </button>
      </div>
    </div>
  );
}
