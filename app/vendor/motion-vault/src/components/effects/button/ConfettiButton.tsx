import { useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { PartyPopper } from 'lucide-react';

type Piece = {
  id: number;
  /** horizontal travel */
  x: number;
  /** upward peak (negative y) */
  peak: number;
  /** extra fall distance after the peak (gravity) */
  drop: number;
  rotate: number;
  color: string;
  circle: boolean;
  size: number;
  delay: number;
  duration: number;
};

const COLORS = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'];
const COUNT = 30;

function makePieces(base: number): Piece[] {
  return Array.from({ length: COUNT }, (_, i) => {
    // upward cone: 90° ± 60° (30°..150°)
    const angle = ((30 + Math.random() * 120) * Math.PI) / 180;
    const dist = 60 + Math.random() * 80;
    return {
      id: base + i,
      x: Math.cos(angle) * dist,
      peak: -Math.sin(angle) * dist,
      drop: 90 + Math.random() * 70,
      rotate: (Math.random() - 0.5) * 720,
      color: COLORS[i % COLORS.length],
      circle: Math.random() > 0.5,
      size: 5 + Math.random() * 5,
      delay: Math.random() * 0.05,
      duration: 1.1 + Math.random() * 0.4,
    };
  });
}

/**
 * Confetti burst: click spawns 30 tiny rects/circles (5 muted colors) from
 * the button's center — ±60° upward cone, tumble, gravity arc, fade out —
 * while the button squash-scales (1 → 0.92 → 1.05 → 1, 350ms). Re-clickable.
 */
export default function ConfettiButton() {
  const idRef = useRef(0);
  const [pieces, setPieces] = useState<Piece[]>([]);
  const controls = useAnimationControls();

  const burst = () => {
    const base = (idRef.current += COUNT);
    setPieces((p) => [...p, ...makePieces(base)]);
    void controls.start({
      scale: [1, 0.92, 1.05, 1],
      transition: { duration: 0.35, ease: 'easeOut' },
    });
  };

  const removePiece = (id: number) => setPieces((p) => p.filter((piece) => piece.id !== id));

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative">
        {/* confetti layer, anchored at the button's center */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-20">
          {pieces.map((piece) => (
            <motion.span
              key={piece.id}
              aria-hidden
              className="absolute"
              style={{
                width: piece.circle ? piece.size * 0.7 : piece.size * 0.55,
                height: piece.circle ? piece.size * 0.7 : piece.size,
                backgroundColor: piece.color,
                borderRadius: piece.circle ? '50%' : 2,
              }}
              initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
              animate={{
                x: [0, piece.x * 0.7, piece.x, piece.x],
                y: [0, piece.peak, piece.peak + piece.drop * 0.5, piece.peak + piece.drop],
                rotate: [0, piece.rotate * 0.4, piece.rotate * 0.75, piece.rotate],
                opacity: [1, 1, 0.85, 0],
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                times: [0, 0.4, 0.75, 1],
                ease: ['easeOut', 'easeIn', 'easeIn'],
              }}
              onAnimationComplete={() => removePiece(piece.id)}
            />
          ))}
        </div>
        <motion.button
          type="button"
          onClick={burst}
          animate={controls}
          className="relative z-10 flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          <PartyPopper className="h-4 w-4" />
          完成部署
        </motion.button>
      </div>
    </div>
  );
}
