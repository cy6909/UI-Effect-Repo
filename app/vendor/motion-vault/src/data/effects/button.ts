import type { Effect } from '@/types/effect';
import BorderBeam from '@/components/effects/button/BorderBeam';
import ShineSweep from '@/components/effects/button/ShineSweep';
import Ripple from '@/components/effects/button/Ripple';
import MagneticButton from '@/components/effects/button/MagneticButton';
import LiquidFill from '@/components/effects/button/LiquidFill';
import ShimmerButton from '@/components/effects/button/ShimmerButton';
import TextSwap from '@/components/effects/button/TextSwap';
import PulseCTA from '@/components/effects/button/PulseCTA';
import ConfettiButton from '@/components/effects/button/ConfettiButton';
import LikeButton from '@/components/effects/button/LikeButton';
import DownloadButton from '@/components/effects/button/DownloadButton';
import HoldConfirm from '@/components/effects/button/HoldConfirm';
import StarBorder from '@/components/effects/button/StarBorder';
import RainbowBorder from '@/components/effects/button/RainbowBorder';
import StatefulButton from '@/components/effects/button/StatefulButton';
import HoverShift from '@/components/effects/button/HoverShift';
import LiquidMetal from '@/components/effects/button/LiquidMetal';
import PulseButton from '@/components/effects/button/PulseButton';
import ShareExpand from '@/components/effects/button/ShareExpand';

