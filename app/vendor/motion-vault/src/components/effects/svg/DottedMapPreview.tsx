import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

const W = 320;
const H = 180;
const GAP = 10;

/** Abstract "continents": a few overlapping ellipses with an organic sine wobble. */
const BLOBS = [
  { cx: 78, cy: 66, rx: 46, ry: 32 },
  { cx: 150, cy: 112, rx: 30, ry: 34 },
  { cx: 226, cy: 62, rx: 42, ry: 27 },
  { cx: 258, cy: 118, rx: 24, ry: 19 },
];

function isLand(x: number, y: number) {
  return BLOBS.some((b) => {
    const nx = (x - b.cx) / b.rx;
    const ny = (y - b.cy) / b.ry;
    const wobble = 1 + 0.12 * Math.sin(x * 0.21 + y * 0.13);
    return nx * nx + ny * ny <= wobble;
  });
}

const CITIES: [number, number][] = [
  [70, 58],
  [148, 108],
  [228, 58],
  [258, 112],
];

/** 3 arcs connecting the 4 cities (quadratic curves bowed upward). */
const ARCS: string[] = [
  `M 70 58 Q 145 6 228 58`,
  `M 148 108 Q 196 60 258 112`,
  `M 70 58 Q 104 116 148 108`,
];

/** Infinite pulse ring — isolated + memoized so parent re-renders never restart it. */
const CityPulse = memo(function CityPulse({ cx, cy, delay }: { cx: number; cy: number; delay: number }) {
  return (
    <motion.circle
      cx={cx}
      cy={cy}
      fill="none"
      stroke="#09090B"
      strokeWidth={1}
      initial={{ r: 3, opacity: 0.5 }}
      animate={{ r: 11, opacity: 0 }}
      transition={{ duration: 1.6, ease: 'easeOut', repeat: Infinity, delay }}
    />
  );
});

/**
 * Dotted map (Aceternity World Map, simplified): a dot grid sketches abstract
 * continents, 3 dashed arcs flow between 4 pulsing city dots.
 */
export default function DottedMapPreview() {
  const dots = useMemo(() => {
    const out: { x: number; y: number; land: boolean }[] = [];
    for (let y = GAP / 2; y < H; y += GAP) {
      for (let x = GAP / 2; x < W; x += GAP) {
        out.push({ x, y, land: isLand(x, y) });
      }
    }
    return out;
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full max-w-[380px]" aria-label="点阵地图连线动画">
        {/* dot grid */}
        {dots.map((d) => (
          <circle
            key={`${d.x}-${d.y}`}
            cx={d.x}
            cy={d.y}
            r={d.land ? 1.7 : 1}
            fill={d.land ? '#3F3F46' : '#E4E4E7'}
          />
        ))}

        {/* flowing dashed arcs */}
        {ARCS.map((d, i) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="#09090B"
            strokeWidth={1.2}
            strokeLinecap="round"
            strokeDasharray="1 6"
            initial={{ strokeDashoffset: 0, opacity: 0.85 }}
            animate={{ strokeDashoffset: -56 }}
            transition={{ duration: 2.2, ease: 'linear', repeat: Infinity, delay: i * 0.35 }}
          />
        ))}

        {/* city dots + pulses */}
        {CITIES.map(([x, y], i) => (
          <g key={`${x}-${y}`}>
            <CityPulse cx={x} cy={y} delay={i * 0.4} />
            <circle cx={x} cy={y} r={3} fill="#09090B" />
            <circle cx={x} cy={y} r={1.2} fill="#FFFFFF" />
          </g>
        ))}
      </svg>
    </div>
  );
}
