import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Info } from 'lucide-react';

/**
 * Spring tooltip: hovering the icon pops a tooltip above with a springy
 * entrance (scale 0.5 → 1, stiffness 500 / damping 20, transform-origin
 * bottom-center) plus a 6px rise; it leaves with a quick 100ms shrink.
 */
export default function SpringTooltip() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="relative"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <button
          type="button"
          aria-label="更多信息"
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-300 hover:text-zinc-950"
        >
          <Info className="h-4 w-4" />
        </button>

        <AnimatePresence>
          {show && (
            <motion.div
              initial={{ scale: 0.5, y: 6, x: '-50%', opacity: 0 }}
              animate={{ scale: 1, y: 0, x: '-50%', opacity: 1 }}
              exit={{
                scale: 0.8,
                y: 4,
                x: '-50%',
                opacity: 0,
                transition: { duration: 0.1, ease: 'easeIn' },
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="absolute bottom-full left-1/2 mb-2.5 origin-bottom"
            >
              <div className="relative whitespace-nowrap rounded-lg bg-zinc-950 px-3 py-1.5 text-xs text-white">
                弹簧入场的气泡提示
                <span className="absolute left-1/2 top-full -mt-[5px] h-2.5 w-2.5 -translate-x-1/2 rotate-45 rounded-[2px] bg-zinc-950" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
