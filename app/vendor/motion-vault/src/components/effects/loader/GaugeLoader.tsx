import { useEffect } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const TICKS = 12;
const CX = 100;
const CY = 100;
const TARGET = 0.72;

/** point on the semicircle: t in [0,1] sweeps left → right over 180° */
function point(t: number, r: number) {
  const a = (-90 + t * 180) * (Math.PI / 180);
  return { x: CX + r * Math.sin(a), y: CY - r * Math.cos(a) };
}

function TickLit({ t, mv }: { t: number; mv: MotionValue<number> }) {
  // strictly increasing input range (never duplicates / negatives beyond [0,0.02])
  const range: [number, number] = t <= 0.02 ? [0, 0.02] : [t - 0.02, t];
  const opacity = useTransform(mv, range, [0, 1], { clamp: true });
  const p1 = point(t, 78);
  const p2 = point(t, 90);
  return (
    <motion.line
      x1={p1.x}
      y1={p1.y}
      x2={p2.x}
      y2={p2.y}
      stroke="#09090b"
      strokeWidth={2.5}
      strokeLinecap="round"
      style={{ opacity }}
    />
  );
}

/**
 * 仪表盘 — a semicircular instrument gauge. The needle springs from 0 to
 * 72% (stiffness 120, damping 14 — visible overshoot before settling),
 * the arc fills with pathLength and the 12 tick marks light up in
 * segments as the needle passes; the mono readout counts in sync.
 */
export default function GaugeLoader() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const mv = useMotionValue(0);

  useEffect(() => {
    if (!inView) {
      mv.set(0);
      return;
    }
    if (reduced) {
      mv.set(TARGET);
      return;
    }
    const control = animate(mv, TARGET, { type: 'spring', stiffness: 120, damping: 14 });
    return () => control.stop();
  }, [inView, reduced, mv]);

  const rotate = useTransform(mv, [0, 1], [-90, 90], { clamp: true });
  const arcFill = useTransform(mv, (v) => Math.min(Math.max(v, 0), 1));
  const percent = useTransform(mv, (v) => `${Math.round(v * 100)}`);

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="relative w-[220px]">
        <svg viewBox="0 0 200 116" className="w-full" aria-hidden>
          {/* arc track + progress */}
          <path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#e4e4e7"
            strokeWidth={3}
            strokeLinecap="round"
          />
          <motion.path
            d="M 10 100 A 90 90 0 0 1 190 100"
            fill="none"
            stroke="#09090b"
            strokeWidth={3}
            strokeLinecap="round"
            style={{ pathLength: arcFill }}
          />
          {/* tick base (unlit) */}
          {Array.from({ length: TICKS }).map((_, i) => {
            const t = i / (TICKS - 1);
            const p1 = point(t, 78);
            const p2 = point(t, 90);
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke="#d4d4d8"
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            );
          })}
          {/* ticks light up as the needle passes */}
          {Array.from({ length: TICKS }).map((_, i) => (
            <TickLit key={i} t={i / (TICKS - 1)} mv={mv} />
          ))}
          {/* needle */}
          <motion.g style={{ rotate, transformOrigin: '100px 100px' }}>
            <line
              x1={CX}
              y1={CY}
              x2={CX}
              y2={34}
              stroke="#09090b"
              strokeWidth={3}
              strokeLinecap="round"
            />
          </motion.g>
          <circle cx={CX} cy={CY} r={5.5} fill="#09090b" />
          <circle cx={CX} cy={CY} r={2} fill="#ffffff" />
        </svg>
        <div className="absolute inset-x-0 top-[46%] flex items-baseline justify-center font-mono">
          <motion.span className="text-[22px] font-semibold tracking-tight text-zinc-950">
            {percent}
          </motion.span>
          <span className="text-[12px] text-zinc-400">%</span>
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        gauge
      </span>
    </div>
  );
}
