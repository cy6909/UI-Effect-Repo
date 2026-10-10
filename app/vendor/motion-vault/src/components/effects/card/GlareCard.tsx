import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Aceternity Glare Card: a wide diagonal glare band sweeps across the card
 * with the cursor — translating and subtly rotating, like light raking over
 * brushed metal. Low-opacity white linear-gradient on a dark face; fades in
 * only while hovering. MotionValue-driven, no setState on pointermove.
 */
export default function GlareCard() {
  const nx = useMotionValue(0.5);
  const hover = useMotionValue(0);

  const sx = useSpring(nx, { stiffness: 180, damping: 22 });
  const sHover = useSpring(hover, { stiffness: 200, damping: 24 });

  // glare band sweeps left→right and tilts a few degrees with the cursor
  const glareX = useTransform(sx, [0, 1], ['-130%', '130%']);
  const glareRotate = useTransform(sx, [0, 1], [-28, -14]);
  const glareOpacity = useTransform(sHover, [0, 1], [0, 1]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        onPointerMove={(e) => {
          const b = e.currentTarget.getBoundingClientRect();
          nx.set((e.clientX - b.left) / b.width);
        }}
        onPointerEnter={() => hover.set(1)}
        onPointerLeave={() => {
          nx.set(0.5);
          hover.set(0);
        }}
        className="relative h-48 w-80 max-w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-800"
        style={{
          background:
            'linear-gradient(160deg, #27272A 0%, #18181B 55%, #09090B 100%)',
        }}
      >
        {/* diagonal glare band (oversized so rotation never shows gaps) */}
        <motion.div
          aria-hidden
          style={{ x: glareX, rotate: glareRotate, opacity: glareOpacity }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[260%] w-24 -translate-x-1/2 -translate-y-1/2"
        >
          <div
            className="h-full w-full"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 22%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.06) 78%, transparent 100%)',
            }}
          />
        </motion.div>

        <div className="relative flex h-full flex-col justify-between p-5">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-500">
            glare / metal
          </span>
          <div>
            <div className="text-sm font-semibold text-zinc-100">Glare Card</div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-400">
              一道宽斜的眩光随鼠标扫过卡面，
              <br />
              像光掠过拉丝金属的表面。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
