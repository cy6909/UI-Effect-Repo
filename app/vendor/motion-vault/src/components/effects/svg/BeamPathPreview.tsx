import { useEffect, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

/** S-curve with a hairpin feel, ~300x160 */
const PATH_D = 'M 24 120 C 90 120 90 40 150 40 C 210 40 210 120 276 120';
/** full loop duration */
const LOOP_MS = 2400;
/** bright head + 3 fading ghosts trailing behind */
const TRAIL = [
  { gap: 0, r: 3.5, opacity: 1 },
  { gap: 16, r: 3, opacity: 0.32 },
  { gap: 32, r: 2.5, opacity: 0.18 },
  { gap: 48, r: 2, opacity: 0.09 },
];

/** Effect — a bright spot with a fading ghost trail loops along a dim S-curve rail (getPointAtLength + rAF). */
export default function BeamPathPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const pathRef = useRef<SVGPathElement>(null);
  const dotRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    if (!inView) return;
    const path = pathRef.current;
    if (!path) return;
    const total = path.getTotalLength();
    let raf = 0;
    let start: number | null = null;

    const tick = (now: number) => {
      if (start === null) start = now;
      const t = ((now - start) % LOOP_MS) / LOOP_MS;
      TRAIL.forEach(({ gap }, i) => {
        const dot = dotRefs.current[i];
        if (!dot) return;
        // wrap trail points around the loop so ghosts never jump
        const len = (((t * total - gap) % total) + total) % total;
        const p = path.getPointAtLength(len);
        dot.setAttribute('cx', String(p.x));
        dot.setAttribute('cy', String(p.y));
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView]);

  return (
    <div ref={ref} className="flex h-full w-full items-center justify-center px-6" aria-label="光束沿 S 形路径流动">
      <svg viewBox="0 0 300 160" className="w-full max-w-[360px]">
        {/* dim rail */}
        <path ref={pathRef} d={PATH_D} fill="none" stroke="#E4E4E7" strokeWidth={1.5} strokeLinecap="round" />
        {/* terminals */}
        <circle cx={24} cy={120} r={2.5} fill="#D4D4D8" />
        <circle cx={276} cy={120} r={2.5} fill="#D4D4D8" />
        {/* head + ghost trail */}
        {TRAIL.map(({ r, opacity }, i) => (
          <circle
            key={i}
            ref={(el) => {
              dotRefs.current[i] = el;
            }}
            cx={24}
            cy={120}
            r={r}
            fill="#09090B"
            opacity={opacity}
          />
        ))}
      </svg>
    </div>
  );
}
