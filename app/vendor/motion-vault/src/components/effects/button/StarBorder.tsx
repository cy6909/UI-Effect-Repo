import { memo, useEffect, useRef, useState } from 'react';

const css = `
.sb-star {
  position: absolute;
  top: 0;
  left: 0;
  width: 36px;
  height: 8px;
  offset-rotate: auto;
  animation: sb-orbit 4.5s linear infinite;
  will-change: offset-distance;
}
@keyframes sb-orbit {
  from { offset-distance: 0%; }
  to { offset-distance: 100%; }
}
@media (prefers-reduced-motion: reduce) {
  .sb-star { animation: none; opacity: 0; }
}
`;

/** The comet: a short gradient trail with a glowing head at the leading edge. */
const Star = memo(function Star({ path }: { path: string }) {
  if (!path) return null;
  return (
    <span aria-hidden className="sb-star" style={{ offsetPath: path }}>
      <span
        className="block h-full w-full rounded-full"
        style={{
          background:
            'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.45) 55%, rgba(255,255,255,0.95) 100%)',
        }}
      />
      <span
        className="absolute right-[-1px] top-1/2 h-[5px] w-[5px] -translate-y-1/2 rounded-full bg-white"
        style={{ boxShadow: '0 0 8px 2px rgba(255,255,255,0.75)' }}
      />
    </span>
  );
});

/**
 * A tiny starlight with a short tail orbits the pill button's rounded
 * outline via CSS Motion Path: the perimeter path (a rounded-rect traced at
 * r = height/2) is measured with a ResizeObserver and fed to offset-path,
 * while offset-distance loops 0% → 100%. Hover lifts the button slightly.
 */
export default function StarBorder() {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [path, setPath] = useState('');

  useEffect(() => {
    const el = btnRef.current;
    if (!el) return;
    const update = () => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const r = h / 2;
      setPath(
        `path('M ${r} 0 H ${w - r} A ${r} ${r} 0 0 1 ${w - r} ${h} H ${r} A ${r} ${r} 0 0 1 ${r} 0 Z')`,
      );
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <style>{css}</style>
      <div className="relative">
        <button
          ref={btnRef}
          type="button"
          className="h-11 rounded-full bg-zinc-950 px-8 text-sm font-medium text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2),0_10px_24px_-8px_rgba(9,9,11,0.45)] active:translate-y-0"
        >
          星光绕边
        </button>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <Star path={path} />
        </div>
      </div>
    </div>
  );
}
