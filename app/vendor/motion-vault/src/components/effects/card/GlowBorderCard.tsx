import { useInView } from '@/hooks/useInView';

const css = `
.gbc-spin {
  position: absolute;
  inset: -150%;
  background: conic-gradient(from 0deg, transparent 0deg, #6366f1 45deg, transparent 90deg, transparent 360deg);
  animation: gbc-rotate 4s linear infinite;
}
.gbc-wrap:hover .gbc-spin {
  animation-duration: 2s;
}
.gbc-paused .gbc-spin {
  animation-play-state: paused;
}
@keyframes gbc-rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
`;

/**
 * A white card wrapped in a 1.5px conic-gradient border whose arc rotates
 * continuously (4s/rev, 2s/rev on hover), plus a blurred matching glow.
 */
export default function GlowBorderCard() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`gbc-wrap group flex h-full w-full items-center justify-center ${inView ? '' : 'gbc-paused'}`}
    >
      <style>{css}</style>
      <div className="relative rounded-xl">
        {/* rotating conic ring, clipped to the 1.5px border by the card on top */}
        <div className="absolute inset-0 overflow-hidden rounded-xl">
          <div className="gbc-spin" />
        </div>
        {/* blurred glow behind */}
        <div className="absolute inset-0 overflow-hidden rounded-xl opacity-40 blur-[8px]">
          <div className="gbc-spin" />
        </div>
        {/* card */}
        <div className="relative m-[1.5px] flex h-44 w-72 flex-col justify-between rounded-[10px] border border-transparent bg-white p-5">
          <div className="h-2 w-10 rounded-full bg-zinc-950" />
          <div>
            <div className="text-sm font-semibold text-zinc-950">Glow Border</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              hover to speed up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
