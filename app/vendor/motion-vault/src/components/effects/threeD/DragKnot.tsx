import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import type { ThreeEvent } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import { Vector2 } from 'three';
import type { Mesh } from 'three';

const FRICTION = 0.95; // per-frame inertia decay after release
const IDLE_DELAY = 2; // seconds before auto-rotation resumes
const AUTO_SPEED = 0.25; // rad/s idle spin
const DRAG_GAIN = 4; // NDC drag distance -> rotation (full sweep ≈ 1.3 turns)

function Knot() {
  const mesh = useRef<Mesh>(null);
  const dragging = useRef(false);
  const lastPointer = useRef(new Vector2());
  const angVel = useRef(new Vector2(0, AUTO_SPEED)); // x: pitch, y: yaw
  const idleT = useRef(IDLE_DELAY + 1); // seconds since last interaction

  const onPointerDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as Element).setPointerCapture(e.pointerId);
    dragging.current = true;
    lastPointer.current.set(e.pointer.x, e.pointer.y);
    idleT.current = 0;
  };

  const onPointerMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    const dx = e.pointer.x - lastPointer.current.x;
    const dy = e.pointer.y - lastPointer.current.y;
    lastPointer.current.set(e.pointer.x, e.pointer.y);
    // per-event delta * 60fps -> angular velocity in rad/s
    angVel.current.set(dy * DRAG_GAIN * 60, dx * DRAG_GAIN * 60);
    idleT.current = 0;
  };

  const endDrag = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    dragging.current = false;
    (e.target as Element).releasePointerCapture(e.pointerId);
    idleT.current = 0;
  };

  useFrame((_, rawDelta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(rawDelta, 0.05);
    idleT.current += dt;

    if (!dragging.current) {
      // friction decay on inertia (frame-rate independent 0.95/frame)
      const decay = Math.pow(FRICTION, dt * 60);
      angVel.current.multiplyScalar(decay);
      // after 2s idle, ease back into a slow auto-rotation
      if (idleT.current > IDLE_DELAY) {
        const k = Math.min(1, dt * 0.8);
        angVel.current.y += (AUTO_SPEED - angVel.current.y) * k;
        angVel.current.x += (0 - angVel.current.x) * k;
      }
    }

    m.rotation.x += angVel.current.x * dt;
    m.rotation.y += angVel.current.y * dt;
  });

  return (
    <mesh
      ref={mesh}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <torusKnotGeometry args={[1, 0.32, 220, 36]} />
      <meshStandardMaterial color="#D4D4D8" metalness={0.85} roughness={0.25} envMapIntensity={1.1} />
    </mesh>
  );
}

/** A polished zinc torus knot — drag to spin it, release to let inertia carry it, idle auto-rotation resumes. */
export default function DragKnot() {
  return (
    <div className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 45 }}
        dpr={[1, 1.75]}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', background: '#09090B' }}
        gl={{ antialias: false, alpha: false }}
      >
        <color attach="background" args={['#09090B']} />
        <ambientLight intensity={0.15} />
        <Knot />
        {/* offline studio environment: lightformers rendered into an env map, no HDR download */}
        <Environment resolution={256}>
          <Lightformer intensity={3} position={[0, 4, 0]} rotation={[Math.PI / 2, 0, 0]} scale={[9, 9, 1]} />
          <Lightformer intensity={1.6} position={[-4, 0.5, 2]} rotation={[0, Math.PI / 2, 0]} scale={[6, 2, 1]} />
          <Lightformer intensity={1.2} position={[4, 1, 2]} rotation={[0, -Math.PI / 2, 0]} scale={[6, 1.5, 1]} />
          <Lightformer intensity={0.6} position={[0, -1, 4]} scale={[5, 1, 1]} />
        </Environment>
      </Canvas>
      <div className="pointer-events-none absolute bottom-3 left-3 flex h-6 items-center rounded-full border border-zinc-800 bg-zinc-950/80 px-2.5 font-mono text-[11px] tracking-[0.06em] text-zinc-400 backdrop-blur">
        按住拖拽旋转 · 松手惯性滑行
      </div>
    </div>
  );
}
