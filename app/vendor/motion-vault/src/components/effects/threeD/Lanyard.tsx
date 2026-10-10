import { useMemo, useRef } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { CanvasTexture, SRGBColorSpace } from 'three';

const L = 1.7; // rope length
const ANCHOR_Y = 1.55;

function makeBadgeTexture() {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext('2d');
  if (!ctx) return new CanvasTexture(c);

  // rounded card body
  ctx.beginPath();
  ctx.roundRect(6, 6, 500, 308, 30);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#D4D4D8';
  ctx.stroke();

  // clip hole at top
  ctx.beginPath();
  ctx.arc(256, 12, 17, 0, Math.PI * 2);
  ctx.fillStyle = '#F4F4F5';
  ctx.fill();
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#A1A1AA';
  ctx.stroke();

  // avatar placeholder
  ctx.beginPath();
  ctx.roundRect(44, 100, 96, 96, 14);
  ctx.fillStyle = '#E4E4E7';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(92, 132, 20, 0, Math.PI * 2);
  ctx.fillStyle = '#A1A1AA';
  ctx.fill();
  ctx.beginPath();
  ctx.roundRect(64, 158, 56, 26, 13);
  ctx.fill();

  // text
  ctx.fillStyle = '#09090B';
  ctx.font = '600 62px "JetBrains Mono", monospace';
  ctx.textBaseline = 'middle';
  ctx.fillText('STAFF', 172, 128);
  ctx.fillStyle = '#A1A1AA';
  ctx.font = '400 26px "JetBrains Mono", monospace';
  ctx.fillText('MOTIONVAULT / N°034', 172, 182);

  // barcode strip at the bottom
  let x = 44;
  let seed = 7;
  while (x < 460) {
    seed = (seed * 16807) % 2147483647;
    const w = 2 + (seed % 5);
    if (seed % 3 !== 0) {
      ctx.fillStyle = '#27272A';
      ctx.fillRect(x, 236, w, 46);
    }
    x += w + 3;
  }

  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function BadgeScene({
  motion,
}: {
  motion: React.MutableRefObject<{ theta: number; omega: number; target: number; tilt: number; dragging: boolean }>;
}) {
  const pivot = useRef<Group>(null);
  const badgeTex = useMemo(makeBadgeTexture, []);

  useFrame((_, delta) => {
    const m = motion.current;
    const dt = Math.min(delta, 0.05);
    // spring-pendulum: stiff while dragging, loose damped swing after release
    const k = m.dragging ? 34 : 9;
    const c = m.dragging ? 9 : 0.55;
    m.omega += (-k * (m.theta - (m.dragging ? m.target : 0)) - c * m.omega) * dt;
    m.theta += m.omega * dt;
    if (pivot.current) {
      pivot.current.rotation.z = m.theta;
      pivot.current.rotation.y += (m.tilt - pivot.current.rotation.y) * 0.08;
    }
  });

  return (
    <group position={[0, ANCHOR_Y, 0]}>
      <group ref={pivot}>
        {/* rope */}
        <mesh position={[0, -L / 2, 0]}>
          <cylinderGeometry args={[0.008, 0.008, L, 6]} />
          <meshBasicMaterial color="#71717A" />
        </mesh>
        {/* badge */}
        <mesh position={[0, -L - 0.42, 0]}>
          <planeGeometry args={[1.36, 0.85]} />
          <meshBasicMaterial map={badgeTex} transparent toneMapped={false} />
        </mesh>
      </group>
      {/* anchor pin */}
      <mesh>
        <sphereGeometry args={[0.03, 12, 12]} />
        <meshBasicMaterial color="#3F3F46" />
      </mesh>
    </group>
  );
}

/** Hanging staff badge on a lanyard: drag to swing, release for a damped pendulum settle. */
export default function Lanyard() {
  const motion = useRef({ theta: 0.35, omega: 0, target: 0, tilt: 0, dragging: false });

  function ndcX(e: ReactPointerEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    return ((e.clientX - rect.left) / rect.width) * 2 - 1;
  }
  return (
    <div
      style={{ position: 'absolute', inset: 0, cursor: 'grab', touchAction: 'none' }}
      onPointerDown={(e) => {
        e.currentTarget.setPointerCapture(e.pointerId);
        e.currentTarget.style.cursor = 'grabbing';
        motion.current.dragging = true;
        motion.current.target = Math.max(-1.15, Math.min(1.15, ndcX(e) * 1.3));
      }}
      onPointerMove={(e) => {
        if (!motion.current.dragging) return;
        motion.current.target = Math.max(-1.15, Math.min(1.15, ndcX(e) * 1.3));
        motion.current.tilt = -ndcX(e) * 0.25;
      }}
      onPointerUp={(e) => {
        e.currentTarget.style.cursor = 'grab';
        motion.current.dragging = false;
        motion.current.tilt = 0;
      }}
      onPointerCancel={() => {
        motion.current.dragging = false;
        motion.current.tilt = 0;
      }}
    >
      <Canvas
        camera={{ position: [0, 0.1, 4.2], fov: 42 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#FAFAFA' }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#FAFAFA']} />
        <BadgeScene motion={motion} />
      </Canvas>
    </div>
  );
}
