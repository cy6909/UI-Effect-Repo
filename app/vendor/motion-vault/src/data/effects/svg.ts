import type { Effect } from '@/types/effect';
import DrawSignaturePreview from '@/components/effects/svg/DrawSignaturePreview';
import DrawIconsPreview from '@/components/effects/svg/DrawIconsPreview';
import RingProgressPreview from '@/components/effects/svg/RingProgressPreview';
import DrawCheckPreview from '@/components/effects/svg/DrawCheckPreview';
import PathMorphPreview from '@/components/effects/svg/PathMorphPreview';
import LineChartPreview from '@/components/effects/svg/LineChartPreview';
import BeamPathPreview from '@/components/effects/svg/BeamPathPreview';
import MaskRevealPreview from '@/components/effects/svg/MaskRevealPreview';
import BorderTrailPreview from '@/components/effects/svg/BorderTrailPreview';
import StrokeHoverPreview from '@/components/effects/svg/StrokeHoverPreview';
import DottedMapPreview from '@/components/effects/svg/DottedMapPreview';
import StrandsPreview from '@/components/effects/svg/StrandsPreview';
import DrawArrowPreview from '@/components/effects/svg/DrawArrowPreview';
import EmblemDrawPreview from '@/components/effects/svg/EmblemDrawPreview';

