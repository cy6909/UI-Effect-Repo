import { motion, useReducedMotion } from 'framer-motion';

/** Three 8px dots bouncing in sequence — the classic typing indicator. */
export default function DotsBounce() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block h-2 w-2 rounded-full bg-zinc-800"
            animate={reduced ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        dots bounce
      </span>
    </div>
  );
}
