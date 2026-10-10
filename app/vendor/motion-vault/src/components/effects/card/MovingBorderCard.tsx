import { memo } from 'react';
import { useInView } from '@/hooks/useInView';

const css = `
@keyframes mbc-trace {
  to { stroke-dashoffset: -100; }
}
.mbc-trace {
  animation: mbc-trace 4s linear infinite;
}
.mbc-paused .mbc-trace {
  animation-play-state: paused;
}
`;

const CARD_W = 288;
const CARD_H = 176;

/** Short bright segment + soft blurred glow copy traveling the rounded-rect perimeter. */
const BorderTracer = memo(function BorderTracer() {
  const rect = (
    <rect
      x={1}
      y={1}
      width={CARD_W - 2}
      height={CARD_H - 2}
      rx={11}
      pathLength={100}
      fill="none"
      strokeDasharray="14 86"
      strokeLinecap="round"
      className="mbc-trace"
    />
  );
  return (
    <>
      {/* soft glow duplicate */}
      <svg
        viewBox={`0 0 ${CARD_W} ${CARD_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full opacity-50 blur-[4px]"
        aria-hidden
      >
        <g stroke="#18181B" strokeWidth={3}>
          {rect}
        </g>
      </svg>
      {/* crisp traveling segment */}
      <svg
        viewBox={`0 0 ${CARD_W} ${CARD_H}`}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden
      >
        <g stroke="#18181B" strokeWidth={2}>
          {rect}
        </g>
      </svg>
    </>
  );
});

/**
 * A white card whose rounded-rect perimeter is traced endlessly by a short
 * zinc-900 segment (SVG stroke-dashoffset, 4s linear loop) with a blurred
 * glow duplicate. Paused while off-screen.
 */
export default function MovingBorderCard() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${inView ? '' : 'mbc-paused'}`}
    >
      <style>{css}</style>
      <div className="relative h-44 w-72 rounded-xl bg-white">
        <BorderTracer />
        <div className="relative flex h-full flex-col justify-between p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
            border / loop
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-950">Moving Border</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
              一段光沿着圆角边界匀速巡游，
              <br />
              柔光残影紧随其后，周而复始。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
