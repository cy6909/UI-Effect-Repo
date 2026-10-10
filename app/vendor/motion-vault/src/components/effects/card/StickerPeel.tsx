import { useEffect, useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import { animate } from 'framer-motion';
import { BadgeCheck, RotateCcw } from 'lucide-react';

const W = 240;
const H = 168;
const REST = 0.14; // resting curl — the affordance that invites the drag
const DONE = 0.5; // past this, the peel completes by itself
const REACH = 1.35; // how far the fold line travels along each edge at p = 1

type Pt = { x: number; y: number };

/**
 * Drag the corner of a sticker to peel it off the card. The fold line runs
 * from the top edge to the right edge; the peeled flap is the corner
 * triangle mirrored across that line (real reflection math), rendered as an
 * SVG polygon with a paper-back gradient and a drop shadow. The sticker
 * front is clipped away with a clip-path polygon that excludes the folded
 * triangle. Past 50% the peel completes and the promo layer is revealed.
 */
export default function StickerPeel() {
  const [p, setP] = useState(REST);
  const [peeled, setPeeled] = useState(false);
  const [touched, setTouched] = useState(false);
  const gesture = useRef<{ x: number; y: number; p: number } | null>(null);
  const anim = useRef<ReturnType<typeof animate> | null>(null);

  const stopAnim = () => {
    anim.current?.stop();
    anim.current = null;
  };

  // idle breathing curl until the user grabs it
  useEffect(() => {
    if (peeled || touched) return;
    anim.current = animate(REST, [REST, REST + 0.045, REST], {
      duration: 2.6,
      repeat: Infinity,
      ease: 'easeInOut',
      onUpdate: (v) => setP(v),
    });
    return stopAnim;
  }, [peeled, touched]);

  // fold line endpoints: A on the top edge, B on the right edge
  const a: Pt = { x: W - p * W * REACH, y: 0 };
  const b: Pt = { x: W, y: p * H * REACH };
  // reflect corner C = (W, 0) across line AB to find the folded apex C'
  const dx = W - a.x;
  const dy = b.y;
  const t = (dx * dx) / (dx * dx + dy * dy || 1);
  const c2: Pt = { x: 2 * (a.x + t * dx) - W, y: 2 * t * dy };

  const frontClip = `polygon(0px 0px, ${a.x}px 0px, ${W}px ${b.y}px, ${W}px ${H}px, 0px ${H}px)`;
  const flapPoints = `${a.x},${a.y} ${b.x},${b.y} ${c2.x.toFixed(1)},${c2.y.toFixed(1)}`;

  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    if (peeled) return;
    stopAnim();
    setTouched(true);
    gesture.current = { x: e.clientX, y: e.clientY, p };
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    const g = gesture.current;
    if (!g) return;
    // dragging left + down increases the peel
    const next = g.p + (g.x - e.clientX + (e.clientY - g.y)) / 210;
    setP(Math.min(1.15, Math.max(0, next)));
  }

  function onPointerUp() {
    if (!gesture.current) return;
    gesture.current = null;
    if (p > DONE) {
      anim.current = animate(p, 1.15, {
        duration: 0.45,
        ease: [0.4, 0, 0.6, 1],
        onUpdate: (v) => setP(v),
        onComplete: () => setPeeled(true),
      });
    } else {
      anim.current = animate(p, REST, {
        type: 'spring',
        stiffness: 260,
        damping: 20,
        onUpdate: (v) => setP(v),
      });
    }
  }

  function reset() {
    stopAnim();
    setPeeled(false);
    setTouched(false);
    setP(REST);
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        {/* card body */}
        <div className="relative overflow-visible rounded-xl border border-zinc-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.06)]" style={{ width: W, height: H }}>
          {/* promo layer underneath the sticker */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white"
            style={{ transform: `scale(${0.96 + Math.min(p, 1) * 0.04})` }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
              promo code
            </span>
            <span className="flex items-center gap-1.5 font-mono text-lg font-semibold tracking-[0.08em] text-zinc-950">
              <BadgeCheck className="h-4 w-4 text-zinc-950" strokeWidth={2.2} />
              MOTION-25
            </span>
            <span className="text-[11px] text-zinc-400">全部灵感 · 七五折 · 本月有效</span>
          </div>

          {/* sticker front — clipped away as the corner folds */}
          {!peeled && (
            <div
              role="button"
              aria-label="撕开贴纸"
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerCancel={onPointerUp}
              className="absolute inset-0 cursor-grab touch-none select-none rounded-xl active:cursor-grabbing"
              style={{ clipPath: frontClip, background: 'linear-gradient(155deg, #3f3f46 0%, #18181b 62%, #09090b 100%)' }}
            >
              <div className="flex h-full flex-col justify-between p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
                    sticker
                  </span>
                  <span className="font-mono text-[10px] text-white/40">Nº 025</span>
                </div>
                <div>
                  <p className="text-lg font-semibold leading-tight text-white">纪念贴纸</p>
                  <p className="mt-0.5 text-[11px] text-white/50">撕开看看里面藏着什么</p>
                </div>
              </div>
            </div>
          )}

          {/* peeled flap — mirrored corner triangle with a paper back */}
          {!peeled && p > 0.005 && (
            <svg
              className="pointer-events-none absolute inset-0 overflow-visible"
              width={W}
              height={H}
              style={{ filter: 'drop-shadow(-4px 5px 5px rgba(0,0,0,0.22))' }}
            >
              <defs>
                <linearGradient id="peel-back" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fafafa" />
                  <stop offset="55%" stopColor="#e4e4e7" />
                  <stop offset="100%" stopColor="#d4d4d8" />
                </linearGradient>
              </defs>
              <polygon points={flapPoints} fill="url(#peel-back)" />
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
            </svg>
          )}

          {/* reset */}
          {peeled && (
            <button
              onClick={reset}
              aria-label="重新贴上"
              className="absolute -right-2.5 -top-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:text-zinc-950"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* hint */}
        <p
          className="pointer-events-none absolute -bottom-7 left-1/2 w-max -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400 transition-opacity duration-500"
          style={{ opacity: touched || peeled ? 0 : 1 }}
        >
          捏住右上角 · 向左下撕开
        </p>
      </div>
    </div>
  );
}
