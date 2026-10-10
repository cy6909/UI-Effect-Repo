import { useRef } from 'react';
import type { ComponentRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial } from '@react-three/drei';
import { MathUtils } from 'three';
import type { Mesh } from 'three';

function Blob() {
  const mesh = useRef<Mesh>(null);
  const material = useRef<ComponentRef<typeof MeshDistortMaterial>>(null);
  const target = useRef({ distort: 0.45, speed: 1.8 });
  const current = useRef({ distort: 0.45, speed: 1.8 });
  // drei's MeshDistortMaterial drives time as elapsed * fixedSpeed; we override
  // time each frame (this useFrame subscribes after the child's, so it runs
  // later in the frame) to make speed itself smoothly animatable.
  const time = useRef(0);

  useFrame((_, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y += delta * 0.15;
    }
    const mat = material.current;
    if (mat) {
      // ~1s lerp toward the current target
      current.current.distort = MathUtils.damp(current.current.distort, target.current.distort, 4.6, delta);
      current.current.speed = MathUtils.damp(current.current.speed, target.current.speed, 4.6, delta);
      mat.distort = current.current.distort;
      time.current += delta * current.current.speed;
      mat.time = time.current;
    }
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => {
        target.current = { distort: 0.7, speed: 3 };
      }}
      onPointerOut={() => {
        target.current = { distort: 0.45, speed: 1.8 };
      }}
    >
      <sphereGeometry args={[1.4, 128, 128]} />
      <MeshDistortMaterial
        ref={material}
        distort={0.45}
        speed={1.8}
        color="#E4E4E7"
        metalness={0.1}
        roughness={0.4}
      />
    </mesh>
  );
}

/** Simplex-distorted living sphere, intensifies on hover (React Three Fiber). */
export default function DistortedSphere() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
      gl={{ antialias: false, alpha: false }}
    >
      {/* three-point lighting */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} />
      <directionalLight position={[-5, 2, -4]} intensity={0.5} color="#A1A1AA" />
      <pointLight position={[0, -4, 3]} intensity={0.6} />
      <Blob />
    </Canvas>
  );
}
