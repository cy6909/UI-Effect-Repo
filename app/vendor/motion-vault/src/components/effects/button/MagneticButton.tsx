import { useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';

/**
 * Magnetic pill button: within 80px of the cursor the whole button is pulled
 * toward it (max 16px, spring stiffness 180 / damping 14) while the inner
 * label follows at 0.4x strength for layered parallax. Springs back on leave.
 * MotionValue-driven — no setState in pointermove.
 */
export default function MagneticButton() {
  const reduced = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 180, damping: 14 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);
  // inner label follows at 0.4x strength
  const lx = useTransform(sx, (v) => v * 0.4);
  const ly = useTransform(sy, (v) => v * 0.4);

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const range = Math.max(rect.width, rect.height) / 2 + 80;
    if (dist < range && dist > 0) {
      const falloff = 1 - dist / range;
      const mag = Math.min(16, dist * 0.6) * Math.max(0, falloff);
      x.set((dx / dist) * mag);
      y.set((dy / dist) * mag);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.button
        ref={btnRef}
        type="button"
        style={{ x: sx, y: sy }}
        className="h-11 rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        <motion.span style={{ x: lx, y: ly }} className="inline-block">
          联系我们
        </motion.span>
      </motion.button>
    </div>
  );
}
