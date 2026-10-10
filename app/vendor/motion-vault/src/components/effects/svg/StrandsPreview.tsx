import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const COUNT = 6;
const MAIN = 2; // index of the zinc-950 lead strand

function baseY(i: number) {
  return 44 + i * 18;
}

function strandD(i: number, t: number) {
  const y = baseY(i);
  const amp = 13;
  const phase = i * 0.75;
  const c1 = y + amp * Math.sin(t * 1.25 + phase);
  const c2 = y + amp * Math.sin(t * 1.25 + phase + Math.PI * 0.66);
  return `M 6 ${y} C 92 ${c1.toFixed(2)} 228 ${c2.toFixed(2)} 314 ${y}`;
}

/**
 * Strands (React Bits): 6 horizontal cubic-bezier strands whose control
 * points ride phase-offset sine waves, weaving a braided ribbon. One lead
 * strand is zinc-950, the rest zinc-400. d is rewritten via rAF (no state),
 * gated by useInView.
 */
export default function StrandsPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      for (let i = 0; i < COUNT; i++) {
        pathRefs.current[i]?.setAttribute('d', strandD(i, t));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center px-4">
      <svg viewBox="0 0 320 180" className="w-full max-w-[380px]" aria-label="多股线浪动画">
        {Array.from({ length: COUNT }, (_, i) => (
          <path
            key={i}
            ref={(el) => {
              pathRefs.current[i] = el;
            }}
            d={strandD(i, 0)}
            fill="none"
            stroke={i === MAIN ? '#09090B' : '#A1A1AA'}
            strokeWidth={i === MAIN ? 1.6 : 1}
            strokeLinecap="round"
            opacity={i === MAIN ? 1 : 0.75}
          />
        ))}
      </svg>
    </div>
  );
}
