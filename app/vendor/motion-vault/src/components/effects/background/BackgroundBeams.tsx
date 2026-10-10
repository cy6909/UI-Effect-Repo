type Beam = {
  id: string;
  d: string;
  dur: string;
  begin: string;
};

/**
 * Five thin curved SVG paths (zinc-200) sweep from the top edge to the
 * bottom. A short bright pulse — a small zinc-400 dot wrapped in a soft
 * halo — travels down each path on a staggered 4-7s loop, fading in at the
 * top and out at the bottom. Motion is declarative SMIL (animateMotion +
 * mpath), so no rAF or timers are needed; the SVG stretches with
 * preserveAspectRatio="none" to fill any preview size.
 */
const BEAMS: Beam[] = [
  { id: 'b1', d: 'M 90 -10 C 150 130, 40 300, 110 510', dur: '4.6s', begin: '-1.2s' },
  { id: 'b2', d: 'M 250 -10 C 190 140, 310 280, 230 510', dur: '6.4s', begin: '-3.8s' },
  { id: 'b3', d: 'M 400 -10 C 460 120, 340 300, 420 510', dur: '5.2s', begin: '-0.6s' },
  { id: 'b4', d: 'M 550 -10 C 500 150, 610 270, 540 510', dur: '6.9s', begin: '-4.9s' },
  { id: 'b5', d: 'M 700 -10 C 650 110, 750 300, 680 510', dur: '4.2s', begin: '-2.4s' },
];

export default function BackgroundBeams() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-white">
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
      >
        {BEAMS.map((beam) => (
          <g key={beam.id}>
            <path d={beam.d} fill="none" stroke="#E4E4E7" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            {/* soft halo trailing the pulse */}
            <circle r="9" fill="rgba(161,161,170,0.12)">
              <animateMotion dur={beam.dur} begin={beam.begin} repeatCount="indefinite">
                <mpath href={`#bb-${beam.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.85;1"
                dur={beam.dur}
                begin={beam.begin}
                repeatCount="indefinite"
              />
            </circle>
            <circle r="2.6" fill="#A1A1AA">
              <animateMotion dur={beam.dur} begin={beam.begin} repeatCount="indefinite">
                <mpath href={`#bb-${beam.id}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.12;0.85;1"
                dur={beam.dur}
                begin={beam.begin}
                repeatCount="indefinite"
              />
            </circle>
            {/* hidden reference path for mpath */}
            <path id={`bb-${beam.id}`} d={beam.d} fill="none" stroke="none" />
          </g>
        ))}
      </svg>
      {/* readability check */}
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2">
        <span className="text-lg font-semibold tracking-tight text-zinc-900">光束流动</span>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400">
          Background Beams
        </span>
      </div>
    </div>
  );
}
