import { useEffect, useRef } from 'react';
import type { MutableRefObject } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const WORD = 'PRESSURE';
/** cursor influence radius in px */
const RADIUS = 180;

type Point = { x: number; y: number };

/** proximity 0..1 of a glyph center to the cursor */
function proximity(centers: MutableRefObject<Point[]>, index: number, x: number, y: number) {
  const c = centers.current[index];
  if (!c || x < -999) return 0;
  const d = Math.hypot(x - c.x, y - c.y);
  return Math.max(0, 1 - d / RADIUS);
}

/** One glyph whose weight / width react to cursor distance — MotionValues only, zero setState. */
function PressureChar({
  ch,
  index,
  sx,
  sy,
  centers,
}: {
  ch: string;
  index: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  centers: MutableRefObject<Point[]>;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const r = el.getBoundingClientRect();
    const p = parent.getBoundingClientRect();
    centers.current[index] = { x: r.left - p.left + r.width / 2, y: r.top - p.top + r.height / 2 };
  }, [index, centers]);

  const fontVariationSettings = useTransform([sx, sy], (v: number[]) => {
    const p = proximity(centers, index, v[0], v[1]);
    return `'wght' ${Math.round(400 + p * 500)}`;
  });
  const fontStretch = useTransform([sx, sy], (v: number[]) => {
    const p = proximity(centers, index, v[0], v[1]);
    return `${Math.round(100 + p * 25)}%`;
  });
  const scaleX = useTransform([sx, sy], (v: number[]) => {
    const p = proximity(centers, index, v[0], v[1]);
    return 1 + p * 0.12;
  });

  return (
    <motion.span
      ref={ref}
      className="inline-block will-change-transform"
      style={{ fontVariationSettings, fontStretch, scaleX }}
    >
      {ch}
    </motion.span>
  );
}

/** Effect — variable-font pressure: glyphs near the cursor grow heavier and wider, spring-smoothed. */
export default function TextPressurePreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centersRef = useRef<Point[]>([]);
  const px = useMotionValue(-9999);
  const py = useMotionValue(-9999);
  const sx = useSpring(px, { stiffness: 260, damping: 26, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 260, damping: 26, mass: 0.6 });

  return (
    <div
      ref={containerRef}
      className="flex h-full w-full cursor-crosshair select-none items-center justify-center"
      onPointerMove={(e) => {
        const el = containerRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        px.set(e.clientX - r.left);
        py.set(e.clientY - r.top);
      }}
      onPointerLeave={() => {
        px.set(-9999);
        py.set(-9999);
      }}
      aria-label="字重压感，移动鼠标改变字重"
    >
      <p className="flex text-5xl font-semibold uppercase tracking-[0.02em] text-zinc-950 sm:text-6xl">
        {WORD.split('').map((ch, i) => (
          <PressureChar key={i} ch={ch} index={i} sx={sx} sy={sy} centers={centersRef} />
        ))}
      </p>
    </div>
  );
}
