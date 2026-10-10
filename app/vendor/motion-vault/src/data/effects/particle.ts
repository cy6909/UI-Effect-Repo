import type { Effect } from '@/types/effect';
import ParticleNetwork from '@/components/effects/particle/ParticleNetwork';
import ParticleDrift from '@/components/effects/particle/ParticleDrift';
import ParticleText from '@/components/effects/particle/ParticleText';
import ConfettiBurst from '@/components/effects/particle/ConfettiBurst';
import Meteors from '@/components/effects/particle/Meteors';
import Fireworks from '@/components/effects/particle/Fireworks';
import PendulumWave from '@/components/effects/particle/PendulumWave';
import GravityWell from '@/components/effects/particle/GravityWell';
import BubblePop from '@/components/effects/particle/BubblePop';
import RainRipples from '@/components/effects/particle/RainRipples';
import ClickSpark from '@/components/effects/particle/ClickSpark';
import PixelSnow from '@/components/effects/particle/PixelSnow';
import ImageTrail from '@/components/effects/particle/ImageTrail';
import Antigravity from '@/components/effects/particle/Antigravity';
import PixelTrail from '@/components/effects/particle/PixelTrail';
import SmokeFlow from '@/components/effects/particle/SmokeFlow';
import Murmuration from '@/components/effects/particle/Murmuration';
import ElectricArc from '@/components/effects/particle/ElectricArc';
import SandPile from '@/components/effects/particle/SandPile';

