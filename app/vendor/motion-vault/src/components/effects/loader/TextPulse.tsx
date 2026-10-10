import { motion, useReducedMotion } from 'framer-motion';

const CHARS = ['加', '载', '中', '.', '.', '.'];

/** '加载中…' — each character breathes opacity in sequence. Calm and quiet. */
export default function TextPulse() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="font-mono text-sm tracking-[0.08em] text-zinc-600">
        {CHARS.map((c, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={reduced ? undefined : { opacity: [0.25, 1, 0.25] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          >
            {c}
          </motion.span>
        ))}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        text pulse
      </span>
    </div>
  );
}
