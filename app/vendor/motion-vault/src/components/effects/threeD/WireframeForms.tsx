import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';

const ZINC_400 = '#A1A1AA';
const ZINC_500 = '#71717A';
const ZINC_300 = '#D4D4D8';

/** Three nested wireframe solids rotating on different axes with a breathing scale. */
function WireframeScene() {
  const group = useRef<Group>(null);
  const icosa = useRef<Mesh>(null);
  const torus = useRef<Mesh>(null);
  const octa = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (icosa.current) {
      icosa.current.rotation.x = t * 0.14;
      icosa.current.rotation.y = t * 0.2;
    }
    if (torus.current) {
      torus.current.rotation.x = Math.PI / 2.6 + t * 0.1;
      torus.current.rotation.z = t * 0.26;
    }
    if (octa.current) {
      octa.current.rotation.y = -t * 0.32;
      octa.current.rotation.z = t * 0.18;
    }
    if (group.current) {
      // slow breathing scale + gentle overall drift
      const breathe = 1 + Math.sin(t * 0.6) * 0.04;
      group.current.scale.setScalar(breathe);
      group.current.rotation.y = t * 0.06;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={icosa}>
        <icosahedronGeometry args={[1.55, 0]} />
        <meshBasicMaterial color={ZINC_400} wireframe transparent opacity={0.75} />
      </mesh>
      <mesh ref={torus}>
        <torusGeometry args={[1.02, 0.34, 12, 48]} />
        <meshBasicMaterial color={ZINC_300} wireframe transparent opacity={0.55} />
      </mesh>
      <mesh ref={octa}>
        <octahedronGeometry args={[0.6, 0]} />
        <meshBasicMaterial color={ZINC_500} wireframe transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

/** Minimal nested wireframe sculpture on a light canvas (React Three Fiber). */
export default function WireframeForms() {
  return (
    <Canvas
      camera={{ position: [0, 0.4, 5], fov: 42 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#FAFAFA']} />
      <WireframeScene />
    </Canvas>
  );
}
