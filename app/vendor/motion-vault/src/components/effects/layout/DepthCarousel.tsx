import { useState } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  { tag: 'FRAME · 01', title: '晨雾森林', bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { tag: 'FRAME · 02', title: '沙丘之上', bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { tag: 'FRAME · 03', title: '苔原石径', bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)' },
  { tag: 'FRAME · 04', title: '陶土黄昏', bg: 'linear-gradient(135deg, #F1E6DE 0%, #E8DAD2 100%)' },
];

/** z-depth slots: back cards shrink to 0.85, sink and dim */
const POS = [
  { y: 0, scale: 1, opacity: 1 },
  { y: 16, scale: 0.93, opacity: 0.8 },
  { y: 32, scale: 0.89, opacity: 0.62 },
  { y: 48, scale: 0.85, opacity: 0.45 },
];

const spring = { type: 'spring', stiffness: 220, damping: 20 } as const;

/**
 * Depth carousel: 4 cards queued along the z axis. Clicking 下一张 flings the
 * front card up-and-side while it fades out; the queue springs forward
 * (stiffness 220 / damping 20) and the flung card re-enters at the very back —
 * an endless loop.
 */
export default function DepthCarousel() {
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const [flying, setFlying] = useState<number | null>(null);

  function next() {
    if (flying !== null) return;
    const front = order[0];
    setFlying(front);
    setOrder((o) => [...o.slice(1), o[0]]);
    window.setTimeout(() => setFlying(null), 420);
  }

  const visible = flying === null ? order : order.filter((c) => c !== flying);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="relative h-[210px] w-[280px]">
        {visible.map((id) => {
          const pos = visible.indexOf(id);
          const t = POS[pos] ?? POS[POS.length - 1];
          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: t.scale, y: t.y }}
              animate={{ y: t.y, scale: t.scale, opacity: t.opacity }}
              transition={spring}
              style={{ zIndex: 40 - pos, background: CARDS[id].bg }}
              className="absolute inset-x-0 top-0 h-[170px] rounded-xl border border-zinc-950/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.22)]"
            >
              <CardFace id={id} />
            </motion.div>
          );
        })}

        {flying !== null && (
          <motion.div
            key={`fly-${flying}`}
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
            animate={{ x: -230, y: -90, rotate: -14, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.42, ease: 'easeIn' }}
            style={{ zIndex: 50, background: CARDS[flying].bg }}
            className="absolute inset-x-0 top-0 h-[170px] rounded-xl border border-zinc-950/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.22)]"
          >
            <CardFace id={flying} />
          </motion.div>
        )}
      </div>

      <button
        type="button"
        onClick={next}
        className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 font-mono text-[11px] tracking-[0.08em] text-zinc-600 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-950 active:scale-95"
      >
        下一张 →
      </button>
    </div>
  );
}

function CardFace({ id }: { id: number }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {CARDS[id].tag}
      </span>
      <div>
        <div className="text-sm font-semibold text-zinc-800">{CARDS[id].title}</div>
        <div className="mt-2 h-1.5 w-3/4 rounded-full bg-zinc-950/10" />
        <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-zinc-950/5" />
      </div>
    </div>
  );
}
