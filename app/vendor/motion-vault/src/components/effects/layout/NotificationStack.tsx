import { useState } from 'react';
import { motion } from 'framer-motion';

const items = [
  { title: '设计评审提醒', time: '现在', tint: '#E7E0D3' },
  { title: '新版本已发布', time: '5 分钟前', tint: '#DDE5D8' },
  { title: '每周摘要已生成', time: '1 小时前', tint: '#D8E2EA' },
];

/** iOS-style notification stack: hover to expand the pile into a list. */
export default function NotificationStack() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="relative h-[230px] w-[300px]">
        {items.map((n, i) => (
          <motion.div
            key={n.title}
            initial={false}
            animate={{
              y: open ? i * 74 : i * 9,
              scale: open ? 1 : 1 - i * 0.05,
              opacity: open ? 1 : i === 0 ? 1 : 0.92 - i * 0.08,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 24,
              delay: open ? i * 0.06 : (items.length - 1 - i) * 0.04,
            }}
            style={{ zIndex: 10 - i, transformOrigin: '50% 0%' }}
            className="absolute inset-x-0 top-0 flex h-[64px] items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.12)]"
          >
            <div className="h-7 w-7 shrink-0 rounded-full" style={{ background: n.tint }} />
            <div className="min-w-0 flex-1">
              <div className="truncate text-[12.5px] font-medium text-zinc-800">{n.title}</div>
              <div className="mt-1 h-1.5 w-2/3 rounded-full bg-zinc-100" />
            </div>
            <span className="shrink-0 font-mono text-[10px] tracking-[0.04em] text-zinc-400">
              {n.time}
            </span>
            {i === 0 && (
              <motion.span
                initial={false}
                animate={{ opacity: open ? 0 : 1, scale: open ? 0.6 : 1 }}
                transition={{ duration: 0.2 }}
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-950 px-1 font-mono text-[10px] font-medium text-white"
              >
                3
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
