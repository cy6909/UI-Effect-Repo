import { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei';
import { CanvasTexture, DoubleSide, LinearFilter, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry } from 'three';
import type { Group, Mesh } from 'three';

const PAGE_W = 1.35;
const PAGE_H = 1.9;
const PAGE_T = 0.012; // page thickness
const PAGES = 6; // flippable pages
const FLIP_MS = 1150;
const BEND = 0.34;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

/** page-face texture variants drawn on an offscreen canvas — abstract editorial layouts */
function makePageTexture(variant: number): CanvasTexture {
  const w = 340;
  const h = 480;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d')!;
  ctx.fillStyle = '#FDFDFB';
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = '#E4E4E7';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '600 15px ui-monospace, Menlo, monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`CHAPTER · 0${variant + 1}`, 34, 48);

  if (variant === 0) {
    // title page: big display lines
    ctx.fillStyle = '#3F3F46';
    ctx.fillRect(34, 96, 200, 26);
    ctx.fillStyle = '#D4D4D8';
    ctx.fillRect(34, 134, 152, 26);
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = i === 2 ? '#F59E0B' : '#E4E4E7';
      ctx.fillRect(34, 220 + i * 30, 230 - (i % 3) * 46, 9);
    }
  } else if (variant === 1) {
    // text page: paragraph skeleton
    for (let r = 0; r < 3; r++) {
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = '#E4E4E7';
        ctx.fillRect(34, 92 + r * 150 + i * 26, i === 4 ? 120 : 272, 8);
      }
    }
  } else {
    // figure page: soft gradient block + caption
    const g = ctx.createLinearGradient(34, 92, 306, 300);
    g.addColorStop(0, '#E4EBF2');
    g.addColorStop(1, '#D8E2EA');
    ctx.fillStyle = g;
    ctx.fillRect(34, 92, 272, 208);
    ctx.fillStyle = '#E4E4E7';
    ctx.fillRect(34, 322, 190, 8);
    ctx.fillRect(34, 344, 240, 8);
    ctx.fillStyle = '#F59E0B';
    ctx.fillRect(34, 380, 60, 8);
  }

  ctx.fillStyle = '#A1A1AA';
  ctx.font = '500 13px ui-monospace, Menlo, monospace';
  ctx.textAlign = 'right';
  ctx.fillText(`N°${variant + 1}`, w - 34, h - 30);

  const tex = new CanvasTexture(c);
  tex.minFilter = LinearFilter;
  tex.magFilter = LinearFilter;
  tex.anisotropy = 4;
  return tex;
}

type Flight = { fromLeft: boolean; t0: number; stackIndex: number; texVariant: number };