/** SVG 描边 — path drawing, stroke choreography and path morphing. */
export const svgEffects: Effect[] = [
  {
    id: 'draw-signature',
    title: '签名描绘',
    label: 'DRAW SIGNATURE',
    description: '一段手写体的 “Motion” 签名逐笔描绘出自己，最后一条下划线潇洒收尾，每 4 秒自动重播。',
    categories: ['svg'],
    interaction: 'auto',
    component: DrawSignaturePreview,
    prompt: `Create a React component called DrawSignature using React + Tailwind CSS + Framer Motion. It renders an SVG (viewBox 400x130) containing a hand-crafted cursive 'Motion' written as one flowing connected path of smooth cubic curves on a baseline near y=88. The main word draws itself with a motion.path animating pathLength 0 to 1 over 2.2s with ease-in-out, stroke #09090B (zinc-950), strokeWidth 3, round line caps and joins, no fill. Two tiny detail strokes (a t-cross and an i-dot) draw near the end with short 0.25s pathLength tweens around 1.75s delay. Then an underline flourish path (a long sweeping curve from x=42 to x=356 near y=100 with an upward hook at the end) swishes in with pathLength 0 to 1 over 0.4s at 2.25s delay. The whole sequence replays automatically every ~4.2s by incrementing a cycle counter in state and keying the svg on it so all strokes remount; clean up the interval on unmount. Center the svg in the container on a light background, animate pathLength only.`,
  },
  {
    id: 'draw-icons',
    title: '图标描绘',
    label: 'DRAW ICONS',
    description: '四个极简线性图标排在圆角小方块里，悬停任意一个，它的描边会依次画出；移开保持完成态，再次悬停重新描绘。',
    categories: ['svg'],
    interaction: 'hover',
    component: DrawIconsPreview,
    prompt: `Create a React component called DrawIcons using React + Tailwind CSS + Framer Motion. It renders a row of 4 minimal line icons — mountain+sun, wave, leaf, star — each inside a 56px rounded-xl tile with a 1px zinc-200 hairline border on white. Each icon is a 24x24 viewBox SVG made of 1-2 strokes (e.g. mountain: 'M3 18 L9 8 L13 14 L16 10 L21 18' plus a small circle for the sun; wave: two stacked sine curves; leaf: a closed leaf outline plus a vein; star: a 5-point star polygon path), stroke #09090B, strokeWidth 1.5, round caps, no fill. On mouse enter of a tile, increment a runId in that tile's state and key the svg on it so all strokes remount and draw sequentially: each motion.path (or motion.circle) animates pathLength 0 to 1, 300ms each, staggered by 120ms. On mouse leave do nothing — the icon stays fully drawn; hovering again re-runs the draw. Tiles are independent (own state), centered in a light preview with 16px gaps.`,
  },
  {
    id: 'ring-progress',
    title: '环形进度',
    label: 'RING PROGRESS',
    description: '环形进度条扫到 78%，中心 mono 数字弹性同步计数，外圈点缀细密的刻度线。',
    categories: ['svg', 'loader'],
    interaction: 'auto',
    component: RingProgressPreview,
    prompt: `Create a React component called RingProgress using React + Tailwind CSS + Framer Motion. It renders a 160x160 SVG containing: a ring of 24 subtle tick marks (1px zinc-300 lines at radius 60-66, every 15deg, every 6th tick slightly longer), a track circle (radius 52, 6px stroke, zinc-200, no fill), and a progress arc — a motion.circle with the same radius, 6px zinc-950 stroke, round line cap, rotated -90deg around the center, animating pathLength 0 to 0.78 over 1.6s ease-out on mount. In the center, absolutely positioned, a mono-font number counts 0% to 78% in sync: drive a useMotionValue with animate() using a spring (stiffness 60, damping 16), round it via useTransform, and render it as the text content of a motion.span. Stop the animation controls on unmount. Light background, monochrome zinc only.`,
  },
  {
    id: 'draw-check',
    title: '描绘打勾',
    label: 'DRAW CHECK',
    description: '圆圈先描出轮廓，对勾随即一气呵成，结尾带一点回弹缩放的“咔哒”感与一抹极淡的绿色。点击图标即可重播。',
    categories: ['svg'],
    interaction: 'click',
    component: DrawCheckPreview,
    prompt: `Create a React component called DrawCheck using React + Tailwind CSS + Framer Motion. It renders a 64x64 SVG (viewBox 64) inside a rounded-full button. Sequence on mount: 1) a circle outline (radius 27, 2.5px zinc-950 stroke, round cap, rotated -90deg) draws itself via pathLength 0 to 1 over 0.6s ease-in-out; 2) a check mark path 'M 21 33 L 28.5 40.5 L 44 24' (3px zinc-950, round caps/joins) draws via pathLength 0 to 1 over 0.35s at 0.6s delay; 3) at ~0.95s the wrapping motion.g pops with a slight overshoot — scale keyframes [1, 1.12, 1] over 0.35s, transform origin 50% 50% — while a same-radius circle filled #16A34A fades to opacity 0.08 as a subtle success tint. Clicking the button increments a runId in state and keys the svg on it so the whole sequence replays. Light background, animate pathLength/opacity/transform only.`,
  },
  {
    id: 'path-morph',
    title: '路径变形',
    label: 'PATH MORPH',
    description: '一个有机的 Blob 与一颗四角星共用同一套路径命令，d 属性在两者之间平滑插值，每 3 秒循环一次。',
    categories: ['svg'],
    interaction: 'auto',
    component: PathMorphPreview,
    prompt: `Create a React component called PathMorph using React + Tailwind CSS + Framer Motion. It renders a 200x200 SVG with a single filled motion.path (fill #09090B at 90% opacity). Craft TWO compatible 'd' strings with the exact same command structure — 8 anchors every 45deg around center (100,100) connected by 8 cubic C segments, closed with Z: a blob (radii alternating 68/58/48/58 with generous tangential control points ~0.42*r) and a 4-point star (radii alternating 70/38 with short control points ~0.16*r producing curved points). Because the structures match, Framer Motion can tween the 'd' attribute directly: toggle a boolean in state every 1.5s (1.2s morph + 0.3s hold, full loop 3s) via setInterval and animate d to the current shape's string with duration 1.2s, ease-in-out; clean up the interval on unmount. Below the shape show a tiny mono uppercase label (text-xs zinc-400) that crossfades between 'BLOB' and 'STAR' with AnimatePresence mode='wait' (y 4px drift, 200ms) so the label always names the current shape. Light background.`,
  },
  {
    id: 'line-chart',
    title: '折线图生长',
    label: 'LINE CHART GROW',
    description: '坐标轴先落笔，折线从左向右生长，数据点随着线条到达逐个弹出，最后一个点带柔和的脉冲圈，底部渐隐面积随后浮现。',
    categories: ['svg'],
    interaction: 'auto',
    component: LineChartPreview,
    prompt: `Create a React component called LineChartGrow using React + Tailwind CSS + Framer Motion. It renders a minimal line chart in a 320x180 viewBox. Three faint horizontal grid lines (1px zinc-200) fade in first, then the two axes (1px zinc-400 lines: x-axis y=145 from x=40 to 292, y-axis x=40 from y=145 to 20) draw in via pathLength 0 to 1 over 200ms. Then a 5-point polyline through (60,118) (108,82) (156,96) (204,58) (252,36) grows left to right: motion.path pathLength 0 to 1, 1.8s ease-out, 2px zinc-950 stroke, round caps/joins, starting at 0.2s delay. Five data dots (r 3.5, white fill, 2px zinc-950 stroke) pop in with a spring (stiffness 500, damping 18) from scale 0, each delayed by its x fraction of the 1.8s line duration ((x-60)/192 * 1.8 + 0.2s) so they appear exactly as the line reaches them. The last dot gets a soft pulse ring: an isolated React.memo micro-component rendering a motion.circle whose r and opacity animate (r 5 to 16, opacity 0.45 to 0) on a 1.4s infinite repeat. After the line completes, a faint area under the line (same polyline closed down to y=145, filled with a vertical linearGradient from zinc-950 at 8% opacity to transparent) fades in over 0.8s. Light background, monochrome zinc only.`,
  },
  {
    id: 'beam-path',
    title: '光束流动',
    label: 'BEAM PATH',
    description: '一条 S 形发卡弯轨道上，高亮光斑带着 3 个渐隐拖尾点循环流动——getPointAtLength 驱动，丝滑无缝。',
    categories: ['svg'],
    interaction: 'auto',
    component: BeamPathPreview,
    prompt: `Create a React component called BeamPath using React + Tailwind CSS. It renders a 300x160 viewBox SVG containing a dim S-curve rail with a hairpin feel: path 'M 24 120 C 90 120 90 40 150 40 C 210 40 210 120 276 120', stroke #E4E4E7 (zinc-200), strokeWidth 1.5, round line cap, no fill, plus two small terminal dots (r 2.5, zinc-300) at both ends. A bright head dot (r 3.5, fill #09090B zinc-950) travels the rail in a 2.4s seamless loop, trailed by 3 ghost dots (r 3 / 2.5 / 2, opacity 0.32 / 0.18 / 0.09) sitting 16 / 32 / 48 path-units behind the head. Drive the motion with requestAnimationFrame: keep a ref to the rail path, call getTotalLength() once, and each frame compute t = ((now - start) % 2400) / 2400, then position every dot with path.getPointAtLength wrapped modulo the total length so the trail never jumps at the seam — write cx/cy via setAttribute directly on ref'd circles (no React state, 60fps). Gate the loop with an IntersectionObserver so it pauses off-screen and cancelAnimationFrame on cleanup. Center the svg (max-width ~360px) on a light background, monochrome zinc only, container aria-label.`,
  },
  {
    id: 'mask-reveal',
    title: '遮罩揭示',
    label: 'MASK REVEAL',
    description: '浅灰描边的 HIDDEN 铺底，实心黑字只在一枚跟随指针的径向渐变光斑内显形——聚光灯下现出真身。',
    categories: ['svg'],
    interaction: 'move',
    component: MaskRevealPreview,
    prompt: `Create a React component called MaskReveal using React + Tailwind CSS + SVG. It renders a 320x160 viewBox SVG with the word 'HIDDEN' (56px, bold, letter-spacing 0.14em, centered via textAnchor middle + dominantBaseline central) stacked in two layers: a base layer drawn as a pale outline (fill none, 1px stroke #D4D4D8 zinc-300) and an identical top layer filled solid #09090B (zinc-950). The top layer carries mask='url(#spot-mask)' where the mask is a single circle (r 58 in viewBox units) filled with a radialGradient (white opacity 1 at 0% and 55%, fading to opacity 0 at 100%) — so the solid glyph only materializes inside a soft spotlight. On pointermove over the wrapper, convert the pointer to viewBox coordinates ((clientX - rect.left) / rect.width * 320, same for y) and write them to the mask circle's cx/cy via ref + setAttribute (NO React state per move, zero re-renders); on pointerleave park the circle at -9999 so the spotlight turns off. Initialize cx/cy at -9999. Use component-unique ids for the gradient and mask to avoid collisions. cursor-crosshair, select-none, light background, role=img with an aria-label since the masked copy is decorative.`,
  },
  {
    id: 'border-trail',
    title: '边框光点',
    label: 'BORDER TRAIL',
    description: '圆角卡片轮廓上，一小段亮弧沿边框匀速循环描边，身后半圈处还有一段更淡的伴弧——pathLength + dashoffset 的经典戏法。',
    categories: ['svg'],
    interaction: 'auto',
    component: BorderTrailPreview,
    prompt: `Create a React component called BorderTrail using React + Tailwind CSS + Framer Motion. It renders a 296x168px card: an absolutely-positioned SVG (viewBox 296x168) draws a rounded rect (x 1, y 1, width 294, height 166, rx 16) three times. First rect is the static base — white fill, 1px stroke #E4E4E7 (zinc-200). Second is the travelling bright arc: motion.rect with no fill, 1.5px stroke #09090B (zinc-950), round line cap, and the pathLength normalization trick — pathLength={100}, strokeDasharray '9 91', then animate strokeDashoffset from 0 to -100 over 3.2s with ease linear and repeat Infinity so a short bright segment orbits the border seamlessly. Third is a fainter companion arc half a lap behind: same rect, 1px stroke #A1A1AA (zinc-400), strokeDasharray '5 95', strokeDashoffset animating from -50 to -150 on the same 3.2s linear infinite timeline. Centered inside the card, static content: 'BORDER TRAIL' (14px mono, font-medium, uppercase, tracking 0.24em, zinc-950) over a small sub-caption 'STROKE-DASHOFFSET LOOP' (11px mono, uppercase, tracking 0.18em, zinc-400). Light background, animate stroke-dashoffset only, container aria-label.`,
  },
  {
    id: 'stroke-hover',
    title: '描边文字点亮',
    label: 'STROKE HOVER',
    description: '巨大的 STROKE 平时只是浅灰细描边，悬停时一条低饱和渐变高光沿字形扫过，填充被短暂点亮后又归于安静。',
    categories: ['svg'],
    interaction: 'hover',
    component: StrokeHoverPreview,
    prompt: `Create a React component called StrokeHoverText using React + Tailwind CSS + Framer Motion. It renders a 320x140 viewBox SVG with the word 'STROKE' (62px, Inter 700, letter-spacing 0.06em, centered via x=160 textAnchor middle) stacked in three layers. Layer 1 (resting state): the glyph as a pale outline — fill none, 1px stroke #D4D4D8 (zinc-300). Layer 2 (highlight sweep): the same text stroked 2.2px with a low-saturation horizontal linearGradient (transparent zinc-400 → #71717A → #18181B → zinc-400 transparent), wrapped in a <g> carrying an SVG mask whose only content is a 110px-wide motion.rect filled with a soft horizontal white-to-transparent gradient; on hover, increment a runId in state and key the mask rect on it so it remounts and sweeps x from -120 to 330 over 1.15s easeInOut — a soft-edged light band travelling across the strokes. Layer 3 (fill flash): the same text filled #18181B, keyed on runId, animating opacity keyframes [0, 0.9, 0.12] with times [0, 0.55, 1] over the same 1.15s so the fill briefly lights up mid-sweep then settles to a faint tint. Trigger on the wrapper's onMouseEnter (cursor-pointer, select-none), light background, use component-unique gradient/mask ids, container aria-label.`,
  },
  {
    id: 'dotted-map',
    title: '点阵地图',
    label: 'DOTTED MAP',
    description: '网格圆点拼出抽象大陆轮廓，陆地密、海洋疏；三条弧线虚线在四个城市点之间流动，城市点带着柔和的脉冲圈。',
    categories: ['svg'],
    interaction: 'auto',
    component: DottedMapPreview,
    prompt: `Create a React component called DottedMap using React + Tailwind CSS + Framer Motion. It renders a 320x180 viewBox SVG. Dot grid: circles every 10px — precompute in useMemo which dots are 'land' using 3-4 overlapping ellipses (e.g. centers (78,66) rx46 ry32, (150,112) rx30 ry34, (226,62) rx42 ry27, (258,118) rx24 ry19) plus a subtle sine wobble on the radius threshold (1 + 0.12 * sin(x*0.21 + y*0.13)) for organic coastlines; land dots r1.7 fill #3F3F46, ocean dots r1 fill #E4E4E7. Four city dots at (70,58) (148,108) (228,58) (258,112): each is a 3px zinc-950 dot with a 1.2px white core plus a memoized infinite pulse ring (motion.circle, r 3 → 11, opacity 0.5 → 0, 1.6s easeOut repeat Infinity, staggered 0.4s). Three dashed arcs connect the cities — quadratic paths bowed upward ('M 70 58 Q 145 6 228 58', 'M 148 108 Q 196 60 258 112', 'M 70 58 Q 104 116 148 108'), stroke #09090B 1.2px round cap, strokeDasharray '1 6', animating strokeDashoffset 0 → -56 over 2.2s linear repeat Infinity (0.35s stagger) so dashes flow along the arcs. Light background, monochrome zinc only, container aria-label.`,
  },
  {
    id: 'strands',
    title: '多股线浪',
    label: 'STRANDS',
    description: '六条水平贝塞尔细线的控制点随时间正弦起伏，相位错落编织成一条缓慢流动的缎带，中间一条 zinc-950 主线领航。',
    categories: ['svg'],
    interaction: 'auto',
    component: StrandsPreview,
    prompt: `Create a React component called Strands using React + Tailwind CSS (no Framer Motion needed — drive it with requestAnimationFrame). It renders a 320x180 viewBox SVG with 6 horizontal cubic-bezier strands. Strand i sits at baseY = 44 + i*18 and its path is 'M 6 baseY C 92 c1 228 c2 314 baseY' where the control points ride phase-offset sine waves: c1 = baseY + 13 * sin(t*1.25 + i*0.75), c2 = baseY + 13 * sin(t*1.25 + i*0.75 + PI*0.66). Keep an array of path refs; each rAF frame recompute every strand's d and write it via setAttribute directly (round to 2 decimals, zero React state, 60fps). Strand index 2 is the lead — stroke #09090B strokeWidth 1.6 full opacity; the other five are #A1A1AA (zinc-400) at 1px and 0.75 opacity. All round line caps, no fill. Gate the loop with an IntersectionObserver-based useInView hook so it only runs while visible; cancelAnimationFrame on cleanup. Center the svg (max-width ~380px) on a light background, container aria-label.`,
  },
  {
    id: 'draw-arrow',
    title: '手绘引导箭头',
    label: 'DRAW ARROW',
    description: '一条略带抖动的手绘弯曲线从左上绕到右下，1.2 秒画出、停留 1 秒、0.5 秒反向擦除，箭头头部在最后时刻补上，无限循环。',
    categories: ['svg'],
    interaction: 'auto',
    component: DrawArrowPreview,
    prompt: `Create a React component called DrawArrow using React + Tailwind CSS + Framer Motion. It renders a 320x180 viewBox SVG containing a hand-drawn-feel guide arrow. The main curve is a slightly wobbly path from top-left winding to bottom-right: 'M 44 42 C 46 96 96 58 146 88 C 196 118 220 84 262 124', stroke #09090B (zinc-950), strokeWidth 3, round caps/joins, no fill. The arrowhead is a separate path of two short barbs at the tip: 'M 246 122 L 262 124 L 254 108', same stroke styling. Loop both on a 2.7s infinite repeat using pathLength keyframes: the curve animates [0, 1, 1, 0] with times [0, 0.44, 0.81, 1] and per-segment eases [easeInOut, linear, easeInOut] — 1.2s draw, 1s hold, 0.5s backward erase; the head animates [0, 0, 1, 1, 0] with times [0, 0.34, 0.44, 0.8, 1] so it flicks in during the last beat of the draw and erases with the tip. Center the svg (max-width ~360px) on a light background, animate pathLength only, container aria-label.`,
  },
  {
    id: 'emblem-draw',
    title: '徽章描绘',
    label: 'EMBLEM DRAW',
    description: '外圆环、山峰、太阳、底部波浪四段路径依次错峰描绘出一枚小徽章，完成后整体轻轻呼吸，点击任意处重播。',
    categories: ['svg'],
    interaction: 'click',
    component: EmblemDrawPreview,
    prompt: `Create a React component called EmblemDraw using React + Tailwind CSS + Framer Motion. It renders a 120x120 viewBox SVG (~144px square) inside a full-area button so clicking anywhere replays. Four stroke segments (fill none, stroke #09090B, round caps/joins) draw in with a progressive stagger — each a motion.path/motion.circle animating pathLength 0 → 1 over 500ms easeInOut with delays 0 / 0.42 / 0.84 / 1.26s: 1) outer ring — circle cx60 cy60 r40 rotated -90deg, 2.4px stroke; 2) mountain — 'M 34 80 L 50 54 L 60 68 L 68 58 L 86 80', 2.4px; 3) sun — small circle cx78 cy42 r5.5, 2px; 4) bottom wave — 'M 36 92 Q 44 86 52 92 T 68 92 T 84 92', 2px. After the last segment completes (~2s), the whole badge breathes: wrap the four segments in a motion.g (style transformBox 'fill-box', transformOrigin 'center') animating scale keyframes [1, 1.02, 1] over 2.6s easeInOut repeat Infinity with a 2.06s delay. Replay by incrementing a runId in state and keying the svg on it so all segments remount. Below the badge a tiny mono uppercase hint 'REPLAY ↻' (text-xs, tracking 0.14em, zinc-400). Light background, animate pathLength/scale only.`,
  },
];
