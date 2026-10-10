import { motion, useReducedMotion } from 'framer-motion';

/** Heights peak in the middle bar, like an equalizer readout. */
const HEIGHTS = [24, 32, 40, 32, 24];

/** Five rounded bars doing an equalizer dance. */
export default function BarWave() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="flex h-10 items-center gap-1.5">
        {HEIGHTS.map((h, i) => (
          <motion.span
            key={i}
            className="block w-1 rounded-full bg-zinc-800"
            style={{ height: h, transformOrigin: 'center' }}
            animate={reduced ? undefined : { scaleY: [0.3, 1, 0.3] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
          />
        ))}
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        bar wave
      </span>
    </div>
  );
}