function Book({ flipTick, onSettled }: { flipTick: { current: number }; onSettled: () => void }) {
  // how many flat pages rest on the right stack (left = PAGES - rightCount - inFlightFromLeft)
  const [rightCount, setRightCount] = useState(PAGES);
  const [inFlight, setInFlight] = useState<'left' | 'right' | null>(null);
  const active = useRef<Flight | null>(null);
  const handled = useRef(0);
  const idleFor = useRef(0);
  const flipCounter = useRef(0);
  const pivot = useRef<Group>(null);
  const pageMesh = useRef<Mesh>(null);
  const lastTime = useRef(0);
  // mirrors rightCount inside the frame loop without stale closures
  const rightCountRef = useRef(PAGES);

  const geometry = useMemo(() => {
    const g = new PlaneGeometry(PAGE_W, PAGE_H, 24, 1);
    g.translate(PAGE_W / 2, 0, 0); // pivot at the spine (x = 0)
    return g;
  }, []);
  const basePos = useMemo(() => Float32Array.from(geometry.attributes.position!.array), [geometry]);
  const textures = useMemo(() => [0, 1, 2].map((v) => makePageTexture(v)), []);
  // one pre-compiled material per layout variant — swapping .map on a compiled
  // material without needsUpdate silently renders blank
  const pageMats = useMemo(
    () => textures.map((map) => new MeshStandardMaterial({ map, roughness: 0.85, side: DoubleSide })),
    [textures],
  );
  const topMats = useMemo(
    () => textures.map((map) => new MeshBasicMaterial({ map, toneMapped: false })),
    [textures],
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const dt = Math.min(t - lastTime.current || 0.016, 0.05);
    lastTime.current = t;

    // request a flip: from pointer (flipTick) or after ~3.8s idle
    idleFor.current += dt;
    const wantsFlip = flipTick.current !== handled.current || (active.current === null && idleFor.current > 3.8);
    if (wantsFlip && active.current === null) {
      handled.current = flipTick.current;
      idleFor.current = 0;
      const rc = rightCountRef.current;
      const fromLeft = rc === 0; // right side empty → flip one back
      const stackIndex = fromLeft ? PAGES - rc - 1 : rc - 1; // index from the bottom of the source stack
      active.current = { fromLeft, t0: t, stackIndex, texVariant: flipCounter.current % 3 };
      flipCounter.current += 1;
      setInFlight(fromLeft ? 'left' : 'right');
      const next = fromLeft ? rc : rc - 1; // lift the top sheet off its stack immediately
      rightCountRef.current = next;
      setRightCount(next);
    }

    const mesh = pageMesh.current;
    const pv = pivot.current;
    if (!mesh || !pv) return;

    const f = active.current;
    if (!f) {
      mesh.visible = false;
      return;
    }

    const k = Math.min(((t - f.t0) * 1000) / FLIP_MS, 1);
    const e = easeInOut(k);
    // angle: 0 = flat on the right, PI = flat on the left (flipping back reverses)
    const theta = f.fromLeft ? Math.PI * (1 - e) : Math.PI * e;
    pv.rotation.y = -theta;

    // curl the sheet while it is mid-air: strongest at 90deg, flat at rest
    const curl = BEND * Math.sin(theta);
    const pos = geometry.attributes.position!;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < arr.length; i += 3) {
      const x = basePos[i]!;
      arr[i] = x;
      arr[i + 1] = basePos[i + 1]!;
      arr[i + 2] = curl * Math.sin((Math.PI * x) / PAGE_W) + 0.02;
    }
    pos.needsUpdate = true;

    mesh.visible = true;
    pv.position.z = 0.075 + f.stackIndex * PAGE_T + 0.02;
    mesh.material = pageMats[f.texVariant]!;

    if (k >= 1) {
      mesh.visible = false;
      const next = f.fromLeft ? rightCountRef.current + 1 : rightCountRef.current;
      rightCountRef.current = next;
      active.current = null;
      setInFlight(null);
      setRightCount(next);
      onSettled();
    }
  });

  const leftCount = PAGES - rightCount - (inFlight === 'left' ? 1 : 0);

  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {/* cover boards + spine, cloth zinc */}
      <mesh position={[PAGE_W / 2 + 0.04, 0, 0.028]}>
        <boxGeometry args={[PAGE_W + 0.14, PAGE_H + 0.14, 0.055]} />
        <meshStandardMaterial color="#3F3F46" roughness={0.8} metalness={0.02} />
      </mesh>
      <mesh position={[-PAGE_W / 2 - 0.04, 0, 0.028]}>
        <boxGeometry args={[PAGE_W + 0.14, PAGE_H + 0.14, 0.055]} />
        <meshStandardMaterial color="#3F3F46" roughness={0.8} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0, 0.035]}>
        <boxGeometry args={[0.14, PAGE_H + 0.14, 0.07]} />
        <meshStandardMaterial color="#27272A" roughness={0.8} />
      </mesh>
      {/* amber bookmark ribbon peeking out of the bottom */}
      <mesh position={[0.42, -PAGE_H / 2 - 0.14, 0.045]}>
        <boxGeometry args={[0.07, 0.3, 0.008]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.7} />
      </mesh>

      {/* flat page stacks, each with a printed top sheet */}
      {Array.from({ length: rightCount }, (_, i) => (
        <mesh key={`r${i}`} position={[PAGE_W / 2, 0, 0.07 + i * PAGE_T]}>
          <boxGeometry args={[PAGE_W, PAGE_H, PAGE_T * 0.7]} />
          <meshStandardMaterial color="#FDFDFB" roughness={0.9} />
        </mesh>
      ))}
      {rightCount > 0 && (
        <mesh position={[PAGE_W / 2, 0, 0.07 + (rightCount - 1) * PAGE_T + 0.006]} material={topMats[rightCount % 3]!}>
          <planeGeometry args={[PAGE_W, PAGE_H]} />
        </mesh>
      )}
      {Array.from({ length: Math.max(leftCount, 0) }, (_, i) => (
        <mesh key={`l${i}`} position={[-PAGE_W / 2, 0, 0.07 + i * PAGE_T]}>
          <boxGeometry args={[PAGE_W, PAGE_H, PAGE_T * 0.7]} />
          <meshStandardMaterial color="#F9F9F7" roughness={0.9} />
        </mesh>
      ))}
      {leftCount > 0 && (
        <mesh position={[-PAGE_W / 2, 0, 0.07 + (leftCount - 1) * PAGE_T + 0.006]} material={topMats[(leftCount + 1) % 3]!}>
          <planeGeometry args={[PAGE_W, PAGE_H]} />
        </mesh>
      )}

      {/* the one sheet in flight, curled around the spine */}
      <group ref={pivot}>
        <mesh ref={pageMesh} geometry={geometry} visible={false}>
          <meshStandardMaterial color="#FFFFFF" roughness={0.85} side={DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

/** An open book on a table — click (or wait) to flip a page; the sheet curls as it turns. */
export default function BookFlip() {
  const flipTick = useRef(0);
  const [turns, setTurns] = useState(0);

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onPointerDown={() => {
        flipTick.current += 1;
      }}
    >
      <Canvas
        camera={{ position: [0, 3.4, 3.1], fov: 40 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ camera }) => camera.lookAt(0, 0, 0.1)}
      >
        <color attach="background" args={['#FAFAFA']} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[3.5, 6, 4]} intensity={1.1} />
        <directionalLight position={[-3, 3, -2]} intensity={0.25} />
        <Book flipTick={flipTick} onSettled={() => setTurns((n) => n + 1)} />
        <ContactShadows position={[0, -0.001, 0]} opacity={0.3} scale={8} blur={2.5} far={3} color="#09090B" />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-200 bg-white/85 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-500 backdrop-blur">
        {turns === 0 ? '点击翻页 · 静置自动演示' : `已翻页 · ${turns}`}
      </div>
    </div>
  );
}
