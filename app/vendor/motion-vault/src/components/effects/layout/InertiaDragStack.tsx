import { useState } from 'react';
import type { PanInfo } from 'framer-motion';
import { animate, motion, useMotionValue, useTransform } from 'framer-motion';

const CARDS = [
  { tag: 'CARD · A', title: '灵感速记', bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { tag: 'CARD · B', title: '周末计划', bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { tag: 'CARD · C', title: '阅读清单', bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)' },
  { tag: 'CARD · D', title: '随手涂鸦', bg: 'linear-gradient(135deg, #F1E6DE 0%, #E8DAD2 100%)' },
];

const POS = [
  { scale: 1, y: 0, opacity: 1 },
  { scale: 0.94, y: 12, opacity: 0.75 },
  { scale: 0.88, y: 24, opacity: 0.5 },
  { scale: 0.82, y: 36, opacity: 0.32 },
];

const spring = { type: 'spring', stiffness: 320, damping: 26 } as const;

type Flying = { id: number; dir: number; x: number; rotate: number; duration: number };

/**
 * Inertia drag deck: a pile of 4 cards, the top one draggable. Fling it past
 * the threshold and it flies off with rotation that inherits the release
 * velocity; the rest of the deck springs forward and the flung card remounts
 * at the bottom — infinitely playable.
 */
export default function InertiaDragStack() {
  const [order, setOrder] = useState<number[]>([0, 1, 2, 3]);
  const [flying, setFlying] = useState<Flying | null>(null);

  function release(id: number, offsetX: number, velocityX: number, rotate: number) {
    const dir = Math.sign(offsetX) || 1;
    // harder fling → shorter flight (velocity inherits into the exit)
    const speed = Math.max(Math.abs(velocityX), 320);
    const duration = Math.min(0.55, Math.max(0.26, 300 / speed));
    setFlying({ id, dir, x: offsetX, rotate, duration });
    setOrder((prev) => [...prev.filter((c) => c !== id), id]);
    window.setTimeout(() => setFlying(null), duration * 1000 + 60);
  }

  const visible = flying ? order.filter((c) => c !== flying.id) : order;

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="relative h-[215px] w-[260px]">
        {visible.map((id) => {
          const pos = visible.indexOf(id);
          const t = POS[pos] ?? POS[POS.length - 1];
          return pos === 0 && !flying ? (
            <TopCard key={id} id={id} onRelease={release} />
          ) : (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: t.scale, y: t.y }}
              animate={{ scale: t.scale, y: t.y, opacity: t.opacity }}
              transition={spring}
              style={{ zIndex: 20 - pos, background: CARDS[id].bg }}
              className="absolute inset-x-0 top-0 h-[150px] rounded-xl border border-zinc-950/10 shadow-[0_14px_36px_-14px_rgba(0,0,0,0.18)]"
            >
              <CardFace id={id} />
            </motion.div>
          );
        })}

        {flying && (
          <motion.div
            key={`flying-${flying.id}`}
            initial={{ x: flying.x, rotate: flying.rotate, opacity: 1 }}
            animate={{
              x: flying.dir * 520,
              y: -50,
              rotate: flying.rotate + flying.dir * 22,
              opacity: 0,
            }}
            transition={{ duration: flying.duration, ease: 'easeOut' }}
            style={{ zIndex: 40, background: CARDS[flying.id].bg }}
            className="absolute inset-x-0 top-0 h-[150px] rounded-xl border border-zinc-950/10 shadow-[0_14px_36px_-14px_rgba(0,0,0,0.18)]"
          >
            <CardFace id={flying.id} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function TopCard({
  id,
  onRelease,
}: {
  id: number;
  onRelease: (id: number, offsetX: number, velocityX: number, rotate: number) => void;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-12, 12]);

  function onDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) > 110 || Math.abs(info.velocity.x) > 600) {
      onRelease(id, info.offset.x, info.velocity.x, rotate.get());
    } else {
      animate(x, 0, { type: 'spring', stiffness: 400, damping: 28 });
    }
  }

  return (
    <motion.div
      drag="x"
      onDragEnd={onDragEnd}
      whileDrag={{ cursor: 'grabbing' }}
      style={{ x, rotate, zIndex: 30, background: CARDS[id].bg }}
      className="absolute inset-x-0 top-0 h-[150px] cursor-grab touch-none rounded-xl border border-zinc-950/10 shadow-[0_18px_40px_-14px_rgba(0,0,0,0.22)]"
    >
      <CardFace id={id} />
      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full border border-zinc-200 bg-white px-2.5 py-0.5 font-mono text-[10px] tracking-[0.08em] text-zinc-500 shadow-sm">
        拖拽甩出
      </span>
    </motion.div>
  );
}

function CardFace({ id }: { id: number }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
        {CARDS[id].tag}
      </span>
      <div>
        <div className="text-[13px] font-semibold text-zinc-800">{CARDS[id].title}</div>
        <div className="mt-2 h-1.5 w-full rounded-full bg-zinc-950/10" />
        <div className="mt-2 h-1.5 w-2/3 rounded-full bg-zinc-950/5" />
      </div>
    </div>
  );
}
