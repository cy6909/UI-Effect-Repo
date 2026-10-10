import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import { CanvasTexture, CatmullRomCurve3, Color, LinearFilter, Vector3 } from 'three';
import type { Group, MeshStandardMaterial } from 'three';

const N = 7;
const CARD_W = 1.02;
const CARD_H = 1.36;

const PALETTES: [string, string][] = [
  ['#E4EBF2', '#D8E2EA'], // mist
  ['#F0EAE0', '#E7E0D3'], // sand
  ['#E8EDE3', '#DDE5D8'], // sage
  ['#F1E6DE', '#E8DAD2'], // clay
  ['#E4E4E7', '#D4D4D8'], // ink
  ['#ECECEF', '#DEDEE2'], // dawn
  ['#FBF3E4', '#F5E6C8'], // amber-tinted accent
];

function makeCardTexture(i: number): CanvasTexture {
  const w = 256;
  const h = 340;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);
  // thumbnail
  const [a, b] = PALETTES[i % PALETTES.length]!;
  const g = ctx.createLinearGradient(0, 0, w, 150);
  g.addColorStop(0, a);
  g.addColorStop(1, b);
  ctx.fillStyle = g;
  ctx.fillRect(16, 16, w - 32, 140);
  // tag
  ctx.fillStyle = '#71717A';
  ctx.font = '600 13px ui-monospace, Menlo, monospace';
  ctx.fillText(`FRAME · 0${i + 1}`, 16, 190);
  // title + skeleton bars
  ctx.fillStyle = '#3F3F46';
  ctx.fillRect(16, 208, 130, 14);
  ctx.fillStyle = '#E4E4E7';
  ctx.fillRect(16, 240, w - 60, 8);
  ctx.fillRect(16, 258, w - 100, 8);
  ctx.fillStyle = i === 6 ? '#F59E0B' : '#D4D4D8';
  ctx.fillRect(16, h - 34, 52, 10);
  const tex = new CanvasTexture(c);
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.anisotropy = 4;
  return tex;
}

/** closed racetrack loop sampled through a Catmull-Rom spline (reads as a smooth bezier circuit) */
function useLoop() {
  return useMemo(() => {
    const pts: Vector3[] = [];
    const R = 1.55; // corner radius
    const HX = 2.35; // half length of the straights
    const HZ = R;
    // rounded-rectangle outline: straights along x, semicircle caps at ±HX
    for (let k = 0; k < 40; k++) {
      // start the loop at the front-center point so card 0 leads at offset 0
      const a = (k / 40) * Math.PI * 2 + Math.PI / 2;
      // stadium curve param: piecewise
      const x = Math.cos(a);
      const z = Math.sin(a);
      // map circle -> stadium by stretching x and clamping
      const sx = Math.sign(x) * Math.min(Math.abs(x) * 2.4, 1) * HX;
      const sz = z * HZ;
      pts.push(new Vector3(sx, 0, sz));
    }
    const curve = new CatmullRomCurve3(pts, true, 'centripetal', 0.6);
    curve.arcLengthDivisions = 400;
    return curve;
  }, []);
}

