import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import { CanvasTexture, Color, LinearFilter } from 'three';
import type { Group, MeshStandardMaterial } from 'three';
import type { ThreeEvent } from '@react-three/fiber';

const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
const ROW_OFFSET = [0, 0.14, 0.36];
const PITCH = 0.56;
const KEY = 0.48;
const PRESS_DEPTH = 0.09;

const CAP_REST = new Color('#F4F4F5'); // zinc-100
const CAP_DOWN = new Color('#D4D4D8'); // zinc-300

type KeyState = { v: number; vel: number; target: number };

function makeLegend(char: string): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, 128, 128);
  ctx.fillStyle = '#52525B'; // zinc-600
  ctx.font = '600 56px ui-monospace, SFMono-Regular, Menlo, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(char, 64, 68);
  const tex = new CanvasTexture(c);
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  return tex;
}

function Key({
  char,
  x,
  z,
  state,
  onPress,
  onRelease,
}: {
  char: string;
  x: number;
  z: number;
  state: KeyState;
  onPress: (char: string) => void;
  onRelease: (char: string) => void;
}) {
  const group = useRef<Group>(null);
  const capMat = useRef<MeshStandardMaterial>(null);
  const legend = useMemo(() => makeLegend(char), [char]);
  const tint = useMemo(() => new Color(), []);

  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    // snappy slightly-underdamped spring toward the pressed/released target
    const s = state;
    s.vel += (340 * (s.target - s.v) - 24 * s.vel) * dt;
    s.v += s.vel * dt;
    if (group.current) group.current.position.y = -PRESS_DEPTH * s.v;
    if (capMat.current) {
      tint.copy(CAP_REST).lerp(CAP_DOWN, Math.min(Math.max(s.v, 0), 1));
      capMat.current.color.copy(tint);
    }
  });

  const down = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    onPress(char);
  };
  const up = () => onRelease(char);

  return (
    <group position={[x, 0.26, z]}>
      <group ref={group}>
        {/* darker bottom lip of the keycap */}
        <RoundedBox
          args={[KEY, 0.12, KEY]}
          radius={0.045}
          smoothness={4}
          position={[0, -0.02, 0]}
          onPointerDown={down}
          onPointerUp={up}
          onPointerLeave={up}
        >
          <meshStandardMaterial color="#D4D4D8" roughness={0.6} metalness={0.05} />
        </RoundedBox>
        {/* top face */}
        <RoundedBox
          args={[KEY - 0.05, 0.16, KEY - 0.05]}
          radius={0.06}
          smoothness={4}
          position={[0, 0.1, 0]}
          onPointerDown={down}
          onPointerUp={up}
          onPointerLeave={up}
        >
          <meshStandardMaterial ref={capMat} color="#F4F4F5" roughness={0.5} metalness={0.03} />
        </RoundedBox>
        {/* legend */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.183, 0]}>
          <planeGeometry args={[0.26, 0.26]} />
          <meshBasicMaterial map={legend} transparent toneMapped={false} />
        </mesh>
      </group>
    </group>
  );
}

/** A mini mechanical keyboard — press real A-Z keys or click keycaps; they dip with a springy thock. */
export default function Keyboard3D() {
  // per-key spring state lives in a stable ref map — no setState in the frame loop
  const states = useMemo(() => {
    const map = new Map<string, KeyState>();
    for (const row of ROWS) for (const ch of row) map.set(ch, { v: 0, vel: 0, target: 0 });
    return map;
  }, []);
  const [last, setLast] = useState<string | null>(null);

  const press = (ch: string) => {
    const s = states.get(ch);
    if (!s) return;
    s.target = 1;
    setLast(ch);
  };
  const release = (ch: string) => {
    const s = states.get(ch);
    if (s) s.target = 0;
  };

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat || e.metaKey || e.ctrlKey || e.altKey) return;
      const ch = e.key.toUpperCase();
      if (/^[A-Z]$/.test(ch)) press(ch);
    };
    const onUp = (e: KeyboardEvent) => {
      const ch = e.key.toUpperCase();
      if (/^[A-Z]$/.test(ch)) release(ch);
    };
    const releaseAll = () => states.forEach((s) => (s.target = 0));
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    window.addEventListener('blur', releaseAll);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
      window.removeEventListener('blur', releaseAll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [states]);

  const keys = useMemo(() => {
    const list: { char: string; x: number; z: number }[] = [];
    ROWS.forEach((row, r) => {
      const rowWidth = (row.length - 1) * PITCH;
      for (let i = 0; i < row.length; i++) {
        list.push({
          char: row[i]!,
          x: i * PITCH - rowWidth / 2 + ROW_OFFSET[r]!,
          z: r * PITCH - PITCH,
        });
      }
    });
    return list;
  }, []);

  return (
    <div className="absolute inset-0 cursor-pointer">
      <Canvas
        camera={{ position: [0, 4.4, 4.0], fov: 40 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ camera }) => camera.lookAt(0.15, 0, 0)}
      >
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 7, 5]} intensity={1.15} />
        <directionalLight position={[-4, 3, -3]} intensity={0.3} />
        <group position={[0.15, 0, 0]} rotation={[0, 0, 0]}>
          {/* dark plate under the keys */}
          <RoundedBox args={[6.1, 0.22, 2.15]} radius={0.09} smoothness={4} position={[0, 0.11, 0]}>
            <meshStandardMaterial color="#27272A" roughness={0.55} metalness={0.1} />
          </RoundedBox>
          {keys.map((k) => (
            <Key
              key={k.char}
              char={k.char}
              x={k.x}
              z={k.z}
              state={states.get(k.char)!}
              onPress={press}
              onRelease={release}
            />
          ))}
        </group>
        <ContactShadows position={[0, -0.01, 0]} opacity={0.3} scale={16} blur={2.4} far={3} color="#09090B" />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-200 bg-white/85 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-500 backdrop-blur">
        {last === null ? '敲击键盘 A–Z 或点击键帽' : `LAST KEY · ${last}`}
      </div>
    </div>
  );
}
