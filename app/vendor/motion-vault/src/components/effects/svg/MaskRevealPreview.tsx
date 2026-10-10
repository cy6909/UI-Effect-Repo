import { useRef } from 'react';

const VW = 320;
const VH = 160;
const WORD = 'HIDDEN';
/** spotlight radius in viewBox units */
const SPOT_R = 58;

/**
 * Effect — a solid zinc-950 copy of the word sits under an SVG mask whose radial-gradient
 * circle follows the cursor: the true glyph only materializes inside the spotlight.
 */
export default function MaskRevealPreview() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<SVGCircleElement>(null);

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const spot = spotRef.current;
    if (!wrap || !spot) return;
    const r = wrap.getBoundingClientRect();
    spot.setAttribute('cx', String(((e.clientX - r.left) / r.width) * VW));
    spot.setAttribute('cy', String(((e.clientY - r.top) / r.height) * VH));
  };

  const leave = () => {
    spotRef.current?.setAttribute('cx', '-9999');
    spotRef.current?.setAttribute('cy', '-9999');
  };

  const textStyle: React.CSSProperties = {
    fontSize: '56px',
    fontWeight: 700,
    letterSpacing: '0.14em',
    fontFamily: 'inherit',
  };

  return (
    <div
      ref={wrapRef}
      className="flex h-full w-full cursor-crosshair select-none items-center justify-center px-6"
      onPointerMove={move}
      onPointerLeave={leave}
      role="img"
      aria-label="遮罩揭示：移动鼠标用聚光灯照亮隐藏文字 HIDDEN"
    >
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full max-w-[400px]">
        <defs>
          <radialGradient id="mask-reveal-spot">
            <stop offset="0%" stopColor="white" stopOpacity={1} />
            <stop offset="55%" stopColor="white" stopOpacity={1} />
            <stop offset="100%" stopColor="white" stopOpacity={0} />
          </radialGradient>
          <mask id="mask-reveal-mask">
            <circle ref={spotRef} cx={-9999} cy={-9999} r={SPOT_R} fill="url(#mask-reveal-spot)" />
          </mask>
        </defs>

        {/* base layer: pale outline ghost of the word */}
        <text
          x={VW / 2}
          y={VH / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="none"
          stroke="#D4D4D8"
          strokeWidth={1}
          style={textStyle}
        >
          {WORD}
        </text>

        {/* top layer: solid glyphs, visible only inside the spotlight mask */}
        <text
          x={VW / 2}
          y={VH / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fill="#09090B"
          style={textStyle}
          mask="url(#mask-reveal-mask)"
        >
          {WORD}
        </text>
      </svg>
    </div>
  );
}
