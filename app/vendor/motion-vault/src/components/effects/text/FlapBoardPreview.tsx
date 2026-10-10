import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const WORDS = ['DEPARTED', 'ARRIVALS', 'BOARDING'];
const COLS = 8;
/** word changes every 4s */
const CYCLE_MS = 4000;
/** per-column stagger */
const STAGGER_MS = 60;
/** one full scaleY 1→0→1 flap tween */
const FLIP_MS = 360;
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/';

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
}

/** One flap cell: dark tile whose glyph folds vertically, flashing one random glyph mid-flip. */
const FlapCell = memo(function FlapCell({ char, col, tick }: { char: string; col: number; tick: number }) {
  const [shown, setShown] = useState(char);

  useEffect(() => {
    if (tick === 0) {
      setShown(char);
      return;
    }
    const base = col * STAGGER_MS;
    // flash a random glyph just before the flap bottoms out, then land on the target
    const t1 = window.setTimeout(() => setShown(randomGlyph()), base + FLIP_MS * 0.42);
    const t2 = window.setTimeout(() => setShown(char), base + FLIP_MS * 0.58);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [char, col, tick]);

  return (
    <div
      className="relative h-16 w-11 overflow-hidden rounded-md bg-zinc-900"
      style={{
        perspective: 500,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 2px 4px rgba(0,0,0,0.45)',
      }}
    >
      <motion.span
        key={`${tick}-${col}`}
        className="absolute inset-0 flex items-center justify-center font-mono text-[26px] font-medium text-white will-change-transform"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: [1, 0, 1] }}
        transition={{ duration: FLIP_MS / 1000, times: [0, 0.5, 1], delay: (col * STAGGER_MS) / 1000, ease: 'easeInOut' }}
      >
        {shown}
      </motion.span>
      {/* upper-half flap shading */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent"
      />
      {/* middle hinge line */}
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/70" />
    </div>
  );
});

/** Effect — Vestaboard-style airport flap board: 8-column words flip over one glyph at a time, every 4s. */
export default function FlapBoardPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const timer = window.setInterval(() => setTick((t) => t + 1), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [inView]);

  const word = WORDS[tick % WORDS.length];
  const letters = word.padEnd(COLS, ' ').split('');

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-4" aria-label={`机场翻牌，当前词 ${word}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-500">Flight Board · Gate 07</span>
      <div className="flex gap-1.5">
        {letters.map((ch, col) => (
          <FlapCell key={col} char={ch === ' ' ? '·' : ch} col={col} tick={tick} />
        ))}
      </div>
    </div>
  );
}
