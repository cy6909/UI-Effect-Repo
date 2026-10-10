import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

const SLIDES = [
  { tag: 'SLIDE · 01', title: '雾蓝清晨', desc: '低饱和的蓝色渐变，像天刚亮时的海面。', bg: 'linear-gradient(135deg, #E4EBF2 0%, #D8E2EA 100%)' },
  { tag: 'SLIDE · 02', title: '暖沙午后', desc: '米色与陶土之间，光线缓慢移动。', bg: 'linear-gradient(135deg, #F0EAE0 0%, #E7E0D3 100%)' },
  { tag: 'SLIDE · 03', title: '苔绿小径', desc: '灰绿色的安静层次，适合深呼吸。', bg: 'linear-gradient(135deg, #E8EDE3 0%, #DDE5D8 100%)' },
  { tag: 'SLIDE · 04', title: '陶土黄昏', desc: '日落前最后一点暖色留在墙面上。', bg: 'linear-gradient(135deg, #F1E6DE 0%, #E8DAD2 100%)' },
];

/**
 * Morph slider: switching slides morphs the whole card — the old content
 * shrinks to scale 0.9 with 24px corners while fading out, and the new slide
 * expands out of that same morphed state. Arrow buttons + indicator dots.
 */
export default function MorphSlider() {
  const [index, setIndex] = useState(0);
  const go = (dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length);
  const slide = SLIDES[index];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="relative h-[180px] w-[300px]">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0, borderRadius: 24 }}
            animate={{ scale: 1, opacity: 1, borderRadius: 16 }}
            exit={{ scale: 0.9, opacity: 0, borderRadius: 24 }}
            transition={{ duration: 0.45, ease }}
            style={{ background: slide.bg }}
            className="absolute inset-0 border border-zinc-950/10 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.22)]"
          >
            <div className="flex h-full flex-col justify-between p-5">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                {slide.tag}
              </span>
              <div>
                <div className="text-[15px] font-semibold text-zinc-800">{slide.title}</div>
                <p className="mt-1 text-xs leading-[1.6] text-zinc-600">{slide.desc}</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          aria-label="上一张"
          onClick={() => go(-1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-950 active:scale-95"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
        </button>
        <div className="flex items-center gap-1.5">
          {SLIDES.map((s, i) => (
            <button
              key={s.tag}
              type="button"
              aria-label={`切换到第 ${i + 1} 张`}
              onClick={() => setIndex(i)}
              className={
                i === index
                  ? 'h-1.5 w-4 rounded-full bg-zinc-800 transition-all duration-300'
                  : 'h-1.5 w-1.5 rounded-full bg-zinc-300 transition-all duration-300 hover:bg-zinc-400'
              }
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="下一张"
          onClick={() => go(1)}
          className="flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:border-zinc-300 hover:text-zinc-950 active:scale-95"
        >
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
