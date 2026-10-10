import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { X } from 'lucide-react';

const spring = { type: 'spring', stiffness: 260, damping: 26 } as const;

const COVER = 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 55%, #E7E0D3 100%)';

/**
 * Expandable card (Aceternity-style): a small abstract card that elastically
 * expands into a large detail card on click — Framer Motion layoutId shared
 * elements (cover / title) tween continuously between the two states. Click
 * the dimmed backdrop or the ✕ button to spring back.
 */
export default function ExpandCard() {
  const [open, setOpen] = useState(false);

  return (
    <LayoutGroup>
      <div className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence>
          {open && (
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 z-10 cursor-pointer bg-zinc-950/15 backdrop-blur-[2px]"
            />
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="panel"
              layoutId="expand-card"
              transition={spring}
              className="absolute z-20 w-[320px] max-w-[86%] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-[0_28px_64px_-20px_rgba(0,0,0,0.3)]"
            >
              <motion.div
                layoutId="expand-cover"
                transition={spring}
                style={{ background: COVER }}
                className="relative h-[140px]"
              >
                <button
                  type="button"
                  aria-label="收起"
                  onClick={() => setOpen(false)}
                  className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-white/60 bg-white/70 text-zinc-600 backdrop-blur transition-colors hover:text-zinc-950 active:scale-95"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </motion.div>
              <motion.div layoutId="expand-title" transition={spring} className="px-4 pt-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  DETAIL · 01
                </span>
                <div className="mt-0.5 text-[15px] font-semibold text-zinc-900">雾蓝研究笔记</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.18, duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.12 } }}
                className="px-4 pb-4 pt-2"
              >
                <p className="text-xs leading-[1.7] text-zinc-600">
                  点击小卡后，封面与标题作为共享元素连续变形到详情态，其余内容延迟淡入——一次完整
                  的共享布局补间。
                </p>
                <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-100" />
                <div className="mt-2 h-1.5 w-2/3 rounded-full bg-zinc-100" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.button
              key="trigger"
              layoutId="expand-card"
              transition={spring}
              onClick={() => setOpen(true)}
              className="w-[230px] cursor-pointer overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-[0_12px_32px_-14px_rgba(0,0,0,0.18)] transition-colors hover:border-zinc-300"
            >
              <motion.div
                layoutId="expand-cover"
                transition={spring}
                style={{ background: COVER }}
                className="h-[104px]"
              />
              <motion.div layoutId="expand-title" transition={spring} className="p-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                  DETAIL · 01
                </span>
                <div className="mt-0.5 text-[13px] font-semibold text-zinc-900">雾蓝研究笔记</div>
              </motion.div>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
