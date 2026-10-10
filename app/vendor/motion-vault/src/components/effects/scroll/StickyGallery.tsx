import { useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';
import ScrollShell from './ScrollShell';

const SCENES = [
  {
    num: '01',
    title: '晨曦',
    caption: '雾还没散，光是软的',
    gradient: 'linear-gradient(160deg, #f6ece2 0%, #eadfd8 45%, #d9d4cf 100%)',
  },
  {
    num: '02',
    title: '正午',
    caption: '影子最短的时候',
    gradient: 'linear-gradient(160deg, #eef1f3 0%, #dfe5e8 45%, #c6cdd2 100%)',
  },
  {
    num: '03',
    title: '暮色',
    caption: '最后一格暖色退场',
    gradient: 'linear-gradient(160deg, #e4dde6 0%, #cbc3d2 45%, #9d97a8 100%)',
  },
];

/** Ranges per scene: [fadeIn, full, fadeOut] — strictly increasing within [0,1]. */
const RANGES: [number, number, number][] = [
  [0, 0.3, 0.42],
  [0.3, 0.42, 0.75],
  [0.63, 0.75, 1],
];

function SceneCard({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const [a, b, c] = RANGES[index];
  // Opacity ranges (computed before the hook call, always strictly increasing):
  // first scene starts fully visible, last one stays visible at the end.
  const isFirst = index === 0;
  const isLast = index === SCENES.length - 1;
  const inRange = isFirst ? [b, c] : isLast ? [a, b] : [a, b, c - 0.12, c];
  const outRange = isFirst ? [1, 0] : isLast ? [0, 1] : [0, 1, 1, 0];
  const opacity = useTransform(progress, inRange, outRange);
  // slow parallax drift while visible
  const scale = useTransform(progress, [Math.max(0, a - 0.05), Math.min(1, c + 0.05)], [1.08, 1]);
  const y = useTransform(progress, [a, c], [14, -14]);

  const scene = SCENES[index];
  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 overflow-hidden rounded-lg border border-zinc-200"
    >
      <div className="absolute inset-0" style={{ background: scene.gradient }} />
      {/* horizon line + sun placeholder */}
      <div className="absolute bottom-10 left-0 right-0 h-px bg-white/50" />
      <div className="absolute right-6 top-6 h-8 w-8 rounded-full bg-white/70 blur-[2px]" />
      <span className="absolute bottom-2.5 left-3 font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-600/70">
        {scene.num} · {scene.title}
      </span>
    </motion.div>
  );
}

function Gallery({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);
  useMotionValueEvent(progress, 'change', (v) => {
    const idx = v < 0.36 ? 0 : v < 0.69 ? 1 : 2;
    setActive((prev) => (prev === idx ? prev : idx));
  });

  return (
    <div className="sticky top-0 flex h-[320px] items-center gap-6 px-8">
      {/* left: sticky switching title */}
      <div className="w-28 shrink-0">
        {SCENES.map((scene, i) => (
          <div
            key={scene.num}
            className={cn(
              'flex items-baseline gap-2 py-1.5 transition-all duration-300',
              i === active ? 'translate-x-1 text-zinc-950' : 'text-zinc-300',
            )}
          >
            <span className="font-mono text-[11px] tracking-wider">{scene.num}</span>
            <span
              className={cn(
                'text-[15px] transition-all duration-300',
                i === active ? 'scale-110 font-semibold' : 'font-medium',
              )}
            >
              {scene.title}
            </span>
          </div>
        ))}
        <p className="mt-3 h-8 text-[11px] leading-relaxed text-zinc-500 transition-opacity duration-300">
          {SCENES[active].caption}
        </p>
      </div>

      {/* right: sticky crossfading scene */}
      <div className="relative h-[220px] flex-1">
        {SCENES.map((_, i) => (
          <SceneCard key={i} progress={progress} index={i} />
        ))}
      </div>
    </div>
  );
}

/**
 * 粘性画廊 — a 1000px track pins a split panel: the left title/number list
 * switches 01 晨曦 → 02 正午 → 03 暮色 with progress, while the right scene
 * cards crossfade with a slow scale + drift parallax.
 */
export default function StickyGallery() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[1000px]">
          <Gallery progress={progress} />
        </div>
      )}
    </ScrollShell>
  );
}
