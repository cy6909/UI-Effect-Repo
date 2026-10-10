import { useEffect, useRef } from 'react';
import {
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion';

/**
 * Spring cursor: a 20px solid dot (stiffness 500, damping 28 — sticks tight)
 * and a 40px stroked ring (stiffness 150, damping 15 — lazy trailing) both
 * chase the pointer inside the preview. Fast movement stretches the ring into
 * an ellipse along the velocity axes; hovering the text scales the ring 1.6x.
 * Everything runs on MotionValues — zero setState, zero re-renders.
 */
export default function SpringCursor() {
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const shown = useMotionValue(0);
  const hoverScale = useMotionValue(1);

  const dotX = useSpring(mx, { stiffness: 500, damping: 28 });
  const dotY = useSpring(my, { stiffness: 500, damping: 28 });
  const ringX = useSpring(mx, { stiffness: 150, damping: 15 });
  const ringY = useSpring(my, { stiffness: 150, damping: 15 });

  // ellipse stretch from the lazy ring's velocity
  const vx = useVelocity(ringX);
  const vy = useVelocity(ringY);
  const stretchX = useTransform(vx, (v) => 1 + Math.min(Math.abs(v) / 1600, 0.45));
  const stretchY = useTransform(vy, (v) => 1 + Math.min(Math.abs(v) / 1600, 0.45));
  const ringScaleX = useTransform(() => stretchX.get() * hoverScale.get());
  const ringScaleY = useTransform(() => stretchY.get() * hoverScale.get());

  // center each shape on the pointer without mixing Tailwind translates
  const dotLeft = useTransform(dotX, (v) => v - 10);
  const dotTop = useTransform(dotY, (v) => v - 10);
  const ringLeft = useTransform(ringX, (v) => v - 20);
  const ringTop = useTransform(ringY, (v) => v - 20);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mx.set(rect.width / 2);
    my.set(rect.height / 2);
  }, [mx, my]);

  const hoverOn = () =>
    void animate(hoverScale, 1.6, { type: 'spring', stiffness: 300, damping: 18 });
  const hoverOff = () =>
    void animate(hoverScale, 1, { type: 'spring', stiffness: 300, damping: 18 });

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mx.set(e.clientX - rect.left);
        my.set(e.clientY - rect.top);
      }}
      onPointerEnter={() => void animate(shown, 1, { duration: 0.2 })}
      onPointerLeave={() => void animate(shown, 0, { duration: 0.25 })}
      className="relative flex h-full w-full cursor-none items-center justify-center overflow-hidden"
    >
      <span
        onPointerEnter={hoverOn}
        onPointerLeave={hoverOff}
        className="select-none px-4 py-2 text-sm text-zinc-500"
      >
        移动鼠标，悬停这段文字试试
      </span>

      {/* lazy trailing ring */}
      <motion.div
        aria-hidden="true"
        style={{
          x: ringLeft,
          y: ringTop,
          scaleX: ringScaleX,
          scaleY: ringScaleY,
          opacity: shown,
        }}
        className="pointer-events-none absolute left-0 top-0 h-10 w-10 rounded-full border-[1.5px] border-zinc-950"
      />
      {/* tight solid dot */}
      <motion.div
        aria-hidden="true"
        style={{ x: dotLeft, y: dotTop, opacity: shown }}
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 rounded-full bg-zinc-950"
      />
    </div>
  );
}
