import { useState } from 'react';
import { motion, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollShell from './ScrollShell';

const N = 9;
const GAP = 30;
const START_X = 20;
const FALL = 66; // resting tip angle

function Domino({ progress, index }: { progress: MotionValue<number>; index: number }) {
  // each domino starts tipping as the previous one is ~60% through its fall
  const s = 0.05 + index * 0.082;
  const raw = useTransform(progress, [s, s + 0.075], [0, FALL]);
  // snappy spring — the wobble when it slaps onto the next domino
  const rotate = useSpring(raw, { stiffness: 420, damping: 13 });
  return (
    <motion.div
      className="absolute bottom-0 h-16 w-3.5 rounded-[3px] bg-zinc-900"
      style={{
        left: START_X + index * GAP,
        rotate,
        transformOrigin: '100% 100%',
        zIndex: index,
        boxShadow: '-2px 2px 4px rgba(0,0,0,0.12)',
      }}
    >
      <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70" />
    </motion.div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const [fallen, setFallen] = useState(0);
  const [rung, setRung] = useState(false);

  useMotionValueEvent(progress, 'change', (v) => {
    const n = Array.from({ length: N }).filter((_, i) => v > 0.05 + i * 0.082 + 0.04).length;
    setFallen((prev) => (prev === n ? prev : n));
    setRung((prev) => (v > 0.82 ? true : v < 0.5 ? false : prev));
  });

  return (
    <div className="sticky top-0 h-[320px] w-full overflow-hidden">
      {/* counter */}
      <div className="absolute left-4 top-4 rounded-full border border-zinc-200 bg-white/90 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500 shadow-sm">
        已倾倒 <span className="tabular-nums text-zinc-950">{fallen}</span> / {N}
      </div>

      {/* stage */}
      <div className="absolute bottom-16 left-0 right-0 px-4">
        <div className="relative h-16">
          {Array.from({ length: N }).map((_, i) => (
            <Domino key={i} progress={progress} index={i} />
          ))}

          {/* bell at the end of the run */}
          <div
            className="absolute bottom-0"
            style={{ left: START_X + (N - 1) * GAP + 62, zIndex: N }}
          >
            <motion.div
              animate={rung ? { rotate: [-22, 15, -9, 5, 0] } : { rotate: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              style={{ transformOrigin: '50% 0%' }}
              className={cn(
                'flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-300',
                rung ? 'border-amber-300 bg-amber-50 text-amber-500' : 'border-zinc-200 bg-white text-zinc-400',
              )}
            >
              <Bell className="h-4 w-4" strokeWidth={1.8} />
            </motion.div>
            {/* sound ripples */}
            {rung && (
              <>
                {[0, 1].map((i) => (
                  <motion.span
                    key={i}
                    initial={{ scale: 0.5, opacity: 0.7 }}
                    animate={{ scale: 1.9, opacity: 0 }}
                    transition={{ duration: 0.9, delay: i * 0.18, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-0 rounded-full border border-amber-400"
                  />
                ))}
                <motion.span
                  initial={{ scale: 0.6, opacity: 0, y: 4 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 rounded-full bg-zinc-950 px-2 py-0.5 font-mono text-[10px] text-white"
                >
                  叮!
                </motion.span>
              </>
            )}
          </div>
        </div>
        {/* baseline */}
        <div className="h-px w-full bg-zinc-200" />
      </div>

      {/* phase caption */}
      <div className="absolute bottom-3 left-4 rounded-full border border-zinc-200/80 bg-white/85 px-3 py-1 text-[11px] text-zinc-600 shadow-sm backdrop-blur">
        {fallen === 0 && '滚动 · 推倒第一块'}
        {fallen > 0 && fallen < N - 2 && '连锁反应进行中…'}
        {fallen >= N - 2 && fallen < N && '势不可挡'}
        {fallen >= N && '全部倒下 — 铃声为证'}
      </div>
    </div>
  );
}

/**
 * 滚动多米诺 — scroll progress tips a chain of nine dominoes one by one:
 * each springs past its resting angle and slaps the next (stiff 420 spring,
 * overlapping start windows), a live counter tracks 已倾倒 n/9, and the last
 * domino rings a bell with expanding sound ripples and a 叮! pop.
 */
export default function DominoRun() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[1000px]">
          <Scene progress={progress} />
        </div>
      )}
    </ScrollShell>
  );
}
