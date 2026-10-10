import { useRef, useState } from 'react';
import type { PointerEvent } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { Aperture, Camera } from 'lucide-react';
import { cn } from '@/lib/utils';

const BASE_RATE = 1 / 9; // ~9s to develop with no shaking
const SHAKE_DECAY = 1.6; // boost halves roughly every 0.45s

const SCENES = [
  {
    name: '山野晨光',
    bg: 'linear-gradient(180deg, #e7e5e4 0%, #d6d3d1 55%, #78716c 100%)',
    sun: { x: '68%', y: '26%', c: '#fef3c7' },
    ridge: 'polygon(0 100%, 0 62%, 18% 40%, 34% 58%, 52% 30%, 70% 55%, 86% 38%, 100% 60%, 100% 100%)',
    ridgeColor: '#44403c',
  },
  {
    name: '海边落日',
    bg: 'linear-gradient(180deg, #fde8d7 0%, #fbc9a8 48%, #7d8ca3 49%, #57687f 100%)',
    sun: { x: '50%', y: '38%', c: '#fff7ed' },
    ridge: 'polygon(0 100%, 0 74%, 25% 72%, 50% 75%, 75% 71%, 100% 74%, 100% 100%)',
    ridgeColor: '#3f4c60',
  },
  {
    name: '城市入夜',
    bg: 'linear-gradient(180deg, #1c1c22 0%, #2e2e3a 60%, #454558 100%)',
    sun: { x: '30%', y: '22%', c: '#fef9c3' },
    ridge:
      'polygon(0 100%, 0 55%, 8% 55%, 8% 38%, 16% 38%, 16% 60%, 26% 60%, 26% 30%, 36% 30%, 36% 58%, 48% 58%, 48% 44%, 58% 44%, 58% 64%, 70% 64%, 70% 34%, 82% 34%, 82% 56%, 92% 56%, 92% 44%, 100% 44%, 100% 100%)',
    ridgeColor: '#101016',
  },
];

/**
 * A polaroid camera card: press the shutter and a fresh print slides up,
 * developing from milky blank to a full scene over ~9 seconds (saturate /
 * contrast / brightness ramp + a fading white veil). Shaking the pointer
 * back and forth over the print — like shaking a real polaroid — feeds a
 * decaying boost that visibly speeds up development.
 */
export default function PolaroidDevelop() {
  const [shot, setShot] = useState(0); // how many prints taken (0 = none yet)
  const [boosting, setBoosting] = useState(false);
  const [pct, setPct] = useState(0);
  const develop = useMotionValue(0);
  const boost = useRef(0);
  const last = useRef<{ x: number; t: number; dir: number } | null>(null);
  const developing = shot > 0 && pct < 100;

  useAnimationFrame((_, delta) => {
    if (!shot || develop.get() >= 1) return;
    const dt = delta / 1000;
    develop.set(Math.min(1, develop.get() + dt * (BASE_RATE + boost.current * BASE_RATE * 6)));
    boost.current = Math.max(0, boost.current - dt * SHAKE_DECAY * Math.max(boost.current, 0.15));
    setBoosting(boost.current > 0.25);
  });

  useMotionValueEvent(develop, 'change', (v) => {
    const next = Math.round(v * 100);
    setPct((prev) => (prev === next ? prev : next));
  });

  // development ramps: white veil fades, photo gains saturation/contrast
  const veil = useTransform(develop, [0, 0.85, 1], [0.94, 0.25, 0]);
  const filter = useTransform(develop, (v) => {
    const e = v * v * (3 - 2 * v); // smoothstep — slow start, vivid finish
    return `saturate(${0.15 + e * 0.85}) contrast(${0.72 + e * 0.28}) brightness(${1.22 - e * 0.22}) blur(${(1 - e) * 1.5}px)`;
  });

  function onMove(e: PointerEvent<HTMLDivElement>) {
    if (!developing) return;
    const now = e.timeStamp;
    const prev = last.current;
    if (prev) {
      const dir = Math.sign(e.clientX - prev.x);
      // a horizontal reversal within 140ms counts as a shake stroke
      if (dir !== 0 && prev.dir !== 0 && dir !== prev.dir && now - prev.t < 140) {
        boost.current = Math.min(boost.current + 0.35, 2.2);
      }
      last.current = { x: e.clientX, t: now, dir: dir || prev.dir };
    } else {
      last.current = { x: e.clientX, t: now, dir: 0 };
    }
  }

  function shutter() {
    boost.current = 0;
    last.current = null;
    develop.set(0);
    setPct(0);
    setShot((s) => s + 1);
  }

  const scene = SCENES[(shot - 1 + SCENES.length) % SCENES.length] ?? SCENES[0];

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        {/* polaroid frame */}
        <motion.div
          key={shot /* re-mount: print slides in fresh each shot */}
          initial={shot ? { y: 34, opacity: 0, rotate: -5 } : false}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 210, damping: 20 }}
          onPointerMove={onMove}
          className="w-[196px] select-none rounded-md border border-zinc-200 bg-white p-2.5 pb-3 shadow-[0_16px_40px_rgba(0,0,0,0.12)]"
        >
          {/* photo area */}
          <div className="relative aspect-square overflow-hidden rounded-[3px] bg-zinc-100">
            {shot === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-300">
                <Aperture className="h-8 w-8" strokeWidth={1.4} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">no print</span>
              </div>
            ) : (
              <>
                {/* the scene itself, developing */}
                <motion.div className="absolute inset-0" style={{ filter, background: scene.bg }}>
                  <div
                    className="absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: scene.sun.x,
                      top: scene.sun.y,
                      background: scene.sun.c,
                      boxShadow: `0 0 24px 8px ${scene.sun.c}66`,
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ clipPath: scene.ridge, background: scene.ridgeColor }}
                  />
                </motion.div>
                {/* milky veil that fades as it develops */}
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-[#f5f0e6]"
                  style={{ opacity: veil }}
                />
              </>
            )}
          </div>
          {/* caption strip */}
          <div className="flex items-center justify-between px-0.5 pt-2.5">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">
              {shot === 0 ? 'polaroid' : developing ? `显影中 ${pct}%` : scene.name}
            </span>
            <span
              className={cn(
                'font-mono text-[10px] transition-opacity duration-300',
                boosting ? 'text-zinc-950 opacity-100' : 'opacity-0',
              )}
            >
              摇晃加速中
            </span>
          </div>
          {/* development hairline */}
          <div className="mx-0.5 mt-1.5 h-px bg-zinc-100">
            <motion.div
              className="h-px origin-left bg-zinc-900"
              style={{ scaleX: develop, opacity: shot ? 1 : 0 }}
            />
          </div>
        </motion.div>

        {/* shutter */}
        <button
          onClick={shutter}
          className="flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 shadow-sm transition-all hover:border-zinc-300 hover:text-zinc-950 active:scale-95"
        >
          <Camera className="h-3.5 w-3.5" />
          {shot === 0 ? '按下快门' : '再拍一张'}
        </button>
        <p className="-mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-400">
          {developing ? '来回摇晃照片 · 加速显影' : ' '}
        </p>
      </div>
    </div>
  );
}
