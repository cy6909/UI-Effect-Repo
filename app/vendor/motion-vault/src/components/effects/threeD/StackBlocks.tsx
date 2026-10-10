import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import type { Group, Mesh, MeshStandardMaterial } from 'three';

const MAX_BLOCKS = 8;
const DROP_HEIGHT = 4.6;
const GRAVITY = 26;
const BOUNCE = 0.35;

// zinc-600 / zinc-400 / sage / sand — muted tones for the dark stage
const PALETTE = ['#52525B', '#A1A1AA', '#9CAF88', '#D9CDB8'];

type BlockSpec = {
  id: number;
  color: string;
  w: number;
  h: number;
  d: number;
  x: number;
  targetY: number; // resting center height
  tilt: number; // initial settle-wobble amplitude
};

type ResetRef = { current: { active: boolean; t: number } };

function Block({ spec, reset }: { spec: BlockSpec; reset: ResetRef }) {
  const mesh = useRef<Mesh>(null);
  const mat = useRef<MeshStandardMaterial>(null);
  const y = useRef(spec.targetY + DROP_HEIGHT);
  const vy = useRef(0);
  const settled = useRef(false);
  const wobbleT = useRef(0);

  useFrame((_, rawDelta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(rawDelta, 0.05);

    if (reset.current.active) {
      // fade out while the whole stack sinks (handled by parent group)
      if (mat.current) mat.current.opacity = Math.max(0, 1 - reset.current.t * 1.4);
      return;
    }

    if (!settled.current) {
      vy.current -= GRAVITY * dt;
      y.current += vy.current * dt;
      if (y.current <= spec.targetY) {
        y.current = spec.targetY;
        if (Math.abs(vy.current) > 1.6) {
          vy.current = -vy.current * BOUNCE; // small landing bounce
          wobbleT.current = 0;
        } else {
          vy.current = 0;
          settled.current = true;
          wobbleT.current = 0;
        }
      }
      m.position.y = y.current;
    } else if (wobbleT.current < 2) {
      wobbleT.current += dt;
      const decay = Math.exp(-3.2 * wobbleT.current);
      m.rotation.z = spec.tilt * decay * Math.cos(9 * wobbleT.current);
      m.rotation.x = spec.tilt * 0.6 * decay * Math.sin(7 * wobbleT.current);
    }
  });

  return (
    <RoundedBox
      ref={mesh}
      args={[spec.w, spec.h, spec.d]}
      radius={0.06}
      smoothness={4}
      position={[spec.x, spec.targetY + DROP_HEIGHT, 0]}
    >
      <meshStandardMaterial ref={mat} color={spec.color} roughness={0.7} metalness={0.08} transparent />
    </RoundedBox>
  );
}

function StackScene({
  blocks,
  reset,
  onResetDone,
}: {
  blocks: BlockSpec[];
  reset: ResetRef;
  onResetDone: () => void;
}) {
  const stack = useRef<Group>(null);

  useFrame((state, rawDelta) => {
    const g = stack.current;
    if (!g) return;
    const dt = Math.min(rawDelta, 0.05);

    // slow camera-like orbit
    g.rotation.y += dt * 0.1;

    // the taller the stack, the more it sways
    const sway = Math.min(blocks.length / MAX_BLOCKS, 1);
    g.rotation.z = Math.sin(state.clock.elapsedTime * 0.9) * 0.014 * sway;

    if (reset.current.active) {
      reset.current.t += dt / 0.9; // ~0.9s fade-down
      const t = Math.min(reset.current.t, 1);
      const eased = t * t;
      g.position.y = -4.2 * eased;
      if (t >= 1) {
        reset.current = { active: false, t: 0 };
        g.position.y = 0;
        onResetDone();
      }
    }
  });

  return (
    <group ref={stack}>
      {blocks.map((spec) => (
        <Block key={spec.id} spec={spec} reset={reset} />
      ))}
    </group>
  );
}

/** A stacking toy: each click drops a rounded block onto the pile; after 8 it gently fades down and restarts. */
export default function StackBlocks() {
  const nextId = useRef(0);
  const reset = useRef({ active: false, t: 0 });
  const resetTimer = useRef<number | null>(null);
  const [blocks, setBlocks] = useState<BlockSpec[]>([]);

  const addBlock = () => {
    if (reset.current.active) return;
    setBlocks((prev) => {
      if (prev.length >= MAX_BLOCKS) return prev;
      const h = 0.42 * (0.85 + Math.random() * 0.3);
      const base = prev.reduce((sum, b) => sum + b.h, 0);
      const spec: BlockSpec = {
        id: nextId.current++,
        color: PALETTE[Math.floor(Math.random() * PALETTE.length)]!,
        w: 0.95 * (0.85 + Math.random() * 0.3),
        h,
        d: 0.95 * (0.85 + Math.random() * 0.3),
        x: (Math.random() - 0.5) * 0.14,
        targetY: base + h / 2,
        tilt: (Math.random() - 0.5) * 0.35,
      };
      const next = [...prev, spec];
      if (next.length === MAX_BLOCKS) {
        // let the last block settle, then fade the stack down and restart
        resetTimer.current = window.setTimeout(() => {
          reset.current = { active: true, t: 0 };
        }, 2200);
      }
      return next;
    });
  };

  const handleResetDone = () => {
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    setBlocks([]);
  };

  return (
    <div className="absolute inset-0 cursor-pointer" onPointerDown={addBlock}>
      <Canvas
        camera={{ position: [0, 2.4, 6.6], fov: 42 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#09090B']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 7, 4]} intensity={1.4} />
        <directionalLight position={[-4, 3, -3]} intensity={0.35} />
        <StackScene blocks={blocks} reset={reset} onResetDone={handleResetDone} />
        <ContactShadows position={[0, 0.001, 0]} opacity={0.55} scale={8} blur={2.4} far={3.5} color="#000000" />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-400 backdrop-blur">
        点击堆叠方块 · {blocks.length}/{MAX_BLOCKS}
      </div>
    </div>
  );
}
