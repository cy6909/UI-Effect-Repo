import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { BufferAttribute, Points } from 'three';

const GRID = 80;
const SIZE = 12;
const COUNT = GRID * GRID;
const LOW = { r: 63 / 255, g: 63 / 255, b: 70 / 255 }; // zinc-700
const HIGH = { r: 250 / 255, g: 250 / 255, b: 250 / 255 }; // zinc-100

function WavePoints() {
  const ref = useRef<Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    for (let iy = 0; iy < GRID; iy++) {
      for (let ix = 0; ix < GRID; ix++) {
        const i = iy * GRID + ix;
        positions[i * 3] = (ix / (GRID - 1) - 0.5) * SIZE;
        positions[i * 3 + 1] = (iy / (GRID - 1) - 0.5) * SIZE;
        positions[i * 3 + 2] = 0;
        colors[i * 3] = LOW.r;
        colors[i * 3 + 1] = LOW.g;
        colors[i * 3 + 2] = LOW.b;
      }
    }
    return { positions, colors };
  }, []);

  useFrame((state) => {
    const points = ref.current;
    if (!points) return;
    const t = state.clock.elapsedTime * 0.8;
    const posAttr = points.geometry.getAttribute('position') as BufferAttribute;
    const colAttr = points.geometry.getAttribute('color') as BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      const x = positions[i * 3];
      const y = positions[i * 3 + 1];
      const z = Math.sin(x * 0.8 + t) * Math.cos(y * 0.8 + t) * 0.4;
      posAttr.setZ(i, z);
      // lerp color between zinc-700 and zinc-100 by wave height (0..1)
      const k = (z + 0.4) / 0.8;
      colAttr.setXYZ(
        i,
        LOW.r + (HIGH.r - LOW.r) * k,
        LOW.g + (HIGH.g - LOW.g) * k,
        LOW.b + (HIGH.b - LOW.b) * k,
      );
    }
    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    // slow ±5deg breathing rotation of the whole plane
    points.rotation.z = Math.sin(state.clock.elapsedTime * 0.25) * ((5 * Math.PI) / 180);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} vertexColors sizeAttenuation transparent opacity={0.9} />
    </points>
  );
}

/** Undulating 80x80 point-grid ocean on a dark stage (React Three Fiber). */
export default function WavePlane() {
  return (
    <Canvas
      camera={{ position: [0, 9.5, 9.5], fov: 50, up: [0, 0, 1] }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
      gl={{ antialias: false, alpha: false }}
    >
      <WavePoints />
    </Canvas>
  );
}
