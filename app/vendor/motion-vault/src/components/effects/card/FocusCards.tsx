import { useState } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  { label: 'ridge', title: '山脊', bg: 'linear-gradient(180deg, #D4D4D8 0%, #71717A 100%)' },
  { label: 'valley', title: '山谷', bg: 'linear-gradient(180deg, #E4E4E7 0%, #52525B 100%)' },
  { label: 'peak', title: '峰顶', bg: 'linear-gradient(180deg, #F4F4F5 0%, #3F3F46 100%)' },
];

/**
 * Aceternity Focus Cards: three small cards in a row — hovering one scales
 * it up (1.05) and sharp, while the rest blur(4px), shrink (0.96) and dim
 * into the background. Spring transitions (stiffness 260, damping 22).
 */
export default function FocusCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-4" onPointerLeave={() => setHovered(null)}>
        {CARDS.map((card, i) => {
          const active = hovered === i;
          const dimmed = hovered !== null && !active;
          return (
            <motion.div
              key={card.label}
              onPointerEnter={() => setHovered(i)}
              animate={{
                scale: active ? 1.05 : dimmed ? 0.96 : 1,
                opacity: dimmed ? 0.5 : 1,
                filter: dimmed ? 'blur(4px)' : 'blur(0px)',
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative flex h-40 w-28 cursor-pointer flex-col justify-between overflow-hidden rounded-xl border border-zinc-200 p-3"
              style={{ background: card.bg }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/80">
                {card.label}
              </span>
              <span className="text-[13px] font-semibold text-white">{card.title}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
