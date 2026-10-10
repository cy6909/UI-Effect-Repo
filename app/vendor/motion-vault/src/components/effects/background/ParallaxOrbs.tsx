import { useEffect, useRef } from 'react';

type Orb = {
  left: string;
  top: string;
  size: string;
  color: string; // muted, ~30% saturation
  depth: number; // 0.02-0.10: translation = depth × pointer offset from center
};

const ORBS: Orb[] = [
  { left: '6%', top: '8%', size: '52%', color: 'hsl(38, 32%, 74%)', depth: 0.04 }, // sand
  { left: '58%', top: '2%', size: '46%', color: 'hsl(140, 22%, 72%)', depth: 0.08 }, // sage
  { left: '30%', top: '44%', size: '56%', color: 'hsl(205, 38%, 74%)', depth: 0.02 }, // sky
  { left: '70%', top: '48%', size: '44%', color: 'hsl(350, 38%, 78%)', depth: 0.1 }, // rose
  { left: '2%', top: '52%', size: '42%', color: 'hsl(268, 32%, 78%)', depth: 0.06 }, // lilac
];

/**
 * Multi-plane depth: five large soft orbs (muted sand/sage/sky/rose/lilac,
 * blur 40px) drift at different parallax factors behind the content. Pointer
 * position is lerped at 0.05 per frame for a smooth trailing feel. Pure
 * transform updates — no React re-renders on move.
 */
export default function ParallaxOrbs() {
  const rootRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const root: HTMLDivElement = el;

    const target = { x: 0, y: 0 };
    const current = ORBS.map(() => ({ x: 0, y: 0 }));
    let raf = 0;

    function onMove(e: PointerEvent) {
      const rect = root.getBoundingClientRect();
      target.x = e.clientX - (rect.left + rect.width / 2);
      target.y = e.clientY - (rect.top + rect.height / 2);
    }
    function onLeave() {
      target.x = 0;
      target.y = 0;
    }

    function tick() {
      for (let i = 0; i < ORBS.length; i++) {
        const el = orbRefs.current[i];
        if (!el) continue;
        const o = ORBS[i];
        const c = current[i];
        c.x += (target.x * o.depth - c.x) * 0.05;
        c.y += (target.y * o.depth - c.y) * 0.05;
        el.style.transform = `translate3d(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    }

    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 overflow-hidden bg-zinc-50">
      {ORBS.map((o, i) => (
        <div
          key={i}
          ref={(el) => {
            orbRefs.current[i] = el;
          }}
          aria-hidden
          className="absolute rounded-full will-change-transform"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            aspectRatio: '1',
            background: `radial-gradient(circle, ${o.color} 0%, transparent 68%)`,
            filter: 'blur(40px)',
          }}
        />
      ))}
      {/* mock page content */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4">
        <span className="text-lg font-semibold tracking-[-0.02em] text-zinc-950">视差光斑</span>
        <span className="flex h-8 items-center rounded-lg bg-zinc-950 px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
