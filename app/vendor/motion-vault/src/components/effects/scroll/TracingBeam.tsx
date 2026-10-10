import { useRef } from 'react';
import { motion, useMotionValueEvent } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import ScrollShell from './ScrollShell';

/** S-curve down a 40×280 rail (matches the beam wrapper 1:1 in px). */
const PATH_D =
  'M 20 4 C 36 44, 4 76, 20 108 C 36 140, 4 172, 20 204 C 34 234, 8 254, 20 276';

function Beam({ progress }: { progress: MotionValue<number> }) {
  const pathRef = useRef<SVGPathElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  // Track the dot along the path without re-rendering: measure the path and
  // write the transform straight onto the dot element.
  useMotionValueEvent(progress, 'change', (v) => {
    const path = pathRef.current;
    const dot = dotRef.current;
    if (!path || !dot) return;
    const len = path.getTotalLength();
    const p = path.getPointAtLength(Math.min(Math.max(v, 0), 1) * len);
    dot.style.transform = `translate(${p.x}px, ${p.y}px) translate(-50%, -50%)`;
  });

  return (
    <div className="relative h-[280px] w-10">
      <svg viewBox="0 0 40 280" width={40} height={280} className="block" aria-hidden>
        {/* rail */}
        <path d={PATH_D} fill="none" stroke="#e4e4e7" strokeWidth={1.5} />
        {/* traced beam */}
        <motion.path
          ref={pathRef}
          d={PATH_D}
          fill="none"
          stroke="#09090b"
          strokeWidth={1.5}
          strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>
      {/* glowing head dot */}
      <div ref={dotRef} className="absolute left-0 top-0">
        <span className="absolute -inset-1.5 rounded-full bg-zinc-950/25 blur-[5px]" />
        <span className="relative block h-2 w-2 rounded-full bg-zinc-950" />
      </div>
    </div>
  );
}

function Bars({ widths, dark }: { widths: string[]; dark?: boolean }) {
  return (
    <div className="space-y-2.5">
      {widths.map((w, i) => (
        <div
          key={i}
          className={dark ? 'h-2 rounded-full bg-zinc-300' : 'h-2 rounded-full bg-zinc-200'}
          style={{ width: w }}
        />
      ))}
    </div>
  );
}

/**
 * 光束描边 — an S-shaped SVG rail sits sticky beside a long article; its ink
 * is drawn with pathLength = scrollYProgress while a glowing zinc-950 dot
 * rides the path head (measured via getPointAtLength, no re-renders).
 */
export default function TracingBeam() {
  return (
    <ScrollShell>
      {({ progress }) => (
        <div className="relative h-[900px]">
          {/* sticky beam rail */}
          <div className="pointer-events-none sticky top-0 z-10 h-0 w-full">
            <div className="absolute left-2 top-5">
              <Beam progress={progress} />
            </div>
          </div>

          {/* article */}
          <article className="pl-16 pr-7 pt-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              Tracing Beam
            </span>
            <h3 className="mt-4 text-[20px] font-semibold leading-snug tracking-tight text-zinc-950">
              一条光，替你读完了整篇文章
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">
              向下滚动，左侧的光束会沿着曲线一路描绘，光点始终停在墨迹的最前端。
            </p>

            <div className="mt-8 space-y-10">
              <section className="space-y-4">
                <div className="h-3 w-24 rounded-full bg-zinc-950" />
                <Bars widths={['100%', '92%', '96%', '68%']} />
              </section>
              <section className="space-y-4">
                <div className="h-3 w-32 rounded-full bg-zinc-950" />
                <Bars widths={['96%', '100%', '74%']} />
                <div className="h-24 rounded-lg border border-zinc-200 bg-zinc-50" />
              </section>
              <section className="space-y-4">
                <div className="h-3 w-28 rounded-full bg-zinc-950" />
                <Bars widths={['88%', '100%', '94%', '60%']} />
              </section>
              <section className="space-y-4 pb-4">
                <div className="h-3 w-20 rounded-full bg-zinc-950" />
                <Bars widths={['100%', '82%']} />
              </section>
            </div>
          </article>
        </div>
      )}
    </ScrollShell>
  );
}
