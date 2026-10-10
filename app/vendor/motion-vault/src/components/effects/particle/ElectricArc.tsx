import { useEffect, useRef } from 'react';

type Bolt = { pts: { x: number; y: number }[]; born: number; life: number; branches: { x: number; y: number }[][] };

const BOLT_MIN_MS = 90;
const BOLT_MAX_MS = 160;
const FADE_MS = 140;

function gauss() {
  // Box-Muller
  const u = Math.max(Math.random(), 1e-9);
  const v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

/** Recursive midpoint displacement -> jagged polyline from A to B. */
function makeBolt(ax: number, ay: number, bx: number, by: number, rough = 0.28, depth = 6) {
  let pts = [{ x: ax, y: ay }, { x: bx, y: by }];
  for (let d = 0; d < depth; d++) {
    const next: { x: number; y: number }[] = [pts[0]];
    for (let i = 0; i < pts.length - 1; i++) {
      const p = pts[i];
      const q = pts[i + 1];
      const mx = (p.x + q.x) / 2;
      const my = (p.y + q.y) / 2;
      const len = Math.hypot(q.x - p.x, q.y - p.y);
      // perpendicular offset scaled by remaining segment length
      const off = gauss() * rough * len * 0.5;
      const nx = -(q.y - p.y) / (len || 1);
      const ny = (q.x - p.x) / (len || 1);
      next.push({ x: mx + nx * off, y: my + ny * off }, q);
    }
    pts = next;
  }
  return pts;
}

/**
 * Fractal lightning between two electrodes: bolts grow via midpoint
 * displacement, crackle, die and regrow. While the pointer is inside, the
 * free electrode chases the fingertip so the arc jumps after it.
 */
export default function ElectricArc() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const canvas: HTMLCanvasElement = el;
    const maybeCtx = canvas.getContext('2d');
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let bolt: Bolt | null = null;
    const dead: Bolt[] = [];
    // electrode A fixed left; electrode B homes right, chases the pointer
    const a = { x: 0, y: 0 };
    const b = { x: 0, y: 0 };
    const bHome = { x: 0, y: 0 };
    const mouse = { x: -9999, y: -9999 };
    let lastCrackle = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      a.x = width * 0.22;
      a.y = height / 2;
      bHome.x = width * 0.78;
      bHome.y = height / 2;
      b.x = bHome.x;
      b.y = bHome.y;
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);
      bolt = null;
    }

    function newBolt(now: number): Bolt {
      const pts = makeBolt(a.x, a.y, b.x, b.y);
      const branches: { x: number; y: number }[][] = [];
      if (Math.random() < 0.22) {
        const count = 1 + (Math.random() < 0.4 ? 1 : 0);
        for (let i = 0; i < count; i++) {
          const mid = pts[Math.floor(pts.length * (0.25 + Math.random() * 0.5))];
          const ang = Math.random() * Math.PI * 2;
          const len = Math.hypot(b.x - a.x, b.y - a.y) * 0.4;
          branches.push(makeBolt(mid.x, mid.y, mid.x + Math.cos(ang) * len, mid.y + Math.sin(ang) * len, 0.34, 4));
        }
      }
      return { pts, born: now, life: BOLT_MIN_MS + Math.random() * (BOLT_MAX_MS - BOLT_MIN_MS), branches };
    }

    function strokePath(pts: { x: number; y: number }[], w: number, style: string) {
      ctx.strokeStyle = style;
      ctx.lineWidth = w;
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
      ctx.stroke();
    }

    function drawElectrode(x: number, y: number) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, 18);
      g.addColorStop(0, 'rgba(125, 211, 252, 0.35)');
      g.addColorStop(1, 'rgba(125, 211, 252, 0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - 18, y - 18, 36, 36);
      ctx.strokeStyle = '#A1A1AA';
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.stroke();
    }

    function tick(now: number) {
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);

      // electrode B follows the pointer, eases home otherwise
      const hasMouse = mouse.x > -999;
      const tx = hasMouse ? mouse.x : bHome.x;
      const ty = hasMouse ? mouse.y : bHome.y;
      b.x += (tx - b.x) * 0.18;
      b.y += (ty - b.y) * 0.18;

      // retire / spawn bolts
      if (!bolt || now - bolt.born > bolt.life) {
        if (bolt) dead.push(bolt);
        bolt = newBolt(now);
      }

      // crackle: re-jitter the live bolt at ~12Hz
      if (bolt && now - lastCrackle > 83) {
        lastCrackle = now;
        const jittered = makeBolt(a.x, a.y, b.x, b.y, 0.28 * 0.3);
        // blend old shape with fresh jitter so it flickers instead of morphing
        bolt.pts = bolt.pts.map((p, i) => ({
          x: p.x * 0.55 + (jittered[i]?.x ?? p.x) * 0.45,
          y: p.y * 0.55 + (jittered[i]?.y ?? p.y) * 0.45,
        }));
      }

      // fading corpses
      for (let i = dead.length - 1; i >= 0; i--) {
        const age = now - dead[i].born - dead[i].life;
        const k = 1 - age / FADE_MS;
        if (k <= 0) {
          dead.splice(i, 1);
          continue;
        }
        strokePath(dead[i].pts, 1.2, `rgba(186, 230, 253, ${(0.4 * k).toFixed(3)})`);
      }

      if (bolt) {
        for (const br of bolt.branches) {
          strokePath(br, 1.8, 'rgba(125, 211, 252, 0.10)');
          strokePath(br, 0.8, 'rgba(224, 242, 254, 0.45)');
        }
        strokePath(bolt.pts, 3.5, 'rgba(125, 211, 252, 0.18)');
        strokePath(bolt.pts, 1.4, 'rgba(224, 242, 254, 0.9)');
      }

      drawElectrode(a.x, a.y);
      drawElectrode(b.x, b.y);

      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair' }}
    />
  );
}
