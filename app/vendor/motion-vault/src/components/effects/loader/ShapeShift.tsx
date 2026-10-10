import { motion, useReducedMotion } from 'framer-motion';

/**
 * A 28px square morphing square → circle → diamond → circle → square
 * while rotating 90° per phase (1.6s per quarter-cycle).
 */
export default function ShapeShift() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <motion.div
        className="h-7 w-7 bg-zinc-950"
        animate={
          reduced
            ? undefined
            : {
                rotate: [0, 90, 180, 270, 360],
                borderRadius: ['4px', '50%', '4px', '50%', '4px'],
              }
        }
        transition={{ duration: 6.4, times: [0, 0.25, 0.5, 0.75, 1], repeat: Infinity, ease: 'easeInOut' }}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        shape shift
      </span>
    </div>
  );
}
