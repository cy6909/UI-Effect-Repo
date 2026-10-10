import { motion } from 'framer-motion';

/** Black button with a light beam sweeping around its border on a loop. */
export default function BorderBeam() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative overflow-hidden rounded-lg p-px">
        <motion.div
          className="absolute left-1/2 top-1/2 aspect-square w-[300%]"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0deg, rgba(9,9,11,0) 300deg, #09090B 340deg, #09090B 360deg)',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        />
        <button
          type="button"
          className="relative rounded-[7px] bg-zinc-950 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}
