import { useState } from 'react';
import { motion } from 'framer-motion';

const ROTS = [-16, -8, 0, 8, 16];
const XS = [-132, -66, 0, 66, 132];
const YS = [10, 4, 0, 4, 10];
const LABELS = ['01', '02', '03', '04', '05'];

/** A stack of cards that fans out on hover, pivoting from the bottom center. */
export default function CardFan() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative h-[210px] w-[420px] max-w-full">
        {LABELS.map((label, i) => (
          <motion.div
            key={label}
            animate={{
              rotate: open ? ROTS[i] : (i - 2) * 1.4,
              x: open ? XS[i] : (i - 2) * 6,
              y: open ? YS[i] : -i * 2,
            }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            style={{ transformOrigin: '50% 100%', zIndex: 10 - Math.abs(i - 2) }}
            className="absolute left-1/2 top-0 -ml-[66px] h-[190px] w-[132px] rounded-xl border border-zinc-200 bg-white p-4 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)]"
          >
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-zinc-200" />
              <div className="h-1.5 w-12 rounded-full bg-zinc-200" />
            </div>
            <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100" />
            <div className="mt-2 h-1.5 w-3/4 rounded-full bg-zinc-100" />
            <div className="absolute bottom-4 left-4 font-mono text-[10px] tracking-[0.12em] text-zinc-300">
              {label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
