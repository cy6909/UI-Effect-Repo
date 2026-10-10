import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/** A white card that tilts in 3D following the pointer, with a soft moving glare. */
export default function TiltCard() {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 22 });
  const sy = useSpring(py, { stiffness: 180, damping: 22 });

  const rotateX = useTransform(sy, [0, 1], [10, -10]);
  const rotateY = useTransform(sx, [0, 1], [-12, 12]);
  const glareX = useTransform(sx, [0, 1], ['20%', '80%']);
  const glareY = useTransform(sy, [0, 1], ['15%', '85%']);
  const glare = useTransform(
    [glareX, glareY],
    ([x, y]) => `radial-gradient(circle at ${x} ${y}, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 55%)`,
  );

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <div className="flex h-full w-full items-center justify-center" style={{ perspective: 800 }}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative h-40 w-64 cursor-pointer rounded-xl border border-zinc-200 bg-white shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)]"
      >
        <motion.div className="absolute inset-0 rounded-xl" style={{ background: glare }} />
        <div className="relative flex h-full flex-col justify-between p-5" style={{ transform: 'translateZ(28px)' }}>
          <div className="h-2 w-10 rounded-full bg-zinc-950" />
          <div>
            <div className="text-sm font-semibold text-zinc-950">3D Tilt</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400">move your mouse</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
