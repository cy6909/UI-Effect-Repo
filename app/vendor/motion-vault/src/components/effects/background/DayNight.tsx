const css = `
.dn-sky { position: absolute; inset: 0; opacity: 0; animation-duration: 16s; animation-timing-function: linear; animation-iteration-count: infinite; }
.dn-dawn  { background: linear-gradient(to bottom, #FCE9D8 0%, #F9CBA9 55%, #F5AE8B 100%); animation-name: dn-dawn; }
.dn-noon  { background: linear-gradient(to bottom, #D9ECF9 0%, #F1F8FD 100%); animation-name: dn-noon; }
.dn-dusk  { background: linear-gradient(to bottom, #B99BD6 0%, #E3AEC4 55%, #F0A184 100%); animation-name: dn-dusk; }
.dn-night { background: linear-gradient(to bottom, #09090B 0%, #101013 60%, #17171B 100%); animation-name: dn-night; }
@keyframes dn-dawn  { 0% {opacity:1} 21% {opacity:1} 29% {opacity:0} 92% {opacity:0} 100% {opacity:1} }
@keyframes dn-noon  { 0% {opacity:0} 21% {opacity:0} 29% {opacity:1} 46% {opacity:1} 54% {opacity:0} 100% {opacity:0} }
@keyframes dn-dusk  { 0% {opacity:0} 46% {opacity:0} 54% {opacity:1} 71% {opacity:1} 79% {opacity:0} 100% {opacity:0} }
@keyframes dn-night { 0% {opacity:0} 71% {opacity:0} 79% {opacity:1} 95% {opacity:1} 100% {opacity:0} }

.dn-arm { position: absolute; inset: 0; opacity: 0; transform-origin: 50% 150%; animation-duration: 16s; animation-timing-function: linear; animation-iteration-count: infinite; }
.dn-sun-arm  { animation-name: dn-sun; }
.dn-moon-arm { animation-name: dn-moon; }
@keyframes dn-sun {
  0%   { transform: rotate(-78deg); opacity: 0; }
  7%   { opacity: 1; }
  37.5%{ transform: rotate(0deg); opacity: 1; }
  66%  { opacity: 1; }
  75%  { transform: rotate(78deg); opacity: 0; }
  100% { transform: rotate(-78deg); opacity: 0; }
}
@keyframes dn-moon {
  0%   { transform: rotate(-60deg); opacity: 0; }
  78%  { transform: rotate(-50deg); opacity: 0; }
  85%  { opacity: 0.95; }
  96%  { opacity: 0.95; }
  100% { transform: rotate(45deg); opacity: 0; }
}

.dn-stars {
  position: absolute; inset: 0; opacity: 0;
  animation: dn-stars 16s linear infinite;
  background-image:
    radial-gradient(circle 1px at 10% 16%, rgba(255,255,255,0.95) 100%, transparent 100%),
    radial-gradient(circle 1.4px at 22% 38%, rgba(255,255,255,0.7) 100%, transparent 100%),
    radial-gradient(circle 1px at 34% 12%, rgba(255,255,255,0.85) 100%, transparent 100%),
    radial-gradient(circle 1.2px at 45% 30%, rgba(255,255,255,0.6) 100%, transparent 100%),
    radial-gradient(circle 1px at 56% 8%, rgba(255,255,255,0.95) 100%, transparent 100%),
    radial-gradient(circle 1.5px at 66% 26%, rgba(255,255,255,0.75) 100%, transparent 100%),
    radial-gradient(circle 1px at 76% 12%, rgba(255,255,255,0.9) 100%, transparent 100%),
    radial-gradient(circle 1.2px at 88% 34%, rgba(255,255,255,0.65) 100%, transparent 100%),
    radial-gradient(circle 1px at 16% 56%, rgba(255,255,255,0.7) 100%, transparent 100%),
    radial-gradient(circle 1.3px at 40% 52%, rgba(255,255,255,0.8) 100%, transparent 100%),
    radial-gradient(circle 1px at 62% 48%, rgba(255,255,255,0.6) 100%, transparent 100%),
    radial-gradient(circle 1.2px at 82% 58%, rgba(255,255,255,0.85) 100%, transparent 100%),
    radial-gradient(circle 1px at 93% 20%, rgba(255,255,255,0.75) 100%, transparent 100%),
    radial-gradient(circle 1px at 5% 42%, rgba(255,255,255,0.6) 100%, transparent 100%);
}
@keyframes dn-stars {
  0% {opacity:0} 78% {opacity:0} 86% {opacity:1} 94% {opacity:1} 100% {opacity:0}
}
`;

/**
 * A full 16s sky cycle: dawn (soft peach) → noon (pale sky) → dusk (warm
 * violet) → night (deep zinc-950, stars fade in) → dawn. A sun disc arcs
 * across on a rotating arm (transform-only, fading near the horizon) and a
 * moon rises at night. Foreground content uses mix-blend-difference so the
 * text flips between dark-on-light and light-on-night automatically.
 */
export default function DayNight() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-zinc-950">
      <style>{css}</style>
      {/* stacked sky phases, crossfaded via opacity keyframes */}
      <div className="dn-sky dn-dawn" />
      <div className="dn-sky dn-noon" />
      <div className="dn-sky dn-dusk" />
      <div className="dn-sky dn-night" />
      {/* stars (night only) */}
      <div className="dn-stars" />
      {/* sun: rotating arm with origin far below the horizon */}
      <div className="dn-arm dn-sun-arm">
        <div
          className="absolute left-1/2 top-[7%] h-6 w-6 -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FDE9C8 0%, #F9B45C 70%)',
            boxShadow: '0 0 24px 8px rgba(249, 180, 92, 0.55)',
          }}
        />
      </div>
      {/* moon */}
      <div className="dn-arm dn-moon-arm">
        <div
          className="absolute left-1/2 top-[9%] h-5 w-5 -translate-x-1/2 rounded-full"
          style={{
            background: 'radial-gradient(circle, #FAFAFA 0%, #D4D4D8 75%)',
            boxShadow: '0 0 16px 4px rgba(244, 244, 245, 0.35)',
          }}
        />
      </div>
      {/* mock page content (blend-difference flips with the sky) */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 mix-blend-difference">
        <span className="text-lg font-semibold tracking-[-0.02em] text-white">昼夜流转</span>
        <span className="flex h-8 items-center rounded-lg border border-white px-4 text-[13px] font-medium text-white">
          开始使用
        </span>
      </div>
    </div>
  );
}
