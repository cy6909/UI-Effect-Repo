import { useEffect, useState } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';

const GLYPHS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789#$%&@*+=<>/';
const COLS = 46;
const ROWS = 14;

function randomMatrix(): string {
  let out = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    }
    if (r < ROWS - 1) out += '\n';
  }
  return out;
}

const matrixText =
  'whitespace-pre break-all font-mono text-[10px] leading-[14px] tracking-[2px] select-none';

/**
 * Evervault-style encrypted matrix: a field of random mono glyphs, with a
 * circular region around the cursor "lit up" (zinc-950, freshly re-rolled
 * glyphs) via a MotionValue-driven radial mask — no setState on pointermove.
 */
export default function EvervaultCard() {
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const mask = useMotionTemplate`radial-gradient(130px circle at ${mx}px ${my}px, black 25%, transparent 100%)`;

  const [base, setBase] = useState(randomMatrix);
  const [lit, setLit] = useState(randomMatrix);

  // slow re-roll of the dim field; faster re-roll of the lit field
  useEffect(() => {
    const slow = window.setInterval(() => setBase(randomMatrix()), 2600);
    const fast = window.setInterval(() => setLit(randomMatrix()), 140);
    return () => {
      window.clearInterval(slow);
      window.clearInterval(fast);
    };
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        onPointerMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - b.left);
          my.set(e.clientY - b.top);
        }}
        onPointerLeave={() => {
          mx.set(-400);
          my.set(-400);
        }}
        className="relative h-[220px] w-[340px] max-w-full cursor-crosshair overflow-hidden rounded-xl border border-zinc-200 bg-white"
      >
        {/* dim base matrix */}
        <pre aria-hidden className={`${matrixText} absolute inset-0 p-3 text-zinc-300`}>
          {base}
        </pre>
        {/* lit matrix revealed by the cursor mask */}
        <motion.pre
          aria-hidden
          style={{ maskImage: mask, WebkitMaskImage: mask }}
          className={`${matrixText} absolute inset-0 p-3 font-medium text-zinc-950`}
        >
          {lit}
        </motion.pre>

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-zinc-200 bg-white/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 backdrop-blur-sm">
            encrypted
          </span>
        </div>
      </div>
    </div>
  );
}
