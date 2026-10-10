import type { Effect } from '@/types/effect';
import DotsBounce from '@/components/effects/loader/DotsBounce';
import RingSpin from '@/components/effects/loader/RingSpin';
import BarWave from '@/components/effects/loader/BarWave';
import ShapeShift from '@/components/effects/loader/ShapeShift';
import OrbitLoader from '@/components/effects/loader/OrbitLoader';
import TextPulse from '@/components/effects/loader/TextPulse';
import SkeletonCard from '@/components/effects/loader/SkeletonCard';
import MultiStepLoader from '@/components/effects/loader/MultiStepLoader';
import GaugeLoader from '@/components/effects/loader/GaugeLoader';
import Uplink from '@/components/effects/loader/Uplink';
import Hourglass from '@/components/effects/loader/Hourglass';
import ChaseRing from '@/components/effects/loader/ChaseRing';
import LoadingBar from '@/components/effects/loader/LoadingBar';

export const loaderEffects: Effect[] = [
  {
    id: 'dots-bounce',
    title: '三点跳跃',
    label: 'DOTS BOUNCE',
    description: '三颗小圆点依次跳起又落下——经典打字指示器，节奏调得刚刚好。',
    categories: ['loader'],
    interaction: 'auto',
    component: DotsBounce,
    prompt: `Create a React component called DotsBounce using React + Tailwind CSS + Framer Motion. Three 8px round dots (h-2 w-2 rounded-full bg-zinc-800) in a horizontal row with an 8px gap, centered in the container. Each dot bounces vertically — y keyframes [0, -10, 0] over 600ms with easeInOut, repeating infinitely — with a 150ms stagger delay between dots (delay = index * 0.15) so they jump in sequence like a typing indicator. Transform only. Respect prefers-reduced-motion by rendering the dots static.`,
  },
  {
    id: 'ring-spin',
    title: '渐变环',
    label: 'GRADIENT RING',
    description: '一圈由深到透明的渐变环匀速旋转——最顺滑的 spinner，没有接缝与顿挫。',
    categories: ['loader'],
    interaction: 'auto',
    component: RingSpin,
    prompt: `Create a React component called RingSpin using React + Tailwind CSS + Framer Motion. A 40px circle (h-10 w-10 rounded-full) whose background is a conic-gradient(from 0deg, rgba(9,9,11,0) 0%, #09090B 100%) — fading from transparent into near-black. Mask it into a ring shape with a radial-gradient CSS mask (radial-gradient(farthest-side, transparent calc(100% - 4.5px), #000 calc(100% - 4px)), set both mask and WebkitMask) so only a ~4px stroke is visible. Rotate it 0 → 360deg over 0.8s, linear, infinite — perfectly smooth with no steps or seam. Respect prefers-reduced-motion by rendering the ring static.`,
  },
  {
    id: 'bar-wave',
    title: '音浪条',
    label: 'BAR WAVE',
    description: '五根圆角竖条像均衡器一样起伏，中间最高——把等待变成一小段律动。',
    categories: ['loader'],
    interaction: 'auto',
    component: BarWave,
    prompt: `Create a React component called BarWave using React + Tailwind CSS + Framer Motion. Five vertical bars in a row (w-1 rounded-full bg-zinc-800, 6px gap, transformOrigin center) with heights peaking in the middle: 24, 32, 40, 32, 24px. Each bar animates scaleY keyframes [0.3, 1, 0.3] over 900ms with easeInOut, repeating infinitely, staggered by 100ms per bar (delay = index * 0.1) so the wave ripples left to right like an equalizer. Transform only. Respect prefers-reduced-motion by rendering the bars static.`,
  },
  {
    id: 'shape-shift',
    title: '方块变形',
    label: 'SHAPE SHIFT',
    description: '一个方块边旋转边在方形与圆形之间变形——高级仪表盘里那种 morphing loader。',
    categories: ['loader'],
    interaction: 'auto',
    component: ShapeShift,
    prompt: `Create a React component called ShapeShift using React + Tailwind CSS + Framer Motion. A 28px square (h-7 w-7 bg-zinc-950) that runs a continuous morph cycle: animate rotate keyframes [0, 90, 180, 270, 360] together with borderRadius keyframes ['4px', '50%', '4px', '50%', '4px'] — square → circle → diamond → circle → square. Each quarter-cycle takes 1.6s (total duration 6.4s, times [0, 0.25, 0.5, 0.75, 1], easeInOut), repeating infinitely with smooth keyframes — the 'morphing loader' seen in premium dashboards. Transform/border-radius only. Respect prefers-reduced-motion by rendering the square static.`,
  },
  {
    id: 'orbit-loader',
    title: '双星环绕',
    label: 'ORBIT',
    description: '两颗小点绕中心反向公转，身后拖着渐隐的彗尾——像一对互相追逐的星。',
    categories: ['loader'],
    interaction: 'auto',
    component: OrbitLoader,
    prompt: `Create a React component called OrbitLoader using React + Tailwind CSS + Framer Motion. Two 8px zinc-950 dots orbit a center point in opposite directions (radius 18px, one revolution per 1.2s, linear infinite). Implement each orbiter as a zero-size motion.div at the center that rotates 0 → 360deg (the second 0 → -360deg, phase-offset by 180deg so they start opposite each other). Inside each rotator, render the main dot plus 6 ghost dots as a comet trail: each ghost sits 14deg further behind along the path with decreasing size (6.5 → 2.5px) and opacity (0.45 → 0.06), so the trail fades as the whole group spins. Add a tiny 4px zinc-300 dot at the center as the anchor point. Transform only. Respect prefers-reduced-motion by rendering two static dots.`,
  },
  {
    id: 'text-pulse',
    title: '文字呼吸',
    label: 'TEXT PULSE',
    description: '「加载中…」六个字符依次明暗呼吸——安静克制，适合任何等待角落。',
    categories: ['loader'],
    interaction: 'auto',
    component: TextPulse,
    prompt: `Create a React component called TextPulse using React + Tailwind CSS + Framer Motion. Render the text '加载中' followed by three dots as six inline-block characters in JetBrains Mono style (font-mono, text-sm / 14px, tracking wide, text-zinc-600). Each character pulses its opacity through keyframes [0.25, 1, 0.25] over a 900ms cycle with easeInOut, repeating infinitely, staggered by 150ms per character (delay = index * 0.15) so the brightness sweeps calmly from left to right like breathing. Opacity only. Respect prefers-reduced-motion by rendering the text static.`,
  },
  {
    id: 'skeleton',
    title: '骨架屏',
    label: 'SKELETON',
    description: '头像、文字条与图片块组成的骨架卡片，微光扫过；每 4 秒闪现一次真实内容作为对照。',
    categories: ['loader'],
    interaction: 'auto',
    component: SkeletonCard,
    prompt: `Create a React component called SkeletonCard using React + Tailwind CSS + Framer Motion. A mock content card (~256px wide, white bg, 1px zinc-200 border, rounded-xl, p-4, overflow-hidden) rendered as skeleton shapes: a 40px avatar circle, two text bars beside it, one full-width text bar, and a 96px image block — all zinc-200 with rounded corners. A shimmer band (a half-width absolutely positioned motion.div with background linear-gradient(100deg, transparent, rgba(255,255,255,0.75), transparent)) sweeps left → right across the whole card (translateX -160% → 320%, 1.6s, linear, infinite). After 4s, crossfade to the real content (a black avatar with initials, a name line, a caption line and a black image block with a small white wave SVG) for 1.5s, then back to the skeleton — looping forever to show the before/after. Drive the 4s/1.5s timer with useEffect + setTimeout gated by an IntersectionObserver in-view flag so it only runs while visible, and reset to skeleton when scrolled out. Respect prefers-reduced-motion by disabling the shimmer band.`,
  },
  {
    id: 'multi-step',
    title: '多步加载',
    label: 'MULTI-STEP',
    description: '四个步骤每 900ms 推进一格：当前行点亮、前面行描绘对勾，走到底停留一秒后重置循环。',
    categories: ['loader'],
    interaction: 'auto',
    component: MultiStepLoader,
    prompt: `Create a React component called MultiStepLoader using React + Tailwind CSS + Framer Motion. Inside a 256px white card (rounded-xl, 1px zinc-200 border, p-4) render a vertical list of 4 steps — '校验数据' '建立连接' '同步资源' '完成'. A step counter state (0..4) advances every 900ms via setTimeout in useEffect, gated by an IntersectionObserver in-view flag (reset to 0 when scrolled out); after the last step hold 1000ms, then reset to 0 and loop forever. Each row shows a status indicator + label + right-aligned mono micro-label: pending = 8px zinc-300 dot, text zinc-400, 'wait'; active = 8px zinc-950 dot pulsing scale [1, 1.4, 1] / opacity [1, 0.55, 1] (0.9s infinite), text zinc-950 font-medium, 'running'; done = 20px zinc-950 filled circle popping in (scale 0.6→1) containing a white SVG check path ('M2 5.2l2 2L8 3') whose pathLength draws 0→1 over 300ms, text zinc-600, 'done'. Colors transition zinc-400 → zinc-950 over 300ms. Header row: mono uppercase 'LOADING SEQUENCE' + mono counter 'n/4'. Footer: a 2px zinc-100 track whose zinc-950 fill eases scaleX to step/4 (origin-left, 350ms easeOut). With prefers-reduced-motion render the all-done state statically.`,
  },
  {
    id: 'gauge',
    title: '仪表盘',
    label: 'GAUGE',
    description: '半圆仪表盘：指针弹簧摆动到 72% 并轻轻过冲回稳，弧轨与 12 根刻度随进度分段点亮，中心数字同步跳动。',
    categories: ['loader'],
    interaction: 'auto',
    component: GaugeLoader,
    prompt: `Create a React component called GaugeLoader using React + Tailwind CSS + Framer Motion. Render a semicircular instrument gauge in a 220px container with an SVG viewBox '0 0 200 116', center pivot at (100, 100). Draw a 180° arc track (path 'M 10 100 A 90 90 0 0 1 190 100', stroke zinc-200, width 3, round caps) plus an identical zinc-950 progress arc bound via style pathLength to a clamped MotionValue. Add 12 tick marks (lines from r=78 to r=90) sweeping left → right; render each tick twice — a static zinc-300 base and a zinc-950 overlay whose opacity maps the gauge value over [t-0.02, t] (t = i/11) so segments light up as the needle passes. The needle is a 3px zinc-950 line from the pivot to r=66 inside a motion.g whose rotate maps value [0,1] → [-90deg, 90deg] with transformOrigin '100px 100px'; add a zinc-950 hub circle with a white center dot. Drive a single useMotionValue(0) with animate(mv, 0.72, { type: 'spring', stiffness: 120, damping: 14 }) on mount (gated by an IntersectionObserver in-view flag, reset to 0 when scrolled out) so the needle visibly overshoots then settles at 72%. Center a mono readout (22px semibold number + small zinc-400 '%') bound via useTransform(v => round(v*100)) as a MotionValue child — zero re-renders. Mono 'gauge' caption below. With prefers-reduced-motion jump straight to 72%.`,
  },
  {
    id: 'uplink',
    title: '信号上行',
    label: 'UPLINK',
    description: '五根信号强度的竖条逐级点亮又整体熄灭，顶端小箭头不断上滑淡出——正在上行传输中。',
    categories: ['loader'],
    interaction: 'auto',
    component: Uplink,
    prompt: `Create a React component called Uplink using React + Tailwind CSS + Framer Motion. Center a column in the preview: on top a small lucide ArrowUp icon (h-3.5 w-3.5, strokeWidth 2.5, zinc-950) that each cycle slides y 4 → -7 while fading opacity 0 → 1 → 0 (1.4s, easeOut, times [0, 0.55, 1], infinite). Below it, a row of five signal-strength bars (w-1.5 rounded-full, items-end, 6px gap) with ascending heights 10/16/22/28/34px. Over a 1.4s infinite cycle each bar animates backgroundColor keyframes zinc-200 → zinc-950 → zinc-950 → zinc-200 (times [0, 0.18, 0.78, 1], easeInOut) with a 110ms stagger per bar (delay = i * 0.11) so they light up in sequence from weak to strong then all extinguish together. Gate all animations behind an IntersectionObserver in-view flag (render bars at zinc-200 and the arrow static when off-screen) and respect prefers-reduced-motion. Add a mono uppercase 'uplink' caption (11px, zinc-400) below.`,
  },
  {
    id: 'hourglass',
    title: '沙漏翻转',
    label: 'HOURGLASS',
    description: '两个三角对顶成的沙漏每 1.6 秒弹簧翻转 180°，内部沙面此消彼长——上面的流光，下面的堆满。',
    categories: ['loader'],
    interaction: 'auto',
    component: Hourglass,
    prompt: `Create a React component called Hourglass using React + Tailwind CSS + Framer Motion. Center a 40×45 SVG hourglass (viewBox '0 0 32 36'): an outline drawn with one zinc-950 1.6px path — top cap 'M 5 2 H 27', bottom cap 'M 5 34 H 27', and two apex-to-apex triangles 'M 6 2 L 26 2 L 16 18 Z' / 'M 6 34 L 26 34 L 16 18 Z' (fill none, round joins). Inside, two zinc-950 sand polygons: the upper sand 'M 8.5,4.5 23.5,4.5 16,16.5' with transformBox fill-box and transformOrigin '50% 100%' draining scaleY 1 → 0, and the lower sand '8.5,31.5 23.5,31.5 16,19.5' with the same origin filling scaleY 0 → 1 — both over 1.05s with 0.45s delay, easeIn. A cycle counter state advances every 1.6s via setInterval in useEffect gated by an IntersectionObserver in-view flag; the whole SVG sits in a motion.div animating rotate to cycle * 180deg with a spring (stiffness 160, damping 15 — visible settle wobble), and the sand polygons are keyed by the cycle so they reset while the flip hides the swap. Loop forever. Respect prefers-reduced-motion by rendering a half-full static hourglass. Mono uppercase 'hourglass' caption (11px, zinc-400) below.`,
  },
  {
    id: 'chase-ring',
    title: '双弧追逐',
    label: 'CHASE RING',
    description: '同一圆环上两段缺口圆弧反向匀速旋转，长弧的缺口还会呼吸伸缩——短弧永远在追，永远差一点。',
    categories: ['loader'],
    interaction: 'auto',
    component: ChaseRing,
    prompt: `Create a React component called ChaseRing using React + Tailwind CSS + Framer Motion. Center a 56px SVG (viewBox '0 0 64 64') with a faint full-circle track (r 26, stroke zinc-100, width 3). On the same ring render two gapped arcs (circumference ≈ 163.4): the LONG arc is a zinc-950 round-cap circle with an animated strokeDasharray breathing between '120 43.4' and '70 93.4' and back (2.4s easeInOut infinite), wrapped in a motion.g (transformBox fill-box, origin center) rotating 0 → 360deg over 1.2s linear infinite, clockwise. The SHORT arc is a zinc-400 round-cap circle with a fixed dasharray '34 129.4' and dashoffset -60, inside another motion.g rotating 0 → -360deg over 0.9s linear infinite — counter-clockwise, slightly faster, so it forever chases the long arc while the long arc's gap breathes. Gate all animations behind an IntersectionObserver in-view flag (render statically when off-screen) and respect prefers-reduced-motion. Mono uppercase 'chase ring' caption (11px, zinc-400) below.`,
  },
  {
    id: 'loading-bar',
    title: '流光进度',
    label: 'LOADING BAR',
    description: '240px 细轨道，填充条 2.4 秒匀速到顶，内部一道高光持续扫过；完成后"完成"淡入，稍候归零重来。',
    categories: ['loader'],
    interaction: 'auto',
    component: LoadingBar,
    prompt: `Create a React component called LoadingBar using React + Tailwind CSS + Framer Motion. Center a 240px column: a 4px rounded-full zinc-200 track containing a zinc-950 fill (rounded-full, overflow-hidden) that animates width '0%' → '100%' over 2.4s easeInOut. Inside the fill, a 48px-wide highlight band (background linear-gradient 100deg transparent → rgba(255,255,255,0.55) → transparent) sweeps x -48 → 240 over 1.1s linear infinite. A cycle counter state advances every 3.7s (2.4s fill + 0.8s hold + 0.5s fade gap) via setInterval in useEffect gated by an IntersectionObserver in-view flag; key the fill by the cycle so it restarts. Below the bar, an AnimatePresence mode='wait' span keyed by the cycle shows '完成' (11px font-medium zinc-950) fading in with y 3 → 0 after a 2.45s delay, then exiting y → -3 when the cycle resets. Loop forever. Respect prefers-reduced-motion by disabling the sweep. Mono uppercase 'loading bar' caption (11px, zinc-400) below.`,
  },
];
