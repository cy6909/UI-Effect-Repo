import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const TEXT = 'MOTION VAULT · 灵感库 · MOTION VAULT · 灵感库 · MOTION VAULT · 灵感库 · ';
/** one revolution every 12s at rest */
const BASE_DEG_PER_SEC = 360 / 12;
const HOVER_MULTIPLIER = 4;

/** Effect — circular textPath rotating slowly; hovering spools it up 4x like a record player (lerped). */
export default function CircularTextPreview() {
  const ringRef = useRef<HTMLDivElement>(null);
  const targetSpeedRef = useRef(1);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let angle = 0;
    let speed = 1;

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      // exponential lerp toward target speed — acceleration/deceleration feels analog, never abrupt
      speed += (targetSpeedRef.current - speed) * Math.min(1, dt * 3.2);
      angle = (angle + BASE_DEG_PER_SEC * speed * dt) % 360;
      if (ringRef.current) ringRef.current.style.transform = `rotate(${angle}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => {
        targetSpeedRef.current = HOVER_MULTIPLIER;
      }}
      onMouseLeave={() => {
        targetSpeedRef.current = 1;
      }}
      aria-label="环形旋转文字，悬停加速"
    >
      <div className="relative h-[224px] w-[224px]">
        <div ref={ringRef} className="absolute inset-0 will-change-transform">
          <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
            <defs>
              <path
                id="circular-text-orbit"
                d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
                fill="none"
              />
            </defs>
            <text
              className="fill-zinc-950 font-mono uppercase"
              style={{ fontSize: '11.5px', letterSpacing: '0.16em' }}
            >
              <textPath href="#circular-text-orbit">{TEXT}</textPath>
            </text>
          </svg>
        </div>
        {/* center icon */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white">
            <ArrowDown className="h-5 w-5 text-zinc-950" />
          </div>
        </div>
      </div>
    </div>
  );
}
