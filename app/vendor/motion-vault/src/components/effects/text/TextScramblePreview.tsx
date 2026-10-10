import { useCallback, useEffect, useRef, useState } from 'react';

const TARGET = 'DECODE THE MOTION';
const GLYPHS = '!<>-_\\/[]{}=+*^?#';
const TICK_MS = 30;
const TOTAL_MS = 1400;

/** Effect 04 — random glyphs lock into the correct characters left-to-right; click replays. */
export default function TextScramblePreview() {
  const [display, setDisplay] = useState(TARGET);
  const timerRef = useRef<number | null>(null);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    stop();
    const start = performance.now();
    timerRef.current = window.setInterval(() => {
      const progress = Math.min(1, (performance.now() - start) / TOTAL_MS);
      const locked = Math.floor(progress * TARGET.length);
      let out = '';
      for (let i = 0; i < TARGET.length; i++) {
        const ch = TARGET[i]!;
        if (ch === ' ' || i < locked) {
          out += ch;
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      if (progress >= 1) {
        stop();
        setDisplay(TARGET);
      }
    }, TICK_MS);
  }, [stop]);

  // auto-trigger on mount (the card only mounts this preview while in view)
  useEffect(() => {
    play();
    return stop;
  }, [play, stop]);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center px-6"
      onClick={play}
    >
      <span
        aria-label={TARGET}
        className="font-mono text-[26px] font-medium tracking-[0.08em] text-zinc-950 sm:text-[30px]"
      >
        {display}
      </span>
    </div>
  );
}
