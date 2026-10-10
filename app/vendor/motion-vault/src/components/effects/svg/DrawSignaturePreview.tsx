import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const EASE = [0.65, 0, 0.35, 1] as [number, number, number, number];

/** Cursive 'Motion' written as one flowing connected stroke. */
const WORD_PATH =
  'M 24 88 ' +
  'C 30 60 36 34 44 30 C 51 27 51 60 49 88 ' +
  'C 51 72 58 42 67 40 C 74 38 71 70 69 88 ' +
  'C 71 78 79 62 90 62 ' +
  'C 80 62 76 76 84 85 C 91 92 103 86 103 73 C 103 62 95 58 90 62 ' +
  'C 99 64 106 66 112 66 ' +
  'C 122 66 128 44 133 30 C 136 24 132 60 145 86 ' +
  'C 152 80 158 64 167 62 C 172 61 172 74 175 86 ' +
  'C 179 78 184 64 194 62 ' +
  'C 184 62 180 76 188 85 C 195 92 207 86 207 73 C 207 62 199 58 194 62 ' +
  'C 203 64 210 66 216 66 ' +
  'C 224 66 228 74 228 86 C 230 74 236 60 246 60 C 254 60 252 74 254 86 ' +
  'C 260 76 272 62 288 60 C 312 57 336 64 352 80';

/** t-cross + i-dot, drawn near the end of the word. */
const DETAIL_PATHS = ['M 121 54 C 131 50 143 50 153 52', 'M 168 42 C 170 37 175 37 175 42'];

/** Underline flourish that swishes in after the word completes. */
const UNDERLINE_PATH = 'M 42 106 C 130 96 268 96 336 102 C 348 103 354 99 356 92';

const CYCLE_MS = 4200;

/** Effect — a cursive signature draws itself stroke by stroke, then an underline flourish; replays on a loop. */
export default function DrawSignaturePreview() {
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setCycle((c) => c + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-8">
      <svg key={cycle} viewBox="0 0 400 130" className="w-full max-w-[420px]" aria-label="Motion 签名描绘动画">
        <motion.path
          d={WORD_PATH}
          fill="none"
          stroke="#09090B"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: EASE }}
        />
        {DETAIL_PATHS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#09090B"
            strokeWidth={3}
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.25, delay: 1.75 + i * 0.18, ease: 'easeOut' }}
          />
        ))}
        <motion.path
          d={UNDERLINE_PATH}
          fill="none"
          stroke="#09090B"
          strokeWidth={3}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, delay: 2.25, ease: EASE }}
        />
      </svg>
    </div>
  );
}
