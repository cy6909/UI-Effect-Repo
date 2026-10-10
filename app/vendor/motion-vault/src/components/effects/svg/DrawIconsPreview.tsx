import { useState } from 'react';
import { motion } from 'framer-motion';

type IconStroke = { kind: 'path' | 'circle'; d?: string; cx?: number; cy?: number; r?: number };

const ICONS: { name: string; strokes: IconStroke[] }[] = [
  {
    name: '山与日',
    strokes: [
      { kind: 'path', d: 'M3 18 L9 8 L13 14 L16 10 L21 18' },
      { kind: 'circle', cx: 17, cy: 6, r: 2.4 },
    ],
  },
  {
    name: '波浪',
    strokes: [
      { kind: 'path', d: 'M3 9 C6 5.5 9 5.5 12 9 C15 12.5 18 12.5 21 9' },
      { kind: 'path', d: 'M3 15 C6 11.5 9 11.5 12 15 C15 18.5 18 18.5 21 15' },
    ],
  },
  {
    name: '叶子',
    strokes: [
      { kind: 'path', d: 'M6 18 C6 10 10 5 18 5 C18 13 14 18 6 18 Z' },
      { kind: 'path', d: 'M6 18 C9 14 12.5 10.5 16 8' },
    ],
  },
  {
    name: '星星',
    strokes: [
      {
        kind: 'path',
        d: 'M12 3.5 L14.3 9.3 L20.3 9.8 L15.7 13.8 L17.2 19.8 L12 16.5 L6.8 19.8 L8.3 13.8 L3.7 9.8 L9.7 9.3 Z',
      },
    ],
  },
];

function IconTile({ strokes, name }: { strokes: IconStroke[]; name: string }) {
  // runId remounts the strokes so every hover re-triggers the draw; leaving keeps the drawn state.
  const [runId, setRunId] = useState(0);

  return (
    <div
      onMouseEnter={() => setRunId((r) => r + 1)}
      className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-200 bg-white transition-colors duration-200 hover:border-zinc-300"
      aria-label={name}
    >
      <svg key={runId} viewBox="0 0 24 24" className="h-7 w-7">
        {strokes.map((s, i) => {
          const common = {
            fill: 'none',
            stroke: '#09090B',
            strokeWidth: 1.5,
            strokeLinecap: 'round' as const,
            strokeLinejoin: 'round' as const,
            initial: { pathLength: 0 },
            animate: { pathLength: 1 },
            transition: { duration: 0.3, delay: i * 0.12, ease: 'easeInOut' as const },
          };
          return s.kind === 'circle' ? (
            <motion.circle key={i} cx={s.cx} cy={s.cy} r={s.r} {...common} />
          ) : (
            <motion.path key={i} d={s.d} {...common} />
          );
        })}
      </svg>
    </div>
  );
}

/** Effect — hovering a tile draws the line icon's strokes one by one; they stay drawn until the next hover. */
export default function DrawIconsPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center gap-4 px-8">
      {ICONS.map((icon) => (
        <IconTile key={icon.name} strokes={icon.strokes} name={icon.name} />
      ))}
    </div>
  );
}