export const particleEffects: Effect[] = [
  {
    id: 'particle-network',
    title: '星座网络',
    label: 'PARTICLE NETWORK',
    description: 'Canvas 粒子如星座般漂移，距离相近的节点自动连线；移动鼠标会轻轻吸引附近粒子。',
    categories: ['particle'],
    interaction: 'move',
    component: ParticleNetwork,
    prompt: `Create a React component called ParticleNetwork using React + plain Canvas 2D (no extra libraries). A canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Spawn nodes proportional to area (count = clamp(width*height/9000, 28, 70)) with small random velocities. Each frame: clear, update positions with velocity damping (0.995) and edge bounce, then draw hairline connections (rgba(9,9,11,0.12), 1px) between nodes closer than 110px with alpha fading by distance, and fill 1.6px dots (rgba(9,9,11,0.55)) at each node. Pointer interaction: nodes within 140px of the cursor receive a small attraction force toward it (acceleration 0.02 along the normalized direction); when the pointer leaves, reset it offscreen. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'particle-drift',
    title: '漂浮粒子场',
    label: 'PARTICLE DRIFT',
    description: '大小不一的尘埃粒子缓缓上浮、明暗呼吸，安静的氛围背景。',
    categories: ['particle'],
    dark: true,
    interaction: 'auto',
    component: ParticleDrift,
    prompt: `Create a React ambient particle-drift background on Canvas 2D: 60 soft white
particles (radius 0.8-3px) float slowly upward (0.1-0.35 px/frame) with
horizontal sine sway (amplitude 10-25px, period 3-7s). Each particle
breathes in opacity (0.1-0.6) on its own phase (2-5s period). Wrap from top
edge back to bottom. Pure rAF loop, pause offscreen. Works as a page
background layer (absolute, inset-0, -z-10). Dark background.`,
  },
  {
    id: 'particle-text',
    title: '粒子文字',
    label: 'PARTICLE TEXT',
    description: '文字由上千个粒子拼成，鼠标划过时粒子四散逃开再归位——交互感最强的一个。',
    categories: ['particle'],
    dark: true,
    interaction: 'move',
    component: ParticleText,
    prompt: `Create a React particle-text component on Canvas 2D. Render a word
(e.g. "MOTION", 120px bold) to an offscreen canvas, sample pixels to get
~1500 target points. Particles start at random positions and spring toward
their targets (attraction 0.06, damping 0.86). Within 60px of the cursor,
apply a repulsion force (up to 8, distance-falloff) so particles scatter,
then spring back. White 1.2px dots on a dark background. rAF loop, pause
offscreen, rebuild on resize.`,
  },
  {
    id: 'confetti-burst',
    title: '彩带爆发',
    label: 'CONFETTI BURST',
    description: '点击瞬间从指尖炸开一把彩带与纸屑，庆祝专用。',
    categories: ['particle'],
    dark: true,
    interaction: 'click',
    component: ConfettiBurst,
    prompt: `Create a React confetti-burst component on Canvas 2D: on click, explode
80-120 confetti pieces from the click point — colored rectangles (palette
#F43F5E #F59E0B #10B981 #3B82F6 #8B5CF6) plus round dots — with an upward
fan of initial velocities (3-9 px/frame, ±50deg), gravity 0.15, air drag
0.98. Rectangles tumble by oscillating scaleX (fake 3D flip). Fade out
before landing and clear the canvas after ~1.2s. Expose an onCelebrate
callback. No external libraries.`,
  },
  {
    id: 'meteors',
    title: '流星雨',
    label: 'METEORS',
    description: '深邃夜空里流星斜向划过，拖着渐隐的光尾；偶尔有一颗更大更亮的火流星。',
    categories: ['particle'],
    dark: true,
    interaction: 'auto',
    component: Meteors,
    prompt: `Create a React component called Meteors using React + plain Canvas 2D (no extra libraries). A canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2) over a zinc-950 dark sky. Paint 40 tiny static stars (0.5-1.4px white dots, opacity 0.15-0.6) as a backdrop. Meteors spawn at staggered random intervals (every 300-900ms, max 8 alive) at a random x along the top (y slightly above the canvas) and travel diagonally about 35deg from vertical at 4-8 px/frame. Each meteor is a glowing 2px white head dot (shadowBlur 8) plus a ~120px tail drawn as a linear gradient stroke fading from rgba(255,255,255,0.6) to transparent opposite the travel direction. Roughly 1 in 5 meteors is larger and brighter (2.6px head, ~170px tail, higher speed). Remove meteors once fully offscreen. Clean up requestAnimationFrame and the ResizeObserver on unmount.`,
  },
  {
    id: 'fireworks',
    title: '烟花绽放',
    label: 'FIREWORKS',
    description: '点击任意处，一枚烟花呼啸升空后炸开成放射状星火；静置几秒会自动补一发。',
    categories: ['particle'],
    dark: true,
    interaction: 'click',
    component: Fireworks,
    prompt: `Create a React component called Fireworks using React + plain Canvas 2D (no extra libraries). A dark canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 2). On click, launch a rocket from the bottom edge that rises to the click point (speed ~8-10 px/frame upward, slight horizontal sine wobble of 3px amplitude, short 8-dot fading trail, glowing white head). On arrival it explodes into 60-90 radial sparks using 2-3 harmonious hues per burst picked from a muted palette (amber #F59E0B/#FBBF24/#FDE68A, rose #F43F5E/#FB7185/#FDA4AF, sky #0EA5E9/#38BDF8/#7DD3FC). Sparks have random radial velocities (1-5 px/frame), gravity 0.04, drag 0.96, and fade over ~1.5s while their radius shrinks to 30%. If no launch happens for 2.5s, auto-launch one rocket at a random position. Multiple simultaneous bursts must be supported. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'pendulum-wave',
    title: '单摆波',
    label: 'PENDULUM WAVE',
    description: '15 个白点以微妙不同的周期上下振荡，蛇形 → 双螺旋 → 混沌 → 完美同频，60 秒一轮回。数学的催眠之美。',
    categories: ['particle'],
    dark: true,
    interaction: 'auto',
    component: PendulumWave,
    prompt: `Create a React component called PendulumWave using React + plain Canvas 2D (no extra libraries). A dark (zinc-950) canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Draw 15 white glowing dots (3.2px radius, shadowBlur 8) in a horizontal row with 30px side padding, each oscillating vertically around the canvas midline with amplitude height/2 - 40. Dot i has period T_i = 60 / (51 + i) seconds, so over each 60-second cycle the row weaves through snake, double-helix and chaos patterns before returning to perfect unison. Connect the dots with a hairline polyline (rgba(255,255,255,0.22)) to reveal the emerging wave. Instead of clearing, fade the previous frame each tick with a translucent rect (rgba(9,9,11,0.08)) so the dots leave smooth motion trails; repaint a solid #09090B base on resize. Drive phases from performance.now() elapsed time. Clean up requestAnimationFrame and the ResizeObserver on unmount.`,
  },
  {
    id: 'gravity-well',
    title: '引力井',
    label: 'GRAVITY WELL',
    description: '150 粒星尘缓缓漂移，鼠标化作引力井——靠近的粒子被捕获成环绕轨道；点击瞬间井变斥力场，粒子四散炸开。',
    categories: ['particle'],
    dark: true,
    interaction: 'click',
    component: GravityWell,
    prompt: `Create a React component called GravityWell using React + plain Canvas 2D (no extra libraries). A dark canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Spawn 150 small white particles (1-2.4px, alpha 0.35-0.85) drifting slowly (0.15-0.45 px/frame) and wrapping around edges. While the pointer is inside, it acts as a gravity well: particles within 200px receive a mild attraction toward the cursor (acceleration ~0.045 with distance falloff) plus a stronger tangential push (~0.14 perpendicular to the radial direction) so they are captured into ORBITS instead of collapsing; add an outward push inside 34px, global velocity damping 0.985 and a 4 px/frame speed cap for stability. Draw a faint 200px reach circle and a 6px core ring at the cursor. On click, the well becomes a repulsor for 400ms: particles within 260px are blasted outward (force 3.2 with falloff), an expanding flash ring (10 -> 120px, fading over 400ms) marks the pulse, then calm orbiting resumes. Reset the pointer offscreen on pointerleave. Clean up requestAnimationFrame, ResizeObserver and all listeners on unmount.`,
  },
  {
    id: 'bubble-pop',
    title: '戳泡泡',
    label: 'BUBBLE POP',
    description: '彩虹光泽的泡泡从底部晃晃悠悠上升，点击戳破——水滴四溅加一圈扩散涟漪，解压神器。',
    categories: ['particle'],
    interaction: 'click',
    component: BubblePop,
    prompt: `Create a React component called BubblePop using React + plain Canvas 2D (no extra libraries). A light (zinc-50) canvas fills its container (absolute inset-0, cursor pointer, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Iridescent bubbles (thin-stroke circles, radius 12-40px) float upward from below the bottom edge at 0.35-1.0 px/frame with a horizontal sine sway (10px amplitude). Each bubble wobbles subtly (drawn as an ellipse whose rx/ry oscillate ±5% in antiphase), has a translucent white body (rgba(255,255,255,0.22)), a 1.2px rim in zinc-400 with occasional sky-400 or rose-400 pastel tints, and a small white highlight arc at the upper-left. Keep 8-14 bubbles alive, respawning from the bottom; bubbles that drift off the top are removed. On click, any bubble under the cursor pops: it is removed, 8-10 tiny droplet particles (1.4-2.6px, matching tint) burst outward with gravity, and a quick ring expands from 0.5x to 1.6x the bubble radius while fading over 300ms. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'rain-ripples',
    title: '雨落涟漪',
    label: 'RAIN RIPPLES',
    description: '深夜雨幕：细雨斜落水面，砸出一圈圈扩散又淡去的椭圆涟漪；点击落下一滴大雨，溅起三层同心涟漪与水花。',
    categories: ['particle'],
    dark: true,
    interaction: 'click',
    component: RainRipples,
    prompt: `Create a React component called RainRipples using React + plain Canvas 2D (no extra libraries). A dark (zinc-950) canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 2) with a faint horizon line (rgba(255,255,255,0.06)) at 70% height marking the water surface. Rain drops spawn at random x positions every 80-200ms and fall as short 6px white streaks (alpha 0.5, 11-15 px/frame); where each lands on the horizon, spawn an expanding ellipse ripple (radius 0 -> 46px, ry = 0.32 * radius for perspective, fading over 1.2s) plus a tiny 2-droplet splash. On click, a BIG drop (12px streak, brighter, accelerating to 14 px/frame) falls at the click x and lands at max(clickY, horizon + 6), producing 3 staggered concentric ripples (120ms apart, radius up to 64px) and a spray of 12 splash droplets in an upward fan with gravity 0.22. Quiet rainy-night mood, all strokes thin and white. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'click-spark',
    title: '点击火花',
    label: 'CLICK SPARK',
    description: '点击任意处迸发放射状火花：短线条四散飞出、受重力下坠、迅速淡出，zinc 单色点缀少量琥珀。',
    categories: ['particle'],
    interaction: 'click',
    component: ClickSpark,
    prompt: `Create a React component called ClickSpark using React + plain Canvas 2D (no extra libraries). A light (zinc-50) canvas fills its container (absolute inset-0, cursor pointer, DPR-aware sizing via ResizeObserver, clamp DPR to 2). On click, burst 8-12 spark streaks from the click point: directions evenly spread over 360deg with random jitter, initial speed 2.2-5.6 px/frame with a slight upward bias. Each spark is drawn as a short round-capped line segment (7-14px long, 1.2-2.1px wide) trailing behind its velocity vector. Colors are mostly zinc-950 #09090B with some zinc-500 #71717A, and roughly 1 in 4 sparks is amber #F59E0B. Sparks feel gravity 0.16 px/frame^2, air drag 0.985, live 480-800ms, fade linearly while their streak length shrinks to zero. Multiple rapid clicks must stack bursts. Show a centered hint text "点击任意位置" (12px zinc-400, pointer-events none). Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'pixel-snow',
    title: '像素雪',
    label: 'PIXEL SNOW',
    description: '深蓝黑夜里方形像素雪花以不同速度飘落、水平轻摆，近地处淡出仿佛悄悄积起一层雪。',
    categories: ['particle'],
    dark: true,
    interaction: 'auto',
    component: PixelSnow,
    prompt: `Create a React component called PixelSnow using React + plain Canvas 2D (no extra libraries). A dark (zinc-950) canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Spawn square pixel flakes (2, 3 or 4 px, fillRect, no arcs) with count scaling to container width (clamp(width/6, 40, 140)). Each flake falls at 0.35-1.2 px/frame, sways horizontally on a sine (amplitude 4-18px, period 2.4-6s, random phase), and has its own whiteness (lerp channel value 212-255) and alpha (0.35-0.95). Paint a soft bottom gradient (rgba(228,228,231,0) to 0.14 over the bottom ~14px) suggesting an accumulated snow layer; flakes fade out over the last 40px above that ground line, then respawn just above the top edge with fresh random parameters. Clean up requestAnimationFrame and the ResizeObserver on unmount.`,
  },
  {
    id: 'image-trail',
    title: '移动残影',
    label: 'IMAGE TRAIL',
    description: '快速移动鼠标时轨迹上留下小圆点与小方块残影，各自弹出后缩放淡出 0.8 秒；速度低于阈值则一片安静。',
    categories: ['particle'],
    interaction: 'move',
    component: ImageTrail,
    prompt: `Create a React component called ImageTrail using React + plain Canvas 2D (no extra libraries). A light canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 1.75). On pointermove compute cursor speed (dist/dt in px/ms); only when speed exceeds ~0.9 px/ms AND distance from the last spawn exceeds 14px, stamp one ghost at the cursor: alternate circles and squares, size 9-23px, random rotation, mostly zinc greys (#A1A1AA/#71717A/#52525B/#D4D4D8) with a ~10% chance of amber #F59E0B. Each ghost lives 800ms: scale pops in over the first 110ms, then shrinks to 65% while alpha fades 0.9 to 0; draw squares via save/translate/rotate/fillRect. Cap the live list at 60 ghosts (drop oldest). Slow movement spawns nothing. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'antigravity',
    title: '失重粒子',
    label: 'ANTIGRAVITY',
    description: '40 个小圆点失重般静止漂浮，鼠标靠近时被平方衰减的斥力推开，远离后弹簧缓缓归位。',
    categories: ['particle'],
    interaction: 'move',
    component: Antigravity,
    prompt: `Create a React component called Antigravity using React + plain Canvas 2D (no extra libraries). A light canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 1.75). Place 40 dots (radius 2.2-4px, zinc-500 #71717A at 0.85 alpha) at random home positions with a 30px margin; each dot keeps home, current position and velocity. Per frame: if the cursor is within 150px, apply inverse-square repulsion f = min(0.9, 1400/dist^2) along the direction away from the cursor; always apply a soft spring toward home (v += (home-pos)*0.012) and damping (v *= 0.92). Dots displaced more than 14px render darker (zinc-600 #52525B), and each home position shows a faint 1.2px anchor dot at 0.12 alpha so the field reads even before interaction. Reset the pointer offscreen on leave. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'pixel-trail',
    title: '像素轨迹',
    label: 'PIXEL TRAIL',
    description: '鼠标经过的 8px 网格落下一枚枚像素方块，落格即定格、1.2 秒渐隐，连续移动画出一条虚线像素蛇。',
    categories: ['particle'],
    interaction: 'move',
    component: PixelTrail,
    prompt: `Create a React component called PixelTrail using React + plain Canvas 2D (no extra libraries). A light canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 1.75). The pointer stamps an 8px grid: on pointermove snap the cursor to cell (floor(x/8), floor(y/8)) and record it in a Map keyed "cx,cy" with a birth time; skip re-stamping a cell that is less than half-way through its life. Each cell draws as a 7x7px square (0.5px inset hairline gap) fading from 0.9 alpha to 0 over 1200ms, then is deleted — continuous movement leaves a dashed snake of pixels. Colors: mostly zinc-800 #27272A with some zinc-700/zinc-600, ~8% amber #F59E0B. Cap the map at 240 cells (evict oldest). Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'smoke-flow',
    title: '烟雾流动',
    label: 'SMOKE FLOW',
    description: '数百条短痕顺着缓慢演化的流场漂移，帧与帧之间用半透明暗纱覆盖——轨迹像烟一样化开；鼠标划过会搅起一小团涡旋。',
    categories: ['particle'],
    dark: true,
    interaction: 'move',
    component: SmokeFlow,
    prompt: `Create a React component called SmokeFlow using React + plain Canvas 2D (no extra libraries). A dark (zinc-950 #09090B) canvas fills its container (absolute inset-0, cursor crosshair, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Spawn 380 motes advected by a smooth analytic flow field approximating curl noise: angle(x,y,t) = (sin(x*s*1.7 + t*0.31) + cos(y*s*2.3 - t*0.23) + sin((x+y)*s*0.9 + t*0.12) + cos((x-y)*s*1.3 - t*0.17)) * PI/2.2 with s = 0.0021 and t in seconds; each mote moves along the field at 0.35-1.1 px/frame. NEVER clearRect: each frame paint a translucent veil rgba(9,9,11,0.055) so motion leaves dissolving smoke trails. Draw each mote as a short round-capped line segment (1.1px) from its previous to current position in muted slate tones (148,163,184 / 113,125,150 / 100,116,139 / 203,213,225) at ~0.34 alpha scaled by a lifetime envelope (fade in over 40 frames, out over the last 60 of a 260-580 frame life), then respawn at a random position. While the pointer is inside, stir a local vortex: motes within 130px get a tangential push (2.4 px/frame with linear falloff). Repaint a solid #09090B base on resize. Clean up requestAnimationFrame, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'murmuration',
    title: '椋鸟群飞',
    label: 'MURMURATION',
    description: '数百只椋鸟按 boids 三原则（分离、对齐、聚合）汇成流动的鸟群，时而舒展时而收拢；鼠标掠过时鸟群惊散又回旋重聚。',
    categories: ['particle'],
    dark: true,
    interaction: 'move',
    component: Murmuration,
    prompt: `Create a React component called Murmuration using React + plain Canvas 2D (no extra libraries). A dark (zinc-950 #09090B) canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Simulate a boids flock of 130 starlings: per frame each bird steers by the three classic rules with neighbor radius 60px — separation (push away from neighbors closer than 24px, weight 0.075), alignment (steer toward the average neighbor heading, weight 0.055), cohesion (barely-there steer toward the neighbor centroid, weight 0.0002 per px) — plus a very loose pull toward a wandering attractor (Lissajous orbit around the canvas center, ax=0.31*width, ay=0.22*height, wx=0.11, wy=0.073 rad/s, weight only 0.0005) and a per-bird random jitter (±0.03 per axis per frame) so the swarm morphs between ribbons and clouds instead of settling into a stable orbit ball. Clamp speed to 1.6-3.3 px/frame with smooth heading turn (limit delta-heading to ±0.14 rad/frame). Draw each bird as a tiny chevron (two 3.4px strokes meeting at a 70deg angle, slate-300 rgba(203,213,225,0.75), 1.1px) oriented along its velocity; wrap positions around edges with a 24px margin. Pointer as predator: birds within 120px of the cursor get a strong flee force (0.9 with linear falloff) so the flock splits around the pointer and swirls back together; reset the pointer offscreen on pointerleave. Pure rAF loop; clean up the loop, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'electric-arc',
    title: '电弧跳跃',
    label: 'ELECTRIC ARC',
    description: '两支电极之间，分形闪电沿中点位移算法生长、闪烁、湮灭又重生；把鼠标移上去，电弧会追随指尖跳跃。',
    categories: ['particle'],
    dark: true,
    interaction: 'move',
    component: ElectricArc,
    prompt: `Create a React component called ElectricArc using React + plain Canvas 2D (no extra libraries). A dark (zinc-950 #09090B) canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Two fixed electrodes (small 5px ring terminals, zinc-400) sit at 22% and 78% of the width, vertically centered. Between them grow lightning bolts via recursive midpoint displacement: start with the segment A->B, subdivide 6 times, offsetting each midpoint perpendicular to the segment by gaussian random * 0.28 * remaining segment length; keep the polyline (~65 points). Every 90-160ms retire the current bolt (fade it out over 140ms while a fresh one generates); while a bolt is alive, redraw it each frame with a per-frame jitter (regenerate with the same seed offset scaled down 30% at 12Hz) so it crackles. Render: outer stroke 3.5px rgba(125,211,252,0.18), core stroke 1.4px rgba(224,242,254,0.9), plus a soft glow dot at each electrode (radial gradient, sky-300, 0.35 alpha). With ~22% probability a bolt also spawns 1-2 branches from a random midpoint (same algorithm toward a random direction at 40% length, thinner, lower alpha). Pointer interaction: while the pointer is inside, electrode B tracks the smoothed cursor position (lerp 0.18) so the arc chases the fingertip; on pointerleave it eases back home. Pure rAF loop; clean up the loop, ResizeObserver and listeners on unmount.`,
  },
  {
    id: 'sand-pile',
    title: '流沙堆积',
    label: 'SAND PILE',
    description: '顶部流沙倾泻而下，沙粒按元胞自动机规则下落、侧滑、堆成沙丘；按住鼠标从指间漏沙，点击沙丘会把它搅塌。',
    categories: ['particle'],
    interaction: 'move',
    component: SandPile,
    prompt: `Create a React component called SandPile using React + plain Canvas 2D (no extra libraries). A light (zinc-50 #FAFAFA) canvas fills its container (absolute inset-0, DPR-aware sizing via ResizeObserver, clamp DPR to 2). Run a falling-sand cellular automaton on a coarse grid (cell 5px, stored in a Uint8Array, updated bottom-up each tick): a grain falls straight down if the cell below is empty, else slides down-left or down-right (random order) if empty, else rests — piles grow natural ~34-degree angle-of-repose slopes. Three fixed spouts near the top (at 25% / 50% / 75% width) each emit a thin stream (spawn a grain with 60% probability per tick in a 2-cell-wide nozzle). Render grains as filled rects in warm sand tones (amber-200 #FDE68A / amber-300 #FCD34D / amber-400 #FBBF24 picked per grain) over a faint zinc-100 ground shadow. Pointer: while the pointer is down (or moving with buttons pressed), pour a stream from the cursor (3-cell-wide nozzle, 90% per tick); on a single click without drag, excavate — clear grains in a 5-cell radius so slopes collapse and re-settle. Cap live grains at ~5200 (stop spouts when full); every 14s quietly dissolve the bottom row to make room. Pure rAF loop (tick the automaton every other frame for a calm pace); clean up the loop, ResizeObserver and listeners on unmount.`,
  },
];
