import { useState } from 'react';
import { motion } from 'framer-motion';

const CARDS = [
  { tag: 'BC · 01', bg: 'linear-gradient(160deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { tag: 'BC · 02', bg: 'linear-gradient(160deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { tag: 'BC · 03', bg: 'linear-gradient(160deg, #E8EDE3 0%, #DDE5D8 100%)' },
  { tag: 'BC · 04', bg: 'linear-gradient(160deg, #F1E6DE 0%, #E8DAD2 100%)' },
  { tag: 'BC · 05', bg: 'linear-gradient(160deg, #E4E4E7 0%, #D4D4D8 100%)' },
];

const spring = { type: 'spring', stiffness: 350, damping: 18 } as const;

/**
 * Bounce cards (React Bits-style): 5 cards in a tight fanned stack. Hovering
 * one lifts and straightens it while its neighbors tilt away to the sides to
 * make room — all on a bouncy spring (stiffness 350, damping 18).
 */
export default function BounceCards() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-[200px] w-[360px]">
        {CARDS.map((card, i) => {
          const off = i - 2; // -2..2, middle card centered
          let x = off * 52;
          let y = Math.abs(off) * 6;
          let rotate = off * 4;
          let scale = 1;
          let zIndex = 10 - Math.abs(off);

          if (hovered !== null) {
            const d = i - hovered;
            if (d === 0) {
              // the hovered card rises and straightens
              x = off * 52;
              y = -22;
              rotate = 0;
              scale = 1.06;
              zIndex = 30;
            } else {
              // neighbors lean away to make room, falling off with distance
              const dir = Math.sign(d);
              const fall = 1 / Math.abs(d);
              x = off * 52 + dir * 18 * fall;
              y = Math.abs(off) * 6 + 6 * fall;
              rotate = off * 4 + dir * 10 * fall;
            }
          }

          return (
            <motion.div
              key={card.tag}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              animate={{ x, y, rotate, scale }}
              transition={spring}
              style={{ zIndex, background: card.bg }}
              className="absolute left-1/2 top-1/2 ml-[-60px] mt-[-85px] h-[170px] w-[120px] cursor-pointer rounded-xl border border-zinc-950/10 shadow-[0_16px_36px_-14px_rgba(0,0,0,0.22)]"
            >
              <div className="flex h-full flex-col justify-between p-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">
                  {card.tag}
                </span>
                <div className="h-1.5 w-2/3 rounded-full bg-zinc-950/10" />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
