import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Dark trading-style card with pointer-tracked 3D tilt plus a holographic
 * glare layer: a low-opacity spectrum gradient (color-dodge) whose position
 * follows the pointer, and a faint diagonal shine band. All MotionValue-driven.
 */
export default function HoloCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const hover = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 180, damping: 22 });
  const sy = useSpring(py, { stiffness: 180, damping: 22 });
  const sh = useSpring(hover, { stiffness: 260, damping: 28 });

  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-10, 10]);

  // holographic spectrum wash — position counter-follows the pointer
  const holoPos = useTransform(
    [sx, sy],
    ([x, y]) => `${(1 - (x as number)) * 100}% ${(1 - (y as number)) * 100}%`,
  );

  // diagonal shine band sweeping across the card
  const bandX = useTransform(sx, [0, 1], ['-180%', '380%']);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
    hover.set(1);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
    hover.set(0);
  }

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-44 w-72 cursor-pointer overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
      >
        {/* holographic spectrum glare */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl mix-blend-color-dodge"
          style={{
            opacity: sh,
            backgroundImage:
              'linear-gradient(115deg, transparent 18%, rgba(255,138,158,0.35) 34%, rgba(255,216,138,0.35) 44%, rgba(158,255,201,0.35) 54%, rgba(138,194,255,0.35) 64%, rgba(215,154,255,0.35) 76%, transparent 88%)',
            backgroundSize: '250% 250%',
            backgroundPosition: holoPos,
          }}
        />
        {/* faint diagonal shine band */}
        <motion.div
          className="pointer-events-none absolute -inset-y-1/2 left-0 w-1/3 rotate-[20deg]"
          style={{
            x: bandX,
            opacity: sh,
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)',
          }}
        />
        {/* content */}
        <div
          className="relative flex h-full flex-col justify-between p-5"
          style={{ transform: 'translateZ(30px)' }}
        >
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
              holo / 01
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
          </div>
          {/* orb graphic */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="h-16 w-16 rounded-full border border-white/10"
              style={{
                background:
                  'radial-gradient(circle at 32% 30%, rgba(255,255,255,0.35), rgba(255,255,255,0.04) 55%, transparent 75%)',
              }}
            />
          </div>
          <div>
            <div className="text-sm font-semibold text-zinc-50">Holographic</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-500">
              move to shift the spectrum
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
