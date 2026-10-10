import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';

type RingSpec = {
  radius: number;
  opacity: number;
  tiltX: number;
  tiltY: number;
  spin: number;
};

function buildRings(): RingSpec[] {
  const rings: RingSpec[] = [];
  for (let i = 0; i < 5; i++) {
    rings.push({
      radius: 1.0 + i * 0.25,
      opacity: 0.5 + (i / 4) * 0.4,
      tiltX: (Math.random() * 2 - 1) * 0.6,
      tiltY: (Math.random() * 2 - 1) * 0.6,
      // 0.2–0.6 rad/s, alternating direction
      spin: (0.2 + i * 0.1) * (i % 2 === 0 ? 1 : -1),
    });
  }
  return rings;
}

function Ring({ spec }: { spec: RingSpec }) {
  const mesh = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.x += delta * spec.spin;
    mesh.current.rotation.y += delta * spec.spin * 0.7;
  });

  return (
    <mesh ref={mesh} rotation={[spec.tiltX, spec.tiltY, 0]}>
      <torusGeometry args={[spec.radius, 0.015, 8, 96]} />
      <meshBasicMaterial color="#ffffff" wireframe transparent opacity={spec.opacity} />
    </mesh>
  );
}

function RingsGroup() {
  const group = useRef<Group>(null);
  const rings = useMemo(buildRings, []);

  useFrame((state) => {
    if (!group.current) return;
    const targetX = state.pointer.y * 0.1;
    const targetY = state.pointer.x * 0.1;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
  });

  return (
    <group ref={group}>
      {rings.map((spec) => (
        <Ring key={spec.radius} spec={spec} />
      ))}
    </group>
  );
}

/** Five concentric wireframe gyroscope rings with subtle mouse parallax (React Three Fiber). */
export default function RotatingRings() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 50 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
      gl={{ antialias: false, alpha: false }}
    >
      <RingsGroup />
    </Canvas>
  );
}
