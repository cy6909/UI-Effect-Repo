import type { Effect } from '@/types/effect';
import JellyButton from '@/components/effects/spring/JellyButton';
import SpringModal from '@/components/effects/spring/SpringModal';
import JellyCheckbox from '@/components/effects/spring/JellyCheckbox';
import SpringTooltip from '@/components/effects/spring/SpringTooltip';
import WobbleInput from '@/components/effects/spring/WobbleInput';
import ElasticToggle from '@/components/effects/spring/ElasticToggle';
import SlidingNumber from '@/components/effects/spring/SlidingNumber';
import ElasticSlider from '@/components/effects/spring/ElasticSlider';
import SpringCursor from '@/components/effects/spring/SpringCursor';
import MagnetLines from '@/components/effects/spring/MagnetLines';
import GooeyNav from '@/components/effects/spring/GooeyNav';
import DragBall from '@/components/effects/spring/DragBall';

export const springEffects: Effect[] = [
  {
    id: 'jelly-button',
    title: '果冻按钮',
    label: 'JELLY BUTTON',
    description: '点击瞬间按钮像布丁一样被压扁又弹回——横向拉伸时纵向收缩，体积守恒的果冻物理。',
    categories: ['spring', 'button'],
    interaction: 'click',
    component: JellyButton,
    prompt: `Create a React component called JellyButton using React + Tailwind CSS + Framer Motion. A chunky pill button (rounded-full, bg-zinc-950, white text '点我试试', px-10 py-4, font-semibold). On click, trigger an extreme squash-and-stretch jelly animation via useAnimationControls as two chained springs: first await controls.start({ scaleX: 1.3, scaleY: 0.75 }, { type: 'spring', stiffness: 400, damping: 10 }) to squash out fast with volume preservation, then controls.start({ scaleX: 1, scaleY: 1 }, { type: 'spring', stiffness: 300, damping: 8 }) so the low-damping settle overshoots and jiggles like pudding. Do NOT use a keyframed [1, …, 1] array with a spring transition — framer-motion's spring generator only reads the first and last keyframe, so identical endpoints silently produce no animation. Fully re-clickable — every click restarts the jiggle. Transform only, centered on a light preview.`,
  },
  {
    id: 'spring-modal',
    title: '弹簧弹窗',
    label: 'SPRING MODAL',
    description: '弹窗带着明显的过冲弹簧蹦进来，还能用手指向下拖——拖过 100px 就松手坠落关闭。',
    categories: ['spring'],
    interaction: 'click',
    component: SpringModal,
    prompt: `Create a React component called SpringModal using React + Tailwind CSS + Framer Motion. A button '打开弹窗' opens a modal rendered inside a relative preview container (absolute positioning, NOT fixed — the backdrop covers the preview only). The backdrop fades in (opacity 0 → 1, 200ms, bg-zinc-950/20) and closes on click. The modal card (w-[280px], rounded-2xl, white bg, zinc-200 border, title + body text + a full-width dark action button + an ✕ close button) enters with an overshoot spring: initial scale 0.6 / y 40 / opacity 0 animating to scale 1 / y 0 / opacity 1 with type 'spring', stiffness 260, damping 17 — a visible bounce past the target. The card is draggable vertically (drag='y', dragConstraints bound to the preview container ref, dragElastic top 0.05 / bottom 0.4, cursor-grab); on drag end, if the y offset exceeds 100px dismiss it — the exit is a quick drop-down (y 120, opacity 0, 220ms easeIn). Wrap everything in AnimatePresence.`,
  },
  {
    id: 'jelly-checkbox',
    title: '弹性勾选',
    label: 'JELLY CHECKBOX',
    description: '勾选时小方框先被捏扁再回弹，对勾带着一点过冲跳出来，标签文字同步划上删除线。',
    categories: ['spring', 'svg'],
    interaction: 'click',
    component: JellyCheckbox,
    prompt: `Create a React component called JellyCheckbox using React + Tailwind CSS + Framer Motion. A vertical row of 3 custom checkboxes (labels like '接收通知' / '记住登录状态' / '自动同步数据'), each a button with role='checkbox' holding a 22px box (rounded-md, 1px zinc-400 border, white bg) plus a label span. On check: the box squishes with keyframed scale [1, 0.8, 1.1, 1] on a spring (stiffness 500, damping 12) while its background and border tween to zinc-950; inside, a white SVG check path (M1 5.5 L4.5 8.5 L11 1.5, stroke-width 2, round caps) pops in with a tiny overshoot — scale keyframes [0.4, 1.2, 1] over 300ms. The label gets a strike-through: an absolutely positioned 1px line (bg-zinc-400, origin-left) animating scaleX 0 → 1 over 250ms easeOut. On uncheck everything reverses calmly (200ms easeOut, no wobble). Transform/opacity only.`,
  },
  {
    id: 'spring-tooltip',
    title: '弹性气泡',
    label: 'SPRING TOOLTIP',
    description: '悬停时气泡提示从按钮上方弹出来——带一点过冲的弹簧入场，离开时快速收缩消失。',
    categories: ['spring'],
    interaction: 'hover',
    component: SpringTooltip,
    prompt: `Create a React component called SpringTooltip using React + Tailwind CSS + Framer Motion + the Info icon from lucide-react. A subtle circular icon button (h-10 w-10, rounded-full, 1px zinc-200 border, white bg, zinc-500 icon darkening on hover) inside a relative wrapper; hovering (or focusing) the wrapper shows a tooltip above it via AnimatePresence. The tooltip (whitespace-nowrap, rounded-lg, bg-zinc-950, white 12px text '弹簧入场的气泡提示') enters with a springy pop: initial scale 0.5 / y 6 / opacity 0 animating to scale 1 / y 0 / opacity 1 with type 'spring', stiffness 500, damping 20, transform-origin bottom-center — a 6px rise with visible overshoot. It leaves with a quick 100ms shrink (scale 0.8, opacity 0, easeIn). Include a tiny tail arrow: a 10px rotated-45deg square of the same zinc-950 centered under the bubble. Center it horizontally with framer-motion x: '-50%' (never mix Tailwind translate classes with motion transforms).`,
  },
  {
    id: 'wobble-input',
    title: '抖动输入框',
    label: 'WOBBLE INPUT',
    description: '登录失败的经典反馈：整行左右抖动、边框闪红、错误提示从上方滑下——聚焦输入框即复位。',
    categories: ['spring'],
    interaction: 'click',
    component: WobbleInput,
    prompt: `Create a React component called WobbleInput using React + Tailwind CSS + Framer Motion. A login-ish row: a password input (h-10 w-52, rounded-lg, 1px zinc-300 border, placeholder '输入密码') next to a dark '登录' button (bg-zinc-950, white text). Clicking 登录 with any input runs the classic error shake on the whole row via useAnimationControls: x keyframes [0, -10, 10, -6, 6, -2, 0] over 400ms easeInOut. Simultaneously the input border flashes rose-500 for 800ms (state + setTimeout clearing it, transition-colors duration-300), and a small hint '密码错误，再试一次' (12px, text-rose-500) slides down below the row inside an overflow-hidden container (y -8 → 0, opacity 0 → 1, spring stiffness 400 damping 22, wrapped in AnimatePresence). Focusing the input again resets everything — border back to zinc-300, hint exits.`,
  },
  {
    id: 'elastic-toggle',
    title: '弹性开关',
    label: 'ELASTIC TOGGLE',
    description: '滑块在滑动途中被拉成椭圆再弹回圆形，像一颗有弹性的软糖；轨道颜色随之渐变。',
    categories: ['spring'],
    interaction: 'click',
    component: ElasticToggle,
    prompt: `Create a React component called ElasticToggle using React + Tailwind CSS + Framer Motion + the Sun and Moon icons from lucide-react. A toggle switch (role='switch'): a 56×32 rounded-full track that tweens its background zinc-200 ⇄ zinc-950 over 250ms, with a 24px white knob (rounded-full, shadow-sm). The knob slides x 0 → 24 on a spring (stiffness 500, damping 28). While sliding the knob STRETCHES: nest the visible knob inside the sliding wrapper and drive it with useAnimationControls on every toggle — scaleX keyframes [1, 1.4, 1] and scaleY [1, 0.78, 1] over 450ms (times [0, 0.45, 1], easeOut) so it becomes a horizontal ellipse mid-travel then squashes back. Bonus: tiny 12px sun/moon icons crossfade inside the knob (opacity + scale + ±90° rotate, 200ms) — sun when off, moon when on. Transform/opacity only, centered on a light preview.`,
  },
  {
    id: 'sliding-number',
    title: '逐位滑换数字',
    label: 'SLIDING NUMBER',
    description: '四位计数器的每一位都是一条独立的数字卷轴——点击 +1/+10 时老数字上滑出、新数字滑入，个位先动、逐位错峰 40ms 回稳。',
    categories: ['spring'],
    interaction: 'click',
    component: SlidingNumber,
    prompt: `Create a React component called SlidingNumber using React + Tailwind CSS + Framer Motion. A 4-digit counter in a mono font (font-mono, text-5xl, 48px, zinc-950) with leading-zero padding. Each digit is its own column: a 1em-tall window (overflow-hidden, width 0.62em) containing a vertical stack of digits 0-9 (each span exactly 1em tall, leading-none). To change a digit, animate the column's y to -digit em with Framer Motion (initial={false}) using a spring transition (type: 'spring', stiffness 300, damping 24) so the old digit slides up out and the new one slides up in, settling with a soft bounce. Stagger the digits by 40ms from the ones place outward (delay = (length - 1 - index) * 0.04) for an odometer-carry feel. Below the counter, two buttons: a dark '+1' (bg-zinc-950, white text) and an outlined '+10', both with active:scale-95 press feedback. Transform-only animation, centered on a light preview.`,
  },
  {
    id: 'elastic-slider',
    title: '弹性滑块',
    label: 'ELASTIC SLIDER',
    description: '拖拽手柄时它沿拖拽方向被拉扁，轨道填充像跟屁虫一样滞后半拍地弹过来，松手瞬间手柄果冻式回弹归位。',
    categories: ['spring'],
    interaction: 'move',
    component: ElasticSlider,
    prompt: `Create a React component called ElasticSlider using React + Tailwind CSS + Framer Motion. A horizontal slider inside a light preview: a 4px rounded-full zinc-200 track (flex-1), a zinc-950 fill bar, a 24px white knob (rounded-full, subtle border + shadow-sm, cursor-grab), and a mono numeric readout (0-100) on the right. Drive the knob with a MotionValue x bound to drag (drag='x', dragConstraints { left: 0, right: trackWidth - 24 } measured via ResizeObserver, dragElastic 0, dragMomentum false). The fill does NOT track x directly — it follows useSpring(x, { stiffness: 140, damping: 22, mass: 0.8 }) so it lags elastically behind the knob, rendered as percentage width via useTransform. While dragging, the knob stretches in the drag direction (scaleX 1.3, scaleY 0.85, 150ms easeOut); on drag end it jelly-bounces back with keyframes scaleX [1.3, 1] / scaleY [0.85, 1] on a spring (stiffness 500, damping 12). Pointer-down on the track springs the knob to that position (animate(x, target, { type: 'spring', stiffness 400, damping 30 })) with the same squash keyframes. Render the readout by passing a rounded useTransform MotionValue directly as a motion.span child — zero per-frame setState.`,
  },
  {
    id: 'spring-cursor',
    title: '弹簧跟随光标',
    label: 'SPRING CURSOR',
    description: '实心点紧贴指尖、描边圆环慵懒拖尾，移动越快圆环被拉得越扁，悬停文字时圆环还会放大 1.6 倍——全程零 setState。',
    categories: ['spring'],
    interaction: 'move',
    component: SpringCursor,
    prompt: `Create a React component called SpringCursor using React + Tailwind CSS + Framer Motion, running entirely on MotionValues (zero setState, zero re-renders). Inside a relative preview container (cursor-none, overflow-hidden), onPointerMove writes pointer coordinates (relative to the container rect) into mx/my MotionValues. Two followers: a 20px solid dot (h-5 w-5, rounded-full, bg-zinc-950) bound to useSpring(mx, { stiffness 500, damping 28 }) so it sticks tight to the pointer, and a 40px stroked ring (h-10 w-10, rounded-full, 1.5px zinc-950 border) bound to useSpring(mx, { stiffness 150, damping 15 }) so it trails lazily behind. Center each shape on the pointer with useTransform offsets (-10 / -20) instead of Tailwind translate classes. Derive the ring's ellipse stretch from useVelocity on the ring springs: scaleX = 1 + min(|vx| / 1600, 0.45), scaleY = 1 + min(|vy| / 1600, 0.45). A centered helper text ('移动鼠标，悬停这段文字试试', text-sm zinc-500) scales the ring 1.6x on hover: multiply the stretch by a hoverScale MotionValue driven by animate(hoverScale, 1.6 | 1, { type: 'spring', stiffness 300, damping 18 }) via computed useTransform. Fade both shapes in/out (opacity MotionValue) on pointer enter/leave, and initialize mx/my to the container center on mount.`,
  },
  {
    id: 'magnet-lines',
    title: '磁吸线阵',
    label: 'MAGNET LINES',
    description: '9×5 的短线阵列，每根线用弹簧平滑转向指针方向，离指针越近拉得越长、颜色越深；指针离开后缓缓回正。',
    categories: ['spring'],
    interaction: 'move',
    component: MagnetLines,
    prompt: `Create a React component called MagnetLines using React + Tailwind CSS + Framer Motion, running entirely on MotionValues (zero setState). Render a 9×5 grid (gap 30px, fixed pixel size ~270×150) of short 12px lines (h-[2px], rounded-full, zinc-400). onPointerMove on the grid wrapper writes pointer coords (relative to the wrapper rect) into mx/my MotionValues and sets an 'active' MotionValue to 1; onPointerLeave sets active to 0. Each line is a child component receiving mx/my/active plus its cell center (cx, cy): compute the target angle with useTransform([mx, my, active]) — atan2(y-cy, x-cx) in degrees while active, 0 when idle — then smooth it through useSpring(angle, { stiffness: 180, damping: 16 }) bound to the line's rotate style, so lines swivel toward the cursor and ease back upright on leave. Distance effects come from a second useTransform producing the pointer distance (9999 when idle): scaleX = useTransform(dist, [40, 220], [1.7, 1]) softened by another spring (stiffness 200, damping 20), and backgroundColor = useTransform(dist, [40, 220], ['#09090B', '#A1A1AA']) so nearby lines stretch longer and darken to zinc-950. Position each line absolutely at its cell center, cursor-crosshair on the wrapper, light background, container aria-label.`,
  },
  {
    id: 'gooey-nav',
    title: '融合导航',
    label: 'GOOEY NAV',
    description: '激活指示块在四个导航项之间黏糊糊地滑动——SVG gooey 滤镜让指示块拖着一条会融合的小尾巴，激活文字同步反白。',
    categories: ['spring', 'svg'],
    interaction: 'click',
    component: GooeyNav,
    prompt: `Create a React component called GooeyNav using React + Tailwind CSS + Framer Motion. A pill nav (rounded-full, 1px zinc-200 border, white bg, p-1) holding 4 equal-width items (78px each, 13px font-medium labels '首页 / 作品 / 文章 / 关于'). Track activeIdx in state; a MotionValue x animates to activeIdx * 78 with animate(x, target, { type: 'spring', stiffness: 300, damping: 24 }) on every click. Behind the labels (z-0) sits an absolutely-positioned gooey layer carrying style={{ filter: 'url(#gooeyNavFilter)' }} — the filter is a hidden SVG def: feGaussianBlur stdDeviation 5, then feColorMatrix '1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8', then feComposite atop. Inside the layer: the main indicator (70×32px, rounded-lg, bg-zinc-950) bound to style x plus a velocity stretch — scaleX = useTransform(useVelocity(x), v => 1 + min(|v|/900, 0.55)) so it smears while moving; and a smaller trailing blob (32×20px rounded-full, bg-zinc-950) bound to tailX = useSpring(x, { stiffness: 90, damping: 14 }) so it lags behind and visibly fuses with the indicator through the gooey filter, its scaleY shrinking with speed via useTransform(vx, v => max(0.35, 1 - |v|/2200)). Labels sit in a z-10 flex row; each is a motion.button animating color between #FAFAFA (active, over the dark block) and #52525B with a 250ms tween — the invert. Never mix Tailwind translate classes with motion styles: position the blobs with explicit left/top instead. Light background.`,
  },
  {
    id: 'drag-ball',
    title: '弹簧归位球',
    label: 'DRAG BALL',
    description: '把 36px 的小黑球拖向任意角落——拖动中它沿速度方向拉成椭圆并拖着 3 层残影，松手后带着过冲弹簧飞回原点。',
    categories: ['spring'],
    interaction: 'move',
    component: DragBall,
    prompt: `Create a React component called DragBall using React + Tailwind CSS + Framer Motion, running entirely on MotionValues (zero setState). Inside a relative overflow-hidden preview, center a dashed zinc-300 origin ring (44px) and a draggable 36px ball (rounded-full, bg-zinc-950, cursor-grab, active:cursor-grabbing, touch-none). Position is driven by x/y MotionValues: the ball is a motion.div with drag, dragConstraints bound to the preview container ref, dragElastic 0.12, dragMomentum false, style={{ x, y }}. Velocity squash: take vx/vy from useVelocity(x/y) and derive three useTransforms — stretch = 1 + min(mag/1400, 0.5) for scaleX, squash = 1 - min(mag/5200, 0.18) for scaleY, angle = atan2(vy, vx) in degrees (only above a small 60px/s threshold) — applied to an INNER motion.span wrapping the visible ball so drag transform and squash transform never fight. Three ghost trails render behind the ball: memo-less children binding useSpring(x/y) with progressively lazier springs (stiffness 200/150/110, damping 20/18/18) at opacity 0.22/0.13/0.07. On drag end, fly home with animate(x, 0, { type: 'spring', stiffness: 180, damping: 12 }) and the same for y — a visible overshoot past the origin before settling. Light background, transform/opacity only.`,
  },
];
