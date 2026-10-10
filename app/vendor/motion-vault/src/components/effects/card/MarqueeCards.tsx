import { memo } from 'react';
import { useInView } from '@/hooks/useInView';
import { cn } from '@/lib/utils';

const css = `
.mq-track {
  display: flex;
  width: max-content;
  gap: 16px;
  padding-right: 16px;
  animation: mq-scroll 24s linear infinite;
}
.mq-track-reverse {
  animation-direction: reverse;
}
.mq-wrap:hover .mq-track {
  animation-play-state: paused;
}
.mq-paused .mq-track {
  animation-play-state: paused;
}
@keyframes mq-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`;

const titles = ['Aurora', 'Tilt', 'Pulse', 'Orbit', 'Drift', 'Flux'];

const MiniCard = memo(function MiniCard({ title, index }: { title: string; index: number }) {
  return (
    <div className="flex h-20 w-36 shrink-0 flex-col justify-between rounded-lg border border-zinc-200 bg-white p-3">
      <span className="font-mono text-[10px] text-zinc-400">{String(index + 1).padStart(2, '0')}</span>
      <span className="text-xs font-medium text-zinc-800">{title}</span>
    </div>
  );
});

function Row({ reverse }: { reverse?: boolean }) {
  // track duplicated x2; translateX 0 -> -50% loops seamlessly
  const track = [...titles, ...titles];
  return (
    <div className={cn('mq-track', reverse && 'mq-track-reverse')}>
      {track.map((t, i) => (
        <MiniCard key={`${t}-${i}`} title={t} index={i % titles.length} />
      ))}
    </div>
  );
}

/**
 * Two rows of mini cards scrolling horizontally in opposite directions in a
 * seamless infinite loop (~40px/s). Hover pauses smoothly; the loop also
 * pauses while the preview is offscreen.
 */
export default function MarqueeCards() {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'mq-wrap flex h-full w-full flex-col items-center justify-center gap-4 overflow-hidden',
        !inView && 'mq-paused',
      )}
    >
      <style>{css}</style>
      <Row />
      <Row reverse />
    </div>
  );
}
