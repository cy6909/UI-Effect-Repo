import { useMemo, useRef } from 'react';
import type { MutableRefObject, PointerEvent as ReactPointerEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Group } from 'three';
import {
  Sparkles,
  Star,
  Heart,
  Zap,
  Moon,
  Music,
  Camera,
  Globe,
  Code2,
  Coffee,
  Rocket,
  Hexagon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICONS: LucideIcon[] = [
  Sparkles,
  Star,
  Heart,
  Zap,
  Moon,
  Music,
  Camera,
  Globe,
  Code2,
  Coffee,
  Rocket,
  Hexagon,
];

const RADIUS = 1.75;
const BASE_SPEED = 0.18; // rad/s idle auto-rotation

type SpinState = {
  dragging: boolean;
  lastX: number;
  lastY: number;
  velY: number; // extra yaw velocity (rad/s), decays with friction
  velX: number; // pitch velocity, clamped
};

function CloudScene({ spin }: { spin: MutableRefObject<SpinState> }) {
  const group = useRef<Group>(null);

  const positions = useMemo<[number, number, number][]>(
    () =>
      ICONS.map((_, i) => {
        // Fibonacci sphere distribution
        const phi = Math.acos(1 - (2 * (i + 0.5)) / ICONS.length);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        return [
          RADIUS * Math.sin(phi) * Math.cos(theta),
          RADIUS * Math.cos(phi),
          RADIUS * Math.sin(phi) * Math.sin(theta),
        ];
      }),
    [],
  );

  useFrame((_, rawDelta) => {
    if (!group.current) return;
    const delta = Math.min(rawDelta, 0.05);
    const s = spin.current;
    const friction = Math.pow(0.94, delta * 60);
    if (!s.dragging) {
      s.velY *= friction;
      s.velX *= friction;
    }
    group.current.rotation.y += (BASE_SPEED + s.velY) * delta;
    // gentle pitch, clamped so the cloud never flips over
    const nextX = group.current.rotation.x + s.velX * delta;
    group.current.rotation.x = Math.max(-0.45, Math.min(0.45, nextX));
  });

  return (
    <group ref={group}>
      {/* faint wireframe sphere to give the cloud depth */}
      <mesh>
        <icosahedronGeometry args={[RADIUS, 1]} />
        <meshBasicMaterial color="#E4E4E7" wireframe transparent opacity={0.5} />
      </mesh>
      {positions.map((pos, i) => {
        const Icon = ICONS[i];
        return (
          <Html key={i} position={pos} center zIndexRange={[5, 0]}>
            <div style={{ pointerEvents: 'none', display: 'flex' }}>
              <Icon size={20} strokeWidth={1.5} color="#52525B" />
            </div>
          </Html>
        );
      })}
    </group>
  );
}

/** Draggable sphere of lucide icons with inertial spin (React Three Fiber + drei Html). */
export default function IconCloud() {
  const spin = useRef<SpinState>({ dragging: false, lastX: 0, lastY: 0, velY: 0, velX: 0 });

  function onPointerDown(e: ReactPointerEvent<HTMLDivElement>) {
    const s = spin.current;
    s.dragging = true;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: ReactPointerEvent<HTMLDivElement>) {
    const s = spin.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.lastX;
    const dy = e.clientY - s.lastY;
    s.lastX = e.clientX;
    s.lastY = e.clientY;
    // convert drag pixels into angular velocity; direction follows the drag
    s.velY = Math.max(-14, Math.min(14, dx * 0.9));
    s.velX = Math.max(-8, Math.min(8, dy * 0.5));
  }

  function endDrag() {
    spin.current.dragging = false;
  }

  return (
    <div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{ touchAction: 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      role="presentation"
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 42 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#FAFAFA']} />
        <CloudScene spin={spin} />
      </Canvas>
      <span className="pointer-events-none absolute bottom-3 left-0 right-0 text-center text-xs text-zinc-400">
        拖拽改变旋转速度与方向
      </span>
    </div>
  );
}
