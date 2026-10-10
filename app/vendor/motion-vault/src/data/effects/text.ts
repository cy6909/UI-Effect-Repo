import type { Effect } from '@/types/effect';
import BlurFadeInPreview from '@/components/effects/text/BlurFadeInPreview';
import LetterStaggerPreview from '@/components/effects/text/LetterStaggerPreview';
import TypewriterPreview from '@/components/effects/text/TypewriterPreview';
import TextScramblePreview from '@/components/effects/text/TextScramblePreview';
import GradientShinePreview from '@/components/effects/text/GradientShinePreview';
import WordRotatePreview from '@/components/effects/text/WordRotatePreview';
import WaveTextPreview from '@/components/effects/text/WaveTextPreview';
import SparklesTextPreview from '@/components/effects/text/SparklesTextPreview';
import LineRevealPreview from '@/components/effects/text/LineRevealPreview';
import LetterHoverPreview from '@/components/effects/text/LetterHoverPreview';
import AuroraTextPreview from '@/components/effects/text/AuroraTextPreview';
import CircularTextPreview from '@/components/effects/text/CircularTextPreview';
import RollingCounterPreview from '@/components/effects/text/RollingCounterPreview';
import GlitchTextPreview from '@/components/effects/text/GlitchTextPreview';
import SplitFlapPreview from '@/components/effects/text/SplitFlapPreview';
import SpotlightTextPreview from '@/components/effects/text/SpotlightTextPreview';
import FlapBoardPreview from '@/components/effects/text/FlapBoardPreview';
import DecryptTextPreview from '@/components/effects/text/DecryptTextPreview';
import TextPressurePreview from '@/components/effects/text/TextPressurePreview';
import OrbitTextPreview from '@/components/effects/text/OrbitTextPreview';
import MorphingTextPreview from '@/components/effects/text/MorphingTextPreview';
import AuroraFlowPreview from '@/components/effects/text/AuroraFlowPreview';
import HyperTextPreview from '@/components/effects/text/HyperTextPreview';
import VortexTextPreview from '@/components/effects/text/VortexTextPreview';
import LineShadowPreview from '@/components/effects/text/LineShadowPreview';
import CurvedLoopPreview from '@/components/effects/text/CurvedLoopPreview';

