import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { InstancedMesh, Group } from 'three';
import { Object3D, Color } from 'three';

const COUNT = 420;
const DEPTH = 70; // tunnel length along z
const RADIUS = 9; // spread of the tunnel cross-section

type Star = {
  x: number;
  y: number;
  z: number;
  shade: number; // 0..1 brightness / hue mix
};

function randomStar(zMin: number, zMax: number): Star {
  // hollow-ish distribution so the streaks wrap around the camera
  const angle = Math.random() * Math.PI * 2;
  const r = 1.2 + Math.pow(Math.random(), 0.6) * RADIUS;
  return {
    x: Math.cos(angle) * r,
    y: Math.sin(angle) * r,
    z: zMin + Math.random() * (zMax - zMin),
    shade: Math.random(),
  };
}

const dummy = new Object3D();
const white = new Color('#FAFAFA');
const blue = new Color('#93C5FD');
const tmpColor = new Color();

function WarpScene() {
  const mesh = useRef<InstancedMesh>(null);
  const group = useRef<Group>(null);
  const stars = useMemo<Star[]>(
    () => Array.from({ length: COUNT }, () => randomStar(-DEPTH, 4)),
    [],
  );

  useFrame((state, delta) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime;
    // warp pulses: cruise speed with periodic eased bursts of acceleration
    const pulse = Math.pow(0.5 + 0.5 * Math.sin(t * 0.45), 3);
    const speed = 5 + 34 * pulse;
    const stretch = 0.6 + speed * 0.075; // streak length grows with speed

    const dt = Math.min(delta, 0.05);
    for (let i = 0; i < COUNT; i++) {
      const s = stars[i];
      s.z += speed * dt;
      if (s.z > 5) {
        const fresh = randomStar(-DEPTH, -DEPTH + 8);
        s.x = fresh.x;
        s.y = fresh.y;
        s.z = fresh.z;
        s.shade = fresh.shade;
      }
      dummy.position.set(s.x, s.y, s.z - stretch / 2);
      dummy.scale.set(1, 1, stretch * (0.7 + s.shade * 0.6));
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
      // distant streaks are dimmer and bluer; near ones brighter and whiter
      const near = 1 - Math.min(1, Math.max(0, -s.z / DEPTH));
      tmpColor.copy(blue).lerp(white, 0.25 + near * 0.75);
      tmpColor.multiplyScalar(0.25 + near * 0.75);
      mesh.current.setColorAt(i, tmpColor);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
    if (mesh.current.instanceColor) mesh.current.instanceColor.needsUpdate = true;

    // slight tunnel roll for extra motion
    if (group.current) group.current.rotation.z = t * 0.05;
  });

  return (
    <group ref={group}>
      <instancedMesh ref={mesh} args={[undefined, undefined, COUNT]} frustumCulled={false}>
        <boxGeometry args={[0.02, 0.02, 1]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
}

/** Hyperspace warp tunnel: streaking stars accelerating toward the camera (React Three Fiber). */
export default function WarpField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#09090B']} />
      <WarpScene />
    </Canvas>
  );
}
