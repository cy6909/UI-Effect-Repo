import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import type { Mesh } from 'three';

const GRAVITY = 14;
const RESTITUTION = 0.9;
const MIN_BOUNCE_VY = 5.2; // balls never stop bouncing
const WALL_X = 3.1;
const MAX_BALLS = 10;
const SQUASH_MS = 120;

const PALETTE = ['#52525B', '#A1A1AA', '#F59E0B']; // zinc-700-ish, zinc-400, amber

type BallSpec = {
  id: number;
  color: string;
  radius: number;
};

type BallBody = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  squashT: number; // ms since last impact, Infinity when never squashed
  mesh: Mesh | null;
};

const INITIAL_BALLS: BallSpec[] = [
  { id: 0, color: PALETTE[0]!, radius: 0.3 },
  { id: 1, color: PALETTE[1]!, radius: 0.36 },
  { id: 2, color: PALETTE[2]!, radius: 0.27 },
];

function Ball({ spec, body }: { spec: BallSpec; body: { current: BallBody } }) {
  return (
    <mesh
      ref={(mesh) => {
        body.current.mesh = mesh;
      }}
      position={[body.current.x, body.current.y, 0]}
    >
      <sphereGeometry args={[spec.radius, 32, 32]} />
      <meshStandardMaterial color={spec.color} roughness={0.8} metalness={0.05} />
    </mesh>
  );
}

function Scene({
  balls,
  bodies,
  onSpawn,
}: {
  balls: BallSpec[];
  bodies: { current: Map<number, BallBody> };
  onSpawn: (x: number) => void;
}) {
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    for (const spec of balls) {
      const body = bodies.current.get(spec.id);
      if (!body) continue;
      body.vy -= GRAVITY * dt;
      body.y += body.vy * dt;
      body.x += body.vx * dt;
      body.squashT += dt * 1000;

      // side walls keep everything in view
      if (Math.abs(body.x) > WALL_X) {
        body.x = Math.sign(body.x) * WALL_X;
        body.vx = -body.vx * RESTITUTION;
      }

      // floor bounce with squash
      if (body.y < spec.radius) {
        body.y = spec.radius;
        body.vy = Math.max(-body.vy * RESTITUTION, MIN_BOUNCE_VY);
        if (Math.abs(body.vx) < 0.05) body.vx = (Math.random() - 0.5) * 0.6;
        body.squashT = 0;
      }

      const mesh = body.mesh;
      if (mesh) {
        mesh.position.set(body.x, body.y, 0);
        const s = Math.max(0, 1 - body.squashT / SQUASH_MS);
        mesh.scale.set(1 + 0.1 * s, 1 - 0.15 * s, 1 + 0.1 * s);
      }
    }
  });

  return (
    <>
      {balls.map((spec) => {
        let body = bodies.current.get(spec.id);
        if (!body) {
          body = {
            x: (spec.id % 3) * 1.3 - 1.3 + Math.random() * 0.4,
            y: 1.6 + spec.id * 0.9,
            vx: (Math.random() - 0.5) * 1.6,
            vy: 0,
            squashT: Infinity,
            mesh: null,
          };
          bodies.current.set(spec.id, body);
        }
        return <Ball key={spec.id} spec={spec} body={{ current: body }} />;
      })}
      {/* invisible click plane: spawn point follows the click */}
      <mesh
        visible={false}
        position={[0, 2, 0]}
        onPointerDown={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onSpawn(e.point.x);
        }}
      >
        <planeGeometry args={[12, 8]} />
      </mesh>
    </>
  );
}

/** Matte spheres that bounce forever — click anywhere to drop a new ball (max 10). */
export default function BouncingBalls() {
  const nextId = useRef(INITIAL_BALLS.length);
  const bodies = useRef(new Map<number, BallBody>());
  const [balls, setBalls] = useState<BallSpec[]>(INITIAL_BALLS);

  const spawn = (x: number) => {
    setBalls((prev) => {
      if (prev.length >= MAX_BALLS) return prev;
      const id = nextId.current++;
      const body: BallBody = {
        x: Math.max(-WALL_X, Math.min(WALL_X, x)),
        y: 4.2,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -1,
        squashT: Infinity,
        mesh: null,
      };
      bodies.current.set(id, body);
      return [
        ...prev,
        {
          id,
          color: PALETTE[Math.floor(Math.random() * PALETTE.length)]!,
          radius: 0.24 + Math.random() * 0.14,
        },
      ];
    });
  };

  return (
    <div className="absolute inset-0 cursor-pointer">
      <Canvas
        camera={{ position: [0, 1.7, 6.4], fov: 42 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <Scene balls={balls} bodies={bodies} onSpawn={spawn} />
        <ContactShadows position={[0, 0, 0]} opacity={0.32} scale={10} blur={2.6} far={3.5} color="#09090B" />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-200 bg-white/85 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-500 backdrop-blur">
        {balls.length >= MAX_BALLS ? '已达上限 · 10' : `点击落下新球 · ${balls.length}/${MAX_BALLS}`}
      </div>
    </div>
  );
}
