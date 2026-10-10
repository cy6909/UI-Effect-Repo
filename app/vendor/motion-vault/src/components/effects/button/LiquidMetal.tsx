import { motion, useMotionTemplate, useSpring, useTransform } from 'framer-motion';
import { useMotionValue } from 'framer-motion';

/**
 * A blob of molten highlight flows quickly across the dark button surface
 * following the cursor — radial-gradient, heavily blurred, driven by a fast
 * spring (stiffness 400, damping 30) so it sloshes like mercury. A hairline
 * bright inner ring edges the button. Pointer tracking lives entirely in
 * MotionValues (zero React re-renders on move).
 */
export default function LiquidMetal() {
  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);
  const sx = useSpring(mx, { stiffness: 400, damping: 30 });
  const sy = useSpring(my, { stiffness: 400, damping: 30 });

  // blob center offset by half its size (128px)
  const blobX = useTransform(sx, (v) => v - 64);
  const blobY = useTransform(sy, (v) => v - 64);
  // faint secondary glint tracking the same springs
  const glint = useMotionTemplate`radial-gradient(90px circle at ${sx}px ${sy}px, rgba(255,255,255,0.22) 0%, transparent 70%)`;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.button
        type="button"
        onPointerMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          mx.set(e.clientX - rect.left);
          my.set(e.clientY - rect.top);
        }}
        onPointerLeave={() => {
          mx.set(-200);
          my.set(-200);
        }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: 'spring', stiffness: 420, damping: 17 }}
        className="relative h-11 cursor-pointer overflow-hidden rounded-lg bg-zinc-950 px-8 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.16),inset_0_1px_0_0_rgba(255,255,255,0.12)]"
      >
        {/* mercury blob */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute h-32 w-32 rounded-full blur-2xl"
          style={{
            x: blobX,
            y: blobY,
            background:
              'radial-gradient(circle, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0.12) 45%, transparent 72%)',
          }}
        />
        {/* sharp glint core */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glint }}
        />
        <span className="relative z-10">液态金属</span>
      </motion.button>
    </div>
  );
}
