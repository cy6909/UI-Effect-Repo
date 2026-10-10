import { motion, useReducedMotion } from 'framer-motion';

/** Main dot + 6 ghost dots trailing behind it (decreasing size & opacity). */
const TRAIL = [
  { size: 8, opacity: 1 },
  { size: 6.5, opacity: 0.45 },
  { size: 5.5, opacity: 0.34 },
  { size: 4.5, opacity: 0.25 },
  { size: 3.5, opacity: 0.17 },
  { size: 3, opacity: 0.11 },
  { size: 2.5, opacity: 0.06 },
];

const RADIUS = 18;

/** One orbiting dot with its comet trail; `reverse` spins counter-clockwise, offset by 180°. */
function Orbiter({ reverse = false }: { reverse?: boolean }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      animate={{ rotate: reverse ? -360 : 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
    >
      {TRAIL.map((t, j) => (
        <div
          key={j}
          className="absolute"
          style={{
            transform: `rotate(${(reverse ? 180 : 0) + (reverse ? 1 : -1) * j * 14}deg)`,
          }}
        >
          <div
            className="rounded-full bg-zinc-950"
            style={{
              width: t.size,
              height: t.size,
              opacity: t.opacity,
              transform: `translate(${RADIUS}px, -50%)`,
            }}
          />
        </div>
      ))}
    </motion.div>
  );
}

/** Two dots orbiting a center point in opposite directions, with fading comet trails. */
export default function OrbitLoader() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute h-1 w-1 rounded-full bg-zinc-300" />
        {reduced ? (
          <>
            <span
              className="absolute h-2 w-2 rounded-full bg-zinc-950"
              style={{ transform: `translateX(${RADIUS}px)` }}
            />
            <span
              className="absolute h-2 w-2 rounded-full bg-zinc-950"
              style={{ transform: `translateX(-${RADIUS}px)` }}
            />
          </>
        ) : (
          <>
            <Orbiter />
            <Orbiter reverse />
          </>
        )}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        orbit
      </span>
    </div>
  );
}
