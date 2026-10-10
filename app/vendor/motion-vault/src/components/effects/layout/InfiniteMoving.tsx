import { memo, useRef, useState } from 'react';
import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const ITEMS = [
  { tag: 'TAPE · 01', title: '雾蓝', bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { tag: 'TAPE · 02', title: '暖沙', bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { tag: 'TAPE · 03', title: '苔绿', bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)' },
  { tag: 'TAPE · 04', title: '陶土', bg: 'linear-gradient(135deg, #F1E6DE 0%, #E8DAD2 100%)' },
  { tag: 'TAPE · 05', title: '薄墨', bg: 'linear-gradient(135deg, #E4E4E7 0%, #D4D4D8 100%)' },
  { tag: 'TAPE · 06', title: '晨灰', bg: 'linear-gradient(135deg, #ECECEF 0%, #DEDEE2 100%)' },
];

const CARD_W = 200;
const GAP = 16;
/** width of one full copy (cards + trailing gap) — the loop distance */
const COPY_W = ITEMS.length * (CARD_W + GAP);
/** one loop per 30s → px per ms */
const SPEED = COPY_W / 30000;

function TapeCard({ item }: { item: (typeof ITEMS)[number] }) {
  return (
    <div
      style={{ background: item.bg, width: CARD_W }}
      className="flex h-[130px] shrink-0 flex-col justify-between rounded-xl border border-zinc-950/10 p-4 shadow-[0_10px_28px_-14px_rgba(0,0,0,0.18)]"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {item.tag}
      </span>
      <div>
        <div className="text-[13px] font-semibold text-zinc-800">{item.title}</div>
        <div className="mt-2 h-1.5 w-3/4 rounded-full bg-zinc-950/10" />
      </div>
    </div>
  );
}

/** Perpetual marquee isolated in a memoized micro-component (rAF driven). */
const Tape = memo(function Tape({ slow }: { slow: boolean }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const x = useMotionValue(0);
  const speed = useRef(1);

  useAnimationFrame((_, delta) => {
    if (!inView) return;
    // ease the speed factor toward 1 (or 0.2 while hovering) for smooth slow-down
    speed.current += ((slow ? 0.2 : 1) - speed.current) * 0.06;
    let nx = x.get() - SPEED * delta * speed.current;
    if (nx <= -COPY_W) nx += COPY_W;
    x.set(nx);
  });

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <motion.div style={{ x, gap: GAP }} className="flex h-full items-center pl-6">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <TapeCard key={`${item.tag}-${i}`} item={item} />
        ))}
      </motion.div>
      {/* fade-out masks on both ends */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-zinc-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-zinc-50 to-transparent" />
    </div>
  );
});

/**
 * Infinite moving cards (Aceternity-style): 6 abstract cards on a seamless
 * 30s/loop horizontal tape — two copies, translateX wraps at one copy width.
 * Hovering eases the tape down to 0.2× speed; both ends fade out with masks.
 */
export default function InfiniteMoving() {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="h-full w-full cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tape slow={hovered} />
    </div>
  );
}
