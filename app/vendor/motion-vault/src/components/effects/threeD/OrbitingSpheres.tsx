import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';

type OrbitSpec = {
  speed: number; // rad/s, 0.3 - 0.8
  color: string;
  size: number;
  phase: number;
};

type RingSpec = {
  tilt: number; // radians
  radius: number;
  orbits: OrbitSpec[];
};

const ZINC_400 = '#A1A1AA';
const ZINC_600 = '#52525B';
const AMBER = '#F59E0B';

const RINGS: RingSpec[] = [
  {
    tilt: 0,
    radius: 1.7,
    orbits: [
      { speed: 0.8, color: ZINC_600, size: 0.14, phase: 0 },
      { speed: 0.45, color: ZINC_400, size: 0.18, phase: 2.4 },
    ],
  },
  {
    tilt: (35 * Math.PI) / 180,
    radius: 2.1,
    orbits: [
      { speed: 0.6, color: AMBER, size: 0.16, phase: 1.1 },
      { speed: 0.35, color: ZINC_400, size: 0.13, phase: 3.9 },
    ],
  },
  {
    tilt: (-25 * Math.PI) / 180,
    radius: 2.5,
    orbits: [
      { speed: 0.5, color: ZINC_600, size: 0.15, phase: 0.7 },
      { speed: 0.3, color: ZINC_400, size: 0.19, phase: 4.6 },
    ],
  },
];

function Orbiter({ spec, radius }: { spec: OrbitSpec; radius: number }) {
  const pivot = useRef<Group>(null);

  useFrame((state) => {
    if (!pivot.current) return;
    pivot.current.rotation.y = spec.phase + state.clock.elapsedTime * spec.speed;
  });

  return (
    <group ref={pivot}>
      <mesh position={[radius, 0, 0]}>
        <sphereGeometry args={[spec.size, 24, 24]} />
        <meshStandardMaterial color={spec.color} roughness={0.85} metalness={0.05} />
      </mesh>
    </group>
  );
}

function OrbitRing({ spec }: { spec: RingSpec }) {
  return (
    <group rotation={[spec.tilt, 0, 0]}>
      {/* hairline orbit path */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[spec.radius, 0.004, 8, 128]} />
        <meshBasicMaterial color="#D4D4D8" transparent opacity={0.6} />
      </mesh>
      {spec.orbits.map((orbit, i) => (
        <Orbiter key={i} spec={orbit} radius={spec.radius} />
      ))}
    </group>
  );
}

function OrbitScene() {
  const group = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.05;
  });

  return (
    <group ref={group}>
      {/* matte central sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 48, 48]} />
        <meshStandardMaterial color="#E4E4E7" roughness={0.9} metalness={0.02} />
      </mesh>
      {RINGS.map((ring, i) => (
        <OrbitRing key={i} spec={ring} />
      ))}
    </group>
  );
}

/** Matte central sphere with six satellites on three tilted hairline orbits (React Three Fiber). */
export default function OrbitingSpheres() {
  return (
    <Canvas
      camera={{ position: [0, 0.7, 5.8], fov: 45 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#FAFAFA']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <OrbitScene />
    </Canvas>
  );
}
