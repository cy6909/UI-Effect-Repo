import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import { Matrix4 } from 'three';
import type { Group } from 'three';

const PITCH = 0.35;
const CUBIE = 0.315;
const MOVE_MS = 460;
const IDLE_S = 2.0;

// muted, low-saturation face palette
const FACE_COLORS: Record<string, string> = {
  px: '#C99A8E', // clay
  nx: '#F59E0B', // amber
  py: '#F4F4F5', // white
  ny: '#D9CDB8', // sand
  pz: '#9CAF88', // sage
  nz: '#93B4C8', // steel blue
};
const FACES: { key: string; pos: [number, number, number]; rot: [number, number, number] }[] = [
  { key: 'px', pos: [CUBIE / 2 + 0.004, 0, 0], rot: [0, Math.PI / 2, 0] },
  { key: 'nx', pos: [-CUBIE / 2 - 0.004, 0, 0], rot: [0, -Math.PI / 2, 0] },
  { key: 'py', pos: [0, CUBIE / 2 + 0.004, 0], rot: [-Math.PI / 2, 0, 0] },
  { key: 'ny', pos: [0, -CUBIE / 2 - 0.004, 0], rot: [Math.PI / 2, 0, 0] },
  { key: 'pz', pos: [0, 0, CUBIE / 2 + 0.004], rot: [0, 0, 0] },
  { key: 'nz', pos: [0, 0, -CUBIE / 2 - 0.004], rot: [0, Math.PI, 0] },
];

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** snap a cubie back onto the integer grid after a quarter-turn */
function snapCubie(c: Group) {
  c.position.set(
    Math.round(c.position.x / PITCH) * PITCH,
    Math.round(c.position.y / PITCH) * PITCH,
    Math.round(c.position.z / PITCH) * PITCH,
  );
  c.updateMatrix();
  const e = c.matrix.elements;
  const r = [e[0], e[1], e[2], e[4], e[5], e[6], e[8], e[9], e[10]].map((v) => Math.round(v!));
  const rm = new Matrix4().set(r[0]!, r[3]!, r[6]!, 0, r[1]!, r[4]!, r[7]!, 0, r[2]!, r[5]!, r[8]!, 0, 0, 0, 0, 1);
  c.quaternion.setFromRotationMatrix(rm);
}

type Move = { axis: 'x' | 'y' | 'z'; layer: number; dir: 1 | -1; t0: number };

function Cube({ moveTick, onMove }: { moveTick: { current: number }; onMove: () => void }) {
  const root = useRef<Group>(null);
  const pivot = useRef<Group>(null);
  const cubies = useRef<(Group | null)[]>([]);
  const active = useRef<Move | null>(null);
  const handled = useRef(0);
  const idleFor = useRef(0);
  const lastT = useRef(0);

  const cells = useMemo(() => {
    const arr: [number, number, number][] = [];
    for (const x of [-1, 0, 1]) for (const y of [-1, 0, 1]) for (const z of [-1, 0, 1]) arr.push([x, y, z]);
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(t - lastT.current || 0.016, 0.05);
    lastT.current = t;

    // gentle whole-cube turntable
    if (root.current) {
      root.current.rotation.y += dt * 0.22;
      root.current.rotation.x = 0.42 + Math.sin(t * 0.3) * 0.03;
    }

    const wantsMove = moveTick.current !== handled.current || idleFor.current > IDLE_S;
    if (wantsMove && active.current === null && pivot.current) {
      handled.current = moveTick.current;
      idleFor.current = 0;
      const axes: ('x' | 'y' | 'z')[] = ['x', 'y', 'z'];
      const axis = axes[Math.floor(Math.random() * 3)]!;
      const layer = [-1, 0, 1][Math.floor(Math.random() * 3)]!;
      const dir = (Math.random() < 0.5 ? 1 : -1) as 1 | -1;
      active.current = { axis, layer, dir, t0: t };
      pivot.current.rotation.set(0, 0, 0);
      pivot.current.updateMatrixWorld(true);
      // gather the layer's cubies under the pivot, preserving world transforms
      for (const c of cubies.current) {
        if (!c) continue;
        if (Math.round(c.position[axis] / PITCH) === layer) pivot.current.attach(c);
      }
      onMove();
    }

    const mv = active.current;
    if (mv && pivot.current) {
      const k = Math.min(((t - mv.t0) * 1000) / MOVE_MS, 1);
      pivot.current.rotation[mv.axis] = mv.dir * (Math.PI / 2) * easeInOut(k);
      if (k >= 1) {
        pivot.current.updateMatrixWorld(true);
        // return cubies to the root and snap them onto the grid
        if (root.current) {
          for (const c of [...(pivot.current.children as Group[])]) {
            root.current.attach(c);
            snapCubie(c);
          }
        }
        pivot.current.rotation.set(0, 0, 0);
        active.current = null;
        idleFor.current = 0;
      }
    }
  });

  return (
    <group ref={root} position={[0, 0.95, 0]} rotation={[0.42, 0.6, 0]}>
      <group ref={pivot} />
      {cells.map(([x, y, z], i) => (
        <group
          key={i}
          ref={(el) => (cubies.current[i] = el)}
          position={[x * PITCH, y * PITCH, z * PITCH]}
        >
          <RoundedBox args={[CUBIE, CUBIE, CUBIE]} radius={0.045} smoothness={4}>
            <meshStandardMaterial color="#27272A" roughness={0.5} metalness={0.08} />
          </RoundedBox>
          {FACES.map((f) => (
            <mesh key={f.key} position={f.pos} rotation={f.rot}>
              <planeGeometry args={[CUBIE * 0.78, CUBIE * 0.78]} />
              <meshStandardMaterial color={FACE_COLORS[f.key]} roughness={0.55} metalness={0.02} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** A matte Rubik's cube on a slow turntable — click (or wait) to twist a random layer. */
export default function RubiksCube() {
  const moveTick = useRef(0);
  const [moves, setMoves] = useState(0);

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onPointerDown={() => {
        moveTick.current += 1;
      }}
    >
      <Canvas
        camera={{ position: [0, 1.6, 4.1], fov: 40 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ camera }) => camera.lookAt(0, 0.85, 0)}
      >
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.7} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-4, 3, -4]} intensity={0.35} />
        <Cube moveTick={moveTick} onMove={() => setMoves((n) => n + 1)} />
        <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={7} blur={2.6} far={3} color="#09090B" />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-200 bg-white/85 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-500 backdrop-blur">
        {moves === 0 ? '点击拧动一层 · 静置自动打乱' : `已拧动 · ${moves} 层`}
      </div>
    </div>
  );
}
