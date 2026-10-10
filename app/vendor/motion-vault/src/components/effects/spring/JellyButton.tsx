import { motion, useAnimationControls } from 'framer-motion';

/**
 * Jelly button: click triggers extreme squash-and-stretch with volume
 * preservation (scaleX up ⇄ scaleY down). Implemented as two chained
 * springs — a fast squash out, then a low-damping settle back that
 * overshoots naturally — because framer-motion's spring generator only
 * reads the first/last keyframe ([1,…,1] would be a zero-delta no-op).
 */
export default function JellyButton() {
  const controls = useAnimationControls();

  const jiggle = async () => {
    // phase 1: squash out fast
    await controls.start({ scaleX: 1.3, scaleY: 0.75 }, { type: 'spring', stiffness: 400, damping: 10 });
    // phase 2: low-damping settle back — overshoot gives the jelly wobble
    void controls.start({ scaleX: 1, scaleY: 1 }, { type: 'spring', stiffness: 300, damping: 8 });
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <motion.button
        type="button"
        onClick={jiggle}
        animate={controls}
        className="rounded-full bg-zinc-950 px-10 py-4 text-base font-semibold text-white"
      >
        点我试试
      </motion.button>
    </div>
  );
}
