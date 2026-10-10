import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

/**
 * Wobble input: clicking 登录 shakes the whole row (x keyframes
 * 0,-10,10,-6,6,-2,0 over 400ms), flashes the border rose-500 for 800ms
 * and slides down an error hint. Everything resets on next input focus.
 */
export default function WobbleInput() {
  const controls = useAnimationControls();
  const [flash, setFlash] = useState(false);
  const [hint, setHint] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const submit = () => {
    void controls.start({
      x: [0, -10, 10, -6, 6, -2, 0],
      transition: { duration: 0.4, ease: 'easeInOut' },
    });
    setFlash(true);
    setHint(true);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setFlash(false), 800);
  };

  const reset = () => {
    setFlash(false);
    setHint(false);
    window.clearTimeout(timerRef.current);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <motion.div animate={controls} className="flex items-center gap-2">
        <input
          type="password"
          placeholder="输入密码"
          onFocus={reset}
          className={
            'h-10 w-52 rounded-lg border bg-white px-3 text-sm text-zinc-950 outline-none transition-colors duration-300 placeholder:text-zinc-400 ' +
            (flash ? 'border-rose-500' : 'border-zinc-300 focus:border-zinc-950')
          }
        />
        <button
          type="button"
          onClick={submit}
          className="h-10 rounded-lg bg-zinc-950 px-5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
        >
          登录
        </button>
      </motion.div>
      <div className="h-7 overflow-hidden">
        <AnimatePresence>
          {hint && (
            <motion.p
              initial={{ y: -8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -8, opacity: 0, transition: { duration: 0.15 } }}
              transition={{ type: 'spring', stiffness: 400, damping: 22 }}
              className="mt-2 text-xs text-rose-500"
            >
              密码错误，再试一次
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
