import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { CanvasTexture, LinearFilter, MeshBasicMaterial } from 'three';
import type { Group, Mesh } from 'three';

const DW = 0.64; // digit tile width
const DH = 0.94; // digit tile height
const HALF_W = 0.58;
const HALF_H = 0.42;
const HALF_Y = 0.235;
const PHASE_A = 240; // top flap falls, ms
const PHASE_B = 260; // bottom flap lands, ms
const SETTLE = 140; // tiny hinge bounce, ms

/** full-digit glyphs + pre-cropped top/bottom half textures, shared across all tiles */
function useDigitMats() {
  return useMemo(() => {
    const top: MeshBasicMaterial[] = [];
    const bottom: MeshBasicMaterial[] = [];
    for (let d = 0; d <= 9; d++) {
      const full = document.createElement('canvas');
      full.width = 128;
      full.height = 188;
      const ctx = full.getContext('2d')!;
      ctx.clearRect(0, 0, 128, 188);
      ctx.fillStyle = '#FAFAFA';
      ctx.font = '600 148px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(d), 64, 100);
      const mk = (sy: number) => {
        const c = document.createElement('canvas');
        c.width = 128;
        c.height = 92;
        c.getContext('2d')!.drawImage(full, 0, sy, 128, 92, 0, 0, 128, 92);
        const tex = new CanvasTexture(c);
        tex.minFilter = LinearFilter;
        tex.magFilter = LinearFilter;
        tex.anisotropy = 4;
        return new MeshBasicMaterial({ map: tex, transparent: true, toneMapped: false });
      };
      top.push(mk(0));
      bottom.push(mk(92));
    }
    return { top, bottom };
  }, []);
}

type DigitState = {
  shown: number; // digit currently settled on the tile
  flipping: boolean;
  from: number;
  to: number;
  t0: number;
};

