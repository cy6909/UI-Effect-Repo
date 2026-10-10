import { motion, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

/** CSS-only valley "photograph": sage sky, soft sun, three mountain silhouettes, mist. */
function Valley() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, #e6ede4 0%, #f2efe2 52%, #faf9f4 100%)' }}
      />
      <div
        className="absolute right-[16%] top-[10%] h-24 w-24 rounded-full"
        style={{ background: 'radial-gradient(circle, #fdf6dd 0%, rgba(253,246,221,0) 68%)' }}
      />
      {/* back ridge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[62%]"
        style={{
          background: '#bccabc',
          clipPath:
            'polygon(0% 62%, 12% 40%, 24% 55%, 38% 28%, 52% 50%, 66% 24%, 80% 48%, 92% 34%, 100% 46%, 100% 100%, 0% 100%)',
        }}
      />
      {/* mid ridge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[46%]"
        style={{
          background: '#8ba08c',
          clipPath:
            'polygon(0% 70%, 16% 44%, 30% 62%, 46% 36%, 60% 58%, 74% 40%, 88% 60%, 100% 48%, 100% 100%, 0% 100%)',
        }}
      />
      {/* front ridge */}
      <div
        className="absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background: '#49564c',
          clipPath:
            'polygon(0% 74%, 14% 52%, 32% 70%, 50% 46%, 68% 68%, 84% 50%, 100% 66%, 100% 100%, 0% 100%)',
        }}
      />
      {/* mist */}
      <div
        className="absolute inset-x-0 bottom-0 h-[26%]"
        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%)' }}
      />
    </div>
  );
}

function Scene({ progress }: { progress: MotionValue<number> }) {
  // strictly increasing ranges inside [0,1] — required by the WAAPI scroll path
  const clipPath = useTransform(
    progress,
    [0.08, 0.62],
    ['inset(45% 42% 45% 42% round 12px)', 'inset(0% 0% 0% 0% round 12px)'],
  );
  const sceneScale = useTransform(progress, [0.08, 0.62], [1.18, 1]);
  const textOpacity = useTransform(progress, [0.52, 0.8], [0, 1]);
  const textY = useTransform(progress, [0.52, 0.8], [16, 0]);
  const textFilter = useTransform(progress, [0.52, 0.8], ['blur(8px)', 'blur(0px)']);
  const labelOpacity = useTransform(progress, [0.05, 0.2], [1, 0]);

  return (
    <div className="relative" style={{ height: 800 }}>
      <div className="sticky top-0 h-[320px] overflow-hidden bg-white">
        <motion.div style={{ clipPath }} className="absolute inset-0 will-change-[clip-path]">
          <motion.div style={{ scale: sceneScale }} className="absolute inset-0">
            <Valley />
          </motion.div>
          <motion.div
            style={{ opacity: textOpacity, y: textY, filter: textFilter }}
            className="absolute inset-x-0 bottom-0 p-5"
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
              valley · 山谷
            </div>
            <div className="mt-1 text-xl font-semibold tracking-tight text-white">
              揭幕时刻
            </div>
            <p className="mt-1 text-[11px] leading-relaxed text-white/70">
              裁切完全展开，画面尽收眼底。
            </p>
          </motion.div>
        </motion.div>
        <motion.span
          style={{ opacity: labelOpacity }}
          className="absolute left-4 top-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400"
        >
          clip reveal
        </motion.span>
      </div>
    </div>
  );
}

/**
 * 裁切揭示 — a "photograph" starts clipped to a thin center strip
 * (clip-path inset 45%/42%) and expands to full bleed as you scroll,
 * while the caption sharpens from blur — a cinematic curtain-raiser.
 */
export default function ClipReveal() {
  return (
    <ScrollShell className="w-[min(88%,440px)]">
      {({ progress }) => <Scene progress={progress} />}
    </ScrollShell>
  );
}
