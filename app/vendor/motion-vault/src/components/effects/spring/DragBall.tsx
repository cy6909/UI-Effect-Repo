import { useRef } from 'react';
import { animate, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const BALL = 36;

/** Ghost trail layer following the ball with a lazier spring. */
function Ghost({
  x,
  y,
  stiffness,
  damping,
  opacity,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  stiffness: number;
  damping: number;
  opacity: number;
}) {
  const gx = useSpring(x, { stiffness, damping });
  const gy = useSpring(y, { stiffness, damping });
  return (
    <motion.span
      style={{ x: gx, y: gy, opacity }}
      className="pointer-events-none absolute h-9 w-9 rounded-full bg-zinc-950"
    />
  );
}

/**
 * Spring return ball: drag the 36px zinc-950 ball anywhere in the preview —
 * it stretches into an ellipse along its velocity with 3 fading ghost
 * trails; on release it springs back to the origin (stiffness 180, damping
 * 12) with a visible overshoot. All MotionValues, zero setState.
 */
export default function DragBall() {
  const areaRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const vx = useVelocity(x);
  const vy = useVelocity(y);

  const stretch = useTransform([vx, vy], ([a, b]) => 1 + Math.min(Math.hypot(a as number, b as number) / 1400, 0.5));
  const squash = useTransform([vx, vy], ([a, b]) => 1 - Math.min(Math.hypot(a as number, b as number) / 5200, 0.18));
  const angle = useTransform([vx, vy], ([a, b]) =>
    Math.hypot(a as number, b as number) > 60 ? (Math.atan2(b as number, a as number) * 180) / Math.PI : 0,
  );

  const flyHome = () => {
    animate(x, 0, { type: 'spring', stiffness: 180, damping: 12 });
    animate(y, 0, { type: 'spring', stiffness: 180, damping: 12 });
  };

  return (
    <div ref={areaRef} className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* origin marker */}
      <span className="absolute h-11 w-11 rounded-full border border-dashed border-zinc-300" />

      {/* ghost trails (behind the ball) */}
      <Ghost x={x} y={y} stiffness={110} damping={18} opacity={0.07} />
      <Ghost x={x} y={y} stiffness={150} damping={18} opacity={0.13} />
      <Ghost x={x} y={y} stiffness={200} damping={20} opacity={0.22} />

      {/* draggable ball: outer handles position, inner handles velocity squash */}
      <motion.div
        drag
        dragConstraints={areaRef}
        dragElastic={0.12}
        dragMomentum={false}
        onDragEnd={flyHome}
        style={{ x, y, width: BALL, height: BALL }}
        className="absolute cursor-grab touch-none active:cursor-grabbing"
        aria-label="拖拽小球，松手弹回"
        role="button"
        tabIndex={0}
      >
        <motion.span
          style={{ rotate: angle, scaleX: stretch, scaleY: squash }}
          className="block h-9 w-9 rounded-full bg-zinc-950"
        />
      </motion.div>
    </div>
  );
}
