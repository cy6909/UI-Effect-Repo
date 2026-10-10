import { useEffect, useId, useRef } from 'react';
import { useInView } from '@/hooks/useInView';

const TEXT = 'FIND INSPIRATION · MOTION VAULT · ';
/** shallow valley arc across the 640x160 viewBox */
const ARC = 'M -60 34 Q 320 132 700 34';
const SPEED = 55; // px per second
const REPEATS = 5;

/**
 * Effect — the phrase rides a downward-curving SVG textPath in an infinite
 * marquee: startOffset is written directly on the element each frame (rAF,
 * zero setState, gated by useInView) and wraps by exactly one text unit.
 * Gradient overlays fade both ends of the arc.
 */
export default function CurvedLoopPreview() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const rawId = useId();
  const pathId = `curved-loop-arc-${rawId.replace(/[^a-zA-Z0-9]/g, '')}`;
  const textPathRef = useRef<SVGTextPathElement>(null);
  const measureRef = useRef<SVGTextElement>(null);

  useEffect(() => {
    if (!inView) return;
    const tp = textPathRef.current;
    const measure = measureRef.current;
    if (!tp || !measure) return;

    let unit = measure.getComputedTextLength();
    if (!unit) return;

    let raf = 0;
    let offset = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      offset = (offset + (SPEED * dt) / 1000) % unit;
      tp.setAttribute('startOffset', String(-offset));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // re-measure once webfonts settle so the wrap stays seamless
    let cancelled = false;
    void document.fonts?.ready.then(() => {
      if (cancelled) return;
      const m = measure.getComputedTextLength();
      if (m > 0) unit = m;
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [inView]);

  return (
    <div ref={ref} className="relative flex h-full w-full items-center justify-center">
      <svg viewBox="0 0 640 160" className="h-full w-full" aria-label={TEXT.trim()}>
        <defs>
          <path id={pathId} d={ARC} fill="none" />
        </defs>
        {/* hidden single-unit ruler for seamless wrapping */}
        <text
          ref={measureRef}
          fontSize="18"
          fill="none"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
          aria-hidden
        >
          {TEXT}
        </text>
        <text
          fontSize="18"
          fill="#09090B"
          style={{ fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.06em' }}
        >
          <textPath ref={textPathRef} href={`#${pathId}`} startOffset="0">
            {TEXT.repeat(REPEATS)}
          </textPath>
        </text>
      </svg>
      {/* end fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-zinc-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-zinc-50 to-transparent" />
    </div>
  );
}
