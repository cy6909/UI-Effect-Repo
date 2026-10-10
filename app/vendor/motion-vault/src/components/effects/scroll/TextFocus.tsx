import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

const PARAGRAPH =
  '滚动，本身就是一种阅读。每一个字最初都停在安静的浅灰里，随着你向下滑动，它们依次被点亮成墨色——页面在倾听，故事跟随你的手势展开，而注意力本身，成为了最细腻的动画。';

const CHARS = Array.from(PARAGRAPH).filter((c) => c.trim().length > 0);

function Char({
  progress,
  index,
  total,
  char,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  char: string;
}) {
  const start = index / total;
  const opacity = useTransform(progress, [start, Math.min(1, start + 1.5 / total)], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="text-zinc-950">
      {char}
    </motion.span>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="relative px-7 pb-[220px] pt-[120px]">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
        Read as you scroll
      </span>
      <p className="mt-6 text-[18px] font-medium leading-[2] tracking-wide">
        {CHARS.map((c, i) => (
          <Char key={i} progress={progress} index={i} total={CHARS.length} char={c} />
        ))}
      </p>
    </div>
  );
}

/**
 * 滚动聚焦文字 — every character of the paragraph is a span whose opacity
 * is mapped to a thin slice of scrollYProgress, so the text lights up from
 * 15% grey to full ink sequentially as you scroll. No re-renders, pure
 * MotionValue bindings.
 */
export default function TextFocus() {
  return (
    <ScrollShell>
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
