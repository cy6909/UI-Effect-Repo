import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

const cards = [
  { n: '01', title: '靠近', text: '最前的一张向你飞来。' },
  { n: '02', title: '穿越', text: '越过镜头，淡出视野。' },
  { n: '03', title: '接力', text: '下一张从深处放大补位。' },
  { n: '04', title: '抵达', text: '终点停在最后一张。' },
];

function CardLayer({
  progress,
  index,
  total,
  card,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  card: (typeof cards)[number];
}) {
  const seg = 1 / total;
  const isLast = index === total - 1;
  const isFirst = index === 0;

  // NOTE: input ranges must stay within [0, 1] and strictly increasing —
  // negative/duplicate offsets crash framer-motion's WAAPI path.
  const scale = useTransform(
    progress,
    isFirst
      ? [0, seg]
      : isLast
        ? [(index - 1) * seg, index * seg]
        : [(index - 1) * seg, index * seg, (index + 1) * seg],
    isFirst ? [1, 2.8] : isLast ? [0.7, 1] : [0.7, 1, 2.8],
  );
  const opacity = useTransform(
    progress,
    isFirst
      ? [0, (index + 0.55) * seg, (index + 0.95) * seg]
      : isLast
        ? [(index - 0.55) * seg, index * seg]
        : [(index - 0.55) * seg, index * seg, (index + 0.55) * seg, (index + 0.95) * seg],
    isFirst ? [1, 1, 0] : isLast ? [0, 1] : [0, 1, 1, 0],
  );

  return (
    <motion.div
      style={{ scale, opacity, zIndex: total - index }}
      className="absolute w-[230px] rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_16px_40px_-18px_rgba(0,0,0,0.25)]"
    >
      <div className="flex items-baseline justify-between">
        <span className="font-mono text-3xl font-semibold tracking-tight text-zinc-900">{card.n}</span>
        <span className="h-1.5 w-8 rounded-full bg-zinc-950" />
      </div>
      <div className="mt-4 text-sm font-semibold text-zinc-950">{card.title}</div>
      <p className="mt-1 text-xs leading-relaxed text-zinc-500">{card.text}</p>
    </motion.div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative" style={{ height: 1000 }}>
      <div className="sticky top-0 grid h-[320px] place-items-center overflow-hidden bg-zinc-50">
        {cards.map((c, i) => (
          <CardLayer key={c.n} progress={progress} index={i} total={cards.length} card={c} />
        ))}
      </div>
    </div>
  );
}

/**
 * 滚动穿越卡片 — four cards stacked in fake z-depth; scrolling scrubs the
 * front card past the camera (scale 1→2.8, fade out) while the next grows
 * from 0.7→1, ending on the final card. Smooth scrub, transform/opacity
 * only, front-to-back z-index stays fixed.
 */
export default function ZoomThrough() {
  return (
    <ScrollShell>
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
