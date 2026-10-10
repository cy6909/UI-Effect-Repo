import { memo } from 'react';
import { useInView } from '@/hooks/useInView';

const css = `
@keyframes eb-flow {
  to { stroke-dashoffset: -260; }
}
.eb-flow {
  animation: eb-flow 3.2s linear infinite;
}
.eb-paused .eb-flow {
  animation-play-state: paused;
}
.eb-glow {
  opacity: 0.55;
  transition: opacity 300ms ease;
}
.eb-card:hover .eb-glow {
  opacity: 1;
}
`;

const CARD_W = 288;
const CARD_H = 176;

/**
 * Distorted rect strokes: feTurbulence + feDisplacementMap bend the border
 * into an electric arc, dashoffset makes it travel. Crisp pass + blurred
 * glow pass. Isolated in a memoized micro-component.
 */
const ElectricFrame = memo(function ElectricFrame() {
  const rects = (
    <>
      {/* glow pass */}
      <rect
        x={2}
        y={2}
        width={CARD_W - 4}
        height={CARD_H - 4}
        rx={12}
        pathLength={260}
        fill="none"
        stroke="#F4F4F5"
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray="46 214"
        className="eb-flow eb-glow blur-[3px]"
      />
      {/* crisp pass */}
      <rect
        x={2}
        y={2}
        width={CARD_W - 4}
        height={CARD_H - 4}
        rx={12}
        pathLength={260}
        fill="none"
        stroke="#E4E4E7"
        strokeWidth={1.4}
        strokeLinecap="round"
        strokeDasharray="46 214"
        className="eb-flow"
      />
      {/* faint base outline */}
      <rect
        x={2}
        y={2}
        width={CARD_W - 4}
        height={CARD_H - 4}
        rx={12}
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth={1}
      />
    </>
  );

  return (
    <svg
      viewBox={`0 0 ${CARD_W} ${CARD_H}`}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    >
      <defs>
        <filter id="eb-distort" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.05"
            numOctaves="2"
            seed="4"
            result="noise"
          >
            <animate
              attributeName="baseFrequency"
              dur="5s"
              values="0.012 0.05;0.02 0.085;0.012 0.05"
              repeatCount="indefinite"
            />
          </feTurbulence>
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={7}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      <g filter="url(#eb-distort)">{rects}</g>
    </svg>
  );
});

/**
 * Electric border card: an SVG rect stroke warped by an animated
 * feTurbulence + feDisplacementMap filter reads as a live current tracing
 * the rounded border, with a blurred glow duplicate. Paused off-screen.
 */
export default function ElectricBorder() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${inView ? '' : 'eb-paused'}`}
    >
      <style>{css}</style>
      <div className="eb-card relative h-44 w-72 rounded-xl bg-zinc-900">
        <ElectricFrame />
        <div className="relative flex h-full flex-col justify-between p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            electric / border
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-50">Electric Border</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              一道电流沿着边框扭曲奔流，
              <br />
              悬停时辉光愈亮。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
