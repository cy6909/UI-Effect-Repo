import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import { Euler, Quaternion, Vector3 } from 'three';
import type { Group } from 'three';

const SIZE = 1.2;
const HALF = SIZE / 2;
const GRAVITY = 18;
const SETTLE_MS = 600;

// pip offsets per face value (in units of PIP_GAP on the face plane)
const PIPS: Record<number, [number, number][]> = {
  1: [[0, 0]],
  2: [[-1, -1], [1, 1]],
  3: [[-1, -1], [0, 0], [1, 1]],
  4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
  5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
  6: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 0], [1, 1]],
};
const PIP_GAP = 0.32;

// face value -> local normal of that face (opposites sum to 7)
const FACES: { value: number; normal: [number, number, number]; rotation: [number, number, number] }[] = [
  { value: 1, normal: [0, 1, 0], rotation: [-Math.PI / 2, 0, 0] },
  { value: 6, normal: [0, -1, 0], rotation: [Math.PI / 2, 0, 0] },
  { value: 2, normal: [0, 0, 1], rotation: [0, 0, 0] },
  { value: 5, normal: [0, 0, -1], rotation: [0, Math.PI, 0] },
  { value: 3, normal: [1, 0, 0], rotation: [0, Math.PI / 2, 0] },
  { value: 4, normal: [-1, 0, 0], rotation: [0, -Math.PI / 2, 0] },
];

const UP = new Vector3(0, 1, 0);

/** orientation quaternions that place a given face value on top (4 yaw variants each) */
const TARGET_QUATS: Quaternion[][] = FACES.map((face) => {
  const base = new Quaternion().setFromUnitVectors(new Vector3(...face.normal), UP);
  return [0, 1, 2, 3].map((k) =>
    new Quaternion().setFromAxisAngle(UP, (k * Math.PI) / 2).multiply(base),
  );
});

function PipFace({ value, rotation }: { value: number; rotation: [number, number, number] }) {
  return (
    <group rotation={rotation}>
      {PIPS[value]!.map(([u, v], i) => (
        <mesh key={i} position={[u * PIP_GAP, v * PIP_GAP, HALF - 0.02]}>
          <sphereGeometry args={[0.095, 20, 20]} />
          <meshStandardMaterial color="#18181B" roughness={0.45} metalness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

type Phase = 'idle' | 'air' | 'settle';

function Die({
  rollTick,
  onResult,
}: {
  rollTick: { current: number };
  onResult: (value: number) => void;
}) {
  const group = useRef<Group>(null);
  const handled = useRef(0);
  const phase = useRef<Phase>('idle');
  const pos = useRef(new Vector3(0, HALF, 0));
  const vel = useRef(new Vector3());
  const angVel = useRef(new Vector3());
  const targetValue = useRef(1);
  const settleT = useRef(0);
  const settleFrom = useRef(new Quaternion());
  const settleTo = useRef(new Quaternion());
  const tmpQ = useRef(new Quaternion());
  const tmpE = useRef(new Quaternion());
  const tmpEuler = useRef(new Euler());

  useFrame((_, rawDelta) => {
    const die = group.current;
    if (!die) return;
    const dt = Math.min(rawDelta, 0.05);

    // a new roll was requested by the wrapper's pointer handler
    if (rollTick.current !== handled.current) {
      handled.current = rollTick.current;
      phase.current = 'air';
      targetValue.current = 1 + Math.floor(Math.random() * 6);
      vel.current.set((Math.random() - 0.5) * 4, 6.5 + Math.random() * 2.5, (Math.random() - 0.5) * 4);
      angVel.current.set(
        (8 + Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1),
        (8 + Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1),
        (8 + Math.random() * 6) * (Math.random() < 0.5 ? -1 : 1),
      );
    }

    if (phase.current === 'air') {
      vel.current.y -= GRAVITY * dt;
      pos.current.addScaledVector(vel.current, dt);

      // keep the die inside the view with soft invisible walls
      if (Math.abs(pos.current.x) > 1.4) {
        pos.current.x = Math.sign(pos.current.x) * 1.4;
        vel.current.x *= -0.5;
      }
      if (Math.abs(pos.current.z) > 1.4) {
        pos.current.z = Math.sign(pos.current.z) * 1.4;
        vel.current.z *= -0.5;
      }

      // floor bounce
      if (pos.current.y < HALF) {
        pos.current.y = HALF;
        if (Math.abs(vel.current.y) > 1) {
          vel.current.y = -vel.current.y * 0.5;
          vel.current.x *= 0.7;
          vel.current.z *= 0.7;
          angVel.current.multiplyScalar(0.6);
        } else {
          vel.current.y = 0;
        }
      }
      // tumble from angular velocity
      // incremental tumble in local space
      tmpEuler.current.set(angVel.current.x * dt, angVel.current.y * dt, angVel.current.z * dt);
      tmpQ.current.setFromEuler(tmpEuler.current);
      die.quaternion.multiply(tmpQ.current);

      const slow =
        pos.current.y <= HALF + 0.001 &&
        Math.abs(vel.current.y) < 0.5 &&
        vel.current.x * vel.current.x + vel.current.z * vel.current.z < 0.2 &&
        angVel.current.length() < 1.2;
      if (slow) {
        // pick the yaw variant closest to the current orientation, then settle
        phase.current = 'settle';
        settleT.current = 0;
        settleFrom.current.copy(die.quaternion);
        const candidates = TARGET_QUATS[targetValue.current - 1]!;
        let best = candidates[0]!;
        let bestDot = -1;
        for (const q of candidates) {
          const d = Math.abs(q.dot(die.quaternion));
          if (d > bestDot) {
            bestDot = d;
            best = q;
          }
        }
        settleTo.current.copy(best);
        pos.current.set(0, HALF, 0);
        vel.current.set(0, 0, 0);
        angVel.current.set(0, 0, 0);
      }
    } else if (phase.current === 'settle') {
      settleT.current += dt * 1000;
      const t = Math.min(settleT.current / SETTLE_MS, 1);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      tmpE.current.copy(settleFrom.current).slerp(settleTo.current, eased);
      die.quaternion.copy(tmpE.current);
      pos.current.y = HALF;
      if (t >= 1) {
        phase.current = 'idle';
        onResult(targetValue.current);
      }
    }

    die.position.copy(pos.current);
  });

  return (
    <group ref={group} position={[0, HALF, 0]}>
      <RoundedBox args={[SIZE, SIZE, SIZE]} radius={0.12} smoothness={6}>
        <meshStandardMaterial color="#FFFFFF" roughness={0.35} metalness={0.02} />
      </RoundedBox>
      {FACES.map((face) => (
        <PipFace key={face.value} value={face.value} rotation={face.rotation} />
      ))}
    </group>
  );
}

/** A matte white die with dark pips — click to toss it; it tumbles, bounces and settles on a random face. */
export default function DiceRoll() {
  const rollTick = useRef(0);
  const [result, setResult] = useState<number | null>(null);

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onPointerDown={() => {
        rollTick.current += 1;
        setResult(null);
      }}
    >
      <Canvas
        camera={{ position: [0, 2.6, 5.2], fov: 42 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 6, 5]} intensity={1.1} />
        <directionalLight position={[-3, 4, -4]} intensity={0.3} />
        <Die rollTick={rollTick} onResult={setResult} />
        <ContactShadows position={[0, 0, 0]} opacity={0.32} scale={8} blur={2.6} far={3} color="#09090B" />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-200 bg-white/85 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-500 backdrop-blur">
        {result === null ? '点击任意处投掷' : `点数 · ${result}`}
      </div>
    </div>
  );
}
