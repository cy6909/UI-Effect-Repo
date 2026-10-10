import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Ripple = { id: number; x: number; y: number };

const RING_COUNT = 3;
const MAX_RIPPLES = 8;

/**
 * Click anywhere: three concentric thin rings (zinc-400) bloom from the
 * click point — scale 0 → 3 while fading opacity 0.4 → 0, staggered 150ms
 * apart. Multiple clicks stack freely (capped, pruned on animation
 * complete). Centering uses Framer Motion x/y '-50%' so transforms never
 * conflict with the scale animation.
 */
export default function RippleCircles() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const idRef = useRef(0);

  const spawn = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ripple: Ripple = {
      id: ++idRef.current,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    setRipples((rs) => [...rs.slice(-(MAX_RIPPLES - 1)), ripple]);
  };

  const prune = (id: number) => {
    setRipples((rs) => rs.filter((r) => r.id !== id));
  };

  return (
    <div
      className="absolute inset-0 cursor-pointer overflow-hidden bg-white"
      onPointerDown={spawn}
      role="button"
      tabIndex={0}
      aria-label="点击触发同心涟漪"
    >
      {ripples.map((ripple) =>
        Array.from({ length: RING_COUNT }, (_, i) => (
          <motion.span
            key={`${ripple.id}-${i}`}
            aria-hidden
            className="pointer-events-none absolute h-24 w-24 rounded-full border border-zinc-400"
            style={{ left: ripple.x, top: ripple.y }}
            initial={{ x: '-50%', y: '-50%', scale: 0, opacity: 0.4 }}
            animate={{ x: '-50%', y: '-50%', scale: 3, opacity: 0 }}
            transition={{ duration: 1.15, delay: i * 0.15, ease: 'easeOut' }}
            onAnimationComplete={i === RING_COUNT - 1 ? () => prune(ripple.id) : undefined}
          />
        )),
      )}
      {/* idle hint */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="text-lg font-semibold tracking-tight text-zinc-900">同心涟漪</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
          Click to ripple
        </span>
      </div>
    </div>
  );
}
