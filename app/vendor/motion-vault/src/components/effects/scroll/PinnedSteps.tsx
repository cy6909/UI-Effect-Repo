import { useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';
import { cn } from '@/lib/utils';

const steps = [
  { id: '01', word: 'DRAFT', title: '构思脚本', text: '先写下叙事的三个节拍。', accent: '#8FA391' },
  { id: '02', word: 'BIND', title: '绑定滚动', text: '让滚动进度驱动每次切换。', accent: '#C2B280' },
  { id: '03', word: 'SHIP', title: '交付体验', text: '克制的动效才最耐看。', accent: '#71717A' },
];

function Scene({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);

  useMotionValueEvent(progress, 'change', (v) => {
    const next = Math.min(steps.length - 1, Math.max(0, Math.floor(v * steps.length)));
    setActive((prev) => (prev === next ? prev : next));
  });

  // right column pauses on each step, then glides to the next
  const colY = useTransform(
    progress,
    [0, 0.26, 0.4, 0.6, 0.74, 1],
    [124, 124, 52, 52, -20, -20],
  );

  return (
    <div className="relative" style={{ height: 1120 }}>
      <div className="sticky top-0 flex h-[320px] items-center gap-5 overflow-hidden px-5">
        {/* left: morphing mock UI card (300ms crossfade at thresholds) */}
        <div className="relative h-[180px] flex-1">
          {steps.map((s, i) => (
            <motion.div
              key={s.id}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: active === i ? 1 : 0, scale: active === i ? 1 : 0.97 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              <div className="flex h-full flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_10px_30px_-16px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-zinc-200" />
                    <span className="h-2 w-2 rounded-full bg-zinc-200" />
                    <span className="h-2 w-2 rounded-full" style={{ background: s.accent }} />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400">{s.id} / 03</span>
                </div>
                <div className="flex flex-1 flex-col items-start justify-center">
                  <span className="font-mono text-2xl font-semibold tracking-[0.08em] text-zinc-900">
                    {s.word}
                  </span>
                  <div className="mt-3 h-1.5 w-24 rounded-full" style={{ background: s.accent }} />
                  <div className="mt-2 h-1.5 w-16 rounded-full bg-zinc-200" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* right: step descriptions gliding past */}
        <div className="relative h-full w-[38%] overflow-hidden">
          <motion.div style={{ y: colY }} className="flex flex-col">
            {steps.map((s, i) => (
              <div key={s.id} className="flex h-[72px] flex-col justify-center">
                <div
                  className={cn(
                    'text-[13px] font-semibold transition-colors duration-300',
                    active === i ? 'text-zinc-950' : 'text-zinc-300',
                  )}
                >
                  {s.title}
                </div>
                <p
                  className={cn(
                    'mt-1 text-xs leading-relaxed transition-colors duration-300',
                    active === i ? 'text-zinc-500' : 'text-zinc-300',
                  )}
                >
                  {s.text}
                </p>
              </div>
            ))}
          </motion.div>

          {/* edge indicator dots */}
          <div className="absolute right-0.5 top-1/2 flex -translate-y-1/2 flex-col gap-2">
            {steps.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-all duration-300',
                  active === i ? 'scale-125 bg-zinc-950' : 'bg-zinc-300',
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * 钉住步骤切换 — a 3.5× track pins a split panel: the left mock UI card
 * crossfades (300ms) between three variants at scroll thresholds while the
 * right step list glides past, the active step inked zinc-950. Step index
 * is derived from scrollYProgress (low-frequency state, threshold-only
 * re-renders); the column glide stays a pure MotionValue binding.
 */
export default function PinnedSteps() {
  return (
    <ScrollShell className="w-[min(92%,480px)]">
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
