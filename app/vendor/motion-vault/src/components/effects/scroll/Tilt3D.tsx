import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

function Scene({ progress }: { progress: MotionValue<number> }) {
  // Title lifts away and fades first...
  const titleY = useTransform(progress, [0, 0.35], [0, -44]);
  const titleOpacity = useTransform(progress, [0, 0.3], [1, 0]);
  // ...then the card flattens from its tilted pose.
  const rotateX = useTransform(progress, [0.08, 0.6], [24, 0]);
  const scale = useTransform(progress, [0.08, 0.6], [0.88, 1]);
  const cardY = useTransform(progress, [0.08, 0.6], [24, 0]);

  return (
    <div className="sticky top-0 flex h-[320px] flex-col items-center justify-center overflow-hidden">
      <motion.div style={{ y: titleY, opacity: titleOpacity }} className="mb-4 text-center">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
          Product Launch
        </span>
        <h3 className="mt-1.5 text-[20px] font-semibold tracking-tight text-zinc-950">
          全新工作台，随滚动展开
        </h3>
      </motion.div>

      <div style={{ perspective: 900 }}>
        <motion.div
          style={{ rotateX, scale, y: cardY, transformStyle: 'preserve-3d' }}
          className="w-[280px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/5"
        >
          {/* mock app screenshot */}
          <div className="flex items-center gap-1.5 border-b border-zinc-100 bg-zinc-50 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            <div className="ml-2 h-3 flex-1 rounded-full bg-zinc-200" />
          </div>
          <div className="flex h-[150px]">
            <div className="w-14 space-y-2 border-r border-zinc-100 bg-zinc-50/60 p-2">
              <div className="h-2 rounded-full bg-zinc-300" />
              <div className="h-2 rounded-full bg-zinc-200" />
              <div className="h-2 rounded-full bg-zinc-200" />
              <div className="h-2 rounded-full bg-zinc-200" />
            </div>
            <div className="flex-1 space-y-2.5 p-3">
              <div className="h-3 w-2/3 rounded-full bg-zinc-800" />
              <div className="h-2 w-full rounded-full bg-zinc-200" />
              <div className="h-2 w-5/6 rounded-full bg-zinc-200" />
              <div className="mt-3 flex gap-2">
                <div className="h-12 flex-1 rounded-md bg-gradient-to-br from-zinc-100 to-zinc-200" />
                <div className="h-12 flex-1 rounded-md bg-gradient-to-br from-zinc-200 to-zinc-300" />
                <div className="h-12 flex-1 rounded-md bg-gradient-to-br from-zinc-100 to-zinc-200" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * 滚动摊平 — a mock app screenshot starts tilted at rotateX 24° / scale 0.88
 * inside a perspective stage and flattens to a straight-on 1× view as you
 * scroll, while the launch title above drifts up and fades out.
 */
export default function Tilt3D() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[680px]">
          <Scene progress={progress} />
        </div>
      )}
    </ScrollShell>
  );
}
