import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Phase = 'idle' | 'loading' | 'done';

const LOADING_MS = 1200;
const RESET_MS = 1500;

/**
 * Click '部署' → the label swaps to an inline spinning ring (1.2s), then a
 * drawn check + '完成' (check stroke draws over ~0.5s inside a 0.8s done
 * beat), then resets to idle after 1.5s. The button's width springs
 * elastically to fit each content state (layout + popLayout swap). All
 * timers are cleaned up on unmount.
 */
export default function StatefulButton() {
  const [phase, setPhase] = useState<Phase>('idle');
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const start = () => {
    if (phase !== 'idle') return;
    setPhase('loading');
    timersRef.current.push(
      window.setTimeout(() => {
        setPhase('done');
        timersRef.current.push(window.setTimeout(() => setPhase('idle'), RESET_MS));
      }, LOADING_MS),
    );
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.button
        type="button"
        layout
        onClick={start}
        disabled={phase !== 'idle'}
        transition={{ layout: { type: 'spring', stiffness: 500, damping: 32 } }}
        className="flex h-11 min-w-[104px] cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-zinc-950 px-6 text-sm font-medium text-white disabled:cursor-default"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {phase === 'idle' && (
            <motion.span
              key="idle"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              部署
            </motion.span>
          )}
          {phase === 'loading' && (
            <motion.span
              key="loading"
              className="flex items-center"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.18 }}
            >
              <motion.span
                aria-hidden
                className="block h-4 w-4 rounded-full border-2 border-white/25 border-t-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
            </motion.span>
          )}
          {phase === 'done' && (
            <motion.span
              key="done"
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <svg aria-hidden viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                <motion.path
                  d="M 3 8.5 L 6.5 12 L 13 4.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </svg>
              完成
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
