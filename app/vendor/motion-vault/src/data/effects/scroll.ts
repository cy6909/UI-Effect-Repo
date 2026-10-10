import type { Effect } from '@/types/effect';
import ZoomHero from '@/components/effects/scroll/ZoomHero';
import TextFocus from '@/components/effects/scroll/TextFocus';
import PinnedSteps from '@/components/effects/scroll/PinnedSteps';
import ZoomThrough from '@/components/effects/scroll/ZoomThrough';
import Timeline from '@/components/effects/scroll/Timeline';
import ScrollVelocity from '@/components/effects/scroll/ScrollVelocity';
import ClipReveal from '@/components/effects/scroll/ClipReveal';
import StatsCount from '@/components/effects/scroll/StatsCount';
import TracingBeam from '@/components/effects/scroll/TracingBeam';
import Tilt3D from '@/components/effects/scroll/Tilt3D';
import LineRevealScroll from '@/components/effects/scroll/LineRevealScroll';
import StickyGallery from '@/components/effects/scroll/StickyGallery';
import ChapterProgress from '@/components/effects/scroll/ChapterProgress';
import RisingTide from '@/components/effects/scroll/RisingTide';
import CombinationLock from '@/components/effects/scroll/CombinationLock';
import DominoRun from '@/components/effects/scroll/DominoRun';

