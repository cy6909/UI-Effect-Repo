import { useState } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import ScrollShell from './ScrollShell';

const CHAPTERS = [
  { num: '壹', title: '起点', text: '故事从一个很小的决定开始。' },
  { num: '贰', title: '跋涉', text: '中段总是最长的，也最值得。' },
  { num: '叁', title: '转折', text: '某个瞬间，方向悄悄改变。' },
  { num: '肆', title: '抵达', text: '结尾不是结束，是下一次滚动。' },
];

function Column({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => {
    const idx = v < 0.28 ? 0 : v < 0.52 ? 1 : v < 0.76 ? 2 : 3;
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <div className="relative h-[880px]">
      {/* sticky indicator rail */}
      <div className="pointer-events-none sticky top-0 z-10 h-0 w-full">
        <div className="absolute left-6 top-5 flex flex-col items-center">
          {/* vertical progress line */}
          <div className="relative h-[280px] w-px bg-zinc-200">
            <motion.div
              className="absolute inset-0 origin-top bg-zinc-950"
              style={{ scaleY: progress }}
            />
          </div>
          {/* chapter markers overlaying the line */}
          <div className="absolute inset-0 flex flex-col items-center justify-between py-1">
            {CHAPTERS.map((ch, i) => (
              <span
                key={ch.num}
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-full border bg-white font-medium transition-all duration-300',
                  i === active
                    ? 'scale-125 border-zinc-950 text-[13px] text-zinc-950'
                    : 'border-zinc-200 text-[11px] text-zinc-300',
                )}
              >
                {ch.num}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* chapter content */}
      <div className="space-y-16 pb-10 pl-24 pr-7 pt-12">
        {CHAPTERS.map((ch, i) => (
          <section key={ch.num} className="space-y-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Chapter {String(i + 1).padStart(2, '0')}
            </span>
            <h3
              className={cn(
                'text-[19px] font-semibold tracking-tight transition-colors duration-300',
                i === active ? 'text-zinc-950' : 'text-zinc-300',
              )}
            >
              {ch.title}
            </h3>
            <p className="text-[13px] leading-relaxed text-zinc-500">{ch.text}</p>
            <div className="space-y-2 pt-1">
              <div className="h-2 w-full rounded-full bg-zinc-100" />
              <div className="h-2 w-5/6 rounded-full bg-zinc-100" />
              <div className="h-2 w-2/3 rounded-full bg-zinc-100" />
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

/**
 * 章节进度 — a sticky vertical rail of 壹/贰/叁/肆 markers: the active
 * chapter scales up and inks zinc-950 (the rest stay zinc-300), and a 1px
 * progress line grows down the rail in sync with scrollYProgress.
 */
export default function ChapterProgress() {
  return <ScrollShell>{({ progress }) => <Column progress={progress} />}</ScrollShell>;
}
