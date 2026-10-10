import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const cards = [
  { id: 0, tag: 'DECK · A', title: '晨间速写', bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { id: 1, tag: 'DECK · B', title: '雾中远行', bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { id: 2, tag: 'DECK · C', title: '陶与苔', bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)' },
];

const slots = [
  { y: 0, rotate: -2.5, scale: 1, opacity: 1, zIndex: 30 },
  { y: 15, rotate: 1.8, scale: 0.95, opacity: 0.92, zIndex: 20 },
  { y: 30, rotate: -1.2, scale: 0.9, opacity: 0.75, zIndex: 10 },
];

/**
 * Card swap cycle: three slightly rotated, offset cards in a stack. Every 4s
 * the top card is drawn out (slides forward-up, fading), reinserted at the
 * bottom (dropping in from behind), and the rest step forward — an endless
 * reshuffle. Interval gated by viewport visibility.
 */
export default function CardSwapCycle() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [order, setOrder] = useState([0, 1, 2]);
  const prevOrder = useRef(order);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => {
      setOrder((o) => {
        prevOrder.current = o;
        return [o[1], o[2], o[0]];
      });
    }, 4000);
    return () => window.clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center">
      <div className="relative h-[230px] w-[320px]">
        {order.map((cardId, pos) => {
          const card = cards[cardId];
          const slot = slots[pos];
          const wasFront = prevOrder.current.indexOf(cardId) === 0;
          const movingToBack = wasFront && pos === 2;

          return (
            <motion.div
              key={card.id}
              initial={false}
              animate={
                movingToBack
                  ? {
                      // draw out forward-up + fade, then drop in from behind
                      y: [slots[0].y, -78, -78, slot.y],
                      rotate: [slots[0].rotate, 2, 2, slot.rotate],
                      scale: [slots[0].scale, 1.04, 1.04, slot.scale],
                      opacity: [1, 0, 0, slot.opacity],
                      zIndex: [30, 40, 5, slot.zIndex],
                      transition: { duration: 0.85, times: [0, 0.38, 0.6, 1], ease },
                    }
                  : {
                      y: slot.y,
                      rotate: slot.rotate,
                      scale: slot.scale,
                      opacity: slot.opacity,
                      zIndex: slot.zIndex,
                      transition: { duration: 0.55, ease },
                    }
              }
              style={{ background: card.bg }}
              className="absolute inset-x-0 top-0 h-[168px] rounded-xl border border-zinc-950/10 shadow-[0_12px_32px_-14px_rgba(0,0,0,0.2)]"
            >
              <div className="flex h-full flex-col justify-between p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {card.tag}
                </span>
                <div>
                  <div className="text-sm font-semibold text-zinc-800">{card.title}</div>
                  <div className="mt-2 h-1.5 w-3/4 rounded-full bg-zinc-950/10" />
                  <div className="mt-1.5 h-1.5 w-1/2 rounded-full bg-zinc-950/5" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
