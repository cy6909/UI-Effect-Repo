import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const TEXT = 'MOTION VAULT · INSPIRATION · ';
/** one revolution every 12s */
const DEG_PER_SEC = 360 / 12;
const RADIUS = 88;

/** Effect — per-character circular typesetting rotating continuously; hovering reverses the spin smoothly. */
export default function OrbitTextPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const ringRef = useRef<HTMLDivElement>(null);
  const dirRef = useRef(1);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    let last = performance.now();
    let angle = 0;
    let dir = 1;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // lerp direction so the reversal feels like a turntable, never a hard cut
      dir += (dirRef.current - dir) * Math.min(1, dt * 4);
      angle = (angle + DEG_PER_SEC * dir * dt) % 360;
      if (ringRef.current) ringRef.current.style.transform = `rotate(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  const chars = TEXT.split('');
  const step = 360 / chars.length;

  return (
    <div
      ref={ref}
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => {
        dirRef.current = -1;
      }}
      onMouseLeave={() => {
        dirRef.current = 1;
      }}
      aria-label="环形文字持续旋转，悬停反向"
    >
      <div className="relative h-[216px] w-[216px]">
        <div ref={ringRef} className="absolute inset-0 will-change-transform">
          {chars.map((ch, i) => (
            <span
              key={i}
              aria-hidden
              className="absolute left-1/2 top-1/2 font-mono text-[13px] font-medium uppercase tracking-wide text-zinc-950"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * step}deg) translateY(-${RADIUS}px)`,
              }}
            >
              {ch === ' ' ? ' ' : ch}
            </span>
          ))}
        </div>
        {/* center logo dot */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="h-2 w-2 rounded-full bg-zinc-950" />
        </div>
      </div>
    </div>
  );
}
