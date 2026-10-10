import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import {
  Camera,
  Compass,
  Home,
  Mail,
  Music,
  Search,
  Settings,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const items: { icon: LucideIcon; name: string; tile: string }[] = [
  { icon: Home, name: 'Home', tile: 'linear-gradient(180deg, #52525B 0%, #3F3F46 100%)' },
  { icon: Search, name: 'Search', tile: 'linear-gradient(180deg, #71717A 0%, #52525B 100%)' },
  { icon: Compass, name: 'Explore', tile: 'linear-gradient(180deg, #3F3F46 0%, #27272A 100%)' },
  { icon: Music, name: 'Music', tile: 'linear-gradient(180deg, #52525B 0%, #18181B 100%)' },
  { icon: Camera, name: 'Camera', tile: 'linear-gradient(180deg, #71717A 0%, #3F3F46 100%)' },
  { icon: Mail, name: 'Mail', tile: 'linear-gradient(180deg, #3F3F46 0%, #27272A 100%)' },
  { icon: Settings, name: 'Settings', tile: 'linear-gradient(180deg, #52525B 0%, #3F3F46 100%)' },
];

function DockIcon({
  mouseX,
  icon: Icon,
  name,
  tile,
}: {
  mouseX: MotionValue<number>;
  icon: LucideIcon;
  name: string;
  tile: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  // distance from cursor to this icon's center, in px
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect();
    if (!b) return Infinity;
    return x - b.x - b.width / 2;
  });
  // magnification falloff: 48px at rest, 72px under the cursor
  const sizeSync = useTransform(distance, [-110, 0, 110], [48, 72, 48]);
  const size = useSpring(sizeSync, { mass: 0.1, stiffness: 170, damping: 13 });

  return (
    <motion.div
      ref={ref}
      title={name}
      style={{ width: size, height: size, background: tile }}
      className="flex items-center justify-center rounded-xl shadow-[0_8px_20px_-8px_rgba(0,0,0,0.35)]"
    >
      <Icon className="h-1/2 w-1/2 text-zinc-100" strokeWidth={1.8} />
    </motion.div>
  );
}

/**
 * macOS-style dock: seven rounded icon tiles on a frosted bar. Moving the
 * cursor along the bar magnifies icons by distance (48 → 72px) and lifts
 * them (items-end baseline), driven purely by a MotionValue distance
 * function + useSpring — no setState in the pointer path.
 */
export default function DockBar() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="flex h-full w-full items-end justify-center pb-12">
      <div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        className="flex items-end gap-3 rounded-2xl border border-zinc-200 bg-white/75 px-4 py-3 shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] backdrop-blur"
      >
        {items.map((item) => (
          <DockIcon key={item.name} mouseX={mouseX} {...item} />
        ))}
      </div>
    </div>
  );
}
