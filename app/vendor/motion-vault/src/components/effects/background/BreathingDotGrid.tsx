import { useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * Breathing dot grid: a light dot layer pulses in a radial wave while a darker
 * dot layer is revealed near the cursor through a radial-gradient mask.
 */
export default function BreathingDotGrid() {
  const rootRef = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 overflow-hidden bg-white"
      style={{ ['--x' as string]: '-9999px', ['--y' as string]: '-9999px' }}
      onPointerMove={onPointerMove}
    >
      {/* base breathing dot layer (zinc-300) */}
      <motion.div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #D4D4D8 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* darker layer revealed near the cursor (zinc-900, radius 120px) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, #18181B 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: 'radial-gradient(circle 120px at var(--x) var(--y), black 0%, transparent 100%)',
          maskImage: 'radial-gradient(circle 120px at var(--x) var(--y), black 0%, transparent 100%)',
        }}
      />
      {/* mock page content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">呼吸点阵</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
