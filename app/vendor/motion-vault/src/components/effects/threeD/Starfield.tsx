import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MathUtils } from 'three';
import type { BufferAttribute, LineSegments } from 'three';

const DEPTH = 60;
const BASE_SPEED = 6;
const WARP_SPEED = 30;

type Star = { x: number; y: number; z: number };

function buildStars(count: number): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1 + Math.random() * 9;
    stars.push({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      z: -DEPTH + Math.random() * DEPTH,
    });
  }
  return stars;
}

function StarTunnel({ count }: { count: number }) {
  const segments = useRef<LineSegments>(null);
  const stars = useMemo(() => buildStars(count), [count]);
  const speed = useRef(BASE_SPEED);
  const targetSpeed = useRef(BASE_SPEED);
  const warpTimer = useRef<number | null>(null);
  const gl = useThree((s) => s.gl);

  // two vertices per star: [head, tail] — tail trails behind to form streaks
  const positions = useMemo(() => new Float32Array(count * 6), [count]);

  // click anywhere on the canvas to warp (line raycasting is unreliable, so
  // listen on the DOM element instead)
  useEffect(() => {
    const onPointerDown = () => {
      targetSpeed.current = WARP_SPEED;
      if (warpTimer.current !== null) window.clearTimeout(warpTimer.current);
      // hold warp for 3s, then ease back over ~2s via damp
      warpTimer.current = window.setTimeout(() => {
        targetSpeed.current = BASE_SPEED;
      }, 3000);
    };
    gl.domElement.addEventListener('pointerdown', onPointerDown);
    return () => {
      gl.domElement.removeEventListener('pointerdown', onPointerDown);
      if (warpTimer.current !== null) window.clearTimeout(warpTimer.current);
    };
  }, [gl]);

  useFrame((_, delta) => {
    const segs = segments.current;
    if (!segs) return;
    // 3s ramp up to warp, ~2s settle back (damp lambda controls the ease)
    const lambda = targetSpeed.current > speed.current ? 1.5 : 2.2;
    speed.current = MathUtils.damp(speed.current, targetSpeed.current, lambda, delta);

    const posAttr = segs.geometry.getAttribute('position') as BufferAttribute;
    // streak length grows with speed (stars stretch into lines while warping)
    const stretch = speed.current * 0.045;
    for (let i = 0; i < stars.length; i++) {
      const star = stars[i];
      star.z += speed.current * delta;
      if (star.z > 2) star.z -= DEPTH; // wrap back to the far end
      posAttr.setXYZ(i * 2, star.x, star.y, star.z);
      posAttr.setXYZ(i * 2 + 1, star.x, star.y, star.z - stretch);
    }
    posAttr.needsUpdate = true;
  });

  return (
    <lineSegments ref={segments}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#ffffff" transparent opacity={0.85} />
    </lineSegments>
  );
}

/** Stars flying through a deep tunnel; click to warp (React Three Fiber). */
export default function Starfield() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const count = isMobile ? 1500 : 3000;

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: 70 }}
      dpr={[1, 1.75]}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        background: '#09090B',
        cursor: 'pointer',
      }}
      gl={{ antialias: false, alpha: false }}
    >
      <StarTunnel count={count} />
    </Canvas>
  );
}
