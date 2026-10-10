import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const STEPS = ['校验数据', '建立连接', '同步资源', '完成'];
const STEP_MS = 900;
const HOLD_MS = 1000;

type StepState = 'pending' | 'active' | 'done';

function StepRow({ label, state }: { label: string; state: StepState }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        {state === 'done' ? (
          <motion.span
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <motion.path
                d="M2 5.2l2 2L8 3"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: 0.06 }}
              />
            </svg>
          </motion.span>
        ) : state === 'active' ? (
          <motion.span
            className="h-2 w-2 rounded-full bg-zinc-950"
            animate={{ scale: [1, 1.4, 1], opacity: [1, 0.55, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <span className="h-2 w-2 rounded-full bg-zinc-300" />
        )}
      </span>
      <span
        className={cn(
          'text-[13px] transition-colors duration-300',
          state === 'active' && 'font-medium text-zinc-950',
          state === 'done' && 'text-zinc-600',
          state === 'pending' && 'text-zinc-400',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'ml-auto font-mono text-[10px] uppercase tracking-[0.12em] transition-colors duration-300',
          state === 'active' ? 'text-zinc-500' : 'text-zinc-300',
        )}
      >
        {state === 'active' ? 'running' : state === 'done' ? 'done' : 'wait'}
      </span>
    </div>
  );
}

/**
 * 多步加载 — four steps advance every 900ms: the current row lights up
 * (zinc-400 → zinc-950) while finished rows draw a check (pathLength).
 * After the last step it holds 1s, then resets and loops. The timer is
 * gated by IntersectionObserver and resets when scrolled out.
 */
export default function MultiStepLoader() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const [step, setStep] = useState(0); // 0..STEPS.length; === length means all done

  useEffect(() => {
    if (reduced) return;
    if (!inView) {
      setStep(0);
      return;
    }
    const delay = step >= STEPS.length ? HOLD_MS : STEP_MS;
    const id = window.setTimeout(() => setStep((s) => (s >= STEPS.length ? 0 : s + 1)), delay);
    return () => window.clearTimeout(id);
  }, [inView, step, reduced]);

  const shownStep = reduced ? STEPS.length : step;

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="w-64 rounded-xl border border-zinc-200 bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
            loading sequence
          </span>
          <span className="font-mono text-[10px] text-zinc-400">
            {Math.min(shownStep + 1, STEPS.length)}/{STEPS.length}
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {STEPS.map((label, i) => (
            <StepRow
              key={label}
              label={label}
              state={i < shownStep ? 'done' : i === shownStep ? 'active' : 'pending'}
            />
          ))}
        </div>
        <div className="mt-4 h-0.5 overflow-hidden rounded-full bg-zinc-100">
          <motion.div
            className="h-full origin-left bg-zinc-950"
            initial={false}
            animate={{ scaleX: shownStep / STEPS.length }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        multi-step
      </span>
    </div>
  );
}
