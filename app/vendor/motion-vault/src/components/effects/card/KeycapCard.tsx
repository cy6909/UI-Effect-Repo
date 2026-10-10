import { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const TRAVEL = 8; // px the cap physically depresses

/**
 * A big mechanical keycap. The darker zinc-300 side is extruded 8px below the
 * zinc-100 top face; on pointerdown the top face translates down 8px (covering
 * the side, so the extrusion visually shrinks) with a softer shadow, and
 * springs back on release (stiffness 500, damping 25).
 */
export default function KeycapCard() {
  const y = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 500, damping: 25 });
  const shadow = useTransform(
    sy,
    [0, TRAVEL],
    ['0 14px 28px -10px rgba(0,0,0,0.22)', '0 2px 6px -2px rgba(0,0,0,0.16)'],
  );
  const [presses, setPresses] = useState(0);

  const press = () => {
    y.set(TRAVEL);
    setPresses((p) => p + 1);
  };
  const release = () => y.set(0);

  return (
    <div className="flex h-full w-full select-none flex-col items-center justify-center gap-7">
      <div className="relative h-32 w-32">
        {/* side / bottom extrusion (peeks 8px below the top face) */}
        <div className="absolute inset-0 translate-y-2 rounded-2xl bg-zinc-300" />
        {/* top face */}
        <motion.div
          style={{ y: sy, boxShadow: shadow, touchAction: 'none' }}
          onPointerDown={press}
          onPointerUp={release}
          onPointerLeave={release}
          onPointerCancel={release}
          className="absolute inset-0 cursor-pointer rounded-2xl border border-zinc-200 bg-zinc-100"
        >
          {/* subtle concave dish via inset shadow */}
          <div className="absolute inset-3 flex items-center justify-center rounded-xl bg-zinc-50 shadow-[inset_0_3px_10px_rgba(0,0,0,0.10),inset_0_-1px_2px_rgba(255,255,255,0.9)]">
            <span className="font-mono text-5xl font-semibold text-zinc-700">K</span>
          </div>
        </motion.div>
      </div>
      <div className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
        <span>press the key</span>
        <span className="text-zinc-300">·</span>
        <span className="tabular-nums text-zinc-500">×{presses}</span>
      </div>
    </div>
  );
}