function Cards({ stepTick }: { stepTick: { current: number } }) {
  const curve = useLoop();
  const textures = useMemo(() => PALETTES.map((_, i) => makeCardTexture(i)), []);
  const groupRefs = useRef<(Group | null)[]>([]);
  const matRefs = useRef<(MeshStandardMaterial | null)[]>([]);
  // rotation state in refs: current offset (in loop units) + target, plus velocity for banking
  const rot = useRef({ cur: 0, target: 0, vel: 0 });
  const handled = useRef(0);
  const idleFor = useRef(0);
  const lastT = useRef(0);
  const tmp = useMemo(() => new Vector3(), []);
  const tan = useMemo(() => new Vector3(), []);
  const dimTint = useMemo(() => new Color(), []);
  const WHITE = useMemo(() => new Color('#FFFFFF'), []);
  const DIM = useMemo(() => new Color('#E7E7EA'), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(t - lastT.current || 0.016, 0.05);
    lastT.current = t;

    idleFor.current += dt;
    // pointer steps take priority; otherwise auto-advance every 3.2s
    if (stepTick.current !== handled.current) {
      const delta = stepTick.current - handled.current; // signed: +1 next / -1 prev
      handled.current = stepTick.current;
      rot.current.target -= (delta > 0 ? 1 : -1) / N;
      idleFor.current = 0;
    } else if (idleFor.current > 3.2) {
      rot.current.target -= 1 / N;
      idleFor.current = 0;
    }

    // critically-damped-ish approach toward the target offset
    const r = rot.current;
    const prev = r.cur;
    r.cur += (r.target - r.cur) * Math.min(1, dt * 4.2);
    r.vel = (r.cur - prev) / Math.max(dt, 1e-4);

    for (let i = 0; i < N; i++) {
      const g = groupRefs.current[i];
      if (!g) continue;
      const u = ((i / N + r.cur) % 1 + 1) % 1;
      curve.getPointAt(u, tmp);
      curve.getTangentAt(u, tan);
      g.position.set(tmp.x, 0.95, tmp.z);
      // face outward from the loop center, yaw from the tangent
      g.rotation.y = Math.atan2(tan.x, tan.z) + Math.PI / 2;
      // bank into the flight direction like a roller coaster
      g.rotation.z = THREE_clamp(-r.vel * 0.16, -0.22, 0.22);
      // emphasize the card nearest the camera (front of the loop, +z)
      const frontness = (tmp.z / 1.55 + 1) / 2; // 0 back → 1 front
      const s = 0.86 + frontness * 0.26;
      g.scale.setScalar(s);
      g.position.y = 0.86 + frontness * 0.16;
      const m = matRefs.current[i];
      if (m) {
        dimTint.copy(DIM).lerp(WHITE, 0.55 + frontness * 0.45);
        m.color.copy(dimTint);
      }
    }
  });

  return (
    <>
      {textures.map((tex, i) => (
        <group key={i} ref={(el) => (groupRefs.current[i] = el)}>
          <RoundedBox args={[CARD_W, CARD_H, 0.05]} radius={0.045} smoothness={4}>
            <meshStandardMaterial
              ref={(el) => (matRefs.current[i] = el)}
              color="#FFFFFF"
              roughness={0.65}
              metalness={0.02}
            />
          </RoundedBox>
          <mesh position={[0, 0, 0.028]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
          {/* printed back face so cards on the far straight still show content */}
          <mesh position={[0, 0, -0.028]} rotation={[0, Math.PI, 0]}>
            <planeGeometry args={[CARD_W, CARD_H]} />
            <meshBasicMaterial map={tex} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

function THREE_clamp(v: number, lo: number, hi: number) {
  return Math.min(Math.max(v, lo), hi);
}

/** Seven cards gliding along a closed 3D racetrack — click the sides or let it auto-advance. */
export default function CurveCarousel() {
  const stepTick = useRef(0);
  const [steps, setSteps] = useState(0);

  const step = (dir: 1 | -1) => {
    stepTick.current += dir;
    setSteps((n) => n + 1);
  };

  return (
    <div className="absolute inset-0 cursor-pointer">
      <Canvas
        camera={{ position: [0, 3.2, 5.9], fov: 40 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ camera }) => camera.lookAt(0, 0.7, 0)}
      >
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[4, 6, 5]} intensity={1.05} />
        <Cards stepTick={stepTick} />
        <ContactShadows position={[0, 0, 0]} opacity={0.28} scale={9} blur={2.6} far={3} color="#09090B" />
      </Canvas>
      {/* click zones */}
      <button
        aria-label="上一张"
        className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize"
        onClick={() => step(-1)}
      />
      <button
        aria-label="下一张"
        className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize"
        onClick={() => step(1)}
      />
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-200 bg-white/85 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-500 backdrop-blur">
        {steps === 0 ? '点击左右两侧切换 · 静置自动巡播' : `已切换 · ${steps}`}
      </div>
    </div>
  );
}
