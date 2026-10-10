import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { BufferAttribute, PlaneGeometry } from 'three';

const SEG = 48;
const W = 6.4;
const H = 4.2;

function ClothScene() {
  const group = useRef<Group>(null);

  const { geo, base } = useMemo(() => {
    const g = new PlaneGeometry(W, H, SEG, SEG);
    const pos = g.attributes.position as BufferAttribute;
    return { geo: g, base: new Float32Array(pos.array as Float32Array) };
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const pos = geo.attributes.position as BufferAttribute;
    // interleaved sine weave: alternating warp/weft phase per vertex
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 3];
      const y = base[i * 3 + 1];
      const ix = i % (SEG + 1);
      const iy = Math.floor(i / (SEG + 1));
      const weave = ((ix + iy) % 2 === 0 ? 1 : -1) * 0.07 * Math.sin(t * 1.7 + x * 2.3 + y * 1.1);
      pos.setZ(
        i,
        Math.sin(x * 1.1 + t * 1.2) * 0.26 + Math.cos(y * 1.5 + t * 0.9) * 0.2 + weave,
      );
    }
    pos.needsUpdate = true;
    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.18) * 0.04;
    }
  });

  return (
    <group ref={group} rotation={[-0.95, 0, 0]}>
      <mesh geometry={geo}>
        <meshBasicMaterial color="#A1A1AA" wireframe transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

/** Woven cloth: a 48x48 wireframe plane rippling like fabric in the wind (React Three Fiber). */
export default function WovenCloth() {
  return (
    <Canvas
      camera={{ position: [0, 1.4, 4.3], fov: 45 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#FAFAFA']} />
      <ClothScene />
    </Canvas>
  );
}
