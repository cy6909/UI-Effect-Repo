import { memo } from 'react';
import { useInView } from '@/hooks/useInView';

const css = `
@keyframes comet-fly {
  0% { transform: translateX(-120px); opacity: 0; }
  10% { opacity: 1; }
  72% { opacity: 1; }
  100% { transform: translateX(360px); opacity: 0; }
}
.comet-fly {
  animation: comet-fly linear infinite;
  will-change: transform, opacity;
}
.comet-paused .comet-fly {
  animation-play-state: paused;
}
`;

type CometSpec = {
  top: string;
  rotate: number;
  duration: number;
  delay: number;
  tail: number;
};

const COMETS: CometSpec[] = [
  { top: '22%', rotate: -24, duration: 4, delay: 0, tail: 92 },
  { top: '50%', rotate: -34, duration: 5.5, delay: 1.6, tail: 70 },
  { top: '74%', rotate: -18, duration: 7, delay: 3.2, tail: 110 },
];

/** Three small comets (bright head + fading tail) sweeping the card, staggered. */
const CometField = memo(function CometField() {
  return (
    <>
      {COMETS.map((c, i) => (
        <div
          key={i}
          aria-hidden
          className="pointer-events-none absolute left-0 w-full"
          style={{ top: c.top, transform: `rotate(${c.rotate}deg)` }}
        >
          <span
            className="comet-fly relative block"
            style={{
              width: c.tail,
              height: 1.5,
              borderRadius: 999,
              background:
                'linear-gradient(90deg, transparent 0%, rgba(244,244,245,0.35) 55%, rgba(244,244,245,0.95) 100%)',
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          >
            {/* bright head */}
            <span
              className="absolute right-0 top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-zinc-100"
              style={{ boxShadow: '0 0 8px 2px rgba(244,244,245,0.55)' }}
            />
          </span>
        </div>
      ))}
    </>
  );
});

/**
 * Aceternity Comet Card: three small comets with bright heads and fading
 * tails periodically sweep a dark card at different angles (4s / 5.5s / 7s,
 * staggered). Pure CSS keyframes, paused while off-screen.
 */
export default function CometCard() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`flex h-full w-full items-center justify-center ${inView ? '' : 'comet-paused'}`}
    >
      <style>{css}</style>
      <div className="relative h-48 w-80 max-w-full overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
        <CometField />
        <div className="relative flex h-full flex-col justify-between p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            comet / auto
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-100">Comet Card</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              三颗小彗星错峰划过卡面，
              <br />
              亮头拖着渐隐的长尾，安静而规律。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
