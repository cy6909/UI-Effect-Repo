import { useEffect, useRef } from 'react';

const CELL = 5;
const MAX_GRAINS = 5200;

// warm sand tones (amber-200/300/400)
const TONES = ['#FDE68A', '#FCD34D', '#FBBF24'];

/**
 * Falling-sand cellular automaton: grains pour from three spouts, fall,
 * slide and pile into natural slopes. Hold the pointer to pour sand from
 * your fingertips; click a dune to excavate it and watch it collapse.
 */
export default function SandPile() {
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
    let cols = 0;
    let rows = 0;
    let grid = new Uint8Array(0); // 0 empty, 1..3 tone index + 1
    let grains = 0;
    let frame = 0;
    let lastDissolve = 0;
    const pointer = { x: -9999, y: -9999, down: false };
    let spouts: number[] = [];

    function idx(cx: number, cy: number) {
      return cy * cols + cx;
    }

    function addGrain(cx: number, cy: number) {
      if (cx < 0 || cx >= cols || cy < 0 || cy >= rows) return;
      if (grains >= MAX_GRAINS) return;
      const i = idx(cx, cy);
      if (grid[i] !== 0) return;
      grid[i] = 1 + Math.floor(Math.random() * 3);
      grains++;
    }

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.max(4, Math.floor(width / CELL));
      rows = Math.max(4, Math.floor(height / CELL));
      grid = new Uint8Array(cols * rows);
      grains = 0;
      spouts = [0.25, 0.5, 0.75].map((f) => Math.floor(cols * f));
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, width, height);
    }

    function step() {
      // bottom-up so falling grains don't chain-fall in one tick
      for (let cy = rows - 2; cy >= 0; cy--) {
        const leftFirst = Math.random() < 0.5;
        for (let cx = 0; cx < cols; cx++) {
          const i = idx(cx, cy);
          if (grid[i] === 0) continue;
          const below = idx(cx, cy + 1);
          if (grid[below] === 0) {
            grid[below] = grid[i];
            grid[i] = 0;
            continue;
          }
          const dirs = leftFirst ? [-1, 1] : [1, -1];
          for (const d of dirs) {
            const nx = cx + d;
            if (nx < 0 || nx >= cols) continue;
            const ni = idx(nx, cy + 1);
            if (grid[ni] === 0 && grid[idx(nx, cy)] === 0) {
              grid[ni] = grid[i];
              grid[i] = 0;
              break;
            }
          }
        }
      }
    }

    function draw() {
      ctx.fillStyle = '#FAFAFA';
      ctx.fillRect(0, 0, width, height);
      // faint ground shadow
      ctx.fillStyle = 'rgba(228, 228, 231, 0.5)';
      ctx.fillRect(0, height - 4, width, 4);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const v = grid[idx(cx, cy)];
          if (v === 0) continue;
          ctx.fillStyle = TONES[v - 1];
          ctx.fillRect(cx * CELL, cy * CELL, CELL - 0.5, CELL - 0.5);
        }
      }
    }

    function excavate(px: number, py: number) {
      const ccx = Math.floor(px / CELL);
      const ccy = Math.floor(py / CELL);
      const R = 5;
      for (let dy = -R; dy <= R; dy++) {
        for (let dx = -R; dx <= R; dx++) {
          if (dx * dx + dy * dy > R * R) continue;
          const cx = ccx + dx;
          const cy = ccy + dy;
          if (cx < 0 || cx >= cols || cy < 0 || cy >= rows) continue;
          const i = idx(cx, cy);
          if (grid[i] !== 0) {
            grid[i] = 0;
            grains--;
          }
        }
      }
    }

    function tick(now: number) {
      frame++;
      // calm pace: automaton every other frame
      if (frame % 2 === 0) {
        // three top spouts, dense thin streams
        for (const sx of spouts) {
          for (let k = 0; k < 2; k++) {
            if (Math.random() < 0.85) addGrain(sx + Math.floor(Math.random() * 2), 0);
          }
        }
        // pour from the held pointer
        if (pointer.down && Math.random() < 0.9) {
          const ccx = Math.floor(pointer.x / CELL);
          const ccy = Math.floor(pointer.y / CELL);
          addGrain(ccx + Math.floor(Math.random() * 3) - 1, ccy);
        }
        step();
      }

      // quietly dissolve the bottom row to make room
      if (now - lastDissolve > 14000) {
        lastDissolve = now;
        for (let cx = 0; cx < cols; cx++) {
          const i = idx(cx, rows - 1);
          if (grid[i] !== 0) {
            grid[i] = 0;
            grains--;
          }
        }
      }

      draw();
      raf = requestAnimationFrame(tick);
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    }
    function onDown(e: PointerEvent) {
      onMove(e);
      pointer.down = true;
      excavate(pointer.x, pointer.y);
    }
    function onUp() {
      pointer.down = false;
    }
    function onLeave() {
      pointer.x = -9999;
      pointer.y = -9999;
      pointer.down = false;
    }

    resize();
    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    canvas.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'crosshair', touchAction: 'none' }}
    />
  );
}
