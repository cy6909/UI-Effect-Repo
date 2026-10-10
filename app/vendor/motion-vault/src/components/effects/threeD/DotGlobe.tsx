import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group, Mesh, MeshBasicMaterial } from 'three';
import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  QuadraticBezierCurve3,
  TubeGeometry,
  Vector3,
} from 'three';

const COUNT = 600;
const RADIUS = 2;

function fibonacciSphere(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const base = new Color('#F4F4F5'); // zinc-100
  const tmp = new Color();
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = golden * i;
    positions[i * 3] = Math.cos(theta) * r * radius;
    positions[i * 3 + 1] = y * radius;
    positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    // zinc-100 dots at varying brightness for instrument-like depth
    tmp.copy(base).multiplyScalar(0.3 + Math.random() * 0.7);
    colors[i * 3] = tmp.r;
    colors[i * 3 + 1] = tmp.g;
    colors[i * 3 + 2] = tmp.b;
  }
  return { positions, colors };
}

function spherePoint(latDeg: number, lonDeg: number, radius: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return new Vector3(
    Math.cos(lat) * Math.cos(lon) * radius,
    Math.sin(lat) * radius,
    Math.cos(lat) * Math.sin(lon) * radius,
  );
}

type Arc = { curve: QuadraticBezierCurve3; core: TubeGeometry; halo: TubeGeometry };

function makeArc(a: Vector3, b: Vector3, lift: number): Arc {
  const mid = a
    .clone()
    .add(b)
    .multiplyScalar(0.5)
    .normalize()
    .multiplyScalar(RADIUS * lift);
  const curve = new QuadraticBezierCurve3(a, mid, b);
  return {
    curve,
    core: new TubeGeometry(curve, 64, 0.011, 8, false),
    halo: new TubeGeometry(curve, 64, 0.045, 8, false),
  };
}

function GlobeScene() {
  const group = useRef<Group>(null);
  const pulseA = useRef<Mesh>(null);
  const pulseB = useRef<Mesh>(null);
  const haloMatA = useRef<MeshBasicMaterial>(null);
  const haloMatB = useRef<MeshBasicMaterial>(null);

  const dotGeo = useMemo(() => {
    const { positions, colors } = fibonacciSphere(COUNT, RADIUS);
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(positions, 3));
    g.setAttribute('color', new Float32BufferAttribute(colors, 3));
    return g;
  }, []);

  const arcs = useMemo<Arc[]>(
    () => [
      makeArc(spherePoint(28, -40, RADIUS), spherePoint(-12, 96, RADIUS), 1.55),
      makeArc(spherePoint(46, 60, RADIUS), spherePoint(-35, -120, RADIUS), 1.7),
    ],
    [],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      group.current.rotation.y = t * 0.12;
      group.current.rotation.x = 0.32 + Math.sin(t * 0.2) * 0.03;
    }
    // bright pulses travelling along each arc
    const pulses: Array<[typeof pulseA, Arc, number, number]> = [
      [pulseA, arcs[0], 0.22, 0],
      [pulseB, arcs[1], 0.16, 0.45],
    ];
    for (const [ref, arc, speed, offset] of pulses) {
      const u = (t * speed + offset) % 1;
      const p = arc.curve.getPoint(u);
      ref.current?.position.copy(p);
    }
    if (haloMatA.current) haloMatA.current.opacity = 0.1 + 0.06 * Math.sin(t * 1.6);
    if (haloMatB.current) haloMatB.current.opacity = 0.1 + 0.06 * Math.sin(t * 1.6 + 2.1);
  });

  return (
    <group ref={group}>
      <points geometry={dotGeo}>
        <pointsMaterial size={0.035} vertexColors sizeAttenuation toneMapped={false} />
      </points>
      {arcs.map((arc, i) => (
        <group key={i}>
          <mesh geometry={arc.core}>
            <meshBasicMaterial color="#FAFAFA" toneMapped={false} transparent opacity={0.9} />
          </mesh>
          <mesh geometry={arc.halo}>
            <meshBasicMaterial
              ref={i === 0 ? haloMatA : haloMatB}
              color="#E4E4E7"
              toneMapped={false}
              transparent
              opacity={0.12}
              depthWrite={false}
            />
          </mesh>
        </group>
      ))}
      <mesh ref={pulseA}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
      <mesh ref={pulseB}>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color="#FFFFFF" toneMapped={false} />
      </mesh>
    </group>
  );
}

/** Dotted globe: Fibonacci-sphere points with two glowing connection arcs (React Three Fiber). */
export default function DotGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0.6, 5.2], fov: 45 }}
      dpr={[1, 1.75]}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
      gl={{ antialias: false, alpha: false }}
    >
      <color attach="background" args={['#09090B']} />
      <GlobeScene />
    </Canvas>
  );
}
