import type { Effect } from '@/types/effect';
import TiltCard from '@/components/effects/card/TiltCard';
import SpotlightCard from '@/components/effects/card/SpotlightCard';
import GlowBorderCard from '@/components/effects/card/GlowBorderCard';
import MagneticCard from '@/components/effects/card/MagneticCard';
import FlipCard from '@/components/effects/card/FlipCard';
import StackingCards from '@/components/effects/card/StackingCards';
import MarqueeCards from '@/components/effects/card/MarqueeCards';
import HoloCard from '@/components/effects/card/HoloCard';
import MovingBorderCard from '@/components/effects/card/MovingBorderCard';
import TestimonialCycle from '@/components/effects/card/TestimonialCycle';
import TiltParallaxCard from '@/components/effects/card/TiltParallaxCard';
import SwipeCards from '@/components/effects/card/SwipeCards';
import CardSwap from '@/components/effects/card/CardSwap';
import KeycapCard from '@/components/effects/card/KeycapCard';
import WalletPull from '@/components/effects/card/WalletPull';
import ScratchCard from '@/components/effects/card/ScratchCard';
import PixelCard from '@/components/effects/card/PixelCard';
import DecayCard from '@/components/effects/card/DecayCard';
import ElectricBorder from '@/components/effects/card/ElectricBorder';
import EvervaultCard from '@/components/effects/card/EvervaultCard';
import MagicCard from '@/components/effects/card/MagicCard';
import CometCard from '@/components/effects/card/CometCard';
import WobbleCard from '@/components/effects/card/WobbleCard';
import GlareCard from '@/components/effects/card/GlareCard';
import FocusCards from '@/components/effects/card/FocusCards';
import StickerPeel from '@/components/effects/card/StickerPeel';
import PolaroidDevelop from '@/components/effects/card/PolaroidDevelop';

