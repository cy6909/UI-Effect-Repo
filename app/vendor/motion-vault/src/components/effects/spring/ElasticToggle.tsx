import { useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

/**
 * Elastic toggle: the knob stretches while sliding (scaleX 1.4 → 1 with
 * squash) and travels on a spring (stiffness 500, damping 28); the track
 * tweens zinc-200 ⇄ zinc-950 and tiny sun/moon icons crossfade inside
 * the knob.
 */
export default function ElasticToggle() {
  const [on, setOn] = useState(false);
  const squash = useAnimationControls();

  const toggle = () => {
    setOn((v) => !v);
    void squash.start({
      scaleX: [1, 1.4, 1],
      scaleY: [1, 0.78, 1],
      transition: { duration: 0.45, times: [0, 0.45, 1], ease: 'easeOut' },
    });
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <motion.button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={toggle}
        initial={false}
        animate={{ backgroundColor: on ? '#09090B' : '#E4E4E7' }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex h-8 w-14 items-center rounded-full px-1"
      >
        <motion.span
          initial={false}
          animate={{ x: on ? 24 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 28 }}
          className="h-6 w-6"
        >
          <motion.span
            initial={false}
            animate={squash}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <span className="relative flex h-3 w-3 items-center justify-center">
              <motion.span
                initial={false}
                animate={{ opacity: on ? 0 : 1, scale: on ? 0.5 : 1, rotate: on ? -90 : 0 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute"
              >
                <Sun className="h-3 w-3 text-zinc-950" />
              </motion.span>
              <motion.span
                initial={false}
                animate={{ opacity: on ? 1 : 0, scale: on ? 1 : 0.5, rotate: on ? 0 : 90 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute"
              >
                <Moon className="h-3 w-3 text-zinc-500" />
              </motion.span>
            </span>
          </motion.span>
        </motion.span>
      </motion.button>
      <span className="font-mono text-xs text-zinc-400">{on ? 'ON' : 'OFF'}</span>
    </div>
  );
}