export const textEffects: Effect[] = [
  {
    id: 'blur-fade-in',
    title: '模糊浮现',
    label: 'BLUR FADE IN',
    description: '文字逐词（或逐字）从模糊中浮现——opacity 0→1、blur 8px→0、轻微上移，词间错峰 120ms，适合标题与开场文案。',
    categories: ['text'],
    interaction: 'auto',
    component: BlurFadeInPreview,
    prompt: `Create a React component called BlurFadeIn using React + Tailwind CSS + Framer Motion. It receives a \`text\` prop and renders it split into units: split by words when the text contains spaces, otherwise split per character (good for Chinese). Each unit is an inline-block motion.span animated from { opacity: 0, filter: 'blur(8px)', y: 10 } to { opacity: 1, filter: 'blur(0px)', y: 0 } with duration 0.7s, ease [0.16, 1, 0.3, 1], and a 0.12s stagger between units (configurable via \`stagger\` prop, plus a \`delay\` prop for the first unit). Support a \`loop\` prop that remounts the units on an interval (default ~4.2s) so the effect replays continuously. Keep the text selectable/accessible via an aria-label on the wrapper.`,
  },
  {
    id: 'letter-stagger',
    title: '逐字弹入',
    label: 'LETTER STAGGER',
    description: '每个字母从下方带弹性交错弹入，俏皮而有节奏感。悬停预览窗即可重播。',
    categories: ['text'],
    interaction: 'hover',
    component: LetterStaggerPreview,
    prompt: `Create a React component with Framer Motion that animates each letter of a
headline with a springy stagger entrance: letters slide up 24px from opacity
0 using a spring (stiffness 300, damping 18) with a 0.04s stagger. Wrap each
letter in an inline-block span so transforms work. Replay the animation when
the user hovers the container. Tailwind for styling.`,
  },
  {
    id: 'typewriter',
    title: '打字机',
    label: 'TYPEWRITER',
    description: '字符逐个敲出，光标闪烁，打完停顿后删除并切换下一句话。',
    categories: ['text'],
    interaction: 'auto',
    component: TypewriterPreview,
    prompt: `Create a React typewriter component with TypeScript. It cycles through an
array of phrases: types each character at 90ms intervals, pauses 1.6s when
complete, deletes at 40ms per character, then types the next phrase. Render
a blinking block cursor (2px wide, 530ms blink) after the text. Pure React
state + setTimeout, no libraries. Tailwind styling, monospace optional.`,
  },
  {
    id: 'text-scramble',
    title: '乱序解码',
    label: 'TEXT SCRAMBLE',
    description: '字符先显示为随机符号，再逐位“解码”成正确文字，有黑客终端的感觉。点击预览窗重播。',
    categories: ['text'],
    interaction: 'click',
    component: TextScramblePreview,
    prompt: `Create a React text-scramble component. When triggered, each character of
the target string cycles through random glyphs from the set "!<>-_\\\\/[]{}=+*^?#"
every 30ms, then locks into the correct character left-to-right, finishing
the full string in ~1.4s. Expose a trigger function and an optional
useInView auto-trigger. Monospace font, Tailwind styling.`,
  },
  {
    id: 'gradient-shine',
    title: '流光文字',
    label: 'GRADIENT SHINE',
    description: '一道柔和的光周期性扫过文字表面，低调的精致感。',
    categories: ['text'],
    interaction: 'auto',
    component: GradientShinePreview,
    prompt: `Create a React shimmer-text component using CSS only: apply a linear
gradient (120deg, base color #09090B with a bright white band 30% wide) via
background-clip: text and transparent text fill, then animate
background-position from -150% to 150% over 2.5s with a 5s repeat delay.
Support triggering a single pass on hover. Tailwind + a small custom
keyframes utility.`,
  },
  {
    id: 'word-rotate',
    title: '垂直词轮换',
    label: 'WORD ROTATE',
    description: '固定句式中的一个词垂直滚动切换，常用于 Hero 标语。点击预览窗立即切换下一个词。',
    categories: ['text'],
    interaction: 'auto',
    component: WordRotatePreview,
    prompt: `Create a React word-rotate component with Framer Motion: a fixed sentence
contains one rotating word that cycles through a list every 2.2s. Outgoing
word slides up and fades, incoming word slides in from below (both 0.4s
ease-in-out) inside a fixed-height overflow-hidden inline container with
AnimatePresence. Clicking advances to the next word immediately.`,
  },
  {
    id: 'wave-text',
    title: '波浪文字',
    label: 'WAVE TEXT',
    description: '每个字母像波浪一样持续起伏，轻盈活泼。悬停时波浪加速，离开后缓缓恢复。',
    categories: ['text'],
    interaction: 'auto',
    component: WaveTextPreview,
    prompt: `Create a React wave-text component: each letter of the string continuously
oscillates vertically (±8px) following a sine wave — phase offset per letter
index × 0.35, period 1.6s, plus a subtle scale 1→1.08 in sync. Implement
with requestAnimationFrame or Framer Motion animate loops. On hover, double
the wave speed, easing back on leave. Tailwind styling.`,
  },
  {
    id: 'sparkles-text',
    title: '星光文字',
    label: 'SPARKLES TEXT',
    description: '标题周围持续生成细小的四角星光，缩放旋转着闪现再淡出，像灵感在字句间发光。',
    categories: ['text'],
    interaction: 'auto',
    component: SparklesTextPreview,
    prompt: `Create a React component called SparklesText using React + Tailwind CSS + Framer Motion. It renders a large headline (e.g. 40px, font-semibold, zinc-950) inside a relative inline-block wrapper, and continuously spawns tiny four-point star sparkles at random positions around and above the glyphs (x -6% to 106%, y -45% to 125% of the text box, sizes 10-22px). Each sparkle is a pure SVG 4-point star path (M12 0c.85 6.5 5.5 11.15 12 12-6.5.85-11.15 5.5-12 12-.85-6.5-5.5-11.15-12-12C6.5 11.15 11.15 6.5 12 0Z), colored warm amber #E8B04B with ~25% of sparkles in zinc-400 for variety. Spawn one sparkle every ~170ms via setInterval, cap concurrent sparkles at 12, and give each a full lifecycle of 0.8-1.5s: scale 0→1.15→1 with a rotate from -45deg offset toward its random base rotation, a mid-life twinkle (opacity dips to ~0.55 and back), then scale 0 + fade + extra 60deg rotation on exit. Wrap the sparkle list in AnimatePresence so removals animate out; remove each sparkle from state with a setTimeout matching its duration, and clean up all timers on unmount. Sparkles are pointer-events-none and aria-hidden; keep the headline itself accessible via aria-label. Animate transform and opacity only for 60fps.`,
  },
  {
    id: 'line-reveal',
    title: '逐行揭示',
    label: 'LINE REVEAL',
    description: '段落在进入视口时逐行从遮罩中滑出，500ms 缓出、行间错峰 120ms，干净利落的编辑排版感。',
    categories: ['text'],
    interaction: 'auto',
    component: LineRevealPreview,
    prompt: `Create a React component called LineReveal using React + Tailwind CSS + Framer Motion. It renders a 3-4 line paragraph (15px, zinc-700, generous ~2x line-height) where every line is wrapped in its own overflow-hidden block-level mask. Each line's inner span animates with whileInView from { y: '100%', opacity: 0 } to { y: '0%', opacity: 1 } — duration 500ms, ease-out, with a 120ms stagger via per-line delay. Use viewport={{ once: true, amount: 0.6 }} so the reveal triggers crisply the first time the paragraph scrolls into view and never replays. The mask keeps each line fully hidden until its turn, producing an editorial, gallery-quality reveal. Animate transform and opacity only; keep the text selectable.`,
  },
  {
    id: 'letter-hover',
    title: '悬停字母弹跳',
    label: 'LETTER HOVER BOUNCE',
    description: '悬停任意字母，它带着弹簧感跳起，相邻字母被轻微带起 15%，像橡皮筋一样牵连。离开后弹回原位。',
    categories: ['text'],
    interaction: 'hover',
    component: LetterHoverPreview,
    prompt: `Create a React component called LetterHover using React + Tailwind CSS + Framer Motion. It renders a word (e.g. 'MotionVault', 32px, font-semibold, zinc-950) with each letter as an inline-block motion.span so transforms work. Track the hovered letter index in state (onMouseEnter per letter, reset to null on container onMouseLeave). The hovered letter springs to scale 1.4, y -8px, and a slight rotate of ±6deg alternating by letter index parity; letters exactly one position away get 15% of that same displacement (scale ~1.06, y ~-1.2px, rotate ~±0.9deg) for a rubber-band pull, and all other letters stay at rest. Use a spring transition with stiffness 500 and damping 15 on every letter so both the jump and the return bounce feel physical. Cursor pointer on the container, will-change-transform on letters, animate transform only for 60fps.`,
  },
  {
    id: 'aurora-text',
    title: '极光渐变文字',
    label: 'AURORA TEXT',
    description: '低饱和极光色渐变在字面缓缓流动，8 秒一循环，身后叠一层 20% 透明度的模糊辉光，梦幻而不刺眼。',
    categories: ['text'],
    interaction: 'auto',
    component: AuroraTextPreview,
    prompt: `Create a React component called AuroraText using React + Tailwind CSS + Framer Motion. It renders large text (40px, font-semibold, tracking -0.02em) filled with a flowing low-saturation aurora gradient via background-clip: text: linear-gradient(90deg, #7DD3C0 soft teal, #93C5E8 sky, #C4B5E8 lilac, #E8B4C8 rose, wrapping back to #7DD3C0 at 100% for a seamless loop), with backgroundSize '300% 300%' and transparent text color. Animate backgroundPosition through ['0% 50%', '100% 50%', '0% 50%'] with Framer Motion — duration 8s, easeInOut, repeat Infinity — so the wash drifts slowly back and forth with no visible jump. Behind the text, render a duplicate absolutely-positioned aria-hidden copy with the same gradient and animation, at opacity 0.2 with a blur-md filter, as a barely-visible glow. Both copies live in a relative inline-block wrapper with an aria-label for accessibility. Smooth, dreamy, never garish; light background only.`,
  },
  {
    id: 'circular-text',
    title: '环形旋转文字',
    label: 'CIRCULAR TEXT',
    description: '一行文字沿圆环缓慢旋转（12 秒一圈），悬停时像唱片机一样平滑加速到 4 倍速，离开缓缓减速——加速过程用 lerp 插值，绝不生硬。',
    categories: ['text'],
    interaction: 'hover',
    component: CircularTextPreview,
    prompt: `Create a React component called CircularText using React + Tailwind CSS. It renders a short phrase (e.g. 'MOTION VAULT · 灵感库 · ', repeated enough times to fill the circumference) along a perfect circle using an SVG <textPath> on a circular <path> (viewBox 200x200, radius 78, monospace 11.5px, letter-spacing 0.16em, uppercase, fill zinc-950), with a small center icon (arrow-down inside a white bordered circle) sitting in the middle. Drive the rotation with requestAnimationFrame writing transform: rotate() directly to a ref'd wrapper — 360deg per 12 seconds at rest. Track a target speed multiplier in a ref (1 normally, 4 while hovered via onMouseEnter/onMouseLeave) and exponentially lerp the current speed toward the target each frame (factor ~dt * 3.2) so acceleration and deceleration feel like a record player spooling up, never abrupt. Clamp dt to 50ms, keep the loop in a single useEffect with cancelAnimationFrame cleanup, add will-change-transform, and animate transform only for 60fps. Monochrome (zinc-950 on light background), cursor pointer, aria-label on the container.`,
  },
  {
    id: 'rolling-counter',
    title: '滚动数字',
    label: 'ROLLING COUNTER',
    description: '里程表式数字滚动：进入视口时每位数字从 0 开始向上翻滚到目标值，弹簧缓动、位间错峰 100ms。点击卡片或 Replay 重播。',
    categories: ['text'],
    interaction: 'click',
    component: RollingCounterPreview,
    prompt: `Create a React component called RollingCounter using React + Tailwind CSS + Framer Motion. It shows a row of 2-3 stats (e.g. 52 收录效果 / 07 效果分类 / 6 交互方式): big mono digits (~44px, zinc-950) with a small 12px zinc-400 label under each. Each digit is an odometer column: an overflow-hidden viewport (height 56px) containing a vertical strip of digits 0-9 (each row 56px tall, flex-centered). On mount the strip springs from translateY 0 to translateY(-target * 56px) with a spring of stiffness 80 and damping 20, with a 100ms delay stagger between digit columns left-to-right, so numbers roll up from 0 like a slot machine settling. Trigger on entering the viewport (IntersectionObserver or mount gating), and replay on click: wrap the strips with a key derived from a run counter incremented by onClick on the container (role=button, keyboard Enter/Space support). The digits animate transform only; use will-change-transform. Light background, aria-label announces each stat value plus label.`,
  },
  {
    id: 'glitch-text',
    title: '故障艺术字',
    label: 'GLITCH TEXT',
    description: '悬停瞬间文字撕裂成 RGB 重影——玫瑰红与天蓝两层残影左右错位，clip-path 切片以 steps() 硬切跳动，600ms 爆发后恢复干净字面。',
    categories: ['text'],
    interaction: 'hover',
    component: GlitchTextPreview,
    prompt: `Create a React component called GlitchText using React + Tailwind CSS with a component-scoped <style> block. It renders one word ('GLITCH', monospace, 40px, medium, uppercase, tracking 0.08em, zinc-950) as three stacked layers: the base glyph plus two absolutely-positioned aria-hidden copies (inset-0) colored rose #F43F5E and sky #38BDF8, both at opacity 0 at rest. On hover a state class enables a 600ms burst that runs exactly once per hover (CSS animations, 1 iteration, default fill so everything reverts clean afterward): the rose copy shifts -3px (jittering to -6px), the sky copy +3px (to +6px), both at 0.6 opacity; each copy's visibility is chopped into 3-4 horizontal clip-path inset() slices that jump discretely using animation-timing-function steps(1, end) across 5 keyframes (e.g. inset(8% 0 72% 0) → inset(58% 0 12% 0) → inset(24% 0 52% 0) → inset(78% 0 4% 0)), and the base glyph gets a subtle ±2px translate jitter on the same steps() timing. At 100% every layer returns to opacity 0 / translate 0 so off-burst text is perfectly clean. Re-hovering replays the burst. Transform and opacity only, will-change-transform, light background.`,
  },
  {
    id: 'split-flap',
    title: '翻牌显示',
    label: 'SPLIT FLAP',
    description: '机场翻牌钟：深色小牌上的字母绕中间铰链向下翻转入场，列间 80ms 涟漪错峰，每词停留 2 秒后翻到下一个词。',
    categories: ['text'],
    interaction: 'auto',
    component: SplitFlapPreview,
    prompt: `Create a React component called SplitFlap using React + Tailwind CSS + Framer Motion. It mimics an airport split-flap departure board cycling through three words ('DESIGN' → 'MOTION' → 'CRAFT', padded to 6 columns with spaces). Each letter lives in a dark tile (40x56px, bg zinc-900, rounded-md, subtle inset top highlight + soft drop shadow) containing a white monospace 24px letter. On every word change each tile's letter is remounted (key includes word index + column) and animates with Framer Motion from rotateX -90deg + opacity 0.35 to rotateX 0 + opacity 1 — duration 450ms, ease [0.2, 0.7, 0.3, 1], transformOrigin center, backfaceVisibility hidden, parent tile gets perspective 400 — so the letter folds down around the board's middle like a physical flap. Add an 80ms delay per column for a left-to-right ripple, a 1px black/60 horizontal hinge line across the tile's vertical center, and a faint white gradient shading on the upper half. A setInterval cycles the word every ~3s (2s hold + flip time) with cleanup on unmount. Animate transform/opacity only, light page background, aria-label announces the current word.`,
  },
  {
    id: 'spotlight-text',
    title: '聚光灯显字',
    label: 'SPOTLIGHT TEXT',
    description: '一句话以浅灰铺底，深色真身只在一圈 140px 的径向光斑内显形，光斑实时跟随指针——文字在你指向的地方被点亮。',
    categories: ['text'],
    interaction: 'move',
    component: SpotlightTextPreview,
    prompt: `Create a React component called SpotlightText using React + Tailwind CSS. It renders a paragraph-sized sentence (28px, medium, tracking -0.01em, line-height 1.65, centered, e.g. '动效是界面的呼吸，让每一次交互都拥有生命。') twice in a relative wrapper: the base copy in zinc-300, and an absolutely-positioned identical top copy in zinc-950 that is revealed only inside a radial-gradient mask — mask-image (plus -webkit-mask-image): radial-gradient(circle 140px at var(--sx) var(--sy), black 0%, black 42%, transparent 100%). On pointermove, compute the pointer position relative to the container and write it to the --sx/--sy CSS custom properties directly on the element via ref + style.setProperty (NO React state per move — zero re-renders, 60fps); on pointerleave park the vars at -9999px so the spotlight turns off. Initialize both vars to -9999px. Add a small hint label '移动鼠标阅读' (11px mono, uppercase, tracking 0.14em, zinc-400, bottom center) that fades to opacity 0 over 500ms after the first pointer move (one state flip only). cursor-crosshair over the area, select-none on the text, light background, aria-label carries the full sentence since the top copy is aria-hidden.`,
  },
  {
    id: 'flap-board',
    title: '机场翻牌板',
    label: 'FLAP BOARD',
    description: 'Vestaboard 式机场信息牌：8 列深色翻牌逐格上下翻动换词，翻动中段闪过一次随机字符，列间 60ms 错峰，每 4 秒换一词。',
    categories: ['text'],
    interaction: 'auto',
    dark: true,
    component: FlapBoardPreview,
    prompt: `Create a React component called FlapBoard using React + Tailwind CSS + Framer Motion. It mimics a Vestaboard / airport departure board cycling through three 8-column words ('DEPARTED' → 'ARRIVALS' → 'BOARDING') every 4s on a setInterval gated by an IntersectionObserver (pause off-screen, clean up on unmount). Each of the 8 columns is a dark tile (44x64px, bg zinc-900, rounded-md, inset white/8 top highlight + soft black drop shadow) holding a white monospace 26px glyph, with a 1px black/70 horizontal hinge line across the tile's vertical center and a faint white gradient shading on the upper half. On every word change each tile replays a vertical flap tween with Framer Motion — scaleY keyframes [1, 0, 1], duration 360ms, times [0, 0.5, 1], ease-in-out, remounted via a key containing the cycle tick + column index — with a 60ms delay per column for a left-to-right ripple. Mid-flip the glyph swaps: a setTimeout at ~42% of the tween shows one random glyph from 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&/', then at ~58% it lands on the target character, timed to the same per-column stagger. Above the board render a tiny caption 'FLIGHT BOARD · GATE 07' (11px mono, uppercase, tracking 0.22em, zinc-500). Dark zinc-950 preview background, animate transform/opacity only, aria-label announces the current word.`,
  },
  {
    id: 'decrypt-text',
    title: '解密文字',
    label: 'DECRYPT TEXT',
    description: '悬停时字符以 30ms 一帧高速随机置换，再从左到右逐位“解密”定格成原文——加密情报既视感，解完后保持。',
    categories: ['text'],
    interaction: 'hover',
    component: DecryptTextPreview,
    prompt: `Create a React component called DecryptText using React + Tailwind CSS. It renders a monospace uppercase sentence (e.g. 'MOTION IS THE MESSAGE', 18-24px, font-medium, tracking 0.14em, zinc-950, centered) that starts fully readable. On mouse enter, a 30ms setInterval starts a decode run: each frame every non-space character is replaced by a random glyph from '!<>-_\\\\/[]{}=+*^?#@$%&' until it locks — characters lock left-to-right, each scrambling for ~8 frames with a 2-frame offset per position (lock frame = 8 + index * 2), so the plaintext crystallizes progressively like intercepted intel being decrypted. When the last character locks, clear the interval, restore the exact target string and keep it (leaving and re-entering replays the run; a run already in progress is not restarted). Guard the interval with a ref, clean it up on unmount. Under the sentence show a small status line (11px mono, uppercase, tracking 0.22em, zinc-400) reading 'HOVER TO DECRYPT' that switches to '— DECODED' once a run completes (single state flip). cursor-pointer, select-none, light background, role=button with an aria-label.`,
  },
  {
    id: 'text-pressure',
    title: '字重压感',
    label: 'TEXT PRESSURE',
    description: '光标越近，字越粗越宽——可变字体的 wght 从 400 弹到 900，字宽同步膨胀，弹簧平滑跟随，全程零 setState。',
    categories: ['text'],
    interaction: 'move',
    component: TextPressurePreview,
    prompt: `Create a React component called TextPressure using React + Tailwind CSS + Framer Motion. It renders one large word ('PRESSURE', 48-60px, semibold, uppercase, system sans font, zinc-950) as inline-block per-character spans. Track the pointer with two useMotionValue numbers (x, y relative to the container, parked at -9999 on pointerleave) smoothed by useSpring (stiffness 260, damping 26, mass 0.6) — onPointerMove writes px.set/py.set, NO React state, zero re-renders. Each character measures its own untransformed center once on mount (getBoundingClientRect relative to the container, stored in a shared ref array) and derives its style with useTransform over [sx, sy]: proximity = max(0, 1 - distance / 180px), then fontVariationSettings string interpolates 'wght' 400→900, fontStretch 100%→125%, and scaleX 1→1.12 as a width fallback for non-variable fonts. Bind all three via the motion.span style prop (fontVariationSettings, fontStretch, scaleX) so weight and width swell elastically around the cursor and relax as it moves away. cursor-crosshair, select-none, transform + font-variation-settings only, light background, container aria-label.`,
  },
  {
    id: 'orbit-text',
    title: '环形文字轨',
    label: 'ORBIT TEXT',
    description: '字符逐个按角度定位排成一圈（MOTION VAULT · INSPIRATION ·），整体 12 秒一圈持续旋转，中心一颗小 logo 点，悬停平滑反转方向。',
    categories: ['text'],
    interaction: 'auto',
    component: OrbitTextPreview,
    prompt: `Create a React component called OrbitText using React + Tailwind CSS. It typesets the phrase 'MOTION VAULT · INSPIRATION · ' around a circle WITHOUT SVG textPath: split into characters and absolutely position each at left-1/2 top-1/2 of a 216x216px relative wrapper with transform 'translate(-50%, -50%) rotate(i * (360 / len) deg) translateY(-88px)' (monospace 13px, font-medium, uppercase, zinc-950, space chars rendered as-is since the fixed angular step keeps spacing). Rotate the whole ring continuously at 360deg per 12s with a requestAnimationFrame loop (gated by IntersectionObserver, cancelAnimationFrame on cleanup) writing style.transform = rotate(angle) directly to a ref'd wrapper — no state. Track a target direction in a ref (+1 normally, -1 while hovered via onMouseEnter/onMouseLeave) and exponentially lerp the current direction each frame (factor ~dt * 4, dt clamped to 50ms) so the spin reverses like a turntable changing direction, never a hard cut. Place a small 8px rounded-full zinc-950 dot (logo mark, pointer-events-none) in the exact center. will-change-transform on the ring, cursor-pointer, light background, aria-label on the container.`,
  },
  {
    id: 'morphing-text',
    title: '词间形变',
    label: 'MORPHING TEXT',
    description: '两个 64px 粗体词通过 blur 12px→0 + 缩放交叉溶解互相转化，1.8 秒一周期无缝循环，词宽不同也绝对居中、毫无跳动。',
    categories: ['text'],
    interaction: 'auto',
    component: MorphingTextPreview,
    prompt: `Create a React component called MorphingText using React + Tailwind CSS + Framer Motion. It cycles between two bold words ('灵感' ⇄ '动效', 64px, font-bold, tracking -0.02em, zinc-950) every 1.8s on a setInterval gated by an IntersectionObserver (pause off-screen, clean up on unmount). Both words are absolutely centered inside a fixed-size relative wrapper (e.g. 260x104px flex center) so their different widths never cause layout shift. Wrap the keyed motion.span in AnimatePresence initial={false} and cross-dissolve: incoming word animates from { opacity: 0, scale: 1.18, filter: 'blur(12px)' } to { opacity: 1, scale: 1, filter: 'blur(0px)' }, outgoing to { opacity: 0, scale: 0.85, filter: 'blur(12px)' } — duration 1.1s, ease [0.16, 1, 0.3, 1], so the dissolve finishes well inside the 1.8s cycle for a seamless, never-idle loop. whitespace-nowrap, will-change-transform, wrapper carries an aria-label of the current word; light background.`,
  },
  {
    id: 'aurora-flow',
    title: '极光流动',
    label: 'AURORA FLOW',
    description: '标题字面填充低饱和青→蓝→紫极光渐变，6 秒匀速扫过一个完整周期无缝循环；旁边一行静态灰小字作对照，更显克制高级。',
    categories: ['text'],
    interaction: 'auto',
    component: AuroraFlowPreview,
    prompt: `Create a React component called AuroraFlowText using React + Tailwind CSS + Framer Motion. It renders a large headline ('极光流动', 44px, font-bold, tracking -0.02em) filled with a slow LOW-SATURATION aurora gradient via background-clip: text: linear-gradient(90deg, #8ED4C4 muted teal, #9DC3E6 mist blue, #BFB0E4 dusty violet, wrapping back to #8ED4C4 at 100% so the sweep loops seamlessly), backgroundSize '300% 100%', transparent text color. Animate backgroundPosition through ['0% 50%', '300% 50%'] with Framer Motion — duration 6s, ease linear, repeat Infinity — one full uniform pass per cycle with no jump (the wrapped gradient makes 300% identical to 0%). Below the headline render a plain comparison line ('同一句话，静态灰的对照', 14px, zinc-400) plus a tiny mono caption 'STATIC · ZINC-400' (11px, uppercase, tracking 0.22em, zinc-300) so the aurora reads as even quieter by contrast. Saturation must stay low — never neon; light background only, aria-label on the headline.`,
  },
  {
    id: 'hyper-text',
    title: '高能定格',
    label: 'HYPER TEXT',
    description: 'HYPERDRIVE 字母先以 20ms 一帧高速乱序约 600ms，再从左到右逐字定格（60ms 错峰），zinc-400 乱码落定为 zinc-950，入视口自动触发。',
    categories: ['text'],
    interaction: 'auto',
    component: HyperTextPreview,
    prompt: `Create a React component called HyperText using React + Tailwind CSS. It renders 'HYPERDRIVE' in monospace (28px, font-medium, uppercase, tracking 0.18em) as per-letter inline-block spans of fixed 1.05em width so scrambling never shifts layout. When the component enters the viewport (IntersectionObserver hook) start a 20ms setInterval: for the first ~600ms every letter is a random glyph from 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&*' colored zinc-400; then letters lock left-to-right with a 60ms stagger (lock time = 600ms + index * 60ms) into the correct zinc-950 character. Write textContent and toggle classes DIRECTLY through span refs — zero React state, no re-renders per frame; clear the interval when all letters are locked and on unmount. Below the word show a status line (11px mono, uppercase, tracking 0.22em, zinc-400) that reads 'SCRAMBLING…' during the run and '— ALL SYSTEMS LOCKED' after (via a ref, not state). Replay by remounting the component. Light background, paragraph carries an aria-label of the final word.`,
  },
  {
    id: 'vortex-text',
    title: '文字漩涡',
    label: 'VORTEX TEXT',
    description: 'Canvas 铺满 MOTION 字符网格，光标所在处形成漩涡——字符绕光标切向偏移并旋转、随距离衰减，离开后弹簧归位；近处字符由 zinc-400 转 zinc-950。',
    categories: ['text'],
    interaction: 'move',
    component: VortexTextPreview,
    prompt: `Create a React component called VortexText using React + Tailwind CSS + Canvas 2D. Fill the preview with a grid (62x46px cells) tiled with the word 'MOTION' (cell glyph = WORD[(row * cols + col) % 6], 13px JetBrains Mono 500, centered). Each frame (requestAnimationFrame gated by an IntersectionObserver, cancelAnimationFrame + ResizeObserver cleanup, DPR capped at 2, canvas sized via inline style absolute inset-0 100%x100%): compute each cell's distance to the cursor (pointermove on the canvas, pointerleave parks it at -9999); inside a 170px radius apply a smoothstep falloff s = f*f*(3-2*f) and push the glyph TANGENTIALLY around the cursor — offset = perpendicular(-dy, dx)/d * 24px * s — plus rotate up to 60deg * s. Targets spring toward zero when the cursor leaves (state += (target - state) * 0.14 per frame), so glyphs swirl and then settle back onto the grid. Color lerps zinc-400 (#A1A1AA) → zinc-950 (#09090B) by the same springed influence. Draw with ctx.save/translate/rotate/fillText/restore; no React state anywhere, cursor-crosshair, light background, container aria-label.`,
  },
  {
    id: 'line-shadow',
    title: '线影文字',
    label: 'LINE SHADOW',
    description: '72px 粗体 SHADOW 的“投影”由一片向下生长的 1px 细竖线构成，长度与透明度随时间正弦错落呼吸，像印刷版的错觉阴影。',
    categories: ['text'],
    interaction: 'auto',
    component: LineShadowPreview,
    prompt: `Create a React component called LineShadowText using React + Tailwind CSS + Framer Motion. It renders 'SHADOW' at 72px, font-bold, tracking -0.02em, zinc-950, each glyph in a relative inline-block. Under every glyph render a fan of 12 hairline vertical lines (w-px, bg-zinc-950, flex row with 3px gap, absolutely positioned just below the baseline, centered on the glyph) wrapped in a mask-image linear-gradient(to bottom, black 35%, transparent 96%) so the fan fades out at its foot. Line heights vary from 34px at the edges to 56px in the middle of each fan (light-falloff profile). Every line is a motion.span with origin-top animating scaleY [0.25, 1, 0.25] and opacity [0.12, 0.65, 0.12] — duration 2.4s, ease-in-out, repeat Infinity, delay = charIndex * 0.16s + lineIndex * 0.06s — so the shadow grows downward and breathes in staggered waves, a print-plate illusion. transform (scaleY) and opacity only, will-change-transform, aria-label on the word, glyphs aria-hidden, light background.`,
  },
  {
    id: 'curved-loop',
    title: '曲线跑马灯',
    label: 'CURVED LOOP',
    description: 'FIND INSPIRATION · MOTION VAULT 沿一条下弯弧线无限滚动，18px mono，弧线两端以渐变遮罩淡出，安静而有仪式感。',
    categories: ['text'],
    interaction: 'auto',
    component: CurvedLoopPreview,
    prompt: `Create a React component called CurvedLoop using React + Tailwind CSS + SVG textPath. In a 640x160 viewBox define a shallow downward arc path 'M -60 34 Q 320 132 700 34' (fill none, unique id via useId). Render the phrase 'FIND INSPIRATION · MOTION VAULT · ' repeated 5 times inside a textPath (18px, JetBrains Mono, letterSpacing 0.06em, fill #09090B) plus a hidden single-unit text ruler. Measure the unit width once with getComputedTextLength (re-measure after document.fonts.ready), then run a requestAnimationFrame loop gated by an IntersectionObserver (cancelAnimationFrame on cleanup): offset = (offset + 55px * dt) % unit, writing startOffset = -offset directly on the textPath element via setAttribute — zero React state; the repeat count guarantees the text covers the path through the whole [-unit, 0] offset range so the wrap is seamless. Overlay two pointer-events-none gradient fades (w-20, from-zinc-50 to transparent) at the left and right ends of the arc. dt clamped to 50ms, svg carries an aria-label of the phrase, light background.`,
  },
];
