import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * The card is gently pulled toward the cursor while it is inside the preview
 * (distance-based falloff, max 24px) and springs back to origin on leave.
 * Inner content moves at 0.5x for parallax depth.
 */
export default function MagneticCard() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18 });
  const sy = useSpring(y, { stiffness: 200, damping: 18 });
  const innerX = useTransform(sx, (v) => v * 0.5);
  const innerY = useTransform(sy, (v) => v * 0.5);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    if (dist < 1) {
      x.set(0);
      y.set(0);
      return;
    }
    // falloff: full strength near the center, fading toward the edges
    const range = Math.max(rect.width, rect.height) / 2;
    const pull = Math.max(0, 1 - dist / range);
    x.set((dx / dist) * 24 * pull);
    y.set((dy / dist) * 24 * pull);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="flex h-full w-full cursor-pointer items-center justify-center"
    >
      <motion.div
        style={{ x: sx, y: sy }}
        className="relative h-44 w-72 rounded-xl border border-zinc-200 bg-white shadow-[0_12px_32px_-12px_rgba(0,0,0,0.12)]"
      >
        <motion.div
          style={{ x: innerX, y: innerY }}
          className="flex h-full flex-col justify-between p-5"
        >
          <div className="h-2 w-10 rounded-full bg-zinc-950" />
          <div>
            <div className="text-sm font-semibold text-zinc-950">Magnetic</div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-wider text-zinc-400">
              i follow your cursor
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
