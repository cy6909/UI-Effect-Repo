import { useRef, useState } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent, PointerEvent as ReactPointerEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type RippleItem = { id: number; x: number; y: number; size: number };

/**
 * Material-style ripple: pointerdown spawns a white circle at the click
 * point that scales up and fades out, then is removed from the DOM.
 * Keyboard activation (Enter/Space) ripples from the center.
 */
export default function Ripple() {
  const reduced = useReducedMotion();
  const btnRef = useRef<HTMLButtonElement>(null);
  const idRef = useRef(0);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  const spawn = (clientX: number, clientY: number) => {
    if (reduced) return;
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple: RippleItem = {
      id: ++idRef.current,
      x: clientX - rect.left - size / 2,
      y: clientY - rect.top - size / 2,
      size,
    };
    setRipples((r) => [...r, ripple]);
  };

  const spawnCenter = () => {
    const btn = btnRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    spawn(rect.left + rect.width / 2, rect.top + rect.height / 2);
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => spawn(e.clientX, e.clientY);
  const onKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter' || e.key === ' ') spawnCenter();
  };

  const remove = (id: number) => setRipples((r) => r.filter((item) => item.id !== id));

  return (
    <div className="flex h-full w-full items-center justify-center">
      <button
        ref={btnRef}
        type="button"
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="relative h-11 overflow-hidden rounded-lg bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
      >
        {ripples.map((r) => (
          <motion.span
            key={r.id}
            aria-hidden
            className="pointer-events-none absolute rounded-full bg-white"
            style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
            initial={{ scale: 0, opacity: 0.35 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onAnimationComplete={() => remove(r.id)}
          />
        ))}
        <span className="relative z-10">保存更改</span>
      </button>
    </div>
  );
}
