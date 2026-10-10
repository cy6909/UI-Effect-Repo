import { useEffect, useRef } from 'react';

type Pt = { x: number; y: number };
type Trace = { pts: Pt[]; cum: number[]; total: number };
type Pulse = { trace: number; dist: number; speed: number };

const SNAP = 12;
const MAX_PULSES = 10;

function snap(v: number) {
  return Math.round(v / SNAP) * SNAP;
}

/**
 * PCB pulse: Manhattan trace network is generated once per resize, then
 * glowing pulses run along the copper lines, turning at via corners and
 * fading out near the endpoints — a motherboard waking up.
 */
export default function CircuitPulse() {
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
    let traces: Trace[] = [];
    let pulses: Pulse[] = [];
    let nextSpawn = 0;

    function buildTraces() {
      traces = [];
      pulses = [];
      const margin = 24;
      const tries = 14;
      for (let i = 0; i < tries; i++) {
        // start on a random edge
        const side = Math.floor(Math.random() * 4);
        let x = 0;
        let y = 0;
        if (side === 0) { x = snap(margin + Math.random() * (width - margin * 2)); y = margin; }
        else if (side === 1) { x = snap(margin + Math.random() * (width - margin * 2)); y = height - margin; }
        else if (side === 2) { x = margin; y = snap(margin + Math.random() * (height - margin * 2)); }
        else { x = width - margin; y = snap(margin + Math.random() * (height - margin * 2)); }

        const pts: Pt[] = [{ x, y }];
        // initial direction points into the canvas
        let dx = side === 2 ? 1 : side === 3 ? -1 : 0;
        let dy = side === 0 ? 1 : side === 1 ? -1 : 0;
        const segs = 6 + Math.floor(Math.random() * 9);
        for (let s = 0; s < segs; s++) {
          const len = snap(24 + Math.random() * 48);
          const nx = snap(x + dx * len);
          const ny = snap(y + dy * len);
          if (nx < margin || nx > width - margin || ny < margin || ny > height - margin) break;
          x = nx;
          y = ny;
          pts.push({ x, y });
          // 90-degree turn
          if (dx !== 0) { dx = 0; dy = Math.random() < 0.5 ? 1 : -1; }
          else { dy = 0; dx = Math.random() < 0.5 ? 1 : -1; }
        }
        if (pts.length < 3) continue;

        const cum = [0];
        for (let s = 1; s < pts.length; s++) {
          cum.push(cum[s - 1] + Math.hypot(pts[s].x - pts[s - 1].x, pts[s].y - pts[s - 1].y));
        }
        traces.push({ pts, cum, total: cum[cum.length - 1] });
      }
    }

    function pointAt(tr: Trace, dist: number): Pt {
      let i = 1;
      while (i < tr.cum.length - 1 && tr.cum[i] < dist) i++;
      const p0 = tr.pts[i - 1];
      const p1 = tr.pts[i];
      const segLen = tr.cum[i] - tr.cum[i - 1] || 1;
      const k = (dist - tr.cum[i - 1]) / segLen;
      return { x: p0.x + (p1.x - p0.x) * k, y: p0.y + (p1.y - p0.y) * k };
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTraces();
    }

    function tick(now: number) {
      ctx.fillStyle = '#09090B';
      ctx.fillRect(0, 0, width, height);

      // static copper traces + via pads
      ctx.strokeStyle = 'rgba(63, 63, 70, 0.95)';
      ctx.lineWidth = 1;
      for (const tr of traces) {
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx.stroke();
      }
      ctx.strokeStyle = '#52525B';
      for (const tr of traces) {
        for (let i = 0; i < tr.pts.length; i++) {
          ctx.beginPath();
          ctx.arc(tr.pts[i].x, tr.pts[i].y, 3, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // spawn pulses
      if (now > nextSpawn && pulses.length < MAX_PULSES && traces.length > 0) {
        nextSpawn = now + 150 + Math.random() * 300;
        pulses.push({
          trace: Math.floor(Math.random() * traces.length),
          dist: 0,
          speed: 2.6 + Math.random() * 1.8,
        });
      }

      // advance + draw pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        const tr = traces[p.trace];
        p.dist += p.speed;
        if (p.dist > tr.total) {
          pulses.splice(i, 1);
          continue;
        }
        const fade = Math.min(1, (tr.total - p.dist) / (tr.total * 0.12));
        const pos = pointAt(tr, p.dist);
        const tail = pointAt(tr, Math.max(0, p.dist - 36));

        ctx.save();
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(110, 231, 183, 0.55)';
        // fading tail
        const grad = ctx.createLinearGradient(tail.x, tail.y, pos.x, pos.y);
        grad.addColorStop(0, 'rgba(110, 231, 183, 0)');
        grad.addColorStop(1, `rgba(110, 231, 183, ${(0.5 * fade).toFixed(3)})`);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tail.x, tail.y);
        ctx.lineTo(pos.x, pos.y);
        ctx.stroke();
        // glowing head
        ctx.fillStyle = `rgba(110, 231, 183, ${(0.9 * fade).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, 2.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      raf = requestAnimationFrame(tick);
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
