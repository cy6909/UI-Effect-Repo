import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const INTERVAL = 3500;

const QUOTES = [
  {
    text: '动效不是装饰，而是界面与时间之间的对话。',
    name: '林一舟',
    role: '产品设计师 · 墨白工作室',
    gradient: 'from-indigo-400 to-sky-400',
    initials: '林',
  },
  {
    text: '克制的动效让产品显得自信，过度的动效只会让它焦虑。',
    name: '沈望舒',
    role: '前端工程师 · 远山科技',
    gradient: 'from-amber-400 to-rose-400',
    initials: '沈',
  },
  {
    text: '最好的交互，是用户察觉不到却离不开的那一种。',
    name: '顾清让',
    role: '设计总监 · 拾光设计',
    gradient: 'from-emerald-400 to-teal-400',
    initials: '顾',
  },
];

function CardFace({ quote }: { quote: (typeof QUOTES)[number] }) {
  return (
    <div className="flex h-full flex-col justify-between p-4">
      <div>
        <Quote className="h-4 w-4 text-zinc-300" fill="currentColor" strokeWidth={0} />
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-zinc-700">{quote.text}</p>
      </div>
      <div className="flex items-center gap-2.5">
        <div
          className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${quote.gradient} text-[11px] font-semibold text-white`}
        >
          {quote.initials}
        </div>
        <div>
          <div className="text-xs font-medium text-zinc-950">{quote.name}</div>
          <div className="text-[11px] text-zinc-400">{quote.role}</div>
        </div>
      </div>
    </div>
  );
}

const CARD_BASE =
  'absolute inset-x-0 top-0 mx-auto h-[128px] w-[320px] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.10)]';

/**
 * A stack of three quote cards auto-cycling every 3.5s: the front card exits
 * downward with a slight rotation and fade (400ms), the next card scales
 * 0.95 → 1 and rises, the third steps forward. Progress dots below.
 * Interval only runs while the preview is in view.
 */
export default function TestimonialCycle() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const t = window.setInterval(() => setIndex((i) => (i + 1) % QUOTES.length), INTERVAL);
    return () => window.clearInterval(t);
  }, [inView]);

  const front = QUOTES[index];
  const mid = QUOTES[(index + 1) % QUOTES.length];
  const back = QUOTES[(index + 2) % QUOTES.length];

  return (
    <div ref={ref} className="flex h-full w-full flex-col items-center justify-center gap-5">
      <div className="relative h-[168px] w-full">
        {/* third card — steps forward each cycle (keyed by cycle so it remounts from below) */}
        <motion.div
          key={`back-${index}`}
          className={`${CARD_BASE} z-10 opacity-60`}
          initial={{ y: -10, scale: 0.85, opacity: 0 }}
          animate={{ y: 0, scale: 0.9, opacity: 0.6 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <CardFace quote={back} />
        </motion.div>
        {/* second card — steps from back slot to mid slot */}
        <motion.div
          key={`mid-${index}`}
          className={`${CARD_BASE} z-20`}
          initial={{ y: 0, scale: 0.9 }}
          animate={{ y: 12, scale: 0.95 }}
          transition={{ duration: 0.4, ease: EASE }}
        >
          <CardFace quote={mid} />
        </motion.div>
        {/* front card — rises from the mid slot while the old front exits downward */}
        <AnimatePresence initial={false}>
          <motion.div
            key={`front-${index}`}
            className={`${CARD_BASE} z-30`}
            initial={{ y: 12, scale: 0.95 }}
            animate={{ y: 24, scale: 1 }}
            exit={{ y: 88, rotate: -4, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <CardFace quote={front} />
          </motion.div>
        </AnimatePresence>
      </div>
      {/* progress dots */}
      <div className="flex items-center gap-1.5">
        {QUOTES.map((q, i) => (
          <span
            key={q.name}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-4 bg-zinc-950' : 'w-1.5 bg-zinc-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
