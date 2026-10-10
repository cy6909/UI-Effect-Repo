import { useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useSpring, useTransform, useVelocity } from 'framer-motion';

const ITEMS = ['首页', '作品', '文章', '关于'];
const ITEM_W = 78;
const ITEM_H = 40;
const PAD = 6;

/**
 * Gooey nav (Magic UI style): the active indicator is a zinc-950 rounded
 * block that slides between items under an SVG gooey filter — a lazier
 * trailing blob fuses with it mid-travel, and velocity stretches the block
 * into a sticky smear. The active label inverts to white.
 */
export default function GooeyNav() {
  const [activeIdx, setActiveIdx] = useState(0);
  const x = useMotionValue(0);
  const tailX = useSpring(x, { stiffness: 90, damping: 14 });
  const vx = useVelocity(x);
  const stretch = useTransform(vx, (v) => 1 + Math.min(Math.abs(v) / 900, 0.55));
  const tailScale = useTransform(vx, (v) => Math.max(0.35, 1 - Math.abs(v) / 2200));
  const firstRun = useRef(true);

  useEffect(() => {
    const target = activeIdx * ITEM_W;
    if (firstRun.current) {
      firstRun.current = false;
      x.set(target);
      return;
    }
    const controls = animate(x, target, { type: 'spring', stiffness: 300, damping: 24 });
    return () => controls.stop();
  }, [activeIdx, x]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="gooeyNavFilter">
            <feGaussianBlur in="SourceGraphic" stdDeviation={5} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      <nav
        className="relative rounded-full border border-zinc-200 bg-white p-1"
        aria-label="融合导航演示"
      >
        {/* gooey indicator layer */}
        <div
          className="pointer-events-none absolute inset-y-1 left-0 z-0"
          style={{ width: ITEMS.length * ITEM_W, filter: 'url(#gooeyNavFilter)' }}
        >
          {/* trailing blob */}
          <motion.span
            style={{ x: tailX, scaleY: tailScale }}
            className="absolute left-[27px] top-[7px] h-5 w-8 rounded-full bg-zinc-950"
          />
          {/* main indicator */}
          <motion.span
            style={{ x, scaleX: stretch }}
            className="absolute left-2 top-[1px] h-8 w-[70px] rounded-lg bg-zinc-950"
          />
        </div>

        {/* labels */}
        <ul className="relative z-10 flex">
          {ITEMS.map((item, i) => (
            <li key={item}>
              <motion.button
                type="button"
                onClick={() => setActiveIdx(i)}
                initial={false}
                animate={{ color: i === activeIdx ? '#FAFAFA' : '#52525B' }}
                transition={{ duration: 0.25 }}
                className="flex items-center justify-center text-[13px] font-medium"
                style={{ width: ITEM_W, height: ITEM_H - PAD }}
                aria-pressed={i === activeIdx}
              >
                {item}
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
