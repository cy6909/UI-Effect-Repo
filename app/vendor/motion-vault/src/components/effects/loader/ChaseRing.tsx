import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

/** r = 26 → circumference ≈ 163.36 */
const C = 163.4;

/**
 * 双弧追逐 — two gapped arcs on the same ring spin in opposite directions
 * (1.2s vs 0.9s); the long arc's gap also breathes (dasharray 120↔70), so
 * the short arc forever seems to chase — and almost catch — the long one.
 */
export default function ChaseRing() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const running = inView && !reduced;

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <svg viewBox="0 0 64 64" width={56} height={56} aria-hidden>
        {/* faint track */}
        <circle cx={32} cy={32} r={26} fill="none" stroke="#f4f4f5" strokeWidth={3} />
        {/* long arc, clockwise, breathing gap */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={running ? { rotate: 360 } : undefined}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <motion.circle
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke="#09090b"
            strokeWidth={3}
            strokeLinecap="round"
            animate={running ? { strokeDasharray: [`120 ${C - 120}`, `70 ${C - 70}`, `120 ${C - 120}`] } : { strokeDasharray: `120 ${C - 120}` }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.g>
        {/* short arc, counter-clockwise */}
        <motion.g
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          animate={running ? { rotate: -360 } : undefined}
          transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx={32}
            cy={32}
            r={26}
            fill="none"
            stroke="#a1a1aa"
            strokeWidth={3}
            strokeLinecap="round"
            strokeDasharray={`34 ${C - 34}`}
            strokeDashoffset={-60}
          />
        </motion.g>
      </svg>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        chase ring
      </span>
    </div>
  );
}
