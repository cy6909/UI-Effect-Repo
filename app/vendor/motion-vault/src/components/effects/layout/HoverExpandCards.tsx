import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const panels = [
  {
    label: 'SAND',
    title: '沙丘',
    desc: '低饱和的暖灰调，像被阳光晒旧的纸张。',
    bg: 'linear-gradient(165deg, #EFE9DD 0%, #E7E0D3 100%)',
  },
  {
    label: 'SAGE',
    title: '苔原',
    desc: '带一点绿意的灰，安静而克制。',
    bg: 'linear-gradient(165deg, #E6ECE1 0%, #DDE5D8 100%)',
  },
  {
    label: 'SKY',
    title: '远空',
    desc: '阴天的蓝灰，像雾里退远的山脊。',
    bg: 'linear-gradient(165deg, #E2EAF1 0%, #D8E2EA 100%)',
  },
  {
    label: 'CLAY',
    title: '陶土',
    desc: '温润的粉褐，手作器物的质感。',
    bg: 'linear-gradient(165deg, #F0E4DC 0%, #E8DAD2 100%)',
  },
];

/** Horizontal panels: hovering one grows it to ~60% while siblings shrink. */
export default function HoverExpandCards() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div
        onMouseLeave={() => setActive(null)}
        className="flex h-[320px] max-h-full w-full max-w-[700px] overflow-hidden rounded-xl border border-zinc-200 bg-white"
      >
        {panels.map((p, i) => {
          const isActive = active === i;
          return (
            <motion.div
              key={p.label}
              onMouseEnter={() => setActive(i)}
              animate={{ flexGrow: isActive ? 4.2 : 1 }}
              transition={{ duration: 0.6, ease }}
              style={{ background: p.bg }}
              className={cn(
                'relative h-full min-w-0 basis-0 cursor-pointer',
                i > 0 && 'border-l border-zinc-950/10',
              )}
            >
              {/* collapsed: vertical title */}
              <motion.div
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <span className="font-mono text-xs tracking-[0.3em] text-zinc-600 [writing-mode:vertical-rl]">
                  {p.label}
                </span>
              </motion.div>

              {/* expanded: horizontal title + description */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                transition={{ duration: 0.4, delay: isActive ? 0.15 : 0, ease }}
                className="absolute inset-x-0 bottom-0 p-5"
              >
                <div className="font-mono text-[11px] tracking-[0.2em] text-zinc-500">{p.label}</div>
                <div className="mt-1 text-[15px] font-semibold text-zinc-800">{p.title}</div>
                <p className="mt-1.5 line-clamp-2 text-xs leading-[1.7] text-zinc-600">{p.desc}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
