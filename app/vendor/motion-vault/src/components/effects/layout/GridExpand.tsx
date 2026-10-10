import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { X } from 'lucide-react';

const ease = [0.42, 0, 0.58, 1] as [number, number, number, number];

const cards = [
  {
    label: 'A · 01',
    title: '沙丘',
    desc: '暖灰渐变铺底，像午后斜照在纸面上的光。',
    bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)',
  },
  {
    label: 'A · 02',
    title: '苔原',
    desc: '灰与绿之间留一点呼吸，安静、不抢眼。',
    bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)',
  },
  {
    label: 'B · 01',
    title: '远空',
    desc: '阴天的蓝灰调，像雾气里退远的天际线。',
    bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)',
  },
  {
    label: 'B · 02',
    title: '陶土',
    desc: '温润的粉褐，像一件刚出窑的手作器物。',
    bg: 'linear-gradient(135deg, #F1E6DE 0%, #E8DAD2 100%)',
  },
];

/** 2×2 gallery: click a card and it expands (shared layout) to fill the preview. */
export default function GridExpand() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <LayoutGroup>
      <div className="relative flex h-full w-full items-center justify-center p-6">
        <div className="grid h-[240px] w-full max-w-[520px] grid-cols-2 grid-rows-2 gap-3">
          {cards.map((c, i) =>
            open === i ? (
              <div key={c.label} className="rounded-xl" />
            ) : (
              <motion.button
                key={c.label}
                type="button"
                layoutId={`grid-expand-${i}`}
                onClick={() => setOpen(i)}
                animate={{ opacity: open !== null ? 0.3 : 1 }}
                transition={{ duration: 0.5, ease }}
                style={{ background: c.bg }}
                className="flex cursor-pointer items-end rounded-xl border border-zinc-950/5 p-3 text-left"
              >
                <span className="font-mono text-[11px] tracking-[0.1em] text-zinc-500">{c.label}</span>
              </motion.button>
            ),
          )}
        </div>

        <AnimatePresence>
          {open !== null && (
            <motion.div
              key="expanded"
              layoutId={`grid-expand-${open}`}
              onClick={() => setOpen(null)}
              transition={{ duration: 0.5, ease }}
              style={{ background: cards[open].bg }}
              className="absolute inset-4 z-10 cursor-pointer rounded-xl border border-zinc-950/5 p-6"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex h-full flex-col justify-end"
              >
                <div className="font-mono text-[11px] tracking-[0.14em] text-zinc-500">
                  {cards[open].label}
                </div>
                <div className="mt-1 text-lg font-semibold text-zinc-800">{cards[open].title}</div>
                <p className="mt-1.5 max-w-[320px] text-[13px] leading-[1.7] text-zinc-600">
                  {cards[open].desc}
                </p>
              </motion.div>
              <button
                type="button"
                aria-label="关闭"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(null);
                }}
                className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-950/10 bg-white/70 text-zinc-500 backdrop-blur transition-colors hover:text-zinc-950"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </LayoutGroup>
  );
}
