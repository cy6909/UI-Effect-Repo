import { useState } from 'react';
import { motion, useMotionValueEvent, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

const css = `
.rt-wave {
  animation: rt-wave-slide 5s linear infinite;
}
@keyframes rt-wave-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
`;

// skyline heights (px), left → right
const BUILDINGS = [76, 118, 56, 148, 96, 128, 64, 156, 88, 110, 70, 134];

function Scene({ progress }: { progress: MotionValue<number> }) {
  const [meters, setMeters] = useState('0.0');
  const [phase, setPhase] = useState(0);

  // water climbs from 6% to 84% of the scene height
  const waterH = useTransform(progress, [0, 1], ['6%', '84%']);
  // gauge marker rides the same mapping on a 224px ruler
  const markerBottom = useTransform(progress, [0, 1], ['6%', '84%']);

  useMotionValueEvent(progress, 'change', (v) => {
    const m = (v * 4.2).toFixed(1);
    setMeters((prev) => (prev === m ? prev : m));
    const ph = v < 0.22 ? 0 : v < 0.5 ? 1 : v < 0.8 ? 2 : 3;
    setPhase((prev) => (prev === ph ? prev : ph));
  });

  const phases = [
    '涨潮开始 · 水漫过堤岸',
    '街道沉没 · 只余楼身',
    '深水区 · 屋顶相继消失',
    '潮汐顶点 · 一片汪洋',
  ];

  return (
    <div className="sticky top-0 h-[320px] w-full overflow-hidden">
      <style>{css}</style>
      {/* sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #fafafa 0%, #f4f4f5 55%, #e4e4e7 100%)' }} />
      {/* pale sun */}
      <div className="absolute right-16 top-8 h-10 w-10 rounded-full bg-[#fde68a]/50 blur-[1px]" />

      {/* skyline — windows via repeating gradients, drowning behind the water */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-1.5 px-5">
        {BUILDINGS.map((h, i) => (
          <div
            key={i}
            className="flex-1 rounded-t-[2px]"
            style={{
              height: h,
              background: i % 2 ? '#d4d4d8' : '#c3c3ca',
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent 0 7px, rgba(255,255,255,0.55) 7px 9px), repeating-linear-gradient(90deg, transparent 0 6px, rgba(255,255,255,0.35) 6px 8px)',
            }}
          />
        ))}
      </div>

      {/* rising water — translucent so drowned buildings dim behind it */}
      <motion.div className="absolute bottom-0 left-0 right-0" style={{ height: waterH }}>
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg, rgba(147,180,205,0.72) 0%, rgba(84,118,148,0.82) 100%)' }}
        />
        {/* animated waterline wave, twice as wide, sliding left */}
        <svg className="rt-wave absolute -top-[7px] left-0 h-2 w-[200%]" preserveAspectRatio="none" viewBox="0 0 800 8">
          <path
            d="M0 8 Q12.5 0 25 5 T50 5 T75 5 T100 5 T125 5 T150 5 T175 5 T200 5 T225 5 T250 5 T275 5 T300 5 T325 5 T350 5 T375 5 T400 5 T425 5 T450 5 T475 5 T500 5 T525 5 T550 5 T575 5 T600 5 T625 5 T650 5 T675 5 T700 5 T725 5 T750 5 T775 5 T800 5 L800 8 Z"
            fill="rgba(147,180,205,0.95)"
          />
        </svg>
      </motion.div>

      {/* paper boat — pinned to the waterline, bobbing */}
      <motion.div className="absolute left-[26%]" style={{ bottom: waterH }}>
        <motion.div
          animate={{ y: [0, -3, 0], rotate: [-3, 2.5, -3] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative -translate-y-1"
        >
          <div className="h-0 w-0 border-b-[14px] border-l-[7px] border-r-[7px] border-b-white border-l-transparent border-r-transparent" />
          <div className="-mt-px h-[7px] w-9 -translate-x-[7px] rounded-b-md bg-zinc-800" style={{ clipPath: 'polygon(6% 0, 94% 0, 80% 100%, 20% 100%)' }} />
        </motion.div>
      </motion.div>

      {/* buoys */}
      {[12, 62].map((left, i) => (
        <motion.div key={left} className="absolute" style={{ bottom: waterH, left: `${left}%` }}>
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [i ? 6 : -6, i ? -6 : 6, i ? 6 : -6] }}
            transition={{ duration: 1.9 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
            className="h-2.5 w-2.5 -translate-y-1 rounded-full border-2 border-white bg-amber-400"
          />
        </motion.div>
      ))}

      {/* depth gauge */}
      <div className="absolute right-4 top-1/2 flex h-56 -translate-y-1/2 items-stretch gap-1.5">
        <div className="relative w-px bg-zinc-300">
          {[0, 25, 50, 75, 100].map((t) => (
            <span key={t} className="absolute -left-1 h-px w-1 bg-zinc-300" style={{ top: `${t}%` }} />
          ))}
          <motion.span
            className="absolute -left-[3px] h-[3px] w-[7px] rounded-sm bg-zinc-950"
            style={{ bottom: markerBottom }}
          />
        </div>
        <span className="self-end pb-0.5 font-mono text-[10px] tabular-nums text-zinc-500">
          水位 {meters}m
        </span>
      </div>

      {/* phase caption — top-left so it never collides with the scroll hint pill */}
      <div className="absolute left-4 top-4 rounded-full border border-zinc-200/80 bg-white/85 px-3 py-1 text-[11px] text-zinc-600 shadow-sm backdrop-blur">
        <span className="mr-1.5 font-mono text-[10px] text-zinc-400">{String(phase + 1).padStart(2, '0')}</span>
        {phases[phase]}
      </div>
    </div>
  );
}

/**
 * 滚动涨潮 — scrolling raises the tide inside a harbor scene: the waterline
 * (with a sliding wave) climbs from 6% to 84%, drowning the skyline behind
 * translucent water while a paper boat and two buoys ride the surface with
 * offset bobbing. A depth gauge on the right tracks 水位 0.0 → 4.2m.
 */
export default function RisingTide() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[1100px]">
          <Scene progress={progress} />
        </div>
      )}
    </ScrollShell>
  );
}
