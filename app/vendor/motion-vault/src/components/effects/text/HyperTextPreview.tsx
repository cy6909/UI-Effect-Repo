import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const WORD = 'HYPERDRIVE';
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*';
const FRAME_MS = 20;
const SCRAMBLE_MS = 600;
const STAGGER_MS = 60;

/**
 * Effect — 'HYPERDRIVE' scrambles at 20ms/frame for ~600ms, then locks in
 * left-to-right with a 60ms stagger. DOM writes go straight to span refs
 * (zero setState); the interval is gated by useInView and the EffectCard
 * Replay button remounts to re-trigger.
 */
export default function HyperTextPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const charsRef = useRef<Array<HTMLSpanElement | null>>([]);
  const statusRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const chars = charsRef.current;
    // (re)start: everything back to scrambled zinc-400
    chars.forEach((el) => {
      if (!el) return;
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      el.classList.remove('text-zinc-950');
      el.classList.add('text-zinc-400');
    });
    if (statusRef.current) statusRef.current.textContent = 'SCRAMBLING…';

    const start = performance.now();
    const interval = window.setInterval(() => {
      const t = performance.now() - start;
      let done = true;
      chars.forEach((el, i) => {
        if (!el) return;
        if (t >= SCRAMBLE_MS + i * STAGGER_MS) {
          if (el.textContent !== WORD[i]) {
            el.textContent = WORD[i];
            el.classList.remove('text-zinc-400');
            el.classList.add('text-zinc-950');
          }
        } else {
          done = false;
          el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      });
      if (done) {
        window.clearInterval(interval);
        if (statusRef.current) statusRef.current.textContent = '— ALL SYSTEMS LOCKED';
      }
    }, FRAME_MS);

    return () => window.clearInterval(interval);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-6 px-6">
      <p
        className="font-mono text-[28px] font-medium uppercase tracking-[0.18em]"
        aria-label={WORD}
      >
        {WORD.split('').map((ch, i) => (
          <span
            key={i}
            ref={(el) => {
              charsRef.current[i] = el;
            }}
            className="inline-block w-[1.05em] text-center text-zinc-400"
            aria-hidden
          >
            {ch}
          </span>
        ))}
      </p>
      <span
        ref={statusRef}
        className="font-mono text-[11px] uppercase tracking-[0.22em] text-zinc-400"
      >
        STANDBY
      </span>
    </div>
  );
}
