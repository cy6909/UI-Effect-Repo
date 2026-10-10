import { motion, useReducedMotion } from 'framer-motion';

const RING_MASK =
  'radial-gradient(farthest-side, transparent calc(100% - 4.5px), #000 calc(100% - 4px))';

/** A 40px conic-gradient ring spinning smoothly — no steps, no seams. */
export default function RingSpin() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <motion.div
        className="h-10 w-10 rounded-full"
        style={{
          background: 'conic-gradient(from 0deg, rgba(9,9,11,0) 0%, #09090B 100%)',
          WebkitMask: RING_MASK,
          mask: RING_MASK,
        }}
        animate={reduced ? undefined : { rotate: 360 }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
      />
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        gradient ring
      </span>
    </div>
  );
}
