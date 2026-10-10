import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const css = `
.stack-scroll {
  scrollbar-width: thin;
  scrollbar-color: #d4d4d8 transparent;
}
.stack-scroll::-webkit-scrollbar {
  width: 4px;
}
.stack-scroll::-webkit-scrollbar-track {
  background: transparent;
}
.stack-scroll::-webkit-scrollbar-thumb {
  background: #d4d4d8;
  border-radius: 999px;
}
`;

const cards = [
  { id: '01', title: 'Scroll', text: '向下滚动，卡片依次堆叠。' },
  { id: '02', title: 'Stack', text: '被压住的卡片微微缩小。' },
  { id: '03', title: 'Pin', text: 'sticky 定位让堆叠成立。' },
  { id: '04', title: 'Story', text: '经典的滚动叙事节奏。' },
];

/**
 * Scroll-driven stacking cards inside an internal 320px scroll container
 * (the page scroll is never hijacked). GSAP ScrollTrigger uses the container
 * as its scroller and scales/dims each covered card; useGSAP reverts all
 * triggers on unmount.
 */
export default function StackingCards() {
  const scope = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const items = gsap.utils.toArray<HTMLElement>('.stack-card', scope.current);
      items.forEach((card, i) => {
        if (i === items.length - 1) return;
        gsap.to(card, {
          scale: 0.94,
          filter: 'brightness(0.96)',
          transformOrigin: 'center top',
          ease: 'none',
          scrollTrigger: {
            trigger: items[i + 1],
            scroller,
            start: 'top bottom',
            end: 'top top+=16',
            scrub: true,
          },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope} className="flex h-full w-full items-center justify-center">
      <style>{css}</style>
      <div
        ref={scrollerRef}
        className="stack-scroll h-[320px] w-[min(88%,380px)] overflow-y-scroll overscroll-contain rounded-xl border border-zinc-200 bg-white"
      >
        <div className="px-4 pb-4 pt-1">
          {cards.map((c) => (
            <div
              key={c.id}
              className="stack-card sticky top-4 mb-4 flex h-[180px] flex-col justify-between rounded-xl border border-zinc-200 bg-white p-5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.15)]"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-zinc-400">{c.id}</span>
                <span className="h-2 w-10 rounded-full bg-zinc-950" />
              </div>
              <div>
                <div className="text-sm font-semibold text-zinc-950">{c.title}</div>
                <p className="mt-1 text-[13px] leading-relaxed text-zinc-500">{c.text}</p>
              </div>
            </div>
          ))}
          <div className="h-2" />
        </div>
      </div>
    </div>
  );
}
