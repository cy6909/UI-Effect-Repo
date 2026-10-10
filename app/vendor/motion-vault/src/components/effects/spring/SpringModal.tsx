import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

/**
 * Spring modal: enters with an overshoot spring (scale 0.6 → 1, y 40 → 0,
 * stiffness 260 / damping 17) over a fading backdrop, can be dragged
 * downward — past 100px it dismisses with a quick drop-down exit.
 * Everything stays inside the preview window (absolute, not fixed).
 */
export default function SpringModal() {
  const [open, setOpen] = useState(false);
  const areaRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={areaRef} className="relative flex h-full w-full items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-zinc-800 active:scale-[0.98]"
      >
        打开弹窗
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 z-10 bg-zinc-950/20"
            />
            <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
              <motion.div
                drag="y"
                dragConstraints={areaRef}
                dragElastic={{ top: 0.05, bottom: 0.4 }}
                onDragEnd={(_, info) => {
                  if (info.offset.y > 100) setOpen(false);
                }}
                initial={{ scale: 0.6, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ y: 120, opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }}
                transition={{ type: 'spring', stiffness: 260, damping: 17 }}
                className="pointer-events-auto w-[280px] cursor-grab rounded-2xl border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/10 active:cursor-grabbing"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="text-[15px] font-semibold text-zinc-950">弹簧弹窗</h4>
                  <button
                    type="button"
                    aria-label="关闭"
                    onClick={() => setOpen(false)}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <p className="mt-2 text-sm leading-[1.7] text-zinc-600">
                  带着过冲弹簧入场。试试向下拖拽——超过 100px 就会松手坠落关闭。
                </p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="mt-4 w-full rounded-lg bg-zinc-950 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
                >
                  知道了
                </button>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