/** 滚动叙事 — scroll-driven stories, each self-contained in an internal scroller. */
export const scrollEffects: Effect[] = [
  {
    id: 'zoom-hero',
    title: '滚动缩放封面',
    label: 'ZOOM HERO',
    description: '封面大图从 1.25 倍缓缓回落至原始尺寸，标题淡出、副标题浮现——电影开场的呼吸感。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: ZoomHero,
    prompt: `Create a React component called ZoomHero using React + Tailwind CSS + Framer Motion. All scrolling happens inside an internal scroll container (320px tall, overflow-y auto, overscroll-contain, thin 4px custom scrollbar) — never hijack page scroll. Inside it place a 2.5×-tall track (800px) with a sticky full-viewport panel. The panel holds a CSS-only landscape: a muted sky gradient (zinc/sage tones), a soft radial sun, and three mountain-silhouette layers drawn with clip-path polygons (light sage in back to deep zinc-green in front) plus a white mist gradient at the bottom. Drive useScroll({ container }) and scrub the landscape's scale from 1.25 to 1 via useTransform over scrollYProgress [0,1]. Overlay a centered title (small mono uppercase label + 2xl semibold Chinese title) that fades out and drifts -24px over progress [0,0.4], and a subtitle that fades in and rises 16px over [0.55,0.9]. Add a sticky 2px scroll-progress hairline at the top of the scroller and a "向下滚动" hint pill that fades out once progress passes 0.06. Transform/opacity only, 60fps.`,
  },
  {
    id: 'text-focus',
    title: '滚动聚焦文字',
    label: 'SCROLL TEXT FOCUS',
    description: '长段落随滚动逐字点亮：文字从 15% 的浅灰依次沉入墨色，滚到哪里读到哪里。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: TextFocus,
    prompt: `Create a React component called TextFocus using React + Tailwind CSS + Framer Motion. Render an internal scroll container (320px tall, overflow-y auto, overscroll-contain, thin custom scrollbar — never the page) holding a ~2.5×-tall padded column: a mono uppercase caption, then a paragraph of ~90 Chinese characters at 18px, font-medium, line-height 2. Split the text into per-character spans (a Char micro-component). Each Char calls useTransform on the shared useScroll({ container }) scrollYProgress, mapping its own slice [i/total, i/total + 1.5/total] to opacity [0.15, 1], so characters light up sequentially from faint grey to full zinc-950 ink as you scroll — the premium "read as you scroll" effect. Pure MotionValue bindings, zero re-renders. Include the sticky top progress hairline and the fading "向下滚动" hint pill.`,
  },
  {
    id: 'pinned-steps',
    title: '钉住步骤切换',
    label: 'PINNED STEPS',
    description: '面板被钉在视窗中：左侧 UI 卡在三档阈值间渐变切换，右侧步骤说明滑过，当前步墨色高亮。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: PinnedSteps,
    prompt: `Create a React component called PinnedSteps using React + Tailwind CSS + Framer Motion. Inside an internal scroll container (320px, overflow-y auto, overscroll-contain, thin scrollbar) place a 3.5×-tall track (1120px) with a sticky split panel. Left: a mock UI card (rounded-xl, border, soft shadow, window dots, big mono word DRAFT/BIND/SHIP, accent bar in muted sage/khaki/zinc) that morphs between three variants with a 300ms opacity+scale crossfade. Right: a masked column of three step descriptions (title + one line) that glides vertically in three steps via useTransform on useScroll({ container }) scrollYProgress with pauses at each stop. Derive the active index from scrollYProgress with useMotionValueEvent (threshold-only setState); the active step is zinc-950, inactive zinc-300, with 300ms color transitions. Add three indicator dots on the right edge (active: zinc-950, scale-125). Top progress hairline + fading "向下滚动" hint included.`,
  },
  {
    id: 'zoom-through',
    title: '滚动穿越卡片',
    label: 'ZOOM THROUGH',
    description: '四张卡片排成纵深队列：最前一张放大掠过镜头淡出，后一张从 0.7 倍放大补位，直至抵达终点。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: ZoomThrough,
    prompt: `Create a React component called ZoomThrough using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern (320px overflow-y auto viewport, overscroll-contain, thin scrollbar, never page scroll) with a ~3× track (1000px) and a sticky centered stage on a zinc-50 background. Stack 4 white cards (230px wide, rounded-xl, border, soft shadow, big mono number 01–04 + Chinese title + one line) absolutely centered with fixed z-index (front card highest). For card i, map useScroll({ container }) scrollYProgress with useTransform: scale [ (i-1)/4, i/4, (i+1)/4 ] → [0.7, 1, 2.8] and opacity [(i-0.55)/4, i/4, (i+0.55)/4, (i+0.95)/4] → [0, 1, 1, 0], so each card grows from the depths, flies past the camera and fades, revealing the next; the last card stops at scale 1 and stays. Smooth scrub, transform/opacity only. Include the top progress hairline and fading "向下滚动" hint.`,
  },
  {
    id: 'timeline',
    title: '滚动时间线',
    label: 'SCROLL TIMELINE',
    description: '中央细线随滚动自上而下生长，五个年份节点在墨迹抵达时依次弹出、圆点填黑。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: Timeline,
    prompt: `Create a React component called Timeline using React + Tailwind CSS + Framer Motion. Render an internal scroll container (320px, overflow-y auto, overscroll-contain, thin custom scrollbar — page scroll never hijacked) holding an 880px-tall relative column. Down the center: a 1px zinc-200 hairline, and a zinc-950 fill line whose scaleY (origin-top) is bound directly to useScroll({ container }) scrollYProgress so the ink grows top→bottom with scroll. Place 5 milestone nodes (2021–2025: mono year, semibold Chinese title, one-line description) at 8%/29%/50%/71%/92% of the track, alternating left/right of the line (cards w-[calc(50%-22px)], small white bordered cards with soft shadow). Each node is a micro-component mapping progress around its threshold: card opacity 0→1 and scale 0.8→1 over [at-0.07, at] (transform-origin toward the line), and a centered dot on the line that scales 0.5→1 and fills from white to #09090b over [at-0.04, at]. Top progress hairline + fading "向下滚动" hint. Transform/opacity only.`,
  },
  {
    id: 'scroll-velocity',
    title: '滚动速度跑马灯',
    label: 'SCROLL VELOCITY',
    description: '大字跑马灯基础匀速前行，容器一滑动就瞬时加速并倾斜，停下后弹簧回稳——速度感直接拉满。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: ScrollVelocity,
    prompt: `Create a React component called ScrollVelocity using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar — never hijack page scroll) containing a 1000px track with a sticky full-viewport white panel. Inside the panel render a big-type marquee: a w-max flex strip holding TWO identical copies of the phrase '滚动越快 · 我越快 · ' repeated 4× at 28px font-semibold tracking-tight, alternating solid zinc-950 and zinc-300 spans. Drive it with a baseX MotionValue advanced in useAnimationFrame at a constant 0.0125 percent/ms, wrapped into [-50%, 0%) via a local wrap helper so the two copies loop seamlessly. Multiply the frame step by a velocity boost: useVelocity(useScroll({ container }).scrollYProgress) → useSpring({ damping: 50, stiffness: 400 }) → useTransform(v => 1 + min(|v| * 6, 14)), so flicking the scroller instantly accelerates the marquee up to 15× and it springs back to cruise speed when you stop. Also derive skewX from the smoothed velocity over [-2, 0, 2] → [-8deg, 0, 8deg] (clamp) and a small velocity meter bar (w-16 h-0.5 zinc-200 track, zinc-950 fill scaleX = min(|v|/1.5, 1), origin-left) in the top-right corner next to a mono uppercase 'SCROLL VELOCITY' label. Add a bottom caption '在容器内快速滑动 —— 我会跟着加速并倾斜', the sticky top progress hairline and the fading "向下滚动" hint pill. Transform/opacity only, 60fps.`,
  },
  {
    id: 'clip-reveal',
    title: '裁切揭示',
    label: 'CLIP REVEAL',
    description: '一张山谷"照片"从中心窄条随滚动缓缓展开到全幅，叠加文字由模糊到清晰——电影揭幕般的仪式感。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: ClipReveal,
    prompt: `Create a React component called ClipReveal using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar, page scroll untouched) with an 800px track and a sticky full-viewport panel on white. The panel holds a CSS-only "photograph" of a valley: a sage sky gradient (linear-gradient 180deg #e6ede4 → #f2efe2 → #faf9f4), a soft radial cream sun top-right, three full-width mountain-ridge layers drawn with clip-path polygons filled back-to-front #bccabc / #8ba08c / #49564c, and a white mist gradient at the bottom. Wrap the photo in an absolutely-positioned inset-0 motion.div whose clipPath is scrubbed via useTransform on useScroll({ container }) scrollYProgress from 'inset(45% 42% 45% 42% round 12px)' to 'inset(0% 0% 0% 0% round 12px)' over [0.08, 0.62] — it starts as a thin center strip and expands to full bleed. Inside the clip, scale the scene 1.18 → 1 over the same range for subtle parallax. Overlay a bottom-left caption (mono uppercase 'VALLEY · 山谷' in white/80, semibold white title '揭幕时刻', one white/70 line) that over progress [0.52, 0.8] fades 0→1, rises 16px→0 and sharpens filter 'blur(8px)'→'blur(0px)'. A small mono 'CLIP REVEAL' label top-left fades out over [0.05, 0.2]. All useTransform input ranges strictly increasing within [0,1]. Include the sticky top progress hairline and the fading "向下滚动" hint.`,
  },
  {
    id: 'stats-count',
    title: '滚动统计计数',
    label: 'STATS COUNT',
    description: '滑到数据区的一瞬间，三枚 mono 大数字从 0 弹簧计数到目标值，下方小条同步生长——年报式的满足感。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: StatsCount,
    prompt: `Create a React component called StatsCount using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar — never page scroll) with a 700px padded column. Top: a mono uppercase caption 'METRICS · 2025' and one grey line '向下滑动，数字开始计数。'. After a 240px gap, render a 3-column grid of stat cards (rounded-xl, 1px zinc-200 border, white bg, p-3): '128 项目交付', '99.9% uptime 可用性', '42k 活跃用户' — big mono semibold numbers (24px) with smaller zinc-500 suffixes. Back each number with a useMotionValue(0); render it via useTransform(v => v.toFixed(decimals)) as a MotionValue child of motion.span so counting never re-renders. Use useMotionValueEvent on useScroll({ container }) scrollYProgress to setState fired=true exactly once when progress > 0.32 (stats fully in view); an effect then calls animate(mv, target, { type: 'spring', stiffness: 70, damping: 20 }) for the three values, stopping on cleanup. Under each number a label (11px zinc-500) and a 3px zinc-100 track whose zinc-950 fill springs scaleX 0 → 0.86 / 0.99 / 0.62 (origin-left, stiffness 90 damping 20, staggered 120ms) when fired. End the column with a centered '— 数据统计完毕 —' caption. Top progress hairline + fading "向下滚动" hint included.`,
  },
  {
    id: 'tracing-beam',
    title: '光束描边',
    label: 'TRACING BEAM',
    description: '文章左侧一条 S 形曲线随滚动被墨水描绘，锌黑光点带光晕始终骑在墨迹最前端。',
    categories: ['scroll', 'svg'],
    interaction: 'scroll',
    component: TracingBeam,
    prompt: `Create a React component called TracingBeam using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar — page scroll never hijacked) holding a 900px article. The article (pl-16) has a mono uppercase caption, a semibold Chinese title, one intro line, then 4 sections, each with a small zinc-950 heading bar and 2–4 rounded placeholder text bars (h-2, zinc-200, varied widths) plus one bordered image placeholder block. Sticky beside it (pointer-events-none sticky top-0 h-0 wrapper, absolutely positioned at left-2 top-5) render a 40×280 rail: an SVG viewBox '0 0 40 280' with an S-curve path ('M 20 4 C 36 44, 4 76, 20 108 C 36 140, 4 172, 20 204 C 34 234, 8 254, 20 276') drawn twice — a zinc-200 track and a zinc-950 beam whose pathLength is bound directly to useScroll({ container }) scrollYProgress so the ink draws with scroll. Ride a glowing dot on the path head: a wrapper div with a blurred zinc-950/25 halo plus a 8px zinc-950 core, positioned by reading path.getTotalLength()/getPointAtLength(progress * len) inside useMotionValueEvent and writing the translate transform straight onto the element — zero re-renders. All useTransform input ranges strictly increasing within [0,1]. Include the sticky top progress hairline and the fading "向下滚动" hint.`,
  },
  {
    id: 'tilt-3d',
    title: '滚动摊平',
    label: 'CONTAINER SCROLL',
    description: '一张"应用截图"卡从 rotateX 24° 的俯瞰姿态随滚动缓缓摊平到正视，上方标题同时上移淡出——产品发布页的经典开场。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: Tilt3D,
    prompt: `Create a React component called Tilt3D using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar, never page scroll) with a 680px track and a sticky full-viewport centered stage. Above the card, a title block (mono uppercase 'PRODUCT LAUNCH' caption + semibold Chinese title) drifts y 0 → -44 and fades opacity 1 → 0 over progress [0, 0.35]. Below it, wrap a 280px mock app screenshot card in a div with style perspective 900px; the card itself is a motion.div with transformStyle preserve-3d whose rotateX maps scrollYProgress [0.08, 0.6] → [24, 0] degrees, scale [0.88, 1] and y [24, 0] — it starts tilted back like a product-launch hero and flattens to a straight-on view as you scroll. The screenshot is pure CSS: a window chrome bar (zinc-50, three zinc-300 dots, a zinc-200 address pill), then a flex body — a 56px sidebar (zinc-50, stacked bars, one zinc-300 active) and a main pane with a zinc-800 title bar, two zinc-200 text bars and three small gradient thumbnails (zinc-100 → zinc-300). Rounded-xl, 1px zinc-200 border, soft shadow-xl. All useTransform ranges strictly increasing inside [0,1]; transform/opacity only. Top progress hairline + fading "向下滚动" hint included.`,
  },
  {
    id: 'line-reveal-scroll',
    title: '逐行揭示',
    label: 'LINE MASK REVEAL',
    description: '六行文字各自藏在 overflow-hidden 遮罩里，随滚动逐行从 110% 下方揭面升起，行内的轻微模糊同步散去。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: LineRevealScroll,
    prompt: `Create a React component called LineRevealScroll using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar — never hijack page scroll) with a 760px track and a sticky full-viewport padded panel (px-9). Center a mono uppercase 'LINE BY LINE' caption, then six lines of Chinese text at 19px font-medium tracking-wide zinc-950. Each line is wrapped in its own overflow-hidden mask div (py-0.5); the inner motion.p binds useScroll({ container }) scrollYProgress via useTransform over its own strictly-increasing slice — line i maps [0.06 + i*0.13, 0.06 + i*0.13 + 0.16] to y ['110%', '0%'], plus filter 'blur(6px)' → 'blur(0px)' over the last two-thirds of the slice and opacity 0 → 1 over the first 0.04 — so lines surface one after another, rising out of the mask while the blur clears (distinct from per-character opacity lighting). End with a faint mono footnote '06 LINES · MASKED REVEAL'. Pure MotionValue bindings, zero re-renders, clamp default on. Top progress hairline + fading "向下滚动" hint included.`,
  },
  {
    id: 'sticky-gallery',
    title: '粘性画廊',
    label: 'STICKY GALLERY',
    description: '左侧编号标题随进度在 01 晨曦 / 02 正午 / 03 暮色间切换，右侧三张柔色渐变场景卡交叉淡入淡出，带轻微缩放视差。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: StickyGallery,
    prompt: `Create a React component called StickyGallery using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar, page scroll untouched) with a 1000px track and a sticky full-viewport split panel (flex, items-center, gap-6, px-8). Left column (w-28): three rows '01 晨曦' / '02 正午' / '03 暮色' (mono 11px number + 15px Chinese title); derive the active index from useScroll({ container }) scrollYProgress via useMotionValueEvent (thresholds 0.36 / 0.69, setState only on change) — the active row is zinc-950, translate-x-1, title scale-110 semibold; inactive rows are zinc-300, all with 300ms transitions. Under the list a one-line caption swaps with the active scene. Right: a relative h-[220px] flex-1 stage stacking three absolutely-positioned scene cards (rounded-lg, 1px zinc-200 border, overflow-hidden) filled with muted gradients — dawn (linear 160deg #f6ece2 → #d9d4cf), noon (#eef1f3 → #c6cdd2), dusk (#e4dde6 → #9d97a8) — plus a white/50 horizon hairline, a soft white blurred sun disc and a mono corner label. Crossfade with useTransform on scrollYProgress: scene 0 visible [0, 0.3] then fades [0.3, 0.42] → 0; scene 1 [0.3, 0.42] in, [0.63, 0.75] out; scene 2 fades in [0.63, 0.75] and stays — all ranges strictly increasing within [0,1]. Add slow parallax: each card scale 1.08 → 1 and y 14 → -14 across its visible span. Top progress hairline + fading "向下滚动" hint included.`,
  },
  {
    id: 'chapter-progress',
    title: '章节进度',
    label: 'CHAPTER PROGRESS',
    description: '左侧竖排 壹/贰/叁/肆 章节标记随滚动逐个点亮放大，一条 1px 竖线沿标记同步向下生长。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: ChapterProgress,
    prompt: `Create a React component called ChapterProgress using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern: a 320px overflow-y auto viewport (overscroll-contain, thin custom scrollbar — page scroll never hijacked) with an 880px content column (pl-24, space-y-16) of four chapter sections: mono uppercase 'CHAPTER 01–04' caption, a 19px semibold Chinese title (起点 / 跋涉 / 转折 / 抵达), one zinc-500 line, and three zinc-100 placeholder text bars. Sticky on the left (pointer-events-none sticky top-0 h-0 wrapper, rail absolutely positioned left-6 top-5): a 280px-tall 1px zinc-200 vertical line with a zinc-950 fill whose scaleY (origin-top) is bound directly to useScroll({ container }) scrollYProgress so the ink grows downward with scroll. Overlay four circular markers (h-7 w-7, rounded-full, border, white bg, Chinese numerals 壹/贰/叁/肆) evenly spaced along the line (justify-between). Derive the active chapter from scrollYProgress via useMotionValueEvent (thresholds 0.28 / 0.52 / 0.76, setState only on change): the active marker is scale-125, border-zinc-950, text-zinc-950; inactive are border-zinc-200 text-zinc-300 — 300ms transitions. Section titles also shift zinc-300 → zinc-950 when their chapter is active. Top progress hairline + fading "向下滚动" hint included.`,
  },
  {
    id: 'rising-tide',
    title: '滚动涨潮',
    label: 'RISING TIDE',
    description: '滚动一寸，潮水一寸：水位线推着浪花持续上涨，城市剪影在半透明海水中渐渐沉没，纸船与浮标随水面起伏，右侧水位计同步读数。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: RisingTide,
    prompt: `Create a React component called RisingTide using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern (320px overflow-y auto viewport, thin custom scrollbar, progress hairline + fading '向下滚动' hint — page scroll never hijacked) with an 1100px track and a sticky top-0 h-[320px] full-bleed harbor scene. Sky: vertical gradient #fafafa → #e4e4e7 with a pale amber sun disc (blur-[1px], 50% alpha) top-right. Skyline: a bottom-anchored flex row of twelve buildings (heights 40–120px, alternating #d4d4d8 / #c3c3ca) whose windows are two repeating-linear-gradients (horizontal + vertical 7–9px white bands at ~50% alpha). The tide: a bottom-anchored water layer whose height is useTransform(scrollYProgress, [0,1], ['6%','84%']), filled with a translucent vertical gradient (rgba(147,180,205,.72) → rgba(84,118,148,.82)) so drowned buildings visibly dim through the water; its waterline is an SVG wave (800×8 viewBox, repeating quadratic humps, w-[200%], CSS keyframes translateX 0→-50% over 5s, infinite linear) in rgba(147,180,205,.95). Riders pinned to the same waterline MotionValue (style bottom): a white paper boat at left 26% (border-triangle sail + clip-path zinc-800 hull, bobbing y [0,-3,0] + rotate [-3,2.5,-3] over 2.4s) and two amber-400 buoys at 12% / 62% with offset bob phases (1.9s / 2.4s). Depth gauge at right-4: a 224px 1px zinc-300 vertical ruler with five tick marks, a zinc-950 marker riding the same 6%→84% mapping, and a mono tabular-nums readout 水位 0.0–4.2m synced via useMotionValueEvent (setState only when the rounded string changes). Bottom-left phase chip (white/85 backdrop-blur pill, mono index + Chinese text) switches at progress 0.22 / 0.5 / 0.8: 涨潮开始 · 水漫过堤岸 → 街道沉没 · 只余楼身 → 深水区 · 屋顶相继消失 → 潮汐顶点 · 一片汪洋. All motion transform/height-based, zero layout thrash.`,
  },
  {
    id: 'combination-lock',
    title: '滚动密码锁',
    label: 'COMBINATION LOCK',
    description: '滚动驱动保险箱刻度盘：先转一圈半到 7，反向回转到 2，再回落到 5，三位密码逐格点亮，最后箱门带着 3D 透视摆开，露出机密卷宗。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: CombinationLock,
    prompt: `Create a React component called CombinationLock using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern (320px overflow-y viewport, custom thin scrollbar, progress hairline + fading scroll hint) with an 1100px track and a sticky centered 320px scene. The safe: a 176×176 rounded-2xl zinc-100 door (1px zinc-200 border, soft 12px/32px shadow) in a perspective-900 wrapper, swung open at the end with rotateY 0 → −104 (useTransform on scrollYProgress over [0.88,1], transformOrigin left, backface-visibility hidden) revealing a zinc-950 interior (FolderOpen icon, mono 'ARCHIVE · 1987', 机密卷宗, and an emerald 'UNLOCKED' chip fading in past progress 0.92). The dial is a 128px SVG: 60 tick marks (major every 6th, zinc-500/zinc-200), numerals 0–9 on a 41px radius (10px mono zinc-500), and a zinc-900 center knob; rotation = useSpring(useTransform(progress, [0,.22,.32,.5,.6,.78,.86], [0,-612,-612,-72,-72,-540,-540]), stiffness 110 damping 15) so the dial spins 1.7 turns to 7, reverses a full turn to 2, settles back on 5 — each dwell landing with a soft spring overshoot like a real detent. A fixed triangle marker sits at 12 o'clock. Below the dial, three readout chips (24px rounded-md) start as '·' on zinc-300 borders and flip to white-on-zinc-950 digits 7 / 2 / 5 when progress passes 0.2 / 0.48 / 0.76 (derive via useMotionValueEvent, setState on change only). Bottom-left caption chip narrates: 滚动 · 旋转刻度盘 → 第一位确认 — 7 → 第二位确认 — 2 → 第三位确认 — 5 → 咔哒 — 保险柜开了.`,
  },
  {
    id: 'domino-run',
    title: '滚动多米诺',
    label: 'DOMINO RUN',
    description: '滚动推倒九块多米诺：每块弹簧过冲地砸向下一块，连锁一路传到尽头，最后一块撞响铃铛，声波荡开，一声「叮」。',
    categories: ['scroll'],
    interaction: 'scroll',
    component: DominoRun,
    prompt: `Create a React component called DominoRun using React + Tailwind CSS + Framer Motion. Use the internal-scroll-container pattern (320px overflow-y viewport, thin custom scrollbar, progress hairline + fading scroll hint) with a 1000px track and a sticky 320px stage. Nine dominoes stand on a 1px zinc-200 baseline (bottom-16, px-4 stage): each is 14×64px, rounded-[3px], zinc-900 with a single white pip dot at center, spaced 30px apart starting at left 20px, z-index increasing left→right so each fallen domino lies on the next. Tipping: domino i maps scrollYProgress [0.05 + i·0.082, +0.075] → rotate 0 → 66° (transformOrigin '100% 100%', pivoting on its bottom-right edge), smoothed by useSpring (stiffness 420, damping 13) so it overshoots and wobbles as it slaps down; overlapping windows make the chain continuous. A live counter pill (top-left, mono uppercase, tabular-nums) reads 已倾倒 n / 9, derived via useMotionValueEvent (a domino counts fallen at 40% through its window; setState on change only). At the end of the run (62px past the last domino): a 36px circle button with a Bell icon — past progress 0.82 it turns amber (amber-50 bg, amber-500 icon) and swings rotate keyframes [-22,15,-9,5,0] over 900ms pivoting from its top, two expanding amber sound-ripple rings (scale 0.5→1.9 fade, 180ms apart), and a '叮!' zinc-950 pill pops above it with a spring. Scrolling back below 0.5 resets the bell. Bottom-left phase chip: 滚动 · 推倒第一块 → 连锁反应进行中… → 势不可挡 → 全部倒下 — 铃声为证.`,
  },
];
