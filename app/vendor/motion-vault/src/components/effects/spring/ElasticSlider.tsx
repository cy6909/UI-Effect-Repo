import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useAnimationControls,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';

const HANDLE = 24;

/**
 * Elastic slider: drag the knob along the track (value 0-100). While dragging
 * the knob stretches in the drag direction (scaleX 1.3 / scaleY 0.85); the
 * track fill trails behind on a lazier spring (stiffness 140, damping 22).
 * Release snaps the knob back with a jelly bounce (stiffness 500, damping 12).
 * The mono readout renders a MotionValue directly — no per-frame setState.
 */
export default function ElasticSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackW, setTrackW] = useState(0);

  const maxX = Math.max(trackW - HANDLE, 1);
  const x = useMotionValue(0);
  const fillX = useSpring(x, { stiffness: 140, damping: 22, mass: 0.8 });
  const jelly = useAnimationControls();

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      setTrackW(el.clientWidth);
      if (x.get() === 0) x.set((el.clientWidth - HANDLE) * 0.35);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [x]);

  const clampX = (v: number) => Math.min(Math.max(v, 0), maxX);
  const fillWidth = useTransform(fillX, (v) => `${(clampX(v) / maxX) * 100}%`);
  const percent = useTransform(x, (v) => Math.round((clampX(v) / maxX) * 100));

  const jumpTo = (clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const target = clampX(clientX - rect.left - HANDLE / 2);
    void animate(x, target, { type: 'spring', stiffness: 400, damping: 30 });
    void jelly.start({
      scaleX: [1, 1.3, 1],
      scaleY: [1, 0.85, 1],
      transition: { duration: 0.45, times: [0, 0.4, 1], ease: 'easeOut' },
    });
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-10">
      <div className="flex w-full max-w-md items-center gap-5">
        <div
          ref={trackRef}
          onPointerDown={(e) => {
            if (e.target === e.currentTarget) jumpTo(e.clientX);
          }}
          className="relative h-1 flex-1 rounded-full bg-zinc-200"
        >
          <motion.div
            style={{ width: fillWidth }}
            className="absolute inset-y-0 left-0 rounded-full bg-zinc-950"
          />
          <motion.div
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="弹性滑块"
            tabIndex={0}
            drag="x"
            dragConstraints={{ left: 0, right: maxX }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={() => {
              void jelly.start({
                scaleX: 1.3,
                scaleY: 0.85,
                transition: { duration: 0.15, ease: 'easeOut' },
              });
            }}
            onDragEnd={() => {
              void jelly.start({
                scaleX: [1.3, 1],
                scaleY: [0.85, 1],
                transition: { type: 'spring', stiffness: 500, damping: 12 },
              });
            }}
            style={{ x }}
            className="absolute -top-2.5 left-0 cursor-grab active:cursor-grabbing"
          >
            <motion.div
              initial={false}
              animate={jelly}
              className="h-6 w-6 rounded-full border border-zinc-200 bg-white shadow-sm"
            />
          </motion.div>
        </div>
        <motion.span className="w-8 text-right font-mono text-sm tabular-nums text-zinc-950">
          {percent}
        </motion.span>
      </div>
    </div>
  );
}
