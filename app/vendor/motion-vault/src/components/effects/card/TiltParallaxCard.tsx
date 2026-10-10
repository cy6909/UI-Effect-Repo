import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Pointer tilt (±8°, springs) on a white card while three inner layers
 * translate at different depths — background blob 0.3×, mid content card
 * 0.6×, foreground badge/title 1.0× — plus a soft glare sweep. MotionValue-only.
 */
export default function TiltParallaxCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0); // -1..1
  const py = useMotionValue(0); // -1..1
  const sx = useSpring(px, { stiffness: 160, damping: 20 });
  const sy = useSpring(py, { stiffness: 160, damping: 20 });

  const rotateX = useTransform(sy, [-1, 1], [8, -8]);
  const rotateY = useTransform(sx, [-1, 1], [-8, 8]);

  // depth layers — amplitudes scale 0.3× / 0.6× / 1.0× of a 30px peak
  const bgX = useTransform(sx, [-1, 1], [-9, 9]);
  const bgY = useTransform(sy, [-1, 1], [-9, 9]);
  const midX = useTransform(sx, [-1, 1], [-18, 18]);
  const midY = useTransform(sy, [-1, 1], [-18, 18]);
  const fgX = useTransform(sx, [-1, 1], [-30, 30]);
  const fgY = useTransform(sy, [-1, 1], [-30, 30]);

  // soft glare sweep following the pointer
  const glareX = useTransform(sx, [-1, 1], ['15%', '85%']);
  const glareY = useTransform(sy, [-1, 1], ['10%', '90%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) =>
      `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 55%)`,
  );

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }
  function onLeave() {
    px.set(0);
    py.set(0);
  }

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ perspective: 900 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-48 w-72 cursor-pointer overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.15)]"
      >
        {/* background layer — gradient blob, 0.3× depth */}
        <motion.div className="absolute -inset-8" style={{ x: bgX, y: bgY, z: 0 }}>
          <div className="absolute left-2 top-2 h-28 w-28 rounded-full bg-indigo-200/60 blur-2xl" />
          <div className="absolute bottom-2 right-4 h-24 w-24 rounded-full bg-rose-200/60 blur-2xl" />
          <div className="absolute bottom-10 left-10 h-16 w-16 rounded-full bg-amber-100/70 blur-xl" />
        </motion.div>

        {/* mid layer — inner content card, 0.6× depth */}
        <motion.div
          className="absolute inset-x-10 bottom-9 top-11 rounded-xl border border-zinc-200 bg-white/85 p-4 backdrop-blur-sm"
          style={{ x: midX, y: midY, z: 30 }}
        >
          <div className="h-1.5 w-14 rounded-full bg-zinc-950/80" />
          <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-200" />
          <div className="mt-2 h-1.5 w-3/4 rounded-full bg-zinc-200" />
          <div className="mt-2 h-1.5 w-1/2 rounded-full bg-zinc-200" />
        </motion.div>

        {/* foreground layer — badge + title, 1.0× depth */}
        <motion.div
          className="absolute left-5 top-5 flex items-center gap-2"
          style={{ x: fgX, y: fgY, z: 60 }}
        >
          <span className="rounded-full border border-zinc-950 bg-zinc-950 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white">
            depth
          </span>
          <span className="text-sm font-semibold text-zinc-950">Parallax</span>
        </motion.div>

        {/* soft glare sweep */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-2xl"
          style={{ background: glare, z: 80 }}
        />
      </motion.div>
    </div>
  );
}