export const buttonEffects: Effect[] = [
  {
    id: 'border-beam',
    title: '边框光束',
    label: 'BORDER BEAM',
    description: '一道黑色光束沿按钮边框循环扫过——为克制的界面加一点克制的炫技。',
    categories: ['button'],
    interaction: 'auto',
    component: BorderBeam,
    prompt: `Create a React component called BorderBeam using React + Tailwind CSS + Framer Motion. Wrap a black button (rounded-lg, bg-zinc-950, white text, px-6 py-2.5) in a relative overflow-hidden container with 1px padding — that padding is the visible border. Behind the button, place an absolutely positioned square motion.div (width 300% of the container, centered with translate -50%/-50%) whose background is conic-gradient(from 0deg, transparent 0deg, transparent 300deg, #09090B 340deg, #09090B 360deg) forming a short beam segment. Rotate it 0→360deg on a 3s linear infinite loop so the beam sweeps continuously around the button's border. The button sits above with a 7px radius and a hover state (bg-zinc-800). The beam color and duration should be easy to tweak via props.`,
  },
  {
    id: 'shine-sweep',
    title: '扫光按钮',
    label: 'SHINE SWEEP',
    description: '一道斜向高光周期性地扫过按钮表面，像被阳光掠过。',
    categories: ['button'],
    interaction: 'auto',
    component: ShineSweep,
    prompt: `Create a React shine-sweep button: inside an overflow-hidden black button,
a diagonal (45deg) white gradient band (40% width, 0.25 opacity) sweeps
from left to right (translateX -150% → 150%, 0.8s ease-in-out) every 3.5s,
and once immediately on hover. Pseudo-element implementation, transform
only, no layout thrash.`,
  },
  {
    id: 'ripple',
    title: '点击波纹',
    label: 'RIPPLE',
    description: 'Material 风格——点击处荡开一圈涟漪，最直接的触碰反馈。',
    categories: ['button'],
    interaction: 'click',
    component: Ripple,
    prompt: `Create a React ripple button (Material style): on pointerdown, spawn a
white circle (0.35 opacity) at the click coordinates inside the overflow-
hidden button, animate it to scale 3 and fade out over 0.6s ease-out, then
remove it from the DOM. Support multiple concurrent ripples and keyboard
activation (Enter/Space) rippling from center. Track click position with
getBoundingClientRect.`,
  },
  {
    id: 'magnetic-button',
    title: '磁吸按钮',
    label: 'MAGNETIC',
    description: '鼠标靠近时按钮被吸附过去，文字以更小幅度跟随，形成双层视差。',
    categories: ['button'],
    interaction: 'move',
    component: MagneticButton,
    prompt: `Create a React magnetic button with Framer Motion: when the cursor comes
within 80px, the whole pill button translates toward it (max 16px) via
useMotionValue + useSpring (stiffness 180, damping 14); the inner label
follows at 0.4x strength for layered parallax. On leave, both spring back
with a soft overshoot. Attach listeners on a wrapper, not window.`,
  },
  {
    id: 'liquid-fill',
    title: '液体填充',
    label: 'LIQUID FILL',
    description: '悬停时深色液体从底部涌起填满按钮，文字反白——饱满的转场感。',
    categories: ['button'],
    interaction: 'hover',
    component: LiquidFill,
    prompt: `Create a React liquid-fill button: an outlined button (1px zinc-950 border,
black text) that on hover fills from the bottom with black — the fill
layer's top edge is a gentle wave (SVG path or animated border-radius)
rising with translateY 100% → 0 over 0.5s ease-out, the wave subtly
undulating while hovered. The label flips to white after a 0.3s delay.
Reverse on mouse leave. Pure CSS + Tailwind.`,
  },
  {
    id: 'shimmer-button',
    title: '微光按钮',
    label: 'SHIMMER BUTTON',
    description: '一条柔和的光带周期性掠过深色按钮表面，辅以细腻的 1px 内高光环——克制而高级。',
    categories: ['button'],
    interaction: 'auto',
    component: ShimmerButton,
    prompt: `Create a React component called ShimmerButton using React + Tailwind CSS + Framer Motion (Magic UI shimmer style). A dark zinc-950 pill button (rounded-full, white text 'Get Started', px-7 py-2.5) with overflow-hidden. Inside, an absolutely positioned 120px-wide motion.span band whose background is a linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent), slightly skewed (-12deg), sweeping from left to right (translateX -160px → 360px, 1.2s ease-in-out) and repeating every 3s (1.8s repeat delay). Add a subtle 1px inner highlight ring via inset box-shadow (inset 0 0 0 1px rgba(255,255,255,0.08) plus inset 0 1px 0 rgba(255,255,255,0.12)). Transform/opacity only — restrained and premium, not gaudy. Respect prefers-reduced-motion by disabling the band.`,
  },
  {
    id: 'text-swap',
    title: '文字滑换',
    label: 'TEXT SWAP',
    description: '悬停时文字向上滑出、新文案从下方滑入——干脆利落的排版微交互。',
    categories: ['button'],
    interaction: 'hover',
    component: TextSwap,
    prompt: `Create a React text-swap button: an outlined button (1px zinc-950 border, rounded-lg, black text) whose label area is a fixed-height (h-5) overflow-hidden container holding a vertical stack of two labels — default 'Learn More' on top and 'Free Trial →' below. On hover, the stack translates up by 50% so the first label slides up and out while the second slides up in from below; 280ms with cubic-bezier(0.22,1,0.36,1) easing; reverses smoothly on mouse leave. Pure CSS transition with Tailwind group-hover, transform only.`,
  },
  {
    id: 'pulse-cta',
    title: '呼吸光环',
    label: 'PULSE CTA',
    description: '两圈柔和的光环从按钮边缘缓缓扩散又淡出，平静地把视线引向主行动按钮。',
    categories: ['button'],
    interaction: 'auto',
    component: PulseCTA,
    prompt: `Create a React component called PulseCTA using React + Tailwind CSS + Framer Motion. A primary black pill button (bg-zinc-950, white text 'Start Free Trial', rounded-full, px-7 py-2.5) wrapped in a relative container. Behind the button, two absolutely positioned motion.span rings (inset-0, rounded-full, 1.5px zinc-400 border) continuously emanate outward from the button's edge: each animates scale 1 → 1.5 while fading opacity 0.6 → 0 over 2.2s ease-out, repeating infinitely; the second ring is delayed 1.1s so the pulses alternate evenly. Transform/opacity only for GPU-friendly animation. Calm, attention-guiding pulse. Respect prefers-reduced-motion by disabling the rings.`,
  },
  {
    id: 'confetti-button',
    title: '彩带庆祝',
    label: 'CONFETTI BURST',
    description: '点击瞬间 30 片五彩纸屑从按钮中心炸开——向上喷射、翻滚、受重力下落再淡出，按钮同时俏皮地挤压回弹。',
    categories: ['button'],
    interaction: 'click',
    component: ConfettiButton,
    prompt: `Create a React component called ConfettiButton using React + Tailwind CSS + Framer Motion. A black pill button (rounded-full, bg-zinc-950, white text '完成部署', small PartyPopper icon from lucide-react, h-11 px-6). On click, spawn 30 tiny confetti pieces — a mix of small rects and circles in 5 muted colors (#F87171, #FBBF24, #34D399, #60A5FA, #A78BFA) — from the button's center. Each piece bursts upward inside a ±60° cone (random angle + 60–140px distance), tumbles (rotate up to ±360°) and arcs with gravity: keyframed motion rising with easeOut for the first 40%, then falling with easeIn, fading out in the last 25% of its 1.1–1.5s lifetime; remove each piece from the DOM on animation complete. Simultaneously the button squash-scales 1 → 0.92 → 1.05 → 1 over 350ms via useAnimationControls. Fully re-clickable — every click spawns a fresh batch. Transform/opacity only, centered on a light preview.`,
  },
  {
    id: 'like-button',
    title: '点赞爆裂',
    label: 'LIKE BURST',
    description: '推特式点赞——爱心弹性填充、光环向外扩散、7 颗粒子四溅，旁边的计数器随数字上下滑动切换；再点一次则平静收回。',
    categories: ['button'],
    interaction: 'click',
    component: LikeButton,
    prompt: `Create a React LikeButton component (Twitter-style) using React + Tailwind CSS + Framer Motion + the Heart icon from lucide-react. A ghost circular button (h-12 w-12, rounded-full, hover bg-rose-50) with a heart icon and a like count sitting next to it. On like: the heart fills rose #F43F5E and pops in with an elastic spring (remount with scale 0, spring stiffness ~420 / damping ~11 so it overshoots to ~1.3 before settling), a 2px rose ring expands outward from the button's edge (scale 1 → 1.9 while fading, 550ms ease-out), and 7 tiny particles — a mix of 4px dots and mini filled hearts in rose shades (#F43F5E, #FB7185, #FDA4AF) — spew radially (even 360°/7 spread with slight angle jitter, 26–44px travel, shrinking and fading over 650ms ease-out). On unlike: the heart unfills with a calm 150ms shrink, no ring or particles. The count increments/decrements with a tiny y-slide: wrap it in AnimatePresence (popLayout) so the new number slides in from below on +1 and from above on -1 (180ms). Center on a light preview.`,
  },
  {
    id: 'download-button',
    title: '下载变形',
    label: 'DOWNLOAD MORPH',
    description: '点击后按钮原地变形成进度条——填充条先快后慢地爬满，百分比同步跳动；完成后翻转为绿色对勾，随后悄悄复位。',
    categories: ['button'],
    interaction: 'click',
    component: DownloadButton,
    prompt: `Create a React DownloadButton component using React + Tailwind CSS + Framer Motion. A fixed-width black pill (w-44 h-11, rounded-full, bg-zinc-950, white text '下载文件' with a Download icon from lucide-react). It is a click-driven state machine (not re-clickable while running): (1) on click the label cross-fades out and the pill morphs into a progress track — its width stays fixed, the background transitions to zinc-200 over 300ms — while a dark fill bar grows 0 → 100% over 2s with a fast-start/slow-end ease (cubic-bezier(0.16,1,0.3,1)); drive progress with framer-motion's animate() on a MotionValue, render the fill with transform scaleX (origin-left) and show a live mono percentage counter (motion value as child, white text with mix-blend-difference so it reads on both track and fill). (2) At 100% the fill fades away as the pill flips to green #16A34A with a Check icon + '已完成' popping in (spring scale 0.6 → 1). (3) After 1.6s it quietly fades back to idle. Swap content with AnimatePresence mode="wait"; transform/opacity only. Center on a light preview.`,
  },
  {
    id: 'hold-confirm',
    title: '长按确认',
    label: 'HOLD TO CONFIRM',
    description: '危险操作的防误触模式——按住 1.2 秒让填充从左扫到右才生效；中途松手，填充在 200ms 内无情回吐，绝不姑息。',
    categories: ['button'],
    interaction: 'click',
    component: HoldConfirm,
    prompt: `Create a React HoldConfirm button (danger-action pattern) using React + Tailwind CSS + Framer Motion. An outlined button (1px rose-600 border, rose-600 text, Trash2 icon + label '长按删除', w-40 h-11, rounded-lg, select-none). On pointerdown, a translucent rose fill (bg-rose-600/15, origin-left, transform scaleX bound to a MotionValue) sweeps left → right across the button over 1.2s, linear — progress MUST be driven by requestAnimationFrame, not a CSS animation, so early release works. Completing the hold flips the button to filled rose-600 with white text, a Check icon and '已删除' (spring scale pop), then it resets to idle after 1.5s. Releasing early (pointerup or pointerleave) cancels the hold and drains the fill back to 0 over 200ms — no partial credit. Cancel the rAF loop and timers on unmount, prevent the context menu, and use touch-action none so mobile holds aren't interrupted. Center on a light preview.`,
  },
  {
    id: 'star-border',
    title: '星光绕边',
    label: 'STAR BORDER',
    description: '一颗带着短拖尾的小星光沿深色按钮的圆角轮廓循环巡游，悬停时按钮轻轻抬升。',
    categories: ['button'],
    interaction: 'hover',
    component: StarBorder,
    prompt: `Create a React component called StarBorder using React + Tailwind CSS + CSS Motion Path (offset-path, no canvas). A dark pill button (h-11, rounded-full, bg-zinc-950, white text, inset 1px white/14 ring). Overlay a small traveling star: a 36x8px span holding a short comet trail (linear-gradient 90deg from transparent through white/45 to white/95) with a 5px glowing white head (box-shadow 0 0 8px 2px rgba(255,255,255,0.75)) at its leading edge. Measure the button with a ResizeObserver and build a rounded-rect perimeter path string — M r 0 H w-r A r r 0 0 1 w-r h H r A r r 0 0 1 r 0 Z with r = height/2 — then set it as the span's offset-path via inline style, offset-rotate: auto so the head always points forward, and animate offset-distance 0% to 100% on a 4.5s linear infinite keyframes loop. On hover the button lifts (-translate-y-0.5) with a soft dark drop shadow over 300ms. Wrap the star in a memoized micro-component; honor prefers-reduced-motion.`,
  },
  {
    id: 'rainbow-border',
    title: '彩虹边框',
    label: 'RAINBOW BORDER',
    description: '白底按钮外圈是一环缓缓旋转的低饱和彩虹，模糊的副本晕开成柔光——克制而不艳俗。',
    categories: ['button'],
    interaction: 'auto',
    component: RainbowBorder,
    prompt: `Create a React component called RainbowBorder using React + Tailwind CSS + scoped CSS keyframes. A white pill button (bg-white, zinc-900 text) sits inside a relative wrapper padded by 2px so the border ring shows through. The ring is a slowly rotating pastel conic-gradient — conic-gradient(from 0deg, #F9A8D4, #FCD34D, #6EE7B7, #7DD3FC, #C4B5FD, #F9A8D4) — rendered inside an absolutely positioned overflow-hidden rounded-full layer: a centered square (240% width, aspect-square) spins on an 8s linear infinite keyframe; nest the spinner one level deeper than the centering -translate-x/y-1/2 so the rotate animation never overrides the centering. Add a second identical spinning layer at -inset 4px with blur 7px and 60% opacity to bloom a soft pastel halo around the ring. Keep saturation pastel-low; the button face stays pure white with a gentle scale on hover (1.02) and press (0.97). Honor prefers-reduced-motion.`,
  },
  {
    id: 'stateful-button',
    title: '状态变迁按钮',
    label: 'STATEFUL BUTTON',
    description: "点击后 '部署' 变为旋转 loading 环，再变为打勾 '完成'，按钮宽度随内容弹性伸缩，随后自动复位。",
    categories: ['button', 'svg'],
    interaction: 'click',
    component: StatefulButton,
    prompt: `Create a React component called StatefulButton using React + Tailwind CSS + Framer Motion (Aceternity Stateful Button). A dark zinc-950 pill (h-11, min-w 104px, rounded-lg, white text). On click run a phase machine idle → loading → done → idle: idle shows the label '部署'; loading (1.2s) swaps to an inline spinning ring (h-4 w-4, border-2 border-white/25 border-t-white, rotate 360 on a 0.8s linear infinite loop); done shows a drawn check (SVG path M 3 8.5 L 6.5 12 L 13 4.5 animated with pathLength 0→1 over 0.5s) plus '完成' for 1.5s, then resets. Swap phases with AnimatePresence mode popLayout (initial/exit opacity + y ±8 / scale 0.6, 0.18s) and put layout on the button with a spring (stiffness 500, damping 32) so its width stretches elastically to fit each content state. Disable the button while busy; store timeouts in a ref array and clear them all on unmount.`,
  },
  {
    id: 'hover-shift',
    title: '悬停错位按钮',
    label: 'HOVER SHIFT',
    description: '悬停时原文案上滑离场，带箭头的新文案从下方滑入，底色同步变浅一档。',
    categories: ['button'],
    interaction: 'hover',
    component: HoverShift,
    prompt: `Create a React component called HoverShift using React + Tailwind CSS (pure CSS group-hover, no JS animation — Magic UI Interactive Hover Button, restrained). A dark button (h-11, rounded-lg, px-8, text-sm white, overflow-hidden) whose background transitions zinc-950 → zinc-800 on hover. Inside, the resting label '开始使用' sits in normal flow; a duplicate overlay label '进入文档' with a lucide ArrowRight icon is absolutely positioned over the button, pre-translated translate-y-[180%]. On group-hover both spans share one 0.3s cubic-bezier(0.22,1,0.36,1) transform transition: the original slides up and out (-translate-y-[180%]) while the overlay slides in to translate-y-0 — a clean vertical text swap through the overflow window. Add active:scale-[0.97] for press feedback. Transform + background-color only.`,
  },
  {
    id: 'liquid-metal',
    title: '液态金属按钮',
    label: 'LIQUID METAL',
    description: '一团模糊高光随鼠标在深色表面快速流动，像水银反光；边缘一圈细亮边。',
    categories: ['button'],
    interaction: 'move',
    component: LiquidMetal,
    prompt: `Create a React component called LiquidMetal using React + Tailwind CSS + Framer Motion MotionValues (zero React re-renders on pointer move — ThreeUI Liquid Metal, restrained monochrome). A dark zinc-950 button (h-11, rounded-lg, white text) edged by a hairline bright inner ring (shadow inset 0 0 0 1px rgba(255,255,255,0.16) plus a subtle inset top highlight). Track both cursor axes inside the button with two useMotionValues updated in onPointerMove via getBoundingClientRect, each smoothed by a fast useSpring (stiffness 400, damping 30). Bind two overlay layers: (1) a large molten blob — a 128px rounded-full span with blur-2xl and background radial-gradient(circle, rgba(255,255,255,0.42), rgba(255,255,255,0.12) 45%, transparent 72%) — whose x/y are useTransform(spring, v => v - 64) so it sloshes after the cursor like mercury; (2) a sharper 90px radial glint built with useMotionTemplate from the same springs, on a full-cover span. Reset both MotionValues off-canvas (-200px) on pointer leave. Press feedback: whileTap scale 0.96 with a springy transition.`,
  },
  {
    id: 'pulse-button',
    title: '脉冲按钮',
    label: 'PULSE RINGS',
    description: '按钮外圈两环脉冲波周期扩散，按钮本体纹丝不动——动静反差即是强调。',
    categories: ['button'],
    interaction: 'auto',
    component: PulseButton,
    prompt: `Create a React component called PulseButton using React + Tailwind CSS with scoped CSS keyframes (inline <style> tag — Magic UI Pulsating Button, inverted: the button stays still). Wrap a dark zinc-950 button (h-11, rounded-lg, px-8, white text) in a relative div. Add two absolutely positioned ring spans matching the button shape (inset-0, rounded-lg, 1.5px border rgba(113,113,122,0.55), pointer-events-none). Each ring runs a 2s cubic-bezier(0.16,1,0.3,1) infinite pulse keyframe — scale 1 → 1.8 with opacity 0.5 → 0 — the second ring delayed 1s so the sonar waves never overlap in phase. The button itself is motionless except a hover bg shift (zinc-800) and active:scale-[0.97]; the stillness against the pulsing rings is the effect. Transform + opacity only, will-change set, honor prefers-reduced-motion.`,
  },
  {
    id: 'share-expand',
    title: '分享展开按钮',
    label: 'SHARE EXPAND',
    description: '点击后按钮弹性展开为一排分享图标，逐个弹出；再点即可收回。',
    categories: ['button'],
    interaction: 'click',
    component: ShareExpand,
    prompt: `Create a React component called ShareExpand using React + Tailwind CSS + Framer Motion + lucide-react. A single spring (type spring, stiffness 500, damping 25) drives everything. Collapsed: a dark zinc-950 pill (h-11, rounded-full) with a Share2 icon and the label '分享'. On click the wrapper (motion.div with layout, overflow-hidden, h-11 rounded-full) morphs elastically into an open tray — bg-zinc-100 with a 1px zinc-200 border and p-1 — containing four channel icon buttons (Link2, Send, MessageCircle, Mail; h-9 w-9 rounded-full, zinc-600 icons, hover bg-white) that pop in with scale 0→1 + opacity on a 60ms stagger, followed by a trailing X close button at 4×60ms. Swap the two states with AnimatePresence mode popLayout; clicking any icon or the X springs the pill back closed. Keep the whole interaction keyboard-focusable with aria-labels on icon buttons.`,
  },
];