export const cardEffects: Effect[] = [
  {
    id: 'tilt-card',
    title: '3D 倾斜卡片',
    label: '3D TILT CARD',
    description: '卡片随鼠标在三维空间中倾斜，带一层跟随指针的高光，松手后弹性回正。',
    categories: ['card'],
    interaction: 'move',
    component: TiltCard,
    prompt: `Create a React component called TiltCard using React + Tailwind CSS + Framer Motion. Render a white card (rounded-xl, 1px zinc-200 border, subtle shadow) centered inside a wrapper with CSS perspective 800px. Track the pointer position over the card with onPointerMove, normalizing it to [0,1] on both axes, stored in useMotionValue and smoothed with useSpring (stiffness 180, damping 22). Derive rotateX in [10deg, -10deg] from the Y axis and rotateY in [-12deg, 12deg] from the X axis via useTransform, applied to the card with transformStyle preserve-3d. Add a glare layer: an absolutely positioned motion.div whose background is a radial-gradient(circle at x% y%, rgba(255,255,255,0.9), transparent 55%) with the gradient center following the pointer (also via useTransform, no useState in the pointer path). On pointer leave, animate both axes back to 0.5 so the card springs back to flat. Inner content uses translateZ(28px) for depth.`,
  },
  {
    id: 'spotlight-card',
    title: '聚光灯卡片',
    label: 'SPOTLIGHT',
    description: '鼠标所到之处亮起一圈柔和的径向光晕，黑暗中摸索的质感（预览窗用深色底）。',
    categories: ['card'],
    interaction: 'move',
    dark: true,
    component: SpotlightCard,
    prompt: `Create a React spotlight card: a dark card (zinc-900 on zinc-950) with a
radial-gradient spotlight (radius 220px, white at 8% opacity fading to
transparent) that follows the cursor via CSS custom properties --x/--y
updated on mousemove. Also brighten the 1px border near the cursor using a
masked gradient border. Smooth, GPU-friendly (transform/opacity only).`,
  },
  {
    id: 'glow-border-card',
    title: '发光边框卡',
    label: 'GLOW BORDER',
    description: '一圈渐变光沿卡片边框缓缓流动，像被点亮的轮廓。',
    categories: ['card'],
    interaction: 'auto',
    component: GlowBorderCard,
    prompt: `Create a React glow-border card: wrap the card in a pseudo-element border
(1.5px) painted with a conic-gradient (transparent → #6366F1 → transparent,
25% arc) whose angle rotates 360deg every 4s (use CSS @property --angle or a
rotating background layer masked to the border ring). Add a matching blurred
glow behind it at 0.4 opacity. On hover, speed up to 2s per revolution.`,
  },
  {
    id: 'magnetic-card',
    title: '磁吸卡',
    label: 'MAGNETIC',
    description: '鼠标靠近时卡片被轻轻吸向光标，离开后被弹回原位。',
    categories: ['card'],
    interaction: 'move',
    component: MagneticCard,
    prompt: `Create a React magnetic card with Framer Motion: while the cursor is inside
the container, translate the card toward the cursor with distance-based
falloff (max 24px) using useMotionValue + useSpring (stiffness 200,
damping 18). On mouse leave, spring back to origin with a satisfying
overshoot. Apply the same magnetic effect at 0.5x strength to the card's
inner content for parallax depth.`,
  },
  {
    id: 'flip-card',
    title: '3D 翻转卡',
    label: 'FLIP',
    description: '悬停时卡片绕 Y 轴 180° 翻转，正面是标题，背面是详情。',
    categories: ['card'],
    interaction: 'hover',
    component: FlipCard,
    prompt: `Create a React flip card: on hover, rotate the card 180deg around the Y axis
(0.7s ease-in-out) with preserve-3d and backface-visibility hidden. Front:
white face with title; back: dark face (zinc-950, white text) with details.
Fall back to click-to-flip on touch devices. Pure CSS 3D transforms +
Tailwind.`,
  },
  {
    id: 'stacking-cards',
    title: '滚动堆叠卡',
    label: 'SCROLL STACK',
    description: '向下滚动时卡片一张张堆叠压上，前一张微微缩小压暗——经典的滚动叙事。',
    categories: ['card'],
    interaction: 'scroll',
    component: StackingCards,
    prompt: `Create a React stacking-cards effect inside a scrollable container (320px,
overflow-y scroll). Four cards are position sticky at top 16px; as scroll
progress pushes a new card up, the covered card scales to 0.94 and dims to
brightness 0.96. Drive progress with GSAP ScrollTrigger using the container
as scroller (or a scroll handler + math). Each card: white, 1px border,
rounded-12, numbered 01-04.`,
  },
  {
    id: 'marquee-cards',
    title: '无限巡游卡',
    label: 'MARQUEE',
    description: '一组卡片横向无限滚动，悬停减速，适合展示合集。',
    categories: ['card'],
    interaction: 'auto',
    component: MarqueeCards,
    prompt: `Create a React marquee component: two rows of small cards scroll
horizontally in opposite directions in a seamless infinite loop (duplicate
the track, animate translateX 0 → -50%, 40px/s equivalent). Pause smoothly
on hover via animation-play-state. Cards: white, rounded, 1px border, short
placeholder titles. Pure CSS keyframes, Tailwind.`,
  },
  {
    id: 'holo-card',
    title: '全息眩光卡',
    label: 'HOLO GLARE',
    description: '深色卡片随鼠标在三维空间倾斜，一层低饱和的彩虹全息眩光随指针流转，像收藏卡的镭射面，克制而高级。',
    categories: ['card'],
    interaction: 'move',
    dark: true,
    component: HoloCard,
    prompt: `Create a React component called HoloCard using React + Tailwind CSS + Framer Motion. Render a dark card (zinc-900, rounded-2xl, 1px zinc-800 border) centered inside a wrapper with CSS perspective 900px. Track the pointer over the card with onPointerMove, normalize to [0,1] on both axes into useMotionValue, and smooth with useSpring (stiffness 180, damping 22). Derive rotateX in [10deg, -10deg] and rotateY in [-10deg, 10deg] via useTransform, applied with transformStyle preserve-3d; on pointer leave, spring both axes back to 0.5. Layer a holographic glare: an absolutely positioned motion.div with mix-blend color-dodge whose backgroundImage is a soft spectrum linear-gradient at 115deg (transparent → pink/amber/mint/sky/violet at ~0.35 alpha → transparent), backgroundSize 250% 250%, and backgroundPosition counter-following the pointer via useTransform — never neon, always tasteful. Add a faint diagonal shine band: a rotated (20deg) motion.div with a white 12% linear-gradient streak whose translateX sweeps across the card with the pointer. Fade both glare layers in only while hovering (spring a hover MotionValue 0→1). Content stays minimal: small mono uppercase label, a short title, and a CSS-only orb (radial-gradient sphere with a 1px white/10 ring) floating at translateZ(30px).`,
  },
  {
    id: 'moving-border',
    title: '流动边框卡',
    label: 'MOVING BORDER',
    description: '一段明亮的锌黑沿圆角矩形的边界匀速巡游，带着一层柔光残影，周而复始。',
    categories: ['card'],
    interaction: 'auto',
    component: MovingBorderCard,
    prompt: `Create a React component called MovingBorderCard using React + Tailwind CSS. Render a white card (288×176px, rounded-xl) with a minimal interior: a small mono uppercase label, a title, and a two-line muted description. Around it, a bright segment travels the rounded-rect perimeter endlessly: place an absolutely positioned SVG (viewBox matching the card size, inset-0, pointer-events-none) containing a single rect (1px inset, rx 11, fill none, pathLength 100, stroke #18181B zinc-900, strokeWidth 2, strokeLinecap round, strokeDasharray "14 86" for a short dash and long gap) and animate its stroke-dashoffset from 0 to -100 in a 4s linear infinite CSS keyframes loop. Duplicate the same SVG with strokeWidth 3, opacity 0.5 and a 4px blur as a soft glow copy trailing the crisp segment. Pause the animation with animation-play-state when the card scrolls out of view (IntersectionObserver). Isolate the looping SVG in a memoized micro-component. Pure CSS animation, transform-free, 60fps.`,
  },
  {
    id: 'testimonial-cycle',
    title: '语录轮播卡',
    label: 'QUOTE CYCLE',
    description: '三张语录卡自动轮播：前排卡片带轻微旋转向下淡出，后一张放大升起接棒，节奏安静克制。',
    categories: ['card'],
    interaction: 'auto',
    component: TestimonialCycle,
    prompt: `Create a React component called TestimonialCycle using React + Tailwind CSS + Framer Motion. Render a stack of three white quote cards (320×128px, rounded-xl, 1px zinc-200 border, soft shadow) auto-cycling every 3.5 seconds, driven by a setInterval that only runs while the component is in view (IntersectionObserver). On each cycle the front card exits downward (translateY +64px, rotate -4deg, fade out, 400ms, ease [0.16,1,0.3,1]) inside AnimatePresence with initial={false}; simultaneously the next card scales 0.95 → 1 and rises from the mid slot into the front slot, and the third card steps forward from the back slot (scale 0.9 → 0.95) — stagger the stack with y offsets 0/12/24px and z-index 10/20/30, remounting the back slots keyed by cycle index so they animate from their previous position. Each card shows: a large quote-mark icon (lucide Quote, filled, zinc-300), a two-line Chinese quote (line-clamp-2, relaxed leading), and a footer row with a gradient avatar circle (initial character), name, and role. Below the stack, small progress dots: the active dot stretches into a 16px zinc-950 pill, the rest stay 6px zinc-300 dots, transitioning over 300ms.`,
  },
  {
    id: 'tilt-parallax',
    title: '多层视差卡',
    label: 'TILT PARALLAX',
    description: '卡片整体随指针轻倾，内部三层内容按 0.3× / 0.6× / 1.0× 的深度差速移动，扁平卡片里长出真实的纵深感。',
    categories: ['card'],
    interaction: 'move',
    component: TiltParallaxCard,
    prompt: `Create a React component called TiltParallaxCard using React + Tailwind CSS + Framer Motion. Render a white card (288×192px, rounded-2xl, 1px zinc-200 border, soft shadow, overflow hidden) centered in a wrapper with CSS perspective 900px. Track the pointer with onPointerMove, normalize to [-1,1] on both axes into useMotionValue, smooth with useSpring (stiffness 160, damping 20), and derive rotateX/rotateY in ±8deg via useTransform, applied with transformStyle preserve-3d; spring back to 0 on pointer leave. Inside, translate three layers at different depths, all bound to the same springs with no setState in the pointer path: a background layer (two soft blurred gradient blobs, indigo-200/60 and rose-200/60) moving at 0.3× (±9px, translateZ 0), a mid content card (white/85 backdrop-blur inner panel with skeleton lines) at 0.6× (±18px, translateZ 30px), and a foreground badge + title (black pill chip with mono uppercase text plus a semibold title) at 1.0× (±30px, translateZ 60px). Finish with a soft glare sweep: an absolutely positioned motion.div whose radial-gradient highlight (white 0.85 fading to transparent at 55%) follows the pointer via useTransform, sitting at translateZ 80px.`,
  },
  {
    id: 'swipe-cards',
    title: '滑动匹配卡',
    label: 'SWIPE MATCH',
    description: 'Tinder 式卡堆：拖动顶卡左右滑动，卡片随手势旋转；越过 ±100px 阈值出现「喜欢 / 跳过」印章，松手后飞出并循环到队尾，未到阈值则弹性回位。',
    categories: ['card'],
    interaction: 'move',
    component: SwipeCards,
    prompt: `Create a React component called SwipeCards using React + Tailwind CSS + Framer Motion. Render an infinite Tinder-style deck of profile cards (216×264px, rounded-xl, 1px zinc-200 border, soft shadow): each card has a soft gradient header (pastel duotone, 120px tall, with a frosted initials avatar) above a name line (15px semibold Chinese name + small mono uppercase tag) and two skeleton text lines. Keep a deck state (array of profile indices); only the front card is draggable — a motion.div with drag="x", dragMomentum false, and its x stored in a useMotionValue (no setState in the pointer path). Derive rotation from drag distance via useTransform (±220px → ±16deg), and two stamp opacities: a '喜欢' stamp (green-600, 3px border, mono bold, rotated -12deg, top-left) fading in as x passes +100px, and a '跳过' stamp (zinc-400, same style, rotated 12deg, top-right) fading in past -100px. On drag end: if |offset| exceeds 100px, tween x off-screen to ±460px (280ms, ease [0.16,1,0.3,1]) then rotate the deck so the swiped card cycles to the back; otherwise spring x back to 0 (stiffness 500, damping 32). The two cards behind sit at y 12/24px with scale 0.95/0.9 and opacity 1/0.6, stepping forward each cycle. Cards remount per cycle keyed by deck order so transitions stay smooth.`,
  },
  {
    id: 'card-swap',
    title: '自动换牌卡堆',
    label: 'CARD SWAP',
    description: '三张卡片循环换牌：每 3 秒最前面的卡先下沉 60px 并微微淡出，再滑到卡堆最后，其余卡片依次向前递补，安静而持续。',
    categories: ['card'],
    interaction: 'auto',
    component: CardSwap,
    prompt: `Create a React component called CardSwap using React + Tailwind CSS + Framer Motion. Render three stacked cards (320×128px, rounded-xl, 1px zinc-200 border, subtle gradient faces with a small accent bar, mono uppercase label, title, and two skeleton lines) absolutely positioned in a fixed wrapper. Drive the cycle with a reordered id array in state: every 3 seconds a setInterval (only running while the component is in view via IntersectionObserver) moves the front id to the back. Each card is a motion.div keyed by id with initial={false}, animating to its slot values — front: y 0, scale 1, opacity 1, zIndex 30; middle: y 14, scale 0.95, opacity 0.85, zIndex 20; back: y 28, scale 0.9, opacity 0.7, zIndex 10. Track the previous order in a ref; the card moving from front to back animates with keyframes instead — y [0, 60, 28], scale [1, 0.97, 0.9], opacity [1, 0.55, 0.7], zIndex [30, 30, 10] over 700ms with times [0, 0.45, 1] — so it drops down 60px and fades slightly before sliding behind the stack, while the other cards step forward with a 500ms ease [0.16,1,0.3,1] tween.`,
  },
  {
    id: 'keycap',
    title: '立体按键卡',
    label: 'KEYCAP',
    description: '一颗巨大的机械键盘键帽：按下时顶面真实下沉 8px、侧沿随之收短、投影变软，松手后 Q 弹回位，越按越上瘾。',
    categories: ['card'],
    interaction: 'click',
    component: KeycapCard,
    prompt: `Create a React component called KeycapCard using React + Tailwind CSS + Framer Motion. Render a big mechanical keycap (128×128px) centered on the preview: a darker zinc-300 side/bottom layer (rounded-2xl, same size, translated 8px down so it peeks out as an extruded lip) behind a zinc-100 top face (rounded-2xl, 1px zinc-200 border) carrying a big mono letter 'K'. The top face holds an inset dished surface (an inner rounded-xl zinc-50 panel with shadow-[inset_0_3px_10px_rgba(0,0,0,0.10)] for a subtle concave key dish). Drive the press with a useMotionValue y smoothed by useSpring (stiffness 500, damping 25): on pointerdown set y to 8 so the top face physically translates down 8px and covers the side lip (the extrusion visually shrinks to zero); on pointerup / pointerleave / pointercancel set y back to 0. Derive the drop shadow from the same spring via useTransform — a soft 14px blur shadow at rest collapsing to a tight 2px contact shadow when fully depressed — for a satisfying click feel. Add a tiny mono counter below ('×N') that increments per press. Transform and opacity only, no setState in pointermove.`,
  },
  {
    id: 'wallet-pull',
    title: '钱包抽卡',
    label: 'WALLET PULL',
    description: '三张银行卡插在钱包夹层里，各露出 28px 卡边；点击露出的卡边，那张卡向上抽出并完整呈现卡面细节，再点一次或点其他卡便归位。',
    categories: ['card'],
    interaction: 'click',
    component: WalletPull,
    prompt: `Create a React component called WalletPull using React + Tailwind CSS + Framer Motion. Render three bank cards (300×176px, rounded-xl, muted gradients — charcoal zinc-700→zinc-900, slate-400→slate-600, sand #CDBD9E→#A89472 — each with a tiny gradient chip graphic, mono card number, holder name, expiry and balance) stacked inside a wallet pocket (a wider rounded-2xl zinc-100 panel behind the bottom of the stack). Each card peeks 28px above the one in front of it: card i sits at y = 36 + (2 - i) * 28 with zIndex 10/20/30 so all three tops are visible and clickable. Track which card is out with a single useState (number | null) — only one card out at a time. Every card is a motion.div with initial={false} and a spring transition (stiffness 320, damping 26): clicking a peeking edge springs that card up to y 0 with scale 1.03 and zIndex 40, fully revealed, while the other cards sink 10px, scale to 0.97 and dim to 0.55 opacity; clicking the out card again (or another card) slots it back. The card's detail row (holder / expiry / balance) fades from 0.35 to full opacity only while the card is out.`,
  },
  {
    id: 'scratch-card',
    title: '刮刮卡',
    label: 'SCRATCH CARD',
    description: '一张盖着银灰刮刮层的奖品卡：按住拖动刮开金属涂层，露出底下的「再来一瓶」；刮开超过 45% 后剩余涂层自动淡出，可一键重来。',
    categories: ['card'],
    interaction: 'move',
    component: ScratchCard,
    prompt: `Create a React component called ScratchCard using React + Tailwind CSS + Canvas 2D. Render a prize card (320×200px, rounded-xl, 1px zinc-200 border) whose prize layer (warm amber-to-rose gradient, small mono uppercase 'YOU WIN' label, big bold '再来一瓶 🎉', and a mono serial line) sits under a scratch-off foil. Implement the foil as an absolutely positioned canvas (dimensions set via inline style, DPR-aware): paint a zinc metallic linear-gradient (#d4d4d8 → #e4e4e7 → #f4f4f5 → #d4d4d8 → #a1a1aa), sprinkle ~1400 1px noise specks, and draw a centered '刮 开 惊 喜' hint plus 'SCRATCH HERE' in mono. On pointerdown capture the pointer and start erasing: set globalCompositeOperation to 'destination-out' and fill 28px-radius circles at the pointer; on pointermove interpolate circles along the drag segment (step = radius/2) so fast strokes erase continuously. Track progress with a coarse 24×15 boolean grid whose cells within the erase circle get marked; when over 45% of cells are scratched, set state once to fade the whole canvas to opacity 0 (700ms CSS transition) and disable pointer events. Show a small '再来一次' reset button (RotateCcw icon, mono uppercase, frosted white) once finished, which repaints the foil and re-arms scratching. No setState in the pointermove path besides the one-time completion flag.`,
  },
  {
    id: 'pixel-card',
    title: '像素涌动卡',
    label: 'PIXEL SURGE',
    description: '卡片表面覆盖一层 8px 像素网格，悬停时像素块以随机延迟从指尖泛起又退去，像一波数字潮水。',
    categories: ['card'],
    interaction: 'hover',
    component: PixelCard,
    prompt: `Create a React component called PixelCard using React + Tailwind CSS + Canvas 2D. Render a white card (288×176px, rounded-xl, 1px zinc-200 border) with minimal content (mono uppercase label, title, two-line muted description). Overlay it with an absolutely positioned canvas (pointer-events-none, dimensions set via inline style, DPR-aware) divided into an 8px pixel grid (~36×22 cells). On pointerenter/pointermove track the cursor in card coordinates and run a requestAnimationFrame loop: each frame every cell computes phase = (t/1500ms + per-cell random seed*0.9 − distance-to-cursor/110) mod 1.1; cells with phase < 1 draw a zinc-900 square (inset 0.5px) whose opacity follows sin(phase × π) — a 0→1→0 pulse — so pixels ripple outward from the hovered point with random delays like a digital tide. Multiply by a global intensity that lerps toward 1 while hovering and 0 on leave; when intensity falls below 0.01 stop the rAF loop and clear the canvas. No React state in the pointer path — keep cursor position in refs.`,
  },
  {
    id: 'decay-card',
    title: '像素消散卡',
    label: 'PIXEL DECAY',
    description: '卡片内容被预渲染成一块画布：悬停时鼠标附近的 10px 碎块随机飞散淡出，松手后弹性归位、重组复原。',
    categories: ['card'],
    interaction: 'hover',
    dark: true,
    component: DecayCard,
    prompt: `Create a React component called DecayCard using React + Tailwind CSS + Canvas 2D. Render a card (320×200px, rounded-xl, 1px zinc-200 border, white bg) whose entire content is a single canvas (inline-style dimensions, DPR-aware). Pre-render the content into an offscreen canvas: dark zinc-900 face, a soft radial gradient orb with a 1px white/20 ring, a mono uppercase label, a semibold title and two skeleton bars. Slice the offscreen into 10px chunks (~32×20) tracked in Float32Arrays: offset x/y, velocity x/y, alpha and alpha-velocity. On pointermove, chunks within 64px of the cursor get kicked: a radial push (falloff 1 − d/64, magnitude 6–16px plus random jitter) and an alpha impulse (−0.25 to −0.7), so nearby pixels scatter and fade. Each frame integrate a spring back to origin (v += −offset×0.055, v ×= 0.88) and to full opacity (va += (1−a)×0.07, va ×= 0.82), drawing each chunk with drawImage at its displaced position and globalAlpha. When every chunk has settled (|offset| < 0.2, alpha > 0.995) stop the rAF loop and draw the pristine image — the card disintegrates under the cursor and elastically reassembles on release. No React state in the pointer path.`,
  },
  {
    id: 'electric-border',
    title: '电流边框卡',
    label: 'ELECTRIC BORDER',
    description: '深色卡片边缘盘绕着一道电流：SVG 滤镜把描边扭曲成电弧，光段沿边框流动，悬停时辉光更亮。',
    categories: ['card'],
    interaction: 'hover',
    dark: true,
    component: ElectricBorder,
    prompt: `Create a React component called ElectricBorder using React + Tailwind CSS + SVG filters. Render a dark card (288×176px, zinc-900, rounded-xl) on a zinc-950 backdrop with minimal white content (mono uppercase label, title, two-line muted description). Overlay an absolutely positioned SVG (viewBox matching the card, inset-0, pointer-events-none) containing three rects (2px inset, rx 12, fill none): a faint white/8 base outline, a crisp traveling arc (stroke zinc-200 #E4E4E7, strokeWidth 1.4, strokeLinecap round, pathLength 260, strokeDasharray "46 214"), and a blurred glow copy (stroke #F4F4F5, strokeWidth 3.5, 3px blur, same dash, opacity 0.55 → 1 on card hover via CSS transition). Wrap the arcs in a group with filter url(#eb-distort): feTurbulence (fractalNoise, numOctaves 2, seed 4, filter region −20%/140% so displacement is not clipped) whose baseFrequency is SMIL-animated between "0.012 0.05" and "0.02 0.085" over 5s, feeding an feDisplacementMap (scale 7) — the border warps like a live current. Animate stroke-dashoffset 0 → −260 in a 3.2s linear infinite CSS keyframes loop so the arc flows around the border; pause with animation-play-state when the card is off-screen (IntersectionObserver). Isolate the SVG in a memoized micro-component.`,
  },
  {
    id: 'evervault-card',
    title: '加密矩阵卡',
    label: 'ENCRYPTED MATRIX',
    description: '满屏随机字符的矩阵中，鼠标周围的圆形区域被点亮成深色高亮并高速刷新，像一束扫描光扫过密文。',
    categories: ['card'],
    interaction: 'move',
    component: EvervaultCard,
    prompt: `Create a React component called EvervaultCard using React + Tailwind CSS + Framer Motion, recreating the Aceternity Evervault effect. Render a white card (340×220px, rounded-xl, 1px zinc-200 border, overflow hidden, cursor-crosshair) filled with a matrix of random glyphs (A–Z, 2–9, #$%&@*+=<>/ — 46 cols × 14 rows, JetBrains Mono 10px, 14px line-height, 2px tracking, rendered as a whitespace-pre <pre>). Render the matrix twice: a dim base layer (zinc-300) that slowly re-rolls every 2.6s, and a lit layer (zinc-950, font-medium) that re-rolls every 140ms. Track the pointer with onPointerMove into useMotionValue x/y (never useState in the pointer path) and build a mask with useMotionTemplate: radial-gradient(130px circle at x y, black 25%, transparent 100%) applied as maskImage/WebkitMaskImage on the lit layer via a motion.pre — so a circular region around the cursor lights up with freshly scrambled dark glyphs like a scanning spotlight. On pointer leave set both MotionValues to −400 so the lit region slides off. Center a small frosted pill chip (white/85, backdrop-blur, hairline border, mono 10px uppercase "ENCRYPTED") as the only static content.`,
  },
  {
    id: 'magic-card',
    title: '光晕边界卡',
    label: 'MAGIC CARD',
    description: '一圈低饱和的径向光晕贴着卡片边框内侧游走，随鼠标位置移动，像光把边框从里面照亮。',
    categories: ['card'],
    interaction: 'move',
    component: MagicCard,
    prompt: `Create a React component called MagicCard using React + Tailwind CSS, recreating the Magic UI Magic Card. Render a white card (320×192px, rounded-xl) with minimal content (mono uppercase label, semibold title, two-line muted description). Build the glowing border with zero React state: wrap the card in an outer shell div with p-px (1px padding paints the border ring) whose background is two stacked layers — radial-gradient(240px circle at var(--mouse-x) var(--mouse-y), rgba(161,161,170,0.55), transparent 70%) over a solid #E4E4E7 base — so the border brightens in a soft zinc-400 halo around the cursor. Inside, the content div (rounded-[11px], white bg) carries a matching inner wash layer: radial-gradient(280px circle at the same CSS vars, rgba(161,161,170,0.14), transparent 65%), absolutely positioned and pointer-events-none — light appears to graze the inside of the frame. Track the pointer with onPointerMove on the shell and update it via el.style.setProperty('--mouse-x', px) / '--mouse-y' (coordinates relative to the shell's bounding rect); the vars inherit into both gradient layers. Default the vars to center-top so the card looks calm before first hover. No useState, no re-renders — pure CSS custom properties.`,
  },
  {
    id: 'comet-card',
    title: '彗星尾迹卡',
    label: 'COMET CARD',
    description: '深色卡面上三颗小彗星错峰划过：亮头拖着渐隐的长尾，沿不同角度周期性掠过，周而复始。',
    categories: ['card'],
    interaction: 'auto',
    dark: true,
    component: CometCard,
    prompt: `Create a React component called CometCard using React + Tailwind CSS, in the spirit of Aceternity's Comet Card. Render a dark card (320×192px, zinc-900, rounded-xl, 1px zinc-800 border, overflow hidden) with minimal white content (mono uppercase label, title, two-line muted description). Three comets periodically sweep the card at different angles: each comet lives in an absolutely positioned full-width lane div (at ~22% / 50% / 74% from the top, rotated -24deg / -34deg / -18deg) containing a comet span — a fading tail (width 70–110px, height 1.5px, rounded-full, background linear-gradient(90deg, transparent, rgba(244,244,245,0.35) 55%, rgba(244,244,245,0.95))) with a bright head (5px zinc-100 circle, soft white glow box-shadow) anchored at its leading end. Drive all motion with one CSS keyframes loop (translateX -120px → card width +40px, opacity 0 → 1 by 10%, hold, fade to 0 by 100%) and stagger the three comets via inline animation-duration (4s / 5.5s / 7s) and animation-delay (0s / 1.6s / 3.2s) so they never sync up. transform + opacity only, will-change transform, paused with animation-play-state when the card scrolls out of view (IntersectionObserver). Isolate the comet field in a memoized micro-component.`,
  },
  {
    id: 'wobble-card',
    title: '果冻晃动卡',
    label: 'WOBBLE CARD',
    description: '卡面内容像果冻一样追向鼠标，松手后带着弹簧般的晃动回稳；卡片本体悬停时轻微弹性放大。',
    categories: ['card'],
    interaction: 'move',
    component: WobbleCard,
    prompt: `Create a React component called WobbleCard using React + Tailwind CSS + Framer Motion, recreating the Aceternity Wobble Card's jelly feel. Render a white card (320×192px, rounded-xl, 1px zinc-200 border) with minimal content (mono uppercase label, semibold title, two-line muted description). Track the pointer over the card with onPointerMove, normalizing to [0,1] on both axes into useMotionValue (never useState), and smooth through useSpring with stiffness 300, damping 10 — deliberately under-damped so the content wobbles. Derive via useTransform with strictly increasing [0,1] input: content translate x in [-14px, 14px], y in [-10px, 10px], and a slight rotate in [-2.5deg, 2.5deg], applied to an inner motion.div wrapping all content — the card frame stays put while its innards jelly toward the cursor. On pointer leave, set both axes back to 0.5 and let the loose spring oscillate back to rest. Add an elastic breathing scale on the card itself: a hover MotionValue (0/1 on enter/leave) through useSpring (stiffness 260, damping 16) mapped to scale [1, 1.03]. All motion is transform-based, bound directly to MotionValues.`,
  },
  {
    id: 'glare-card',
    title: '金属眩光卡',
    label: 'GLARE',
    description: '一道宽斜向的眩光带随鼠标扫过深色卡面，平移中带一点旋转，像光掠过拉丝金属。',
    categories: ['card'],
    interaction: 'move',
    dark: true,
    component: GlareCard,
    prompt: `Create a React component called GlareCard using React + Tailwind CSS + Framer Motion, recreating the Aceternity Glare Card. Render a dark metallic card (320×192px, rounded-xl, 1px zinc-800 border, overflow hidden) whose face is a subtle diagonal metal gradient (zinc-800 → zinc-900 → zinc-950 at 160deg) with minimal white content (mono uppercase label, semibold title, two-line muted description). The glare: one oversized band (width ~96px, height 260% of the card, centered) filled with a horizontal linear-gradient(90deg, transparent, rgba(255,255,255,0.06), rgba(255,255,255,0.22), rgba(255,255,255,0.06), transparent) — a wide soft streak. Track the pointer's X over the card (onPointerMove, normalized [0,1], useMotionValue + useSpring stiffness 180 damping 22) and derive via useTransform with strictly increasing [0,1] input: the band's translateX sweeps from -130% to +130% of its own width while its rotate tilts gently from -28deg to -14deg, like raking light. Gate visibility with a hover MotionValue (0/1 on enter/leave, useSpring stiffness 200 damping 24) mapped to the band's opacity so the glare fades in only while interacting. All transforms bound directly to MotionValues — no useState in the pointer path.`,
  },
  {
    id: 'focus-cards',
    title: '聚焦卡组',
    label: 'FOCUS CARDS',
    description: '横排三张小卡：悬停某张时它微微放大并清晰突出，其余两张模糊、缩小、变暗退后，弹簧过渡干脆利落。',
    categories: ['card'],
    interaction: 'hover',
    component: FocusCards,
    prompt: `Create a React component called FocusCards using React + Tailwind CSS + Framer Motion, recreating the Aceternity Focus Cards. Render three small cards (112×160px, rounded-xl, 1px zinc-200 border) in a horizontal row with 16px gaps; each card is a muted zinc gradient panel (light zinc-300 to darker zinc-500/600, all low-saturation) with a small white mono uppercase label and a short title. Track the hovered index in useState (null when none) on the row container's onPointerLeave / each card's onPointerEnter. Animate with Framer Motion's animate prop and a spring transition (type spring, stiffness 260, damping 22): the hovered card scales to 1.05 at full opacity with blur(0px); its siblings scale to 0.96, dim to opacity 0.5 and blur(4px) so they recede; with no hover all cards rest at scale 1, opacity 1, blur 0. Keep the row layout static (transforms only, no layout shift) and wrap the hover zone in a flex container so leaving the row resets every card together.`,
  },
  {
    id: 'sticker-peel',
    title: '贴纸撕角',
    label: 'STICKER PEEL',
    description: '捏住卡片右上角向左下拖拽，贴纸箱角沿折线镜像翻卷，撕过一半自动整片剥离，露出藏在底下的优惠码。',
    categories: ['card'],
    interaction: 'move',
    component: StickerPeel,
    prompt: `Create a React component called StickerPeel using React + Tailwind CSS + Framer Motion — a 240×168 card where a dark sticker (zinc gradient 155deg from #3f3f46 to #09090b, white mono 'STICKER' label, 'Nº 025' serial, title 纪念贴纸) can be peeled off by dragging its top-right corner, revealing a promo layer underneath (mono 'PROMO CODE' caption, 'MOTION-25' in 18px semibold mono with a BadgeCheck icon, subline 全部灵感 · 七五折). Model the peel with a single progress value p (0–1.15): the fold line runs from point A on the top edge (x = W − p·W·1.35) to point B on the right edge (y = p·H·1.35); clip the sticker front with a clip-path polygon that excludes corner triangle A–(W,0)–B, and render the peeled flap as an SVG polygon of that triangle mirrored across line AB (true reflection: t = dx²/(dx²+dy²) projection of the corner onto AB, apex C′ = 2F − C), filled with a paper-back gradient (#fafafa → #d4d4d8), a 1px white fold highlight along AB, and a CSS drop-shadow(-4px 5px 5px rgba(0,0,0,.22)) on the SVG. Gesture: pointerdown captures the pointer and stores start position + p; pointermove maps left+down drag distance ((startX − x) + (y − startY)) / 210 to p, clamped [0, 1.15]; pointerup snaps p via framer-motion's animate() — past 0.5, tween to 1.15 (450ms ease [0.4,0,0.6,1]) then mark peeled (sticker unmounts, a RotateCcw reset button fades in at the card corner); otherwise spring back (stiffness 260, damping 20). At rest, an idle breathing loop animates p between 0.14 and 0.185 so the curl invites the drag; the '捏住右上角 · 向左下撕开' hint fades out on first touch. The promo layer scales 0.96 → 1 with p for a subtle settle. Touch-none + select-none on the drag surface, transform/clip only.`,
  },
  {
    id: 'polaroid-develop',
    title: '拍立得显影',
    label: 'POLAROID DEVELOP',
    description: '按下快门吐出一张新照片，从奶白一片慢慢显影出山川海景；来回摇晃照片，显影会肉眼可见地加速。',
    categories: ['card'],
    interaction: 'click',
    component: PolaroidDevelop,
    prompt: `Create a React component called PolaroidDevelop using React + Tailwind CSS + Framer Motion — a polaroid camera card with a working shutter and shake-to-develop physics. Layout: a 196px white polaroid frame (rounded-md, p-2.5, pb-3, soft 16px/40px shadow, resting rotate -2deg) with a square photo area and a mono caption strip, a '按下快门' pill button below (Camera icon, active:scale-95). Clicking the shutter re-mounts the frame (key = shot count) so a fresh print slides up with spring (from y 34, opacity 0, rotate -5; stiffness 210, damping 20) and development begins: a MotionValue develop goes 0 → 1 over ~9s via useAnimationFrame (base rate 1/9 per second). Map develop to the photo's CSS filter — saturate 0.15→1, contrast 0.72→1, brightness 1.22→1, blur 1.5→0px, eased with smoothstep so color blooms late — while a milky #f5f0e6 veil overlay fades opacity 0.94→0 (steepest between 0 and 0.85). The scene is pure CSS (three cycling scenes 山野晨光/海边落日/城市入夜: layered linear-gradient sky, a glowing sun disc with colored box-shadow, and a clip-path polygon ridge/skyline silhouette). Shake detection: on pointermove over the frame, track horizontal direction reversals within 140ms; each reversal adds 0.35 to a boost ref (capped 2.2) that multiplies the development rate 6× and decays exponentially (~1.6/s); while boost > 0.25 show a '摇晃加速中' mono chip in the caption. Caption shows 显影中 N% (state synced via useMotionValueEvent, only on integer change) then the scene name; a 1px hairline progress bar under the caption scales X with develop. Button becomes 再拍一张 after the first print.`,
  },
];
