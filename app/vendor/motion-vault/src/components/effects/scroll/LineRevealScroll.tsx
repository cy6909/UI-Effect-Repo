import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

const LINES = [
  '有些句子值得被等待',
  '它们藏在遮罩之下',
  '随着你向下滑动',
  '一行一行揭开面纱',
  '先是轮廓 再是墨色',
  '最后连模糊都散去',
];

const N = LINES.length;

function Line({
  progress,
  index,
  text,
}: {
  progress: MotionValue<number>;
  index: number;
  text: string;
}) {
  // Each line owns a strictly-increasing slice of progress.
  const start = 0.06 + index * 0.13;
  const end = Math.min(1, start + 0.16);
  const y = useTransform(progress, [start, end], ['110%', '0%']);
  const blur = useTransform(progress, [start + 0.03, end], ['blur(6px)', 'blur(0px)']);
  const opacity = useTransform(progress, [start, start + 0.04], [0, 1]);

  return (
    <div className="overflow-hidden py-0.5">
      <motion.p
        style={{ y, filter: blur, opacity }}
        className="text-[19px] font-medium leading-snug tracking-wide text-zinc-950"
      >
        {text}
      </motion.p>
    </div>
  );
}

/**
 * 逐行揭示 — six lines, each wrapped in an overflow-hidden mask, slide up
 * 110% → 0 over their own slice of scrollYProgress while a 6px blur clears.
 * Unlike per-character lighting, the whole line surfaces at once.
 */
export default function LineRevealScroll() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[760px]">
          <div className="sticky top-0 flex h-[320px] flex-col justify-center px-9">
            <span className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Line by line
            </span>
            <div>
              {LINES.map((text, i) => (
                <Line key={i} progress={progress} index={i} text={text} />
              ))}
            </div>
            <span className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-300">
              {String(N).padStart(2, '0')} lines · masked reveal
            </span>
          </div>
        </div>
      )}
    </ScrollShell>
  );
}
