import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Aceternity Wobble Card: the card's content jellies toward the cursor and
 * wobbles back to rest on release (stiffness 300, damping 10), with a slight
 * rotate; the card itself breathes with an elastic scale on hover. Pointer
 * drives MotionValues directly — no setState on move.
 */
export default function WobbleCard() {
  const nx = useMotionValue(0.5);
  const ny = useMotionValue(0.5);
  const hover = useMotionValue(0);

  // loose jelly springs — low damping gives the wobble
  const sx = useSpring(nx, { stiffness: 300, damping: 10 });
  const sy = useSpring(ny, { stiffness: 300, damping: 10 });
  const sHover = useSpring(hover, { stiffness: 260, damping: 16 });

  const contentX = useTransform(sx, [0, 1], [-14, 14]);
  const contentY = useTransform(sy, [0, 1], [-10, 10]);
  const rotate = useTransform(sx, [0, 1], [-2.5, 2.5]);
  const cardScale = useTransform(sHover, [0, 1], [1, 1.03]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.div
        onPointerMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          nx.set((e.clientX - b.left) / b.width);
          ny.set((e.clientY - b.top) / b.height);
        }}
        onPointerEnter={() => hover.set(1)}
        onPointerLeave={() => {
          nx.set(0.5);
          ny.set(0.5);
          hover.set(0);
        }}
        style={{ scale: cardScale }}
        className="relative h-48 w-80 max-w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white"
      >
        <motion.div
          style={{ x: contentX, y: contentY, rotate }}
          className="flex h-full flex-col justify-between p-5"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
            wobble / jelly
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-950">Wobble Card</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-500">
              内容像果冻一样追向光标，
              <br />
              松手后晃晃悠悠地弹回原位。
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
