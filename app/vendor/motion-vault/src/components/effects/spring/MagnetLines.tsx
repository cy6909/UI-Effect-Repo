import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';

const COLS = 9;
const ROWS = 5;
const GAP = 30;
const LINE = 12;

type CellProps = {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  active: MotionValue<number>;
  cx: number;
  cy: number;
};

/** One magnetized line: springs its rotation toward the pointer; nearby lines grow longer and darker. */
function LineCell({ mx, my, active, cx, cy }: CellProps) {
  const angle = useTransform([mx, my, active], ([x, y, a]) =>
    (a as number) > 0.5 ? (Math.atan2((y as number) - cy, (x as number) - cx) * 180) / Math.PI : 0,
  );
  const rotate = useSpring(angle, { stiffness: 180, damping: 16 });

  const dist = useTransform([mx, my, active], ([x, y, a]) =>
    (a as number) > 0.5 ? Math.hypot((x as number) - cx, (y as number) - cy) : 9999,
  );
  const scaleX = useSpring(useTransform(dist, [40, 220], [1.7, 1]), { stiffness: 200, damping: 20 });
  const backgroundColor = useTransform(dist, [40, 220], ['#09090B', '#A1A1AA']);

  return (
    <motion.span
      style={{
        rotate,
        scaleX,
        backgroundColor,
        left: cx - LINE / 2,
        top: cy - 1,
      }}
      className="pointer-events-none absolute h-[2px] w-3 rounded-full"
    />
  );
}

/**
 * Magnet lines (React Bits): a 9×5 grid of short lines; each springs its
 * rotation to point at the cursor (stiffness 180, damping 16), nearby lines
 * stretch longer and darken to zinc-950, and everything eases back upright
 * when the pointer leaves. All MotionValues — zero setState.
 */
export default function MagnetLines() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const active = useMotionValue(0);

  const cells: { cx: number; cy: number }[] = [];
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cells.push({ cx: col * GAP + GAP / 2, cy: row * GAP + GAP / 2 });
    }
  }

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        ref={wrapRef}
        onPointerMove={(e) => {
          const rect = wrapRef.current?.getBoundingClientRect();
          if (!rect) return;
          mx.set(e.clientX - rect.left);
          my.set(e.clientY - rect.top);
          active.set(1);
        }}
        onPointerLeave={() => active.set(0)}
        className="relative cursor-crosshair"
        style={{ width: COLS * GAP, height: ROWS * GAP }}
        aria-label="磁吸线阵：移动鼠标"
      >
        {cells.map((c) => (
          <LineCell key={`${c.cx}-${c.cy}`} mx={mx} my={my} active={active} cx={c.cx} cy={c.cy} />
        ))}
      </div>
    </div>
  );
}
