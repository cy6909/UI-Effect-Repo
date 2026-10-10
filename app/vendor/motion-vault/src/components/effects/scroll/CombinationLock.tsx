import { useState } from 'react';
import { motion, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import ScrollShell from './ScrollShell';

const CODE = [7, 2, 5];
// dial turns: spin to 7 (1.7 turns), reverse a full turn to 2, back to 5
const TURN_P = [0, 0.22, 0.32, 0.5, 0.6, 0.78, 0.86];
const TURN_DEG = [0, -612, -612, -72, -72, -540, -540];
// digit confirmed once its dwell begins
const CONFIRM_AT = [0.2, 0.48, 0.76];

function Dial({ rotate }: { rotate: MotionValue<number> }) {
  return (
    <div className="relative h-32 w-32">
      {/* fixed marker at 12 o'clock */}
      <div className="absolute left-1/2 top-[-7px] z-10 h-0 w-0 -translate-x-1/2 border-b-[9px] border-l-[5px] border-r-[5px] border-b-zinc-950 border-l-transparent border-r-transparent" />
      <motion.svg viewBox="0 0 128 128" className="h-full w-full" style={{ rotate }}>
        <circle cx="64" cy="64" r="62" fill="#fafafa" stroke="#d4d4d8" strokeWidth="1" />
        {Array.from({ length: 60 }).map((_, i) => {
          const a = (i * 6 * Math.PI) / 180;
          const major = i % 6 === 0;
          const r1 = major ? 50 : 55;
          return (
            <line
              key={i}
              x1={64 + r1 * Math.sin(a)}
              y1={64 - r1 * Math.cos(a)}
              x2={64 + 59 * Math.sin(a)}
              y2={64 - 59 * Math.cos(a)}
              stroke={major ? '#52525b' : '#d4d4d8'}
              strokeWidth={major ? 1.6 : 1}
            />
          );
        })}
        {Array.from({ length: 10 }).map((_, i) => {
          const a = (i * 36 * Math.PI) / 180;
          return (
            <text
              key={i}
              x={64 + 41 * Math.sin(a)}
              y={64 - 41 * Math.cos(a)}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="10"
              fontFamily="ui-monospace, monospace"
              fill="#71717a"
            >
              {i}
            </text>
          );
        })}
        <circle cx="64" cy="64" r="17" fill="#18181b" />
        <circle cx="64" cy="64" r="17" fill="none" stroke="#3f3f46" strokeWidth="1" />
        <circle cx="64" cy="64" r="4" fill="#52525b" />
      </motion.svg>
    </div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const [confirmed, setConfirmed] = useState(0);
  const [open, setOpen] = useState(false);

  const raw = useTransform(progress, TURN_P, TURN_DEG);
  // weighty spring: the dial settles into each detent with a soft overshoot
  const rotate = useSpring(raw, { stiffness: 110, damping: 15 });
  const doorY = useTransform(progress, [0.88, 1], [0, -104]);

  useMotionValueEvent(progress, 'change', (v) => {
    const n = CONFIRM_AT.filter((t) => v >= t).length;
    setConfirmed((prev) => (prev === n ? prev : n));
    setOpen((prev) => (v > 0.92 ? true : v < 0.6 ? false : prev));
  });

  return (
    <div className="sticky top-0 flex h-[320px] w-full items-center justify-center overflow-hidden">
      {/* safe interior, revealed as the door swings open */}
      <div
        className="flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-2xl text-white"
        style={{ perspective: 900 }}
      >
        <div className="absolute flex h-44 w-44 flex-col items-center justify-center gap-2 rounded-2xl bg-zinc-950">
          <FolderOpen className="h-7 w-7 text-zinc-400" strokeWidth={1.5} />
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-zinc-400">
            archive · 1987
          </span>
          <span className="text-xs font-medium text-zinc-200">机密卷宗</span>
          <span
            className={cn(
              'mt-1 rounded-full border border-emerald-300/40 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em] text-emerald-300 transition-opacity duration-500',
              open ? 'opacity-100' : 'opacity-0',
            )}
          >
            unlocked
          </span>
        </div>

        {/* door with the dial */}
        <motion.div
          className="absolute flex h-44 w-44 flex-col items-center justify-center gap-2.5 rounded-2xl border border-zinc-200 bg-zinc-100 shadow-[0_12px_32px_rgba(0,0,0,0.10)]"
          style={{ rotateY: doorY, transformOrigin: 'left center', backfaceVisibility: 'hidden' }}
        >
          <Dial rotate={rotate} />
          {/* combination readout */}
          <div className="flex items-center gap-1.5">
            {CODE.map((d, i) => (
              <span
                key={i}
                className={cn(
                  'flex h-6 w-6 items-center justify-center rounded-md border font-mono text-[11px] transition-all duration-300',
                  i < confirmed
                    ? 'scale-105 border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-300 text-zinc-400',
                )}
              >
                {i < confirmed ? d : '·'}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* phase caption */}
      <div className="absolute bottom-3 left-4 rounded-full border border-zinc-200/80 bg-white/85 px-3 py-1 text-[11px] text-zinc-600 shadow-sm backdrop-blur">
        {confirmed === 0 && '滚动 · 旋转刻度盘'}
        {confirmed === 1 && '第一位确认 — 7'}
        {confirmed === 2 && '第二位确认 — 2'}
        {confirmed === 3 && !open && '第三位确认 — 5'}
        {open && '咔哒 — 保险柜开了'}
      </div>
    </div>
  );
}

/**
 * 滚动密码锁 — scroll drives a safe dial through a three-number combination:
 * the spring-loaded dial spins 1.7 turns to 7, reverses a full turn to 2,
 * settles back on 5, each digit lighting its readout chip; at full scroll the
 * door swings open in 3D to reveal the archive inside.
 */
export default function CombinationLock() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[1100px]">
          <Scene progress={progress} />
        </div>
      )}
    </ScrollShell>
  );
}
