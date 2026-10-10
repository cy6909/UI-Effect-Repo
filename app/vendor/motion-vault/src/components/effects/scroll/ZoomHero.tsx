import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

function Scene({ progress }: { progress: MotionValue<number> }) {
  const scale = useTransform(progress, [0, 1], [1.25, 1]);
  const titleOpacity = useTransform(progress, [0, 0.4], [1, 0]);
  const titleY = useTransform(progress, [0, 0.4], [0, -24]);
  const subOpacity = useTransform(progress, [0.55, 0.9], [0, 1]);
  const subY = useTransform(progress, [0.55, 0.9], [16, 0]);

  return (
    <div className="relative" style={{ height: 800 }}>
      <div className="sticky top-0 h-[320px] overflow-hidden">
        {/* layered gradient landscape, scrubs 1.25 → 1 */}
        <motion.div style={{ scale }} className="absolute inset-0">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(180deg,#e7ece8 0%,#d4ddd7 42%,#bdc8c1 100%)' }}
          />
          <div
            className="absolute left-1/2 top-[24%] h-16 w-16 -translate-x-1/2 rounded-full"
            style={{ background: 'radial-gradient(circle,#fdf6e3 0%,rgba(253,246,227,0) 70%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[62%]"
            style={{
              background: '#b2c0b6',
              clipPath:
                'polygon(0 55%,10% 40%,22% 52%,34% 36%,48% 50%,60% 34%,74% 48%,86% 38%,100% 50%,100% 100%,0 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[52%]"
            style={{
              background: '#8b9c91',
              clipPath:
                'polygon(0 68%,14% 50%,28% 64%,42% 46%,58% 66%,72% 48%,88% 66%,100% 54%,100% 100%,0 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-[40%]"
            style={{
              background: '#5d6a62',
              clipPath:
                'polygon(0 82%,18% 62%,36% 78%,54% 60%,70% 80%,86% 66%,100% 78%,100% 100%,0 100%)',
            }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0),rgba(255,255,255,0.35))' }}
          />
        </motion.div>

        {/* title fades out */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Zoom Hero</span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-800">雾谷封面</h3>
        </motion.div>

        {/* subtitle fades in */}
        <motion.div
          style={{ opacity: subOpacity, y: subY }}
          className="absolute inset-0 flex flex-col items-center justify-center"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-100/90">
            Scroll Narrative · 01
          </span>
          <p className="mt-2 text-sm font-medium text-white/90 [text-shadow:0_1px_8px_rgba(0,0,0,0.25)]">
            画面随滚动回落至原始尺寸
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * 滚动缩放封面 — a gradient-landscape hero pinned inside the internal
 * scroller; scroll scrubs its scale from 1.25 to 1 while the title hands
 * over to a subtitle. Transform/opacity only.
 */
export default function ZoomHero() {
  return (
    <ScrollShell>
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
