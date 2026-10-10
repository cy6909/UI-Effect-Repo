import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

const PHRASE = '滚动越快 · 我越快 · ';

/** wrap v into [min, max) — local helper so we never depend on lib internals */
function wrapRange(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function MarqueeCopy() {
  return (
    <div className="flex shrink-0 whitespace-nowrap text-[28px] font-semibold tracking-tight">
      {Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className={i % 2 === 0 ? 'text-zinc-950' : 'text-zinc-300'}>
          {PHRASE}
        </span>
      ))}
    </div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  const baseX = useMotionValue(0);
  const velocity = useVelocity(progress);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  // speed multiplier: 1x at rest, up to 15x while flicking the scroller
  const boost = useTransform(smooth, (v) => 1 + Math.min(Math.abs(v) * 6, 14));
  const skewX = useTransform(smooth, [-2, 0, 2], [-8, 0, 8], { clamp: true });
  const barScale = useTransform(smooth, (v) => Math.min(Math.abs(v) / 1.5, 1));
  const x = useTransform(baseX, (v) => `${wrapRange(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    // 50% strip over ~4s at rest = 0.0125 percent per millisecond
    baseX.set(baseX.get() - 0.0125 * delta * boost.get());
  });

  return (
    <div className="relative" style={{ height: 1000 }}>
      <div className="sticky top-0 flex h-[320px] flex-col justify-center overflow-hidden bg-white">
        <div className="absolute inset-x-5 top-4 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
            scroll velocity
          </span>
          <div className="h-0.5 w-16 overflow-hidden rounded-full bg-zinc-200">
            <motion.div className="h-full origin-left bg-zinc-950" style={{ scaleX: barScale }} />
          </div>
        </div>
        <motion.div style={{ x, skewX }} className="flex w-max will-change-transform">
          <MarqueeCopy />
          <MarqueeCopy />
        </motion.div>
        <p className="absolute inset-x-0 bottom-4 text-center text-[11px] text-zinc-400">
          在容器内快速滑动 —— 我会跟着加速并倾斜
        </p>
      </div>
    </div>
  );
}

/**
 * 滚动速度跑马灯 — a big-type marquee that cruises at a constant speed,
 * then instantly accelerates and skews with the scroller's velocity
 * (useVelocity + useSpring), springing back when you stop.
 */
export default function ScrollVelocity() {
  return (
    <ScrollShell className="w-[min(88%,440px)]">
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
