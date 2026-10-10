import type { Effect } from '@/types/effect';
import GradientMesh from '@/components/effects/background/GradientMesh';
import BreathingDotGrid from '@/components/effects/background/BreathingDotGrid';
import Aurora from '@/components/effects/background/Aurora';
import NoiseWaves from '@/components/effects/background/NoiseWaves';
import FlickerGrid from '@/components/effects/background/FlickerGrid';
import SpotlightGrid from '@/components/effects/background/SpotlightGrid';
import LiquidRipple from '@/components/effects/background/LiquidRipple';
import MatrixRain from '@/components/effects/background/MatrixRain';
import ParallaxOrbs from '@/components/effects/background/ParallaxOrbs';
import DayNight from '@/components/effects/background/DayNight';
import FlickeringGrid from '@/components/effects/background/FlickeringGrid';
import Lamp from '@/components/effects/background/Lamp';
import BackgroundBeams from '@/components/effects/background/BackgroundBeams';
import RippleCircles from '@/components/effects/background/RippleCircles';
import TopoFlow from '@/components/effects/background/TopoFlow';
import Caustics from '@/components/effects/background/Caustics';
import CircuitPulse from '@/components/effects/background/CircuitPulse';
import FilmGrain from '@/components/effects/background/FilmGrain';
import RainGlass from '@/components/effects/background/RainGlass';

