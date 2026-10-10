import type { Effect } from '@/types/effect';
import HoverExpandCards from '@/components/effects/layout/HoverExpandCards';
import CardFan from '@/components/effects/layout/CardFan';
import GridExpand from '@/components/effects/layout/GridExpand';
import NotificationStack from '@/components/effects/layout/NotificationStack';
import AccordionGallery from '@/components/effects/layout/AccordionGallery';
import CardSwapCycle from '@/components/effects/layout/CardSwapCycle';
import DockBar from '@/components/effects/layout/DockBar';
import DepthCarousel from '@/components/effects/layout/DepthCarousel';
import MorphSlider from '@/components/effects/layout/MorphSlider';
import InertiaDragStack from '@/components/effects/layout/InertiaDragStack';
import InfiniteMoving from '@/components/effects/layout/InfiniteMoving';
import ExpandCard from '@/components/effects/layout/ExpandCard';
import LayoutGrid from '@/components/effects/layout/LayoutGrid';
import BounceCards from '@/components/effects/layout/BounceCards';

export const layoutEffects: Effect[] = [
  {
    id: 'hover-expand-cards',
    title: '悬停扩展卡片组',
    label: 'HOVER EXPAND',
    description: '一排低饱和渐变色板，悬停某一块时它舒展至约六成宽，其余 siblings 安静让位。',
    categories: ['card'],
    interaction: 'hover',
    component: HoverExpandCards,
    prompt: `Create a React component called HoverExpandCards using React + Tailwind CSS + Framer Motion. Render a horizontal flex row of 4 panels inside a white rounded-xl container (1px zinc-200 border, overflow-hidden, height 320px, max-width 700px, centered in the preview). Each panel starts with flex-grow 1 and flex-basis 0; they are separated by hairline 1px dividers (border-l, black at 10% opacity) and filled with distinct muted low-saturation gradients: sand (#EFE9DD → #E7E0D3), sage (#E6ECE1 → #DDE5D8), sky (#E2EAF1 → #D8E2EA) and clay (#F0E4DC → #E8DAD2), each at a 165deg angle. Track the hovered panel index in useState (set on mouseenter per panel, cleared on the row's mouseleave) and animate flexGrow with Framer Motion: hovered panel grows to 4.2 (≈60% of the row) while siblings stay at 1, transition 600ms with cubic-bezier(0.22, 1, 0.36, 1). Collapsed panels show a vertical title: mono 12px, zinc-600, letter-spacing 0.3em, using CSS writing-mode vertical-rl, centered. In the expanded panel the vertical label fades out (250ms) and a bottom-anchored block fades in with an 8px upward rise and 150ms delay: a small mono uppercase label (11px, zinc-500), a 15px semibold title (zinc-800), and a 2-line description (12px, zinc-600, line-height 1.7, line-clamp-2). Animate opacity/transform only besides flexGrow; add cursor-pointer on panels.`,
  },
  {
    id: 'card-fan',
    title: '扇形卡叠',
    label: 'CARD FAN',
    description: '五张白色卡片原本微微错落地叠着，悬停时以底部为轴扇形展开，离开时收回。',
    categories: ['card'],
    interaction: 'hover',
    component: CardFan,
    prompt: `Create a React component called CardFan using React + Tailwind CSS + Framer Motion. Render 5 white cards (132px × 190px, rounded-xl, 1px zinc-200 border, soft shadow 0 10px 30px -12px rgba(0,0,0,0.15)) absolutely stacked at the horizontal center of a relative wrapper. Each card contains tiny mock content: a 24px zinc-200 avatar dot next to a short text bar, two full-width zinc-100 text bars below, and a small mono index (01–05, zinc-300) at the bottom-left. At rest the stack has slight offsets: rotate (i-2)*1.4deg, translateX (i-2)*6px, translateY -i*2px, with the middle card on top (zIndex 10 - |i-2|). On wrapper hover (mouseenter/mouseleave toggling a boolean in useState), animate every card with a spring (stiffness 260, damping 20) into a fan: rotations -16deg, -8deg, 0deg, 8deg, 16deg, translateX -132, -66, 0, 66, 132, and a subtle arc translateY of 10, 4, 0, 4, 10. Set transform-origin to 50% 100% so every card pivots around its bottom center. On mouse leave the same spring gathers the cards back into the stack. Transform and opacity only — keep it 60fps.`,
  },
  {
    id: 'grid-expand',
    title: '点击展开画廊',
    label: 'GRID EXPAND',
    description: '2×2 的渐变小卡，点击任意一张便以共享布局动画放大铺满预览窗，其余退成 30%。',
    categories: ['card'],
    interaction: 'click',
    component: GridExpand,
    prompt: `Create a React component called GridExpand using React + Tailwind CSS + Framer Motion. Render a 2×2 CSS grid (height 240px, max-width 520px, gap 12px) of cards, each a soft low-saturation gradient (sand #F0EAE0→#E7E0D3, sage #E8EDE3→#DDE5D8, sky #E4EBF2→#D8E2EA, clay #F1E6DE→#E8DAD2, all 135deg) with rounded-xl corners, a hairline border (black 5%) and a small mono label like "A · 01" (11px, zinc-500) anchored bottom-left. Wrap everything in a Framer Motion LayoutGroup and give each grid card a layoutId like grid-expand-{i}. When a card is clicked (index in useState), swap its grid cell for an empty placeholder div and mount an absolutely positioned overlay (inset 16px, z-10) with the SAME layoutId so it FLIP-morphs from the grid cell to fill the preview area over 500ms with ease-in-out cubic-bezier(0.42, 0, 0.58, 1); the unopened grid cards fade to 30% opacity. The expanded overlay reveals, with a 200ms delayed fade + 10px rise, the mono label, an 18px semibold title (zinc-800) and a 13px two-sentence description (zinc-600, line-height 1.7), plus a circular close button (28px, white/70 with backdrop-blur, hairline border, an X icon from lucide-react) at the top-right. Clicking the X — or anywhere on the expanded card — unmounts the overlay inside AnimatePresence so it morphs back into its grid cell.`,
  },
  {
    id: 'notification-stack',
    title: '通知卡叠展开',
    label: 'NOTIFICATION STACK',
    description: '收起时只有一条通知和身后两层探出的边缘，悬停便像 iOS 通知中心一样纵向铺开。',
    categories: ['card'],
    interaction: 'hover',
    component: NotificationStack,
    prompt: `Create a React component called NotificationStack using React + Tailwind CSS + Framer Motion that mimics the iOS notification stack. Render 3 notification cards (300px wide, 64px tall, white, rounded-2xl, 1px zinc-200 border, soft shadow 0 8px 24px -10px rgba(0,0,0,0.12)) absolutely positioned at the top of a relative 300px × 230px wrapper. Each card shows a 28px muted-pastel avatar dot, a 12.5px medium title (zinc-800), a short zinc-100 text bar, and a mono 10px zinc-400 timestamp on the right ("现在" / "5 分钟前" / "1 小时前"). Collapsed state: card i sits at translateY i*9px and scale 1 - i*0.05 with transform-origin top center, so only two hairline edges peek out behind the front card, and a small dark badge (zinc-950 circle, white mono "3") sits at the front card's top-right corner. On wrapper hover toggle a boolean in useState and animate every card with a spring (stiffness 300, damping 24) to translateY i*74px at scale 1, staggered 60ms per card (reverse the stagger to 40ms when collapsing); the badge fades and scales out in 200ms. On mouse leave the stack springs back into the pile. Transform and opacity only for a smooth 60fps feel.`,
  },
  {
    id: 'accordion-gallery',
    title: '手风琴画廊',
    label: 'ACCORDION GALLERY',
    description: '五张竖条色板并排而立，悬停某条便从 1 → 3.5 平滑展开，竖排标签转正并浮现一行描述，其余安静收缩。',
    categories: ['card'],
    interaction: 'hover',
    component: AccordionGallery,
    prompt: `Create a React component called AccordionGallery using React + Tailwind CSS. Render a horizontal flex row of 5 vertical strips inside a white rounded-xl container (1px zinc-200 border, overflow-hidden, height 300px, max-width 680px, centered in the preview), separated by hairline 1px dividers (black 10%). Each strip has a muted low-saturation vertical gradient (sand #EFE9DD→#E3DACA, sage #E6ECE1→#D8E2D2, mist #E2EAF1→#D2DDE7, clay #F0E4DC→#E4D2C6, ink #E4E4E7→#D4D4D8), starts at flex-grow 1 with flex-basis 0, and tracks hover via onMouseEnter/onMouseLeave setting an active index in useState. The hovered strip animates to flex-grow 3.5 with a pure CSS transition on flex-grow (0.6s cubic-bezier(0.22, 1, 0.36, 1)) while siblings stay at 1 and shrink. Collapsed strips show a vertical mono label (12px, zinc-600, letter-spacing 0.3em, writing-mode vertical-rl, centered) that fades out in 250ms when active. The expanded strip cross-fades in a bottom-anchored block with an 8px upward settle and 120ms delay: a mono uppercase label with index ("SAND · 01", 11px, zinc-500), a 15px semibold Chinese title (zinc-800) and a one-line description (12px, zinc-600) on the same line. Keep everything whitespace-nowrap so text never wraps mid-animation; animate opacity/transform besides flex-grow only.`,
  },
  {
    id: 'card-swap-cycle',
    title: '卡片换位',
    label: 'CARD SWAP CYCLE',
    description: '三张错位微旋的卡片叠放：每 4 秒顶卡向前上方抽出并淡化，从后方落回牌堆最底，其余卡片前移补位，如循环洗牌。',
    categories: ['card'],
    interaction: 'auto',
    component: CardSwapCycle,
    prompt: `Create a React component called CardSwapCycle using React + Tailwind CSS + Framer Motion. Render three cards (320×168px, rounded-xl, hairline zinc-950/10 border, soft shadow, muted pastel gradient faces — sand/sky/sage — each with a mono uppercase deck tag, a semibold Chinese title and two rounded skeleton bars) absolutely stacked in a fixed 320×230px wrapper with slight offsets and rotations: front y 0 / rotate −2.5deg / scale 1 / zIndex 30, middle y 15 / rotate 1.8deg / scale 0.95 / opacity 0.92 / zIndex 20, back y 30 / rotate −1.2deg / scale 0.9 / opacity 0.75 / zIndex 10. Drive the cycle with an order array in useState: a setInterval (4000ms, only running while in view via IntersectionObserver) moves the front id to the back. Each card is a motion.div keyed by id with initial={false}; the card moving from front to back animates with keyframes — y [0, −78, −78, 30], rotate [−2.5, 2, 2, −1.2], scale [1, 1.04, 1.04, 0.9], opacity [1, 0, 0, 0.75], zIndex [30, 40, 5, 10] over 850ms with times [0, 0.38, 0.6, 1] — so it draws out forward-up, fades, and drops in from behind the stack, while the remaining cards step forward with a 550ms cubic-bezier(0.22, 1, 0.36, 1) tween. Track the previous order in a ref to identify the card that must take the keyframe path; all others tween to their new slot.`,
  },
  {
    id: 'dock-bar',
    title: '悬浮 Dock 栏',
    label: 'DOCK MAGNIFICATION',
    description: 'macOS 式 Dock：七枚锌色渐变图标排于底部，鼠标掠过时按距离放大（48 → 72px）并上浮，丝滑无 setState。',
    categories: ['card'],
    interaction: 'move',
    component: DockBar,
    prompt: `Create a React component called DockBar using React + Tailwind CSS + Framer Motion + lucide-react, recreating the macOS dock magnification. Render a frosted bar (white/75, backdrop-blur, 1px zinc-200 border, rounded-2xl, soft shadow, px-4 py-3, gap-3) bottom-centered in the preview (items-end, pb-12), holding 7 icon tiles (Home, Search, Compass, Music, Camera, Mail, Settings from lucide-react, white zinc-100 strokes at 50% size) on muted zinc gradient tiles (e.g. zinc-600→zinc-800, zinc-500→zinc-600, zinc-700→zinc-900 variants, rounded-xl, soft inner shadow). Keep a single mouseX useMotionValue on the bar: set it to e.clientX on pointermove and to Infinity on pointerleave — never useState in the pointer path. Each icon is a memoizable child holding a ref to its div: derive distance = useTransform(mouseX, x => x − rect.x − rect.width/2) measured live from getBoundingClientRect, then size = useSpring(useTransform(distance, [−110, 0, 110], [48, 72, 48]), { mass: 0.1, stiffness: 170, damping: 13 }), bound to width/height via style. Because the bar uses items-end alignment, magnified icons grow upward and lift off the baseline automatically — smooth 60fps magnification that ripples to neighbors by distance.`,
  },
  {
    id: 'depth-carousel',
    title: '纵深轮播',
    label: 'DEPTH CAROUSEL',
    description: '四张卡沿 z 轴纵深排队，点击「下一张」前卡向侧上方飞出淡出，后卡依次弹簧推进，循环不止。',
    categories: ['card'],
    interaction: 'click',
    component: DepthCarousel,
    prompt: `Create a React component called DepthCarousel using React + Tailwind CSS + Framer Motion. Render 4 abstract cards (280px wide, 170px tall, rounded-xl, hairline zinc-950/10 border, soft shadow, muted low-saturation gradient faces — mist #E4EBF2→#D8E2EA, sand #F0EAE0→#E7E0D3, sage #E8EDE3→#DDE5D8, clay #F1E6DE→#E8DAD2, each with a mono uppercase tag like "FRAME · 01", a semibold title and two rounded skeleton bars) absolutely stacked in a 280×210px relative wrapper, queued along the z axis: front slot y 0 / scale 1 / opacity 1, then y 16 / scale 0.93 / opacity 0.8, y 32 / scale 0.89 / opacity 0.62, and the rearmost y 48 / scale 0.85 / opacity 0.45, zIndex decreasing with depth. Drive the queue with an order array in useState. A pill button below the stack reads "下一张 →" (mono 11px, white bg, zinc-200 border, rounded-full). On click, render the front card as a separate flying element animating from its rest pose to x -230 / y -90 / rotate -14deg / opacity 0 / scale 0.96 over 420ms ease-in, while the order array rotates (front id moved to the back) so the remaining cards spring forward through their slots with a spring of stiffness 220 and damping 20; after ~420ms clear the flying state so the card remounts at the very back fading in from opacity 0 — an endless loop. Ignore clicks while a card is mid-flight. Transform and opacity only.`,
  },
  {
    id: 'morph-slider',
    title: '形变幻灯',
    label: 'MORPH SLIDER',
    description: '单卡内容切换时整卡形变过渡：旧内容收缩到 0.9、圆角 24px 并淡出，新内容从同一形变态展开。',
    categories: ['card'],
    interaction: 'click',
    component: MorphSlider,
    prompt: `Create a React component called MorphSlider using React + Tailwind CSS + Framer Motion + lucide-react. Render a single 300×180px card centered in the preview (absolute inset-0 inside a fixed-size relative wrapper), each slide a muted low-saturation gradient (mist #E4EBF2→#D8E2EA, sand #F0EAE0→#E7E0D3, sage #E8EDE3→#DDE5D8, clay #F1E6DE→#E8DAD2, all 135deg) with a mono uppercase tag ("SLIDE · 01"), a 15px semibold zinc-800 title and a one-line 12px zinc-600 description. Track the slide index in useState and wrap the card in AnimatePresence with mode="popLayout" and initial={false}: on every switch the whole card morphs — exit to scale 0.9 / borderRadius 24px / opacity 0 while the incoming slide mounts from that exact morphed state and expands to scale 1 / borderRadius 16px / opacity 1, all over 450ms with cubic-bezier(0.22, 1, 0.36, 1), so the transition reads as the card itself deforming rather than two cards crossfading. Below the card render a control row: two 28px circular arrow buttons (ChevronLeft / ChevronRight from lucide-react, white bg, zinc-200 border, active:scale-95) flanking 4 indicator dots — the active dot stretches to a 16px-wide zinc-800 pill, inactive dots are 6px zinc-300 circles, morphing with a 300ms width transition; dots are clickable to jump directly. Wrap the index modulo the slide count for both directions.`,
  },
  {
    id: 'inertia-drag-stack',
    title: '惯性拖拽牌堆',
    label: 'INERTIA DRAG STACK',
    description: '一叠四张卡，最上面可拖拽：甩出阈值后带旋转惯性飞离，下一张弹簧补位，飞离的卡回到牌堆底部。',
    categories: ['card'],
    interaction: 'move',
    component: InertiaDragStack,
    prompt: `Create a React component called InertiaDragStack using React + Tailwind CSS + Framer Motion. Render a pile of 4 abstract cards (260×150px, rounded-xl, hairline zinc-950/10 border, soft shadow, muted pastel gradient faces with a mono uppercase tag like "CARD · A", a 13px semibold title and two skeleton bars) absolutely stacked in a 260×215px relative wrapper. Depth comes from an order array in useState: position 0 is scale 1 / y 0 / opacity 1, then scale 0.94 / y 12 / opacity 0.75, scale 0.88 / y 24 / opacity 0.5, scale 0.82 / y 36 / opacity 0.32, all spring-animated (stiffness 320, damping 26). The top card is draggable: Framer Motion drag="x" with an x MotionValue bound via style, rotate derived from x via useTransform (-240px→-12deg, 240px→12deg), cursor grab/grabbing and touch-none. On drag end, dismiss the card when |offset.x| > 110px OR |velocity.x| > 600: render it as a separate flying element starting from the release point and animate it to x ±520 / y -50 / rotate releaseRotate ± 22deg / opacity 0 with a velocity-inherited duration — clamp(300/|velocity.x|, 0.26s, 0.55s), ease-out — so harder flings leave faster; simultaneously reorder the array (dismissed id to the end) so the deck springs forward, and after the flight clear the flying state so the card remounts at the bottom fading in from opacity 0 — infinitely playable. Under the threshold, spring x back to 0 (stiffness 400, damping 28). Float a small white pill chip reading "拖拽甩出" (mono 10px, hairline border) above the top card.`,
  },
  {
    id: 'infinite-moving',
    title: '无限横滚卡带',
    label: 'INFINITE MOVING CARDS',
    description: '六张卡片带以 30 秒一圈无缝横滚（双拷贝位移折返），悬停减速至 0.2 倍，两端渐隐遮罩。',
    categories: ['card'],
    interaction: 'auto',
    component: InfiniteMoving,
    prompt: `Create a React component called InfiniteMoving using React + Tailwind CSS + Framer Motion, recreating the Aceternity "Infinite Moving Cards". Render 6 abstract cards (200×130px, rounded-xl, hairline zinc-950/10 border, soft shadow, muted low-saturation gradients — mist/sand/sage/clay/ink/dawn variants — each with a mono uppercase tag like "TAPE · 01", a 13px semibold title and one skeleton bar) on a horizontal flex track with 16px gaps, duplicated once so two identical copies sit back to back (one copy = 6 × 216px = 1296px wide). Drive the loop with Framer Motion's useAnimationFrame on an x MotionValue: advance x leftward at 1296px per 30s (≈43.2px/s... i.e. COPY_W / 30000 px per ms × delta), and when x passes -COPY_W add COPY_W back so the tape wraps seamlessly — never use setState in the frame loop. Keep a speed factor in a ref that eases (lerp 0.06 per frame) toward 0.2 while the wrapper is hovered and back to 1 on leave, multiplying the per-frame delta so the tape smoothly decelerates to a crawl instead of snapping. Gate the frame loop with an IntersectionObserver in-view flag. Overlay both ends with pointer-events-none gradient masks (64px wide, from the preview background #FAFAFA to transparent) so cards fade in and out at the edges. Isolate the perpetual animation in a React.memo'd micro-component so parent re-renders never reset it.`,
  },
  {
    id: 'expand-card',
    title: '弹性展开卡',
    label: 'EXPANDABLE CARD',
    description: '小卡点击后弹性展开为大详情卡：封面与标题作为共享元素连续变形，遮罩淡入，点空白或 ✕ 收回。',
    categories: ['card'],
    interaction: 'click',
    component: ExpandCard,
    prompt: `Create a React component called ExpandCard using React + Tailwind CSS + Framer Motion + lucide-react, recreating the Aceternity "Expandable Card". Wrap the preview in a LayoutGroup. Resting state: a small 230px-wide white card (rounded-xl, 1px zinc-200 border, soft shadow, cursor-pointer) with a 104px-tall muted gradient cover (mist blue #E4EBF2→#D8E2EA blending into sand #E7E0D3) and a header block below it — a mono uppercase tag ("DETAIL · 01", 10px zinc-400) and a 13px semibold zinc-900 title. Give the card, cover and title Framer Motion layoutIds (e.g. expand-card / expand-cover / expand-title). On click, swap to the expanded state inside AnimatePresence: a dimmed backdrop (zinc-950 at 15% + 2px backdrop-blur) fading in over 300ms and clickable to close, plus a large detail card (320px wide, max 86% of the preview, absolutely centered, z-20, white, rounded-2xl, deep shadow) reusing the SAME three layoutIds so cover and title FLIP-tween continuously from the small card to the big one with a spring (stiffness 260, damping 26) — the cover stretches to 140px tall, the title grows to 15px. The detail body (a 12px two-sentence zinc-600 description at line-height 1.7 and two zinc-100 skeleton bars) fades in with an 8px rise after a 180ms delay, and a 28px circular close button (white/70, backdrop-blur, hairline white/60 border, X icon from lucide-react) sits on the cover's top-right. Clicking the backdrop or the X unmounts the expanded state so every shared element springs back into the small card.`,
  },
  {
    id: 'layout-grid',
    title: '网格主位放大',
    label: 'LAYOUT GRID',
    description: '2×3 网格中点击某格，它弹性占据左侧主区域，其余五格退到右列小格，文字内容交叉淡入淡出。',
    categories: ['card'],
    interaction: 'click',
    component: LayoutGrid,
    prompt: `Create a React component called LayoutGrid using React + Tailwind CSS + Framer Motion, recreating the Aceternity "Layout Grid". Render 6 abstract tiles (muted low-saturation gradients — mist #E4EBF2→#D8E2EA, sand #F0EAE0→#E7E0D3, sage #E8EDE3→#DDE5D8, clay #F1E6DE→#E8DAD2, ink #E4E4E7→#D4D4D8, dawn #ECECEF→#DEDEE2 — each rounded-xl with a hairline zinc-950/10 border, a mono uppercase tag like "GRID · 01" and a short title) inside a 280px-tall container (max-width 560px) split into a large main slot on the left (grid-template-columns 1.6fr 1fr, 12px gap) and a 2-column mini grid on the right holding the remaining five tiles. Track the active index in useState. Wrap everything in a Framer Motion LayoutGroup and give every tile a stable layoutId (layout-grid-{i}) plus the layout prop: when a mini tile is clicked it springs into the main slot while the previous main tile and the other minis reflow into the right column — a true grid layout tween with a spring of stiffness 210 and damping 24. Crossfade each tile's content with AnimatePresence mode="wait" keyed on its big/small state (220ms opacity): the main tile reveals its 15px semibold title plus a one-line 12px zinc-600 description, while minis show only an 11px semibold title. Tiles are buttons with cursor-pointer; transform/opacity only besides the layout animation.`,
  },
  {
    id: 'bounce-cards',
    title: '弹性让位',
    label: 'BOUNCE CARDS',
    description: '五张卡微扇形叠放，悬停某张它抬升转正，相邻卡按距离向两侧倾斜让位，回弹感十足。',
    categories: ['card'],
    interaction: 'hover',
    component: BounceCards,
    prompt: `Create a React component called BounceCards using React + Tailwind CSS + Framer Motion, recreating the React Bits "Bounce Cards". Render 5 abstract cards (120×170px, rounded-xl, hairline zinc-950/10 border, soft shadow, muted low-saturation 160deg gradients — mist/sand/sage/clay/ink — each with a mono uppercase tag like "BC · 01" and one skeleton bar) absolutely centered in a 360×200px relative wrapper (center via left/top 50% + negative margins so transforms stay free). At rest they form a tight fan: with off = i − 2, each card sits at x off*52, y |off|*6, rotate off*4deg, zIndex 10 − |off| so the middle card is on top. Track the hovered index in useState via mouseenter/mouseleave per card. On hover, animate every card with a bouncy spring (stiffness 350, damping 18): the hovered card lifts to y -22, straightens to rotate 0 and scales to 1.06 with zIndex 30; each neighbor makes room with a distance falloff of 1/|i − hovered| — shifting x by dir*18*fall, adding y 6*fall and tilting rotate by dir*10*fall degrees toward its side, where dir = sign(i − hovered). On mouse leave all cards spring back into the fan. Transform and opacity only; cursor-pointer on the cards.`,
  },
];
