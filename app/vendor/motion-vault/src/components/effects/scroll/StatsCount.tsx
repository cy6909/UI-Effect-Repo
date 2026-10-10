import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

const stats = [
  { label: '项目交付', value: 128, suffix: '', decimals: 0, bar: 0.86 },
  { label: 'uptime 可用性', value: 99.9, suffix: '%', decimals: 1, bar: 0.99 },
  { label: '活跃用户', value: 42, suffix: 'k', decimals: 0, bar: 0.62 },
];

function StatCard({
  mv,
  stat,
  fired,
  index,
}: {
  mv: MotionValue<number>;
  stat: (typeof stats)[number];
  fired: boolean;
  index: number;
}) {
  const text = useTransform(mv, (v) => v.toFixed(stat.decimals));
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-3">
      <div className="flex items-baseline font-mono font-semibold tracking-tight text-zinc-950">
        <motion.span className="text-[24px] leading-none">{text}</motion.span>
        {stat.suffix && <span className="text-[13px] text-zinc-500">{stat.suffix}</span>}
      </div>
      <div className="mt-2 text-[11px] text-zinc-500">{stat.label}</div>
      <div className="mt-2 h-[3px] overflow-hidden rounded-full bg-zinc-100">
        <motion.div
          className="h-full origin-left rounded-full bg-zinc-950"
          initial={{ scaleX: 0 }}
          animate={fired ? { scaleX: stat.bar } : { scaleX: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 20, delay: 0.15 + index * 0.12 }}
        />
      </div>
    </div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const [fired, setFired] = useState(false);
  const v0 = useMotionValue(0);
  const v1 = useMotionValue(0);
  const v2 = useMotionValue(0);
  const values = [v0, v1, v2];

  // fire exactly once, when the stats row has scrolled into view
  useMotionValueEvent(progress, 'change', (p) => {
    if (p > 0.32) setFired(true);
  });

  useEffect(() => {
    if (!fired) return;
    const controls = stats.map((s, i) =>
      animate(values[i], s.value, { type: 'spring', stiffness: 70, damping: 20 }),
    );
    return () => controls.forEach((c) => c.stop());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fired]);

  return (
    <div className="relative px-5" style={{ height: 700 }}>
      <div className="pt-10">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">
          metrics · 2025
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
          向下滑动，数字开始计数。
        </p>
      </div>
      <div className="mt-[240px] grid grid-cols-3 gap-2.5">
        {stats.map((s, i) => (
          <StatCard key={s.label} mv={values[i]} stat={s} fired={fired} index={i} />
        ))}
      </div>
      <p className="mt-[150px] text-center text-[11px] text-zinc-400">— 数据统计完毕 —</p>
    </div>
  );
}

/**
 * 滚动统计 — three mono stats spring-count from 0 to their targets the
 * first time they scroll into view (animate(), one-shot), with small
 * bars growing scaleX underneath in a gentle stagger.
 */
export default function StatsCount() {
  return (
    <ScrollShell className="w-[min(88%,440px)]">
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
