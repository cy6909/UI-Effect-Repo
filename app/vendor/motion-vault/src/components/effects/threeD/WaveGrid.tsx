import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Color, Object3D } from 'three';
import type { Group, InstancedMesh } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

const COUNT = 22;
const SPACING = 0.44;
const FOOT = 0.32;
const TOTAL = COUNT * COUNT;
const HALF = ((COUNT - 1) * SPACING) / 2;

const LOW = new Color('#27272A'); // zinc-800
const HIGH = new Color('#E4E4E7'); // zinc-200, read as the light ripple crest

function Grid() {
  const mesh = useRef<InstancedMesh>(null);
  const group = useRef<Group>(null);
  // ripple center: lerped toward the pointer hit point
  const center = useRef({ x: 0, z: 0 });
  const target = useRef({ x: 0, z: 0 });

  const dummy = useMemo(() => new Object3D(), []);
  const tint = useMemo(() => new Color(), []);
  const cells = useMemo(() => {
    const xs = new Float32Array(TOTAL);
    const zs = new Float32Array(TOTAL);
    let i = 0;
    for (let row = 0; row < COUNT; row++) {
      for (let col = 0; col < COUNT; col++) {
        xs[i] = col * SPACING - HALF;
        zs[i] = row * SPACING - HALF;
        i++;
      }
    }
    return { xs, zs };
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;

    // ease ripple center toward pointer target
    center.current.x += (target.current.x - center.current.x) * 0.08;
    center.current.z += (target.current.z - center.current.z) * 0.08;

    const { xs, zs } = cells;
    for (let i = 0; i < TOTAL; i++) {
      const dist = Math.hypot(xs[i] - center.current.x, zs[i] - center.current.z);
      const wave = (Math.sin(dist - t * 2.2) + 1) * 0.5; // 0..1
      const h = 0.15 + wave * 1.1;
      dummy.position.set(xs[i], h / 2, zs[i]);
      dummy.scale.set(1, h, 1);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      tint.copy(LOW).lerp(HIGH, wave * wave);
      mesh.current.setColorAt(i, tint);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;

    // slow breathing rotation, ±3deg
    if (group.current) group.current.rotation.y = Math.sin(t * 0.3) * (Math.PI / 60);
  });

  const onMove = (e: ThreeEvent<PointerEvent>) => {
    target.current.x = e.point.x;
    target.current.z = e.point.z;
  };
  const onLeave = () => {
    target.current.x = 0;
    target.current.z = 0;
  };

  return (
    <>
      {/* invisible pointer-catch plane at grid base level */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
      >
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      <group ref={group}>
        <instancedMesh ref={mesh} args={[undefined, undefined, TOTAL]} frustumCulled={false}>
          <boxGeometry args={[FOOT, 1, FOOT]} />
          <meshStandardMaterial roughness={0.85} metalness={0.05} />
        </instancedMesh>
      </group>
    </>
  );
}

/** 22x22 matte blocks rippling from a pointer-driven radial wave (React Three Fiber). */
export default function WaveGrid() {
  return (
    <Canvas
      camera={{ position: [0, 8.8, 8.8], fov: 40 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
      gl={{ antialias: false, alpha: false }}
      onCreated={({ camera }) => camera.lookAt(0, 0, 0)}
    >
      <color attach="background" args={['#FAFAFA']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 8, 4]} intensity={1.2} />
      <Grid />
    </Canvas>
  );
}
