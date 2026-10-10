import { motion } from 'framer-motion';

/**
 * Effect — a bright arc (and a fainter second one, half a lap behind) travels endlessly around a
 * rounded card outline via the pathLength=100 + stroke-dasharray + animated stroke-dashoffset trick.
 */
export default function BorderTrailPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center" aria-label="光点沿卡片边框循环描边">
      <div className="relative h-[168px] w-[296px]">
        <svg viewBox="0 0 296 168" className="absolute inset-0 h-full w-full" aria-hidden>
          {/* base hairline border */}
          <rect x={1} y={1} width={294} height={166} rx={16} fill="white" stroke="#E4E4E7" strokeWidth={1} />
          {/* bright travelling arc */}
          <motion.rect
            x={1}
            y={1}
            width={294}
            height={166}
            rx={16}
            fill="none"
            stroke="#09090B"
            strokeWidth={1.5}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="9 91"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -100 }}
            transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
          />
          {/* fainter companion arc, half a lap behind */}
          <motion.rect
            x={1}
            y={1}
            width={294}
            height={166}
            rx={16}
            fill="none"
            stroke="#A1A1AA"
            strokeWidth={1}
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray="5 95"
            initial={{ strokeDashoffset: -50 }}
            animate={{ strokeDashoffset: -150 }}
            transition={{ duration: 3.2, ease: 'linear', repeat: Infinity }}
          />
        </svg>
        {/* static card content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <span className="font-mono text-sm font-medium uppercase tracking-[0.24em] text-zinc-950">
            Border Trail
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
            stroke-dashoffset loop
          </span>
        </div>
      </div>
    </div>
  );
}
