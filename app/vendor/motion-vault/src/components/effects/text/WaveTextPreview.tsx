import { useEffect, useRef } from 'react';

const TEXT = 'Sine Wave Motion';
const PERIOD_S = 1.6;
const AMPLITUDE = 8; // px
const PHASE_STEP = 0.35; // rad per letter

/**
 * Effect 07 — per-letter sine wave driven by rAF (styles updated directly,
 * no re-render per frame). Hover doubles the speed and eases back on leave.
 */
export default function WaveTextPreview() {
  const spanRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const speedRef = useRef(1);
  const targetSpeedRef = useRef(1);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let time = 0;

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // ease current speed toward the target speed
      speedRef.current += (targetSpeedRef.current - speedRef.current) * Math.min(1, dt * 6);
      time += dt * speedRef.current;

      const omega = (Math.PI * 2) / PERIOD_S;
      for (let i = 0; i < spanRefs.current.length; i++) {
        const el = spanRefs.current[i];
        if (!el) continue;
        const s = Math.sin(time * omega + i * PHASE_STEP);
        const y = -AMPLITUDE * s;
        const scale = 1 + 0.08 * (0.5 + 0.5 * s);
        el.style.transform = `translateY(${y.toFixed(2)}px) scale(${scale.toFixed(3)})`;
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="flex h-full w-full items-center justify-center px-6"
      onMouseEnter={() => {
        targetSpeedRef.current = 2;
      }}
      onMouseLeave={() => {
        targetSpeedRef.current = 1;
      }}
    >
      <span
        aria-label={TEXT}
        className="text-[28px] font-semibold tracking-[0.01em] text-zinc-950 sm:text-[32px]"
      >
        {Array.from(TEXT).map((ch, i) => (
          <span
            key={i}
            ref={(el) => {
              spanRefs.current[i] = el;
            }}
            className="inline-block will-change-transform"
            aria-hidden
          >
            {ch === ' ' ? ' ' : ch}
          </span>
        ))}
      </span>
    </div>
  );
}
