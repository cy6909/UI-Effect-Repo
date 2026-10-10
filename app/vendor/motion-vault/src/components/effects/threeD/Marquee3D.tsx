import { memo } from 'react';
import { cn } from '@/lib/utils';

const KEYFRAMES = `
@keyframes mv-mq-up {
  from { transform: translateY(0); }
  to { transform: translateY(-50%); }
}
@keyframes mv-mq-down {
  from { transform: translateY(-50%); }
  to { transform: translateY(0); }
}
`;

const MASK =
  'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)';

type CardSpec = {
  grad: string; // soft gradient for the thumbnail block
  tag: string;
};

const CARDS: CardSpec[] = [
  { grad: 'from-zinc-100 to-zinc-300', tag: 'MOTION' },
  { grad: 'from-stone-100 to-zinc-200', tag: 'EASE' },
  { grad: 'from-amber-100 to-amber-200', tag: 'ACCENT' },
  { grad: 'from-zinc-200 to-zinc-100', tag: 'FADE' },
  { grad: 'from-neutral-100 to-stone-200', tag: 'BLUR' },
  { grad: 'from-zinc-100 to-neutral-200', tag: 'SLIDE' },
  { grad: 'from-stone-200 to-zinc-100', tag: 'LOOP' },
  { grad: 'from-neutral-200 to-zinc-300', tag: 'TILT' },
];

function MiniCard({ spec }: { spec: CardSpec }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
      <div className={cn('h-14 rounded-md bg-gradient-to-br', spec.grad)} />
      <div className="mt-2.5 h-2 w-3/4 rounded-full bg-zinc-200" />
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-zinc-100" />
      <div className="mt-1 h-1.5 w-2/3 rounded-full bg-zinc-100" />
      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="flex h-4 items-center rounded-full border border-zinc-200 px-1.5 font-mono text-[8px] tracking-[0.06em] text-zinc-400">
          {spec.tag}
        </span>
        <span className="h-1.5 w-8 rounded-full bg-zinc-100" />
      </div>
    </div>
  );
}

type ColumnSpec = {
  offset: number; // rotate the card list so columns differ
  duration: number; // seconds, 18-28
  down: boolean; // scroll direction
  depth: number; // translateZ for parallax layering
};

const COLUMNS: ColumnSpec[] = [
  { offset: 0, duration: 22, down: false, depth: 0 },
  { offset: 3, duration: 18, down: true, depth: 28 },
  { offset: 5, duration: 26, down: false, depth: -16 },
  { offset: 2, duration: 24, down: true, depth: 12 },
];

const Column = memo(function Column({ spec }: { spec: ColumnSpec }) {
  const rotated = CARDS.slice(spec.offset).concat(CARDS.slice(0, spec.offset));
  const items = rotated.concat(rotated); // duplicate for a seamless -50% loop
  return (
    <div
      className="h-full w-[150px] shrink-0 overflow-hidden"
      style={{
        transform: `translateZ(${spec.depth}px)`,
        maskImage: MASK,
        WebkitMaskImage: MASK,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          animation: `${spec.down ? 'mv-mq-down' : 'mv-mq-up'} ${spec.duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {items.map((card, i) => (
          <div key={i} className="pb-4">
            <MiniCard spec={card} />
          </div>
        ))}
      </div>
    </div>
  );
});

/** CSS 3D perspective card wall: four columns scrolling in alternating infinite loops. */
export default function Marquee3D() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[#FAFAFA]">
      <style>{KEYFRAMES}</style>
      <div className="absolute inset-0" style={{ perspective: '900px' }}>
        <div
          className="absolute flex items-stretch justify-center gap-4"
          style={{
            inset: '-32% -8%',
            transform: 'rotateX(18deg) rotateZ(-10deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          {COLUMNS.map((col, i) => (
            <Column key={i} spec={col} />
          ))}
        </div>
      </div>
    </div>
  );
}
