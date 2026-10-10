import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const INTERVAL = 3000;

const CARDS = [
  { id: 'a', label: 'MOTION', title: '弹性曲线', bar: 'bg-indigo-300', bg: 'from-indigo-50/80 to-white' },
  { id: 'b', label: 'GESTURE', title: '手势反馈', bar: 'bg-amber-300', bg: 'from-amber-50/80 to-white' },
  { id: 'c', label: 'DETAIL', title: '细节层次', bar: 'bg-emerald-300', bg: 'from-emerald-50/80 to-white' },
];

/** slot 0 = front, slot 2 = back of the stack */
const SLOTS = [
  { y: 0, scale: 1, opacity: 1, zIndex: 30 },
  { y: 14, scale: 0.95, opacity: 0.85, zIndex: 20 },
  { y: 28, scale: 0.9, opacity: 0.7, zIndex: 10 },
];

/**
 * Three stacked cards cycling every 3s: the front card drops 60px, fades
 * slightly, then slides to the back of the stack while the others step
 * forward. Layout-driven by a reordered id array; paused when off-screen.
 */
export default function CardSwap() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [order, setOrder] = useState(['a', 'b', 'c']);
  const prevOrder = useRef(['a', 'b', 'c']);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => {
      setOrder((o) => {
        prevOrder.current = o;
        return [...o.slice(1), o[0]];
      });
    }, INTERVAL);
    return () => window.clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center">
      <div className="relative h-[216px] w-[320px]">
        {order.map((id, slot) => {
          const card = CARDS.find((c) => c.id === id)!;
          const prevSlot = prevOrder.current.indexOf(id);
          const target = SLOTS[slot];
          const dropping = prevSlot === 0 && slot === 2;
          return (
            <motion.div
              key={card.id}
              className={`absolute inset-x-0 top-4 h-[128px] overflow-hidden rounded-xl border border-zinc-200 bg-gradient-to-br ${card.bg} shadow-[0_10px_28px_-12px_rgba(0,0,0,0.12)]`}
              initial={false}
              animate={
                dropping
                  ? {
                      y: [0, 60, target.y],
                      scale: [1, 0.97, target.scale],
                      opacity: [1, 0.55, target.opacity],
                      zIndex: [30, 30, target.zIndex],
                    }
                  : { y: target.y, scale: target.scale, opacity: target.opacity, zIndex: target.zIndex }
              }
              transition={
                dropping
                  ? { duration: 0.7, times: [0, 0.45, 1], ease: 'easeInOut' }
                  : { duration: 0.5, ease: EASE }
              }
            >
              <div className="flex h-full items-center gap-4 p-5">
                <div className={`h-14 w-1.5 rounded-full ${card.bar}`} />
                <div className="flex flex-1 flex-col gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-zinc-400">{card.label}</span>
                  <span className="text-[15px] font-semibold text-zinc-950">{card.title}</span>
                  <div className="h-2 w-3/4 rounded-full bg-zinc-100" />
                  <div className="h-2 w-1/2 rounded-full bg-zinc-100" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
