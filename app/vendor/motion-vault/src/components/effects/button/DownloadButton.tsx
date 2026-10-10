import { useEffect, useState } from 'react';
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from 'framer-motion';
import { Check, Download } from 'lucide-react';

type Phase = 'idle' | 'loading' | 'done';

const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/**
 * Download morph: click turns the pill into a progress track (width stays),
 * the fill bar grows 0 → 100% over 2s with a fast-start/slow-end ease while
 * a percentage counts up; at 100% it flips to a green check + '已完成'
 * (scale pop), then quietly resets after 1.6s. Locked while running.
 */
export default function DownloadButton() {
  const [phase, setPhase] = useState<Phase>('idle');
  const progress = useMotionValue(0);
  const scaleX = useTransform(progress, [0, 100], [0, 1]);
  const percent = useTransform(progress, (v) => `${Math.round(v)}%`);

  // run the 2s progress tween
  useEffect(() => {
    if (phase !== 'loading') return;
    progress.set(0);
    const controls = animate(progress, 100, {
      duration: 2,
      ease: EASE_OUT,
      onComplete: () => setPhase('done'),
    });
    return () => controls.stop();
  }, [phase, progress]);

  // auto-reset after the done state
  useEffect(() => {
    if (phase !== 'done') return;
    const t = window.setTimeout(() => setPhase('idle'), 1600);
    return () => window.clearTimeout(t);
  }, [phase]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.button
        type="button"
        disabled={phase !== 'idle'}
        onClick={() => setPhase('loading')}
        animate={{
          backgroundColor:
            phase === 'done' ? '#16A34A' : phase === 'loading' ? '#E4E4E7' : '#09090B',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="relative h-11 w-44 overflow-hidden rounded-full text-sm font-medium text-white disabled:cursor-default"
      >
        {/* progress fill (transform only) */}
        <AnimatePresence>
          {phase === 'loading' && (
            <motion.span
              aria-hidden
              className="absolute inset-0 origin-left bg-zinc-950"
              style={{ scaleX }}
              exit={{ opacity: 0, transition: { duration: 0.25 } }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          {phase === 'idle' && (
            <motion.span
              key="idle"
              className="relative z-10 flex h-full items-center justify-center gap-2"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <Download className="h-4 w-4" />
              下载文件
            </motion.span>
          )}
          {phase === 'loading' && (
            <motion.span
              key="loading"
              className="relative z-10 flex h-full items-center justify-center"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
            >
              <motion.span className="font-mono text-xs text-white mix-blend-difference">
                {percent}
              </motion.span>
            </motion.span>
          )}
          {phase === 'done' && (
            <motion.span
              key="done"
              className="relative z-10 flex h-full items-center justify-center gap-2"
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Check className="h-4 w-4" />
              已完成
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
