import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart } from 'lucide-react';

type Particle = {
  id: number;
  angle: number;
  dist: number;
  heart: boolean;
  color: string;
};

const PARTICLE_COLORS = ['#F43F5E', '#FB7185', '#FDA4AF'];
const PARTICLE_COUNT = 7;

function makeParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    angle: ((i * 360) / PARTICLE_COUNT + (Math.random() * 24 - 12)) * (Math.PI / 180),
    dist: 26 + Math.random() * 18,
    heart: i % 3 === 0,
    color: PARTICLE_COLORS[i % PARTICLE_COLORS.length],
  }));
}

/**
 * Twitter-style like button: liking fills the heart rose with an elastic
 * pop, fires an expanding ring and 7 radial particles (dots + mini hearts).
 * Unliking is a calm 150ms shrink. The count slides vertically on change.
 */
export default function LikeButton() {
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(128);
  const [dir, setDir] = useState(1);
  const [burstTick, setBurstTick] = useState(0);
  const particlesRef = useRef<Particle[]>([]);

  const toggle = () => {
    if (liked) {
      setLiked(false);
      setDir(-1);
      setCount((c) => c - 1);
    } else {
      particlesRef.current = makeParticles();
      setBurstTick((t) => t + 1);
      setLiked(true);
      setDir(1);
      setCount((c) => c + 1);
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex items-center gap-1.5">
        <button
          type="button"
          aria-label={liked ? '取消点赞' : '点赞'}
          aria-pressed={liked}
          onClick={toggle}
          className={`relative flex h-12 w-12 items-center justify-center rounded-full transition-colors ${
            liked ? 'text-rose-500' : 'text-zinc-400 hover:bg-rose-50 hover:text-rose-400'
          }`}
        >
          {/* expanding ring on like */}
          {liked && burstTick > 0 && (
            <motion.span
              key={`ring-${burstTick}`}
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full border-2 border-rose-500"
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
            />
          )}
          {/* radial particles on like */}
          {liked && burstTick > 0 && (
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {particlesRef.current.map((p) => (
                <motion.span
                  key={`${burstTick}-${p.id}`}
                  className="absolute"
                  style={{ color: p.color }}
                  initial={{ x: 0, y: 0, scale: 0.7, opacity: 1 }}
                  animate={{
                    x: Math.cos(p.angle) * p.dist,
                    y: Math.sin(p.angle) * p.dist,
                    scale: 0.3,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.65, ease: 'easeOut' }}
                >
                  {p.heart ? (
                    <Heart className="h-2 w-2" fill="currentColor" strokeWidth={0} />
                  ) : (
                    <span className="block h-1 w-1 rounded-full bg-current" />
                  )}
                </motion.span>
              ))}
            </span>
          )}
          {/* heart: elastic pop on like, calm shrink on unlike */}
          <motion.span
            key={liked ? `on-${burstTick}` : 'off'}
            initial={{ scale: liked ? 0 : 0.85 }}
            animate={{ scale: 1 }}
            transition={
              liked
                ? { type: 'spring', stiffness: 420, damping: 11 }
                : { duration: 0.15, ease: 'easeOut' }
            }
            className="flex"
          >
            <Heart
              className="h-6 w-6"
              fill={liked ? 'currentColor' : 'none'}
              strokeWidth={liked ? 0 : 2}
            />
          </motion.span>
        </button>
        {/* sliding count */}
        <span
          className={`relative flex h-5 w-9 items-center overflow-hidden text-sm font-medium tabular-nums ${
            liked ? 'text-rose-500' : 'text-zinc-500'
          }`}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.span
              key={count}
              initial={{ y: dir * 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: dir * -10, opacity: 0 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {count}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}