function easeIn(t: number) {
  return t * t;
}
function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function Clock() {
  const mats = useDigitMats();
  const colonShared = useMemo(
    () => new MeshBasicMaterial({ color: '#A1A1AA', transparent: true, toneMapped: false }),
    [],
  );
  const topStatic = useRef<(Mesh | null)[]>([]);
  const botStatic = useRef<(Mesh | null)[]>([]);
  const flapTopPivot = useRef<(Group | null)[]>([]);
  const flapTopMesh = useRef<(Mesh | null)[]>([]);
  const flapBotPivot = useRef<(Group | null)[]>([]);
  const flapBotMesh = useRef<(Mesh | null)[]>([]);
  const states = useRef<DigitState[] | null>(null);

  // digit x positions: HH : MM : SS
  const positions = useMemo(() => {
    const arr: number[] = [];
    let x = -2.44;
    for (let i = 0; i < 8; i++) {
      const isColon = i === 2 || i === 5;
      if (isColon) {
        x += 0.34;
      } else {
        arr.push(x);
        x += 0.78;
      }
    }
    return arr;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // current wall-clock digits
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const s = now.getSeconds();
    const digits = [
      Math.floor(h / 10), h % 10,
      Math.floor(m / 10), m % 10,
      Math.floor(s / 10), s % 10,
    ];

    if (!states.current) {
      states.current = digits.map((d) => ({ shown: d, flipping: false, from: d, to: d, t0: 0 }));
    }

    for (let i = 0; i < 6; i++) {
      const st = states.current[i]!;
      const ts = topStatic.current[i];
      const bs = botStatic.current[i];
      const ftp = flapTopPivot.current[i];
      const ftm = flapTopMesh.current[i];
      const fbp = flapBotPivot.current[i];
      const fbm = flapBotMesh.current[i];
      if (!ts || !bs || !ftp || !ftm || !fbp || !fbm) continue;

      if (!st.flipping && digits[i] !== st.shown) {
        st.flipping = true;
        st.from = st.shown;
        st.to = digits[i]!;
        st.t0 = t;
      }

      if (!st.flipping) {
        ts.material = mats.top[st.shown]!;
        bs.material = mats.bottom[st.shown]!;
        ftm.visible = false;
        fbm.visible = false;
        continue;
      }

      const el = (t - st.t0) * 1000;
      const inA = el < PHASE_A;
      const inB = el >= PHASE_A && el < PHASE_A + PHASE_B + SETTLE;

      // static halves: top reveals the next digit as the flap falls;
      // bottom keeps the old digit until the landing flap covers it
      ts.material = mats.top[st.to]!;
      bs.material = mats.bottom[inA ? st.from : st.to]!;

      // phase A: top flap (old digit) falls forward to horizontal
      ftm.visible = inA;
      ftm.material = mats.top[st.from]!;
      ftp.rotation.x = inA ? (Math.PI / 2) * easeIn(Math.min(el / PHASE_A, 1)) : Math.PI / 2;

      // phase B: bottom flap (new digit) swings up from horizontal and lands
      fbm.visible = inB;
      fbm.material = mats.bottom[st.to]!;
      if (inB) {
        const b = (el - PHASE_A) / PHASE_B;
        if (b < 1) {
          fbp.rotation.x = (Math.PI / 2) * (1 - easeOut(Math.max(b, 0)));
        } else {
          // small hinge bounce after landing
          const r = Math.min((el - PHASE_A - PHASE_B) / SETTLE, 1);
          fbp.rotation.x = -0.09 * Math.sin(r * Math.PI) * (1 - r);
        }
      } else {
        fbp.rotation.x = Math.PI / 2;
      }

      if (el >= PHASE_A + PHASE_B + SETTLE) {
        st.flipping = false;
        st.shown = st.to;
      }
    }

    // colon blink: gentle 1s pulse
    colonShared.opacity = 0.35 + 0.5 * Math.abs(Math.sin(t * Math.PI));
  });

  return (
    <group position={[0, 0.1, 0]}>
      {positions.map((x, i) => (
        <group key={i} position={[x, 0, 0]}>
          <RoundedBox args={[DW, DH, 0.07]} radius={0.05} smoothness={4}>
            <meshStandardMaterial color="#27272A" roughness={0.55} metalness={0.15} />
          </RoundedBox>
          {/* hinge line across the middle */}
          <mesh position={[0, 0, 0.038]}>
            <boxGeometry args={[DW, 0.014, 0.006]} />
            <meshBasicMaterial color="#09090B" />
          </mesh>
          <mesh ref={(el) => (topStatic.current[i] = el)} position={[0, HALF_Y, 0.037]}>
            <planeGeometry args={[HALF_W, HALF_H]} />
          </mesh>
          <mesh ref={(el) => (botStatic.current[i] = el)} position={[0, -HALF_Y, 0.037]}>
            <planeGeometry args={[HALF_W, HALF_H]} />
          </mesh>
          {/* falling top flap (pivot at the hinge) */}
          <group ref={(el) => (flapTopPivot.current[i] = el)} position={[0, 0, 0.041]}>
            <mesh ref={(el) => (flapTopMesh.current[i] = el)} position={[0, HALF_Y, 0]} visible={false}>
              <planeGeometry args={[HALF_W, HALF_H]} />
            </mesh>
          </group>
          {/* landing bottom flap */}
          <group ref={(el) => (flapBotPivot.current[i] = el)} position={[0, 0, 0.041]}>
            <mesh ref={(el) => (flapBotMesh.current[i] = el)} position={[0, -HALF_Y, 0]} visible={false}>
              <planeGeometry args={[HALF_W, HALF_H]} />
            </mesh>
          </group>
        </group>
      ))}
      {/* colons */}
      {[-1.1, 0.8].map((x, i) => (
        <group key={`c${i}`} position={[x, 0, 0]}>
          {[0.14, -0.14].map((y, j) => (
            <mesh key={j} position={[0, y, 0.02]} material={colonShared}>
              <boxGeometry args={[0.07, 0.07, 0.04]} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

/** A 3D split-flap clock flipping through real local time — every second a physical flap falls. */
export default function FlipClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = (n: number) => String(n).padStart(2, '0');
      setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick();
    const id = window.setInterval(tick, 500);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.4, 5.4], fov: 38 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
        gl={{ antialias: false, alpha: false }}
        onCreated={({ camera }) => camera.lookAt(0, 0.1, 0)}
      >
        <color attach="background" args={['#09090B']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 5, 6]} intensity={0.9} />
        <Clock />
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-white/15 bg-white/10 px-2.5 font-mono text-[11px] tracking-[0.06em] text-white/70 backdrop-blur">
        {time ? `LOCAL TIME · ${time}` : 'LOCAL TIME'}
      </div>
    </div>
  );
}
