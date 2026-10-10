import { useEffect, useRef } from 'react';

type Mote = { x: number; y: number; px: number; py: number; life: number; maxLife: number; speed: number; tone: string };

const COUNT = 380;

/**
 * Curl-noise smoke: hundreds of short streaks advected by a smooth, slowly
 * evolving pseudo-noise flow field. Frames are never cleared — a translucent
 * dark veil is painted each tick so motion dissolves like smoke. The pointer
 * stirs a local vortex into the stream.
 */
export default function SmokeFlow() {
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
    let motes: Mote[] = [];
    const mouse = { x: -9999, y: -9999 };

    // muted smoke tones: slate greys with a hint of desaturated blue
    const TONES = ['148,163,184', '113,125,150', '100,116,139', '203,213,225'];

    // smooth analytic flow field -> angle; layered sines approximate curl noise
    function flowAngle(x: number, y: number, t: number) {
      const s = 0.0021;
      return (
        Math.sin(x * s * 1.7 + t * 0.31) +
        Math.cos(y * s * 2.3 - t * 0.23) +
        Math.sin((x + y) * s * 0.9 + t * 0.12) +
        Math.cos((x - y) * s * 1.3 - t * 0.17)
      ) * (Math.PI / 2.2);
    }

    function resetMote(m: Mote, randomizeLife = false) {
      m.x = Math.random() * width;
      m.y = Math.random() * height;
      m.px = m.x;
      m.py = m.y;
      m.maxLife = 260 + Math.random() * 320;
      m.life = randomizeLife ? Math.random() * m.maxLife : 0;
      m.speed = 0.35 + Math.random() * 0.75;
      m.tone = TONES[Math.floor(Math.random() * TONES.length)];
    }

    function spawn() {
      motes = Array.from({ length: COUNT }, () => {
        const m = {} as Mote;
        resetMote(m, true);
        return m;
      });
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);
      ctx.lineCap = 'round';
      spawn();
    }

    function tick(now: number) {
      const t = now / 1000;
      // translucent veil -> smoke trails dissolve
      ctx.fillStyle = 'rgba(9, 9, 11, 0.055)';
      ctx.fillRect(0, 0, width, height);

      const hasMouse = mouse.x > -999;

      ctx.lineWidth = 1.1;
      for (const m of motes) {
        const a = flowAngle(m.x, m.y, t);
        let vx = Math.cos(a) * m.speed;
        let vy = Math.sin(a) * m.speed;

        // pointer stirs a local vortex
        if (hasMouse) {
          const dx = m.x - mouse.x;
          const dy = m.y - mouse.y;
          const dist = Math.hypot(dx, dy) || 1;
          if (dist < 130) {
            const fall = 1 - dist / 130;
            vx += (-dy / dist) * 2.4 * fall;
            vy += (dx / dist) * 2.4 * fall;
          }
        }

        m.px = m.x;
        m.py = m.y;
        m.x += vx;
        m.y += vy;
        m.life += 1;

        if (m.life > m.maxLife || m.x < -8 || m.x > width + 8 || m.y < -8 || m.y > height + 8) {
          resetMote(m);
          continue;
        }

        // fade in/out over lifetime so streaks never pop
        const fade = Math.min(m.life / 40, 1) * Math.min((m.maxLife - m.life) / 60, 1);
        ctx.strokeStyle = `rgba(${m.tone}, ${(0.34 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.moveTo(m.px, m.py);
        ctx.lineTo(m.x, m.y);
        ctx.stroke();
      }

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
