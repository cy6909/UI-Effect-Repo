import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

/** Signal-strength bars, ascending like a reception readout. */
const HEIGHTS = [10, 16, 22, 28, 34];
const CYCLE = 1.4;

/**
 * 信号上行 — five bars light up one by one from weak to strong (zinc-950),
 * then the whole column goes dark and the cycle repeats every 1.4s; a small
 * arrow above keeps sliding up and fading out.
 */
export default function Uplink() {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>();
  const running = inView && !reduced;

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center gap-2">
        {/* arrow drifting up on each cycle */}
        <motion.span
          className="flex text-zinc-950"
          animate={running ? { y: [4, -7], opacity: [0, 1, 0] } : { y: 0, opacity: 0.4 }}
          transition={
            running
              ? { duration: CYCLE, repeat: Infinity, times: [0, 0.55, 1], ease: 'easeOut' }
              : { duration: 0.2 }
          }
        >
          <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.5} />
        </motion.span>

        <div className="flex h-9 items-end gap-1.5">
          {HEIGHTS.map((h, i) => (
            <motion.span
              key={i}
              className="block w-1.5 rounded-full"
              style={{ height: h }}
              animate={
                running
                  ? { backgroundColor: ['#e4e4e7', '#09090b', '#09090b', '#e4e4e7'] }
                  : { backgroundColor: '#e4e4e7' }
              }
              transition={
                running
                  ? {
                      duration: CYCLE,
                      repeat: Infinity,
                      delay: i * 0.11,
                      times: [0, 0.18, 0.78, 1],
                      ease: 'easeInOut',
                    }
                  : { duration: 0.2 }
              }
            />
          ))}
        </div>
      </div>
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-zinc-400">
        uplink
      </span>
    </div>
  );
}
