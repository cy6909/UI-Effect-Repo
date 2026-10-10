import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const HOLD_MS = 1200;
const DRAIN_MS = 200;
const RESET_MS = 1500;

type Phase = 'idle' | 'holding' | 'done';

/**
 * Hold-to-confirm (danger action): press and hold — a translucent rose fill
 * sweeps left → right over 1.2s (linear, driven by requestAnimationFrame so
 * early release works). Complete → filled rose '已删除' + check, resets after
 * 1.5s. Release early → the fill drains back over 200ms. No mercy.
 */
export default function HoldConfirm() {
  const [phase, setPhase] = useState<Phase>('idle');
  const fill = useMotionValue(0);
  const rafRef = useRef(0);
  const resetTimerRef = useRef(0);
  const phaseRef = useRef<Phase>('idle');

  const setPhaseSynced = (p: Phase) => {
    phaseRef.current = p;
    setPhase(p);
  };

  const cancelLoop = () => cancelAnimationFrame(rafRef.current);

  const complete = () => {
    cancelLoop();
    fill.set(1);
    setPhaseSynced('done');
    resetTimerRef.current = window.setTimeout(() => {
      setPhaseSynced('idle');
      fill.set(0);
    }, RESET_MS);
  };

  const startHold = () => {
    if (phaseRef.current === 'done') return;
    cancelLoop();
    setPhaseSynced('holding');
    const from = fill.get();
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, from + (now - start) / HOLD_MS);
      fill.set(p);
      if (p >= 1) {
        complete();
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  const release = () => {
    if (phaseRef.current !== 'holding') return;
    cancelLoop();
    setPhaseSynced('idle');
    const from = fill.get();
    if (from <= 0) return;
    // quick drain back to zero — no partial credit
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.max(0, from * (1 - (now - start) / DRAIN_MS));
      fill.set(p);
      if (p > 0) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(
    () => () => {
      cancelAnimationFrame(rafRef.current);
      window.clearTimeout(resetTimerRef.current);
    },
    [],
  );

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        onPointerDown={startHold}
        onPointerUp={release}
        onPointerLeave={release}
        onContextMenu={(e) => e.preventDefault()}
        className={cn(
          'relative h-11 w-40 touch-none select-none overflow-hidden rounded-lg border text-sm font-medium transition-colors duration-200',
          phase === 'done'
            ? 'border-rose-600 bg-rose-600 text-white'
            : 'border-rose-600 text-rose-600 hover:bg-rose-50',
        )}
      >
        {/* hold fill sweep (rAF-driven, transform only) */}
        {phase !== 'done' && (
          <motion.span
            aria-hidden
            className="absolute inset-0 origin-left bg-rose-600/15"
            style={{ scaleX: fill }}
          />
        )}
        <AnimatePresence mode="wait" initial={false}>
          {phase === 'done' ? (
            <motion.span
              key="done"
              className="relative z-10 flex h-full items-center justify-center gap-2"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 420, damping: 16 }}
            >
              <Check className="h-4 w-4" />
              已删除
            </motion.span>
          ) : (
            <motion.span
              key="idle"
              className="relative z-10 flex h-full items-center justify-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
              transition={{ duration: 0.2 }}
            >
              <Trash2 className="h-4 w-4" />
              长按删除
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
