import { useState } from 'react';
import { cn } from '@/lib/utils';

const strips = [
  {
    label: 'SAND',
    title: '沙丘',
    desc: '暖灰的沙色，像被阳光晒旧的纸张。',
    bg: 'linear-gradient(180deg, #EFE9DD 0%, #E3DACA 100%)',
  },
  {
    label: 'SAGE',
    title: '苔原',
    desc: '带一点绿意的灰，安静而克制。',
    bg: 'linear-gradient(180deg, #E6ECE1 0%, #D8E2D2 100%)',
  },
  {
    label: 'MIST',
    title: '薄雾',
    desc: '冷调的蓝灰，雾中退远的山脊。',
    bg: 'linear-gradient(180deg, #E2EAF1 0%, #D2DDE7 100%)',
  },
  {
    label: 'CLAY',
    title: '陶土',
    desc: '温润的粉褐，手作器物的质感。',
    bg: 'linear-gradient(180deg, #F0E4DC 0%, #E4D2C6 100%)',
  },
  {
    label: 'INK',
    title: '淡墨',
    desc: '极浅的墨灰，宣纸上晕开的一笔。',
    bg: 'linear-gradient(180deg, #E4E4E7 0%, #D4D4D8 100%)',
  },
];

/**
 * Accordion gallery: five vertical strips; hovering one grows its flex from
 * 1 to 3.5 (pure CSS transition, cubic-bezier(0.22,1,0.36,1), 0.6s) while
 * siblings yield, the vertical mono label turns horizontal and a one-line
 * description fades in.
 */
export default function AccordionGallery() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <div
        onMouseLeave={() => setActive(null)}
        className="flex h-[300px] max-h-full w-full max-w-[680px] overflow-hidden rounded-xl border border-zinc-200 bg-white"
      >
        {strips.map((s, i) => {
          const isActive = active === i;
          return (
            <div
              key={s.label}
              onMouseEnter={() => setActive(i)}
              style={{
                flexGrow: isActive ? 3.5 : 1,
                background: s.bg,
                transition: 'flex-grow 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
              }}
              className={cn(
                'relative h-full min-w-0 basis-0 cursor-pointer',
                i > 0 && 'border-l border-zinc-950/10',
              )}
            >
              {/* collapsed: vertical mono label */}
              <div
                style={{ transition: 'opacity 0.25s ease' }}
                className={cn(
                  'absolute inset-0 flex items-center justify-center',
                  isActive ? 'opacity-0' : 'opacity-100',
                )}
              >
                <span className="font-mono text-xs tracking-[0.3em] text-zinc-600 [writing-mode:vertical-rl]">
                  {s.label}
                </span>
              </div>

              {/* expanded: horizontal label + one-line description */}
              <div
                style={{
                  transition:
                    'opacity 0.4s ease, transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: isActive ? '0.12s' : '0s',
                }}
                className={cn(
                  'absolute inset-x-0 bottom-0 whitespace-nowrap p-5',
                  isActive ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
                )}
              >
                <div className="font-mono text-[11px] tracking-[0.2em] text-zinc-500">
                  {s.label} · {String(i + 1).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[15px] font-semibold text-zinc-800">
                  {s.title}
                  <span className="ml-2 text-xs font-normal text-zinc-600">{s.desc}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
