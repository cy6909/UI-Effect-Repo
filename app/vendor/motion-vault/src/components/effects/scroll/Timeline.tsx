import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';
import { cn } from '@/lib/utils';

const milestones = [
  { year: '2021', title: '项目立项', text: '第一行代码提交。' },
  { year: '2022', title: '公开发布', text: 'v1.0 正式对外上线。' },
  { year: '2023', title: '十万用户', text: '社区开始自传播。' },
  { year: '2024', title: '全面重写', text: '迁移到全新渲染内核。' },
  { year: '2025', title: '走向全球', text: '多语言版本发布。' },
];

function Node({
  progress,
  at,
  side,
  milestone,
}: {
  progress: MotionValue<number>;
  at: number;
  side: 'left' | 'right';
  milestone: (typeof milestones)[number];
}) {
  const scale = useTransform(progress, [at - 0.07, at], [0.8, 1]);
  const opacity = useTransform(progress, [at - 0.07, at], [0, 1]);
  const dotScale = useTransform(progress, [at - 0.04, at], [0.5, 1]);
  const dotBg = useTransform(progress, [at - 0.04, at], ['#ffffff', '#09090b']);

  return (
    <motion.div
      className="absolute left-0 right-0"
      style={{ top: `${at * 100}%`, opacity }}
    >
      {/* dot on the center line */}
      <motion.span
        style={{ scale: dotScale, backgroundColor: dotBg }}
        className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 rounded-full border border-zinc-950"
      />
      {/* milestone card, alternating sides */}
      <motion.div
        style={{ scale, transformOrigin: side === 'left' ? 'right center' : 'left center' }}
        className={cn(
          'absolute -top-2 w-[calc(50%-22px)] rounded-lg border border-zinc-200 bg-white p-2.5 shadow-sm',
          side === 'left' ? 'right-[calc(50%+22px)] text-right' : 'left-[calc(50%+22px)] text-left',
        )}
      >
        <span className="font-mono text-[11px] tracking-[0.08em] text-zinc-400">
          {milestone.year}
        </span>
        <div className="mt-0.5 text-[13px] font-semibold text-zinc-950">{milestone.title}</div>
        <p className="mt-0.5 text-xs leading-relaxed text-zinc-500">{milestone.text}</p>
      </motion.div>
    </motion.div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative mx-5" style={{ height: 880 }}>
      {/* center hairline + growing fill */}
      <div className="absolute bottom-2 left-1/2 top-2 w-px -translate-x-1/2 bg-zinc-200" />
      <motion.div
        className="absolute bottom-2 left-1/2 top-2 w-px origin-top bg-zinc-950"
        style={{ scaleY: progress }}
      />
      {milestones.map((m, i) => (
        <Node
          key={m.year}
          progress={progress}
          at={0.08 + i * 0.21}
          side={i % 2 === 0 ? 'left' : 'right'}
          milestone={m}
        />
      ))}
    </div>
  );
}

/**
 * 滚动时间线 — a vertical 5-node timeline; scrollYProgress grows the dark
 * fill line top→bottom (scaleY, origin top) and each node pops in
 * (scale 0.8→1, dot fills black) exactly when the fill reaches it.
 */
export default function Timeline() {
  return (
    <ScrollShell>
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
