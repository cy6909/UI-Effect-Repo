import { useEffect, useRef } from 'react';

const MAX_DROPS = 220;
const SLIDE_R = 4.2;

type Drop = {
  x: number;
  y: number;
  r: number;
  sliding: boolean;
  wobble: number;
};

/**
 * Rain on misted glass: droplets condense, grow and swallow each other;
 * heavy ones wick downward with a drunken wander, wiping a briefly clear
 * channel into the fog that slowly mists over again.
 */
export default function RainGlass() {
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
    let drops: Drop[] = [];
    let lastSpawn = 0;
    let fog: HTMLCanvasElement | null = null;
    let fctx: CanvasRenderingContext2D | null = null;
    let fogBase: HTMLCanvasElement | null = null;

    // misty slate base painted once; re-mists slowly over wiped trails
    function paintFogBase(c: CanvasRenderingContext2D, w: number, h: number) {
      const g = c.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, '#1B2430');
      g.addColorStop(1, '#0F141C');
      c.fillStyle = g;
      c.fillRect(0, 0, w, h);
      // soft haze patches
      for (let i = 0; i < 42; i++) {
        const hx = Math.random() * w;
        const hy = Math.random() * h;
        const hr = 40 + Math.random() * 120;
        const hg = c.createRadialGradient(hx, hy, 0, hx, hy, hr);
        hg.addColorStop(0, 'rgba(226,236,246,0.07)');
        hg.addColorStop(1, 'rgba(255,255,255,0)');
        c.fillStyle = hg;
        c.fillRect(hx - hr, hy - hr, hr * 2, hr * 2);
      }
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      fog = document.createElement('canvas');
      fog.width = Math.max(1, Math.floor(width * dpr));
      fog.height = Math.max(1, Math.floor(height * dpr));
      fctx = fog.getContext('2d');
      fogBase = document.createElement('canvas');
      fogBase.width = fog.width;
      fogBase.height = fog.height;
      const bctx = fogBase.getContext('2d');
      if (fctx && bctx) {
        fctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        bctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        paintFogBase(bctx, width, height);
        fctx.drawImage(fogBase, 0, 0, width, height);
      }
      // pre-seed so the glass is alive immediately, a few near sliding size
      drops = Array.from({ length: 90 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * (Math.random() < 0.12 ? 3.4 : 2.0),
        sliding: false,
        wobble: Math.random() * Math.PI * 2,
      }));
    }

    function drawDrop(c: CanvasRenderingContext2D, d: Drop) {
      // refracting bead: light rim top-left, dark rim bottom-right, clear body
      const g = c.createRadialGradient(d.x - d.r * 0.35, d.y - d.r * 0.35, d.r * 0.1, d.x, d.y, d.r);
      g.addColorStop(0, 'rgba(226, 236, 246, 0.5)');
      g.addColorStop(0.55, 'rgba(200, 215, 230, 0.10)');
      g.addColorStop(0.85, 'rgba(8, 12, 18, 0.28)');
      g.addColorStop(1, 'rgba(8, 12, 18, 0.42)');
      c.fillStyle = g;
      c.beginPath();
      c.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      c.fill();
      // tiny specular highlight
      c.fillStyle = 'rgba(255,255,255,0.55)';
      c.beginPath();
      c.arc(d.x - d.r * 0.34, d.y - d.r * 0.38, Math.max(0.4, d.r * 0.16), 0, Math.PI * 2);
      c.fill();
    }

    function tick(now: number) {
      if (!fog || !fctx) return;

      // condense new droplets
      if (now - lastSpawn > 60 + Math.random() * 80 && drops.length < MAX_DROPS) {
        lastSpawn = now;
        drops.push({
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.8 + Math.random() * 1.8,
          sliding: false,
          wobble: Math.random() * Math.PI * 2,
        });
      }

      // grow, merge, slide
      for (let i = drops.length - 1; i >= 0; i--) {
        const d = drops[i];
        if (!d.sliding) {
          d.r += 0.009;
          // swallow overlapping smaller droplets
          for (let j = drops.length - 1; j > i; j--) {
            const o = drops[j];
            const dist = Math.hypot(o.x - d.x, o.y - d.y);
            if (dist < Math.max(d.r, o.r) * 0.8) {
              const big = d.r >= o.r ? d : o;
              const small = d.r >= o.r ? o : d;
              big.r = Math.sqrt(big.r * big.r + small.r * small.r);
              drops.splice(drops.indexOf(small), 1);
              if (small === d) break;
            }
          }
          if (d.r > SLIDE_R) d.sliding = true;
        } else {
          // wick downward, speed ~ r^2, drunken wander
          d.wobble += 0.06;
          const speed = d.r * d.r * 0.045;
          d.y += speed;
          d.x += Math.sin(d.wobble) * 0.8;
          // shed water into the trail
          d.r *= 0.997;
          // wipe the fog clear along the path (soft-edged channel)
          fctx.save();
          fctx.globalCompositeOperation = 'destination-out';
          const wg = fctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r * 1.3);
          wg.addColorStop(0, 'rgba(0,0,0,0.35)');
          wg.addColorStop(1, 'rgba(0,0,0,0)');
          fctx.fillStyle = wg;
          fctx.beginPath();
          fctx.arc(d.x, d.y, d.r * 1.3, 0, Math.PI * 2);
          fctx.fill();
          fctx.restore();
          if (d.r < 1.6 || d.y > height + 8) drops.splice(i, 1);
        }
      }

      // slowly re-mist wiped trails back toward the dark fog base
      if (fogBase) {
        fctx.save();
        fctx.globalAlpha = 0.012;
        fctx.drawImage(fogBase, 0, 0, width, height);
        fctx.restore();
      }

      // compose: fog layer + droplets
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(fog, 0, 0, width, height);
      for (const d of drops) drawDrop(ctx, d);

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
