import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

const spring = { type: 'spring', stiffness: 210, damping: 24 } as const;

const CELLS = [
  { tag: 'GRID · 01', title: '雾蓝', desc: '清晨海面的低饱和蓝。', bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { tag: 'GRID · 02', title: '暖沙', desc: '午后墙面的米色光。', bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { tag: 'GRID · 03', title: '苔绿', desc: '湿润石阶上的灰绿。', bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)' },
  { tag: 'GRID · 04', title: '陶土', desc: '日落前的最后一点暖。', bg: 'linear-gradient(135deg, #F1E6DE 0%, #E8DAD2 100%)' },
  { tag: 'GRID · 05', title: '薄墨', desc: '铅笔素描的浅灰层。', bg: 'linear-gradient(135deg, #E4E4E7 0%, #D4D4D8 100%)' },
  { tag: 'GRID · 06', title: '晨灰', desc: '天未亮时的冷灰调。', bg: 'linear-gradient(135deg, #ECECEF 0%, #DEDEE2 100%)' },
];

function Cell({
  id,
  big,
  onSelect,
}: {
  id: number;
  big: boolean;
  onSelect: (id: number) => void;
}) {
  const cell = CELLS[id];
  return (
    <motion.button
      layoutId={`layout-grid-${id}`}
      layout
      transition={spring}
      onClick={() => onSelect(id)}
      style={{ background: cell.bg }}
      className="relative block h-full w-full cursor-pointer overflow-hidden rounded-xl border border-zinc-950/10 text-left shadow-[0_10px_28px_-14px_rgba(0,0,0,0.18)]"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={`${id}-${big ? 'big' : 'small'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="absolute inset-0 flex flex-col justify-between p-3"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
            {cell.tag}
          </span>
          {big ? (
            <div>
              <div className="text-[15px] font-semibold text-zinc-800">{cell.title}</div>
              <p className="mt-1 text-xs leading-[1.6] text-zinc-600">{cell.desc}</p>
            </div>
          ) : (
            <div className="text-[11px] font-semibold text-zinc-700">{cell.title}</div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}

/**
 * Layout grid (Aceternity-style): a 2×3 grid of abstract tiles. Clicking any
 * tile springs it into the large main area on the left (layout tween via
 * shared layoutId inside a LayoutGroup) while the other five retreat into
 * small cells in the right column; text content crossfades per cell.
 */
export default function LayoutGrid() {
  const [active, setActive] = useState(0);

  return (
    <LayoutGroup>
      <div className="flex h-full w-full items-center justify-center px-6">
        <div className="grid h-[280px] w-full max-w-[560px] grid-cols-[1.6fr_1fr] gap-3">
          {/* main slot */}
          <div className="relative min-w-0">
            <Cell id={active} big onSelect={setActive} />
          </div>
          {/* right column: the remaining five as small cells */}
          <div className="grid grid-cols-2 gap-3">
            {CELLS.map((cell, i) =>
              i === active ? null : <Cell key={cell.tag} id={i} big={false} onSelect={setActive} />,
            )}
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}
