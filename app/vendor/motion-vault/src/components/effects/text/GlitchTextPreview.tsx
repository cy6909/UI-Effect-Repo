import { useState } from 'react';

const WORD = 'GLITCH';

/**
 * Scoped keyframes: a 600ms RGB-split + clip-slice burst that runs once per
 * hover, then fully settles back to the clean base glyph (animations are
 * `1` iteration with default fill, so styles revert when the burst ends).
 */
const GLITCH_CSS = `
.glitch-fx-copy {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}
.glitch-fx-on .glitch-fx-base {
  animation: glitch-fx-jitter 600ms steps(1, end) 1;
}
.glitch-fx-on .glitch-fx-rose {
  animation: glitch-fx-a 600ms steps(1, end) 1;
}
.glitch-fx-on .glitch-fx-sky {
  animation: glitch-fx-b 600ms steps(1, end) 1;
}
@keyframes glitch-fx-jitter {
  0%   { transform: translate(0, 0); }
  20%  { transform: translate(-2px, 1px); }
  40%  { transform: translate(2px, -1px); }
  60%  { transform: translate(-1px, 0); }
  80%  { transform: translate(1px, 1px); }
  100% { transform: translate(0, 0); }
}
@keyframes glitch-fx-a {
  0%   { opacity: 0.6; transform: translate(-3px, 0);    clip-path: inset(8% 0 72% 0); }
  20%  { opacity: 0.6; transform: translate(-5px, 2px);  clip-path: inset(58% 0 12% 0); }
  40%  { opacity: 0.6; transform: translate(-2px, -1px); clip-path: inset(24% 0 52% 0); }
  60%  { opacity: 0.6; transform: translate(-6px, 1px);  clip-path: inset(78% 0 4% 0); }
  80%  { opacity: 0.6; transform: translate(-3px, 0);    clip-path: inset(40% 0 38% 0); }
  100% { opacity: 0;   transform: translate(0, 0);       clip-path: inset(0 0 0 0); }
}
@keyframes glitch-fx-b {
  0%   { opacity: 0.6; transform: translate(3px, 0);     clip-path: inset(64% 0 10% 0); }
  20%  { opacity: 0.6; transform: translate(5px, -2px);  clip-path: inset(12% 0 68% 0); }
  40%  { opacity: 0.6; transform: translate(2px, 1px);   clip-path: inset(82% 0 2% 0); }
  60%  { opacity: 0.6; transform: translate(6px, -1px);  clip-path: inset(36% 0 44% 0); }
  80%  { opacity: 0.6; transform: translate(3px, 0);     clip-path: inset(4% 0 84% 0); }
  100% { opacity: 0;   transform: translate(0, 0);       clip-path: inset(0 0 0 0); }
}
`;

const TEXT_CLASS = 'font-mono text-[40px] font-medium uppercase tracking-[0.08em]';

/** Effect — hover fires a 600ms RGB-split glitch burst with jumping clip slices, then it settles clean. */
export default function GlitchTextPreview() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex h-full w-full cursor-pointer items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${WORD}，悬停触发故障动效`}
    >
      <style>{GLITCH_CSS}</style>
      <span className={hovered ? 'glitch-fx-on relative inline-block' : 'relative inline-block'}>
        <span className={`glitch-fx-base relative inline-block will-change-transform ${TEXT_CLASS} text-zinc-950`}>
          {WORD}
        </span>
        <span aria-hidden className={`glitch-fx-copy glitch-fx-rose will-change-transform ${TEXT_CLASS}`} style={{ color: '#F43F5E' }}>
          {WORD}
        </span>
        <span aria-hidden className={`glitch-fx-copy glitch-fx-sky will-change-transform ${TEXT_CLASS}`} style={{ color: '#38BDF8' }}>
          {WORD}
        </span>
      </span>
    </div>
  );
}