export const backgroundEffects: Effect[] = [
  {
    id: 'gradient-mesh',
    title: '流动渐变网格',
    label: 'GRADIENT MESH',
    description: '几团柔和的彩色光晕缓慢漂移融合，最流行的高级感渐变背景。',
    categories: ['background'],
    interaction: 'auto',
    component: GradientMesh,
    prompt: `Create a React gradient-mesh background: four large radial-gradient color
blobs (#C7D2FE, #FBCFE8, #A7F3D0, #FDE68A, ~45% radius) drifting along
slow elliptical paths (periods 18/23/29/31s), blurred 60px, blended with
mix-blend-mode multiply over a white base. Pure CSS keyframes, GPU-friendly
(transform only). Use as an absolute inset-0 -z-10 page background.`,
  },
  {
    id: 'dot-grid',
    title: '呼吸点阵',
    label: 'DOT GRID',
    description: '规整的点阵以波浪节奏明暗呼吸，鼠标经过时附近的点会亮起。',
    categories: ['background'],
    interaction: 'move',
    component: BreathingDotGrid,
    prompt: `Create a React breathing dot-grid background with CSS: a repeating radial-
gradient dot pattern (24px spacing, 2px dots, zinc-300) whose opacity
breathes in a radial wave from the center (6s period). Add a second, darker
dot layer revealed only near the cursor via a radial-gradient mask following
CSS variables --x/--y (radius 120px, dots turn zinc-900). Absolute inset-0
background layer.`,
  },
  {
    id: 'aurora',
    title: '极光',
    label: 'AURORA',
    description: '紫、蓝、绿三团柔和的径向渐变在深色底上缓慢流动，像安静的北极光。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: Aurora,
    prompt: `Create a React component called Aurora using React + Tailwind CSS + Framer Motion. A full-bleed absolutely positioned container with a deep navy background (#0B1020) and overflow-hidden. Inside, render 3 large blurred blobs as motion.divs: each is a rounded-full div sized ~50–60% of the container, background radial-gradient(circle, color 0%, transparent 70%) with filter blur(40px), colors rgba(168,85,247,0.35) purple, rgba(56,189,248,0.32) sky blue, rgba(52,211,153,0.30) green. Animate each blob's x and y between gentle offsets (roughly -12% to 22% of the container) on infinite easeInOut loops with different durations (14s, 18s, 16s) so the light fields drift and overlap like a slow aurora. Animate only transform properties for GPU-friendly motion.`,
  },
  {
    id: 'noise-waves',
    title: '噪声波纹',
    label: 'NOISE WAVES',
    description: '多层正弦波纹缓慢交叠流动，像平静的水面反光（浅色版，适配白底页面）。',
    categories: ['background'],
    interaction: 'move',
    component: NoiseWaves,
    prompt: `Create a React noise-waves background on Canvas 2D over white: five
horizontal wave paths, each the sum of two sine layers (amplitude 12-28px,
wavelength 200-400px, speeds 0.2-0.5/s, distinct phases), stroked at 1.5px
in black at 6-14% opacity, spread vertically across the middle band. Waves
flow slowly sideways; the cursor's y-position subtly scales the middle
waves' amplitude (±30%). rAF loop, pause offscreen, resize-aware.`,
  },
  {
    id: 'flicker-grid',
    title: '闪烁方格',
    label: 'FLICKER GRID',
    description: '安静的方格矩阵中，随机的小方块缓缓亮起又暗下，像一场克制的数字雨。',
    categories: ['background'],
    interaction: 'auto',
    component: FlickerGrid,
    prompt: `Create a React component called FlickerGrid using React + plain Canvas 2D (no extra libraries) over a white base. Draw a grid of small squares (16px cells, 2px gap) in zinc-900 (#18181B) whose resting opacity is 0.04. Continuously pick random cells and fade each one up to a peak opacity of 0.25-0.5 and back with a smooth sine in/out over a random 1-3s duration, keeping roughly 6% of all cells animating at any time — a calm digital rain of tiles, not flashy. Apply a subtle radial falloff so cells near the center are livelier (full intensity) than the edges (~35%). The canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Pure rAF loop at 60fps; clean up the loop and observer on unmount.`,
  },
  {
    id: 'spotlight-grid',
    title: '鼠标点亮网格',
    label: 'SPOTLIGHT GRID',
    description: '鼠标经过之处，浅色点阵下浮出一层深色网格——Linear 式的精确与克制。',
    categories: ['background'],
    interaction: 'move',
    component: SpotlightGrid,
    prompt: `Create a React component called SpotlightGrid using React + Tailwind CSS (pure CSS, no canvas, no state re-renders on pointer move). A full-bleed absolute inset-0 container over white renders two stacked layers of the same dot grid (small dots at intersections, 28px spacing, built with a repeating radial-gradient background). The base layer uses zinc-200 dots; the top layer uses slightly larger zinc-800 dots and is revealed only through a radial-gradient mask (circle 180px) centered on the pointer. The mask position follows CSS variables --x/--y updated directly via el.style.setProperty in a pointermove handler (initialize offscreen at -9999px, reset on pointerleave) so moving the mouse never triggers a React re-render — Linear.app-style precision feel. Set both maskImage and WebkitMaskImage.`,
  },
  {
    id: 'liquid-ripple',
    title: '液态波纹',
    label: 'LIQUID RIPPLE',
    description: '细密的点阵下藏着一片水面：划过泛起涟漪，点击激起大浪，随后慢慢归于平静。',
    categories: ['background'],
    interaction: 'move',
    component: LiquidRipple,
    prompt: `Create a React component called LiquidRipple using React + plain Canvas 2D (no extra libraries) over a zinc-50 base. Render a fine dot grid (24px spacing, 1.5px dots, zinc-400 at 40% resting opacity). Behind it run a simple water-ripple simulation: a 2-buffer heightfield on a coarse grid (6px cells) using the classic algorithm next = (average of 4 neighbors) - previous, damped by 0.985 per frame so waves decay to rest. Moving the pointer injects a gentle drop (radius 2 cells, strength ~2, throttled to one per 10px of travel); clicking injects a big splash (radius 4 cells, strength ~9). Each frame, sample the wave height at every dot and translate the dot vertically by height × 3.5 (clamped ±12px), raise its opacity by |height| × 0.22 (max +0.6) and its radius by up to +1.2px — calm, tactile, addictive. Canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Pure rAF loop at 60fps; clean up the loop and observer on unmount.`,
  },
  {
    id: 'matrix-rain',
    title: '字符雨',
    label: 'MATRIX RAIN',
    description: '极细的片假名与数字缓缓落下，白色字头拖着渐渐隐去的灰色残影——只是矩阵的一声耳语。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: MatrixRain,
    prompt: `Create a React component called MatrixRain using React + plain Canvas 2D (no extra libraries) over a zinc-950 base. An elegant, RESTRAINED matrix rain: columns of tiny 10px monospace glyphs (half-width katakana + digits, 14px column width, 12px row height). Each frame, fill the canvas with translucent black rgba(9,9,11,0.08) so old glyphs fade into trails. Active columns advance their head at only 1.5-3 rows per second (delta-time based), drawing the head glyph in soft white at 80% opacity and the glyph one row behind in zinc-500; only ~60% of columns are ever active, and finished columns respawn at a random negative offset with a fresh random speed. Draw a glyph only when the head crosses into a new row so the fall stays slow and crisp — a whisper of the matrix, not a seizure. Canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2); clean up the rAF loop and observer on unmount.`,
  },
  {
    id: 'parallax-orbs',
    title: '视差光斑',
    label: 'PARALLAX ORBS',
    description: '五团低饱和的柔光色斑以不同深度随鼠标漂移，前后错落出细腻的多层空间感。',
    categories: ['background'],
    interaction: 'move',
    component: ParallaxOrbs,
    prompt: `Create a React component called ParallaxOrbs using React + Tailwind CSS (pure CSS/transforms, no canvas, no state re-renders on pointer move). Over a zinc-50 base, render 5 large absolutely positioned orbs (40-56% of the container, rounded-full) with soft radial-gradient fills in muted ~30%-saturation tones — sand hsl(38,32%,74%), sage hsl(140,22%,72%), sky hsl(205,38%,74%), rose hsl(350,38%,78%), lilac hsl(268,32%,78%) — each with filter blur(40px), sitting behind a small mock heading + button overlay. Each orb has a different depth factor (0.02, 0.04, 0.06, 0.08, 0.10): on pointermove compute the pointer offset from the container center, and in a rAF loop lerp each orb's current translation toward factor × offset with a 0.05 smoothing step, writing translate3d directly to el.style.transform (refs, never setState) so near orbs trail further than far ones — a subtle multi-plane depth effect. Reset targets to 0 on pointerleave; cancel the loop and listeners on unmount.`,
  },
  {
    id: 'day-night',
    title: '昼夜流转',
    label: 'DAY NIGHT CYCLE',
    description: '16 秒一轮的天光：晨曦、正午、暮色、星夜依次流转，日月交替掠过天际。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: DayNight,
    prompt: `Create a React component called DayNight using React + Tailwind CSS with scoped CSS keyframes (inline <style> tag, 16s linear infinite cycle). Stack four absolutely positioned sky layers and crossfade them with opacity keyframes: dawn (soft peach linear-gradient #FCE9D8 → #F5AE8B, visible 0-25%), noon (pale sky #D9ECF9 → #F1F8FD, 25-50%), dusk (warm violet #B99BD6 → #F0A184, 50-75%), night (deep zinc-950 #09090B → #17171B, 75-100%) with ~8% crossfade overlaps so colors interpolate smoothly. Add a stars layer (tiny 1-1.5px white radial-gradient dots scattered over the upper half) that fades in only during night. A small sun disc (24px, radial #FDE9C8 → #F9B45C with a warm box-shadow glow) sits at the top of a full-size arm whose transform-origin is 50% 150% — rotating the arm from -78deg to 78deg sweeps the sun across the sky in an arc, fading in/out near the horizons during the dawn→dusk half; a smaller moon (20px, #FAFAFA → #D4D4D8) does the same during the night quarter. Transform-only animation. Place mock content (small heading + outline button) on top with mix-blend-difference and white text so the foreground automatically reads dark on light skies and light on the night sky.`,
  },
  {
    id: 'flickering-grid',
    title: '网格明灭',
    label: 'FLICKERING GRID',
    description: '规整的浅色网格之上，随机方格如城市灯火般轻轻点亮又熄灭；中央标题验证可读性。',
    categories: ['background'],
    interaction: 'auto',
    component: FlickeringGrid,
    prompt: `Create a React component called FlickeringGrid using React + Tailwind CSS + scoped CSS keyframes (no canvas). Draw a regular square grid (36px cells, 1px lines at rgba(24,24,27,0.05) via two repeating linear-gradient backgrounds) over white. Every ~420ms spawn 1-2 random cells — small rounded squares inset 3px inside a grid cell, fill rgba(113,113,122,alpha) with a random peak alpha 0.18-0.48 — that each play a one-shot CSS pulse keyframe (opacity 0 to 1 at 42% back to 0, with a subtle scale 0.7 to 1 to 0.85) over a random 0.9-2.5s duration, then get pruned from state; cap ~16 cells alive, like distant city lights flickering. Measure the container with a ResizeObserver to compute grid columns/rows. Overlay a centered mock heading (zinc-900 title plus a small mono caption, pointer-events-none) to prove foreground text stays readable over the effect. Honor prefers-reduced-motion.`,
  },
  {
    id: 'lamp',
    title: '灯光展开',
    label: 'LAMP',
    description: "顶部一条细线亮起，锥形光束向下展开，'LAMPLIGHT' 字样随后浮出——点击可开关。",
    categories: ['background'],
    dark: true,
    interaction: 'click',
    component: Lamp,
    prompt: `Create a React component called Lamp using React + Tailwind CSS + Framer Motion (Aceternity Lamp effect, inverted to a restrained monochrome). On a zinc-950 stage, place a thin horizontal light line at ~24% from the top: a 1px-tall div (62% width, max 340px) with background linear-gradient(90deg, transparent, rgba(255,255,255,0.9), transparent), expanding with scaleX 0.2 to 1, plus a small bright blurred core (3px, 64px wide, white, blur 2px, box-shadow 0 0 12px 2px rgba(255,255,255,0.6)) at its center. From the line, a conic light cone unfolds downward: a div (width 80%, height 60% of the stage, transform-origin top) with background conic-gradient(from 165deg at 50% 0%, transparent 0deg, rgba(244,244,245,0.16) 13deg, rgba(244,244,245,0.30) 15deg, rgba(244,244,245,0.16) 17deg, transparent 30deg), blurred 10px, animating scaleY 0.15 to 1 with opacity over 0.7s, ease [0.16,1,0.3,1]; add a wide soft radial halo (blur 24px, white at 26% alpha) behind the line. Below, the word 'LAMPLIGHT' in light-weight zinc-100 with 0.45em letter-spacing and a soft white text-shadow floats up (y 16 to 0, opacity 0 to 1, 0.35s delay) after the cone opens. Clicking the stage toggles the lamp off and on, reversing every animation; keyboard accessible (Enter/Space). Compose per-element centering through Framer Motion style x: '-50%' instead of Tailwind translate classes so transforms never conflict.`,
  },
  {
    id: 'bg-beams',
    title: '光束流动',
    label: 'BACKGROUND BEAMS',
    description: '五条细曲线路径自顶部垂落，光点沿路径周期流动，顶端淡入、底端淡出。',
    categories: ['background'],
    interaction: 'auto',
    component: BackgroundBeams,
    prompt: `Create a React component called BackgroundBeams using React + Tailwind CSS + inline SVG with declarative SMIL (Aceternity Background Beams, restrained monochrome). A full-bleed SVG (viewBox 0 0 800 500, preserveAspectRatio "none", absolute inset-0) over a white base holds 5 gently S-curved paths dropping from the top edge to the bottom (e.g. M 90 -10 C 150 130, 40 300, 110 510), stroked 1px in zinc-200 (#E4E4E7) with vector-effect non-scaling-stroke. Along each path travels a short bright pulse — a 2.6px zinc-400 dot wrapped in a 9px rgba(161,161,170,0.12) halo — driven by animateMotion with an mpath reference, looping on staggered durations 4.2-6.9s with negative begin offsets so the phases never align. Pair each animateMotion with an opacity animate (values 0;1;1;0, keyTimes 0;0.12;0.85;1, same dur/begin) so pulses fade in at the top and out at the bottom. No JS, no rAF, no timers. Overlay a centered mock heading (zinc-900 title + mono caption, pointer-events-none) for readability.`,
  },
  {
    id: 'topo-flow',
    title: '等高线流动',
    label: 'TOPO FLOW',
    description: '一片缓慢呼吸的噪声地形，marching squares 实时描出等高线，像地质图上的山脉在生长；鼠标划过会抬起一片高地。',
    categories: ['background'],
    interaction: 'move',
    component: TopoFlow,
    prompt: `Create a React component called TopoFlow using React + plain Canvas 2D (no extra libraries) over a white base. A canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Define an analytic pseudo-noise height field h(x,y,t) = sin(x*0.011 + t*0.16) * cos(y*0.013 - t*0.11) + 0.6*sin((x+y)*0.007 + t*0.23) + 0.4*cos((x-y)*0.009 - t*0.19) plus a pointer hill: a gaussian bump (sigma 110px, amplitude 0.9) at the smoothed cursor (lerp 0.1) that eases in while the pointer is inside. Each frame draw 9 contour levels (thresholds evenly spaced over the field range) via marching squares on a 10px sampling grid: for each cell evaluate h at the 4 corners, look up the 16-case table, and stroke the interpolated line segment(s) in zinc-700 rgba(63,63,70, alpha) with alpha rising per level (0.05 -> 0.22) so ridges read darker than valleys; highlight every 3rd level slightly (0.28 alpha, 1.2px) like index contours on a map. Recompute each frame for a living topographic map. Pure rAF loop; clean up the loop, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'caustics',
    title: '水下焦散',
    label: 'CAUSTICS',
    description: '阳光穿过水面在池底投下流动的光网——Voronoi 焦散缓缓聚散明灭，一池安静的波光。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: Caustics,
    prompt: `Create a React component called Caustics using React + plain Canvas 2D (no extra libraries). A deep water-blue canvas (#0B1B2A) fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Simulate swimming-pool light caustics with a jittered Voronoi approach: scatter a grid of seed points (spacing 64px, each jittered ±22px, drifting slowly on individual sine orbits of 8-14px amplitude, periods 5-11s). Each frame, on a coarse render buffer (scale 0.25, ImageData), compute for each pixel the distances to the two nearest seeds (F1, F2) by checking only the 3x3 neighboring cells; intensity = clamp01(1 - (F2 - F1) / 26) ^ 2.6 — bright thin webs where seeds are equidistant. Map intensity to a pale aqua (140, 220, 210) tint added over the base, plus a faint vertical light gradient (deeper = darker). Upscale the buffer with drawImage (smoothing on) so edges stay soft. Slow, hypnotic, never flashy: cap intensity at 0.5 alpha. Pure rAF loop; clean up the loop and ResizeObserver on unmount.`,
  },
  {
    id: 'circuit-pulse',
    title: '电路脉冲',
    label: 'CIRCUIT PULSE',
    description: 'PCB 走线横平竖直地铺展，一簇簇光脉冲沿铜线奔流、在过孔处转弯，像一块沉睡中被点亮的主板。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: CircuitPulse,
    prompt: `Create a React component called CircuitPulse using React + plain Canvas 2D (no extra libraries). A dark (zinc-950 #09090B) canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Generate a PCB-style trace network once per resize: from ~14 random edge points grow Manhattan walks (steps of 24-72px, 90-degree turns only, on a 12px grid, 6-14 segments each, reject moves that leave the canvas), storing each walk as a polyline with its total arc length. Render static traces as 1px strokes in zinc-800 rgba(39,39,42,0.9) with a small 3px via-pad ring (zinc-700) at each endpoint and each corner. Then run pulses: every 200-600ms spawn a pulse on a random trace — a 2.2px glowing dot (emerald-300 #6EE7B7 at 0.9 alpha, shadowBlur 10, shadowColor rgba(110,231,183,0.55)) with a 36px fading tail — travelling the polyline at 2.6-4.4 px/frame by arc length (walk segments with cumulative lengths), fading out over the last 12% of the trace; cap 8 concurrent pulses. Occasional pulse splits at a corner onto an intersecting trace (10% chance) for delight. Pure rAF loop; clean up the loop, ResizeObserver and timers on unmount.`,
  },
  {
    id: 'film-grain',
    title: '胶片颗粒',
    label: 'FILM GRAIN',
    description: '老电影质感：细密的颗粒噪点以 12fps 跳动闪烁，偶有竖直划痕与暗角呼吸——任何页面一秒变胶片。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: FilmGrain,
    prompt: `Create a React component called FilmGrain using React + plain Canvas 2D (no extra libraries). A near-black canvas (#0C0C0E) fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Pre-render 6 grain frames offscreen (144x144 tiles of random luminance noise, alpha 0.05-0.16 per speckle) and cycle them at 12fps via pattern fill over the whole canvas — the low frame rate is the charm, like projector judder. Add a slow-breathing vignette (radial gradient, edge alpha oscillating 0.32->0.44 over 7s), and sparse vertical scratches: 0-2 hairlines (rgba(255,255,255,0.05), 1px) that appear at a random x every 1.5-4s, jitter sideways ±2px per grain-frame, and vanish after 0.4-1.2s; every ~9s a 60ms dust flicker (small light blotches). Keep everything monochrome and subtle so foreground content stays readable. Pure rAF loop with time-based frame stepping; clean up the loop and ResizeObserver on unmount.`,
  },
  {
    id: 'rain-glass',
    title: '玻璃雨滴',
    label: 'RAIN GLASS',
    description: '雨点落在起雾的玻璃上：水珠随机凝结、长大、彼此吞并，攒够了就蜿蜒滑落，拖出一条短暂的清亮水道。',
    categories: ['background'],
    dark: true,
    interaction: 'auto',
    component: RainGlass,
    prompt: `Create a React component called RainGlass using React + plain Canvas 2D (no extra libraries). A misty slate gradient base (linear from #1B2430 to #0F141C) fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2); paint it ONCE on an offscreen fog layer blurred by overlaid soft white haze (alpha 0.05). Droplets condense continuously: every 60-140ms spawn a droplet (radius 0.8-2.6px) at a random position; each droplet grows slowly (+0.006 px/frame) and is drawn as a tiny refracting lens — a radial-gradient circle (light rim at top-left rgba(255,255,255,0.5), dark rim bottom-right, body nearly clear showing the fog) so drops read as beads on glass. When two droplets overlap, merge them (area adds, keep the larger's position). When a droplet exceeds 4.2px radius it starts to slide: it wicks downward at speed proportional to r^2 with a drunken horizontal wander (perlin-ish sine wobble), leaving a cleared trail — stamp the droplet's path onto the fog layer with destination-out (radius r*0.9, alpha 0.5) so the fog behind the trail is wiped clear and slowly re-mists (repaint fog haze at alpha 0.008 per frame). Sliding drops shrink as they lose water (trail sheds 12% of volume per 40px) and die at r < 1.6px or the bottom edge. Cap 220 droplets. Pure rAF loop; clean up the loop and ResizeObserver on unmount.`,
  },
  {
    id: 'ripple-circles',
    title: '同心涟漪',
    label: 'RIPPLE CIRCLES',
    description: '点击处荡开三环同心细圈，错峰扩散后淡出；支持快速连击。',
    categories: ['background'],
    interaction: 'click',
    component: RippleCircles,
    prompt: `Create a React component called RippleCircles using React + Tailwind CSS + Framer Motion (Magic UI Ripple, click-triggered). The stage is an absolute inset-0 white container with cursor-pointer and role button. On pointerdown compute click coordinates via getBoundingClientRect and push a ripple {id, x, y} into state (cap at ~8 concurrent, slice off the oldest). Each ripple renders 3 thin concentric rings — motion.span h-24 w-24 rounded-full border border-zinc-400 positioned at left/top x/y — animating scale 0 → 3 with opacity 0.4 → 0 over 1.15s easeOut, staggered 150ms per ring (delay i*0.15). Center each ring with Framer Motion style x/y '-50%' (kept constant in both initial and animate) so centering never fights the scale. Prune the ripple from state in onAnimationComplete of the last ring. Rapid clicks stack freely. Add a centered pointer-events-none hint (zinc-900 title + mono 'CLICK TO RIPPLE' caption).`,
  },
];
