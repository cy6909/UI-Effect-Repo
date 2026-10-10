import { motion, useReducedMotion } from 'framer-motion';

/**
 * Outlined button that fills with black liquid from the bottom on hover:
 * the fill layer's top edge is a gently undulating SVG wave rising with
 * translateY 100% -> 0 (0.5s ease-out); the label flips to white after
 * a 0.3s delay. Reverses on mouse leave.
 */
export default function LiquidFill() {
  const reduced = useReducedMotion();

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        type="button"
        className="group relative h-11 overflow-hidden rounded-lg border border-zinc-950 bg-white px-6 text-sm font-medium text-zinc-950"
      >
        {/* liquid fill layer */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0"
        >
          {/* undulating wave top edge */}
          {reduced ? (
            <span className="absolute left-0 top-0 h-3 w-full">
              <svg
                viewBox="0 0 1200 48"
                preserveAspectRatio="none"
                className="block h-full w-full"
                fill="#09090B"
              >
                <path d="M0 28 Q150 8 300 28 T600 28 T900 28 T1200 28 V48 H0 Z" />
              </svg>
            </span>
          ) : (
            <motion.span
              className="absolute left-0 top-0 block h-3 w-[200%]"
              animate={{ x: ['0%', '-50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              <svg
                viewBox="0 0 1200 48"
                preserveAspectRatio="none"
                className="block h-full w-full"
                fill="#09090B"
              >
                <path d="M0 28 Q150 8 300 28 T600 28 T900 28 T1200 28 V48 H0 Z" />
              </svg>
            </motion.span>
          )}
          <span className="absolute inset-x-0 bottom-0 top-3 bg-zinc-950" />
        </span>
        <span className="relative z-10 transition-colors delay-0 duration-300 group-hover:text-white group-hover:delay-300">
          探索更多
        </span>
      </button>
    </div>
  );
}
