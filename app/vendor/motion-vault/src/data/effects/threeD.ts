import { lazy } from 'react';
import type { Effect } from '@/types/effect';

// code-split: three/R3F only loads when a preview mounts
const ParticleSphere = lazy(() => import('@/components/effects/threeD/ParticleSphere'));
const WavePlane = lazy(() => import('@/components/effects/threeD/WavePlane'));
const DistortedSphere = lazy(() => import('@/components/effects/threeD/DistortedSphere'));
const RotatingRings = lazy(() => import('@/components/effects/threeD/RotatingRings'));
const Starfield = lazy(() => import('@/components/effects/threeD/Starfield'));
const OrbitingSpheres = lazy(() => import('@/components/effects/threeD/OrbitingSpheres'));
const WaveGrid = lazy(() => import('@/components/effects/threeD/WaveGrid'));
const DiceRoll = lazy(() => import('@/components/effects/threeD/DiceRoll'));
const BouncingBalls = lazy(() => import('@/components/effects/threeD/BouncingBalls'));
const StackBlocks = lazy(() => import('@/components/effects/threeD/StackBlocks'));
const DragKnot = lazy(() => import('@/components/effects/threeD/DragKnot'));
const WarpField = lazy(() => import('@/components/effects/threeD/WarpField'));
const WireframeForms = lazy(() => import('@/components/effects/threeD/WireframeForms'));
const IconCloud = lazy(() => import('@/components/effects/threeD/IconCloud'));
const DotGlobe = lazy(() => import('@/components/effects/threeD/DotGlobe'));
const Lanyard = lazy(() => import('@/components/effects/threeD/Lanyard'));
const WovenCloth = lazy(() => import('@/components/effects/threeD/WovenCloth'));
const Keyboard3D = lazy(() => import('@/components/effects/threeD/Keyboard3D'));
const BookFlip = lazy(() => import('@/components/effects/threeD/BookFlip'));
const CurveCarousel = lazy(() => import('@/components/effects/threeD/CurveCarousel'));
const RubiksCube = lazy(() => import('@/components/effects/threeD/RubiksCube'));
const FlipClock = lazy(() => import('@/components/effects/threeD/FlipClock'));
// pure DOM/CSS 3D — no three.js, no lazy split needed
import Marquee3D from '@/components/effects/threeD/Marquee3D';

export const threeDEffects: Effect[] = [
  {
    id: 'particle-sphere',
    title: '粒子球体',
    label: 'PARTICLE SPHERE',
    description: '数千个粒子组成的球体缓缓自转，鼠标靠近时粒子被扰动推开。',
    categories: ['3d'],
    dark: true,
    interaction: 'move',
    component: ParticleSphere,
    prompt: `Create a React Three Fiber particle sphere: 4000 points sampled on a
Fibonacci sphere of radius 2, size 0.015, white at 0.7 opacity, rotating
slowly around Y (0.08 rad/s). When the mouse (raycast into the scene) comes
within 0.8 units, push nearby particles outward along their normals and let
them spring back over ~1s. Update positions in useFrame or via a custom
shader with a uMouse uniform. Dark background.`,
  },
  {
    id: 'wave-plane',
    title: '波浪平面',
    label: 'WAVE PLANE',
    description: '一个由点或细线构成的平面像海面一样起伏，极简而催眠。',
    categories: ['3d'],
    dark: true,
    interaction: 'auto',
    component: WavePlane,
    prompt: `Create a React Three Fiber wave plane: an 80x80 grid of points spanning
12x12 units, camera at a 45deg elevated angle. Animate each point's z with
z = sin(x*0.8 + t) * cos(y*0.8 + t) * 0.4, t advancing at 0.8/s. Lerp point
color between zinc-700 and zinc-100 by wave height. Add a slow ±5deg
breathing rotation of the whole plane. Dark background, points material.`,
  },
  {
    id: 'distorted-sphere',
    title: '噪声扭曲球体',
    label: 'DISTORTED SPHERE',
    description: '球体表面被 Simplex 噪声持续扭曲，像一团有生命的流体。',
    categories: ['3d'],
    dark: true,
    interaction: 'hover',
    component: DistortedSphere,
    prompt: `Create a React Three Fiber distorted sphere using @react-three/drei
MeshDistortMaterial: radius 1.4, 128 segments, distort 0.45, speed 1.8,
color #E4E4E7, slight metalness, slow self-rotation (0.15 rad/s), three-
point lighting. On pointer over, lerp distort to 0.7 and speed to 3 over 1s;
ease back on leave. Dark (zinc-950) background.`,
  },
  {
    id: 'rotating-rings',
    title: '旋转圆环组',
    label: 'ROTATING RINGS',
    description: '多个圆环以不同轴角和速度旋转，交错出陀螺仪般的秩序感。',
    categories: ['3d'],
    dark: true,
    interaction: 'move',
    component: RotatingRings,
    prompt: `Create a React Three Fiber gyroscope scene: five concentric torus rings
(radii 1.0 to 2.0, tube 0.015, white wireframe, opacity 0.5→0.9 from inner
to outer). Each ring has a random initial tilt (±0.6 rad on x/y) and spins
at a different speed (0.2-0.6 rad/s, alternating direction). The group
subtly tilts toward the mouse (±0.1 rad, lerped). Dark background.`,
  },
  {
    id: 'starfield',
    title: '星空穿梭',
    label: 'STARFIELD',
    description: '数千颗星星迎面飞来，穿越深空——点击可加速跃迁。',
    categories: ['3d'],
    dark: true,
    interaction: 'click',
    component: Starfield,
    prompt: `Create a React Three Fiber starfield: 3000 stars distributed in a 60-unit
deep tunnel flying toward the camera along -z at 6 units/s, wrapping back
to the far end after passing the camera. Point size attenuates with
distance, white stars, camera fov 70, black background. On click, lerp
speed to 30 u/s over 3s (stars stretch into streaks via elongated
geometry or shader), then ease back over 2s.`,
  },
  {
    id: 'orbiting-spheres',
    title: '轨道球体组',
    label: 'ORBITING SPHERES',
    description: '哑光中心球与六颗小球沿三条不同倾角的细轨道环绕运行，唯一的琥珀色小球是全场焦点。',
    categories: ['3d'],
    interaction: 'auto',
    component: OrbitingSpheres,
    prompt: `Create a React component with React Three Fiber: a soft studio-light
orbit scene on a #FAFAFA canvas. A matte central sphere (zinc-200, radius
0.9, high roughness) sits at the origin while six small spheres (mix of
zinc-400 and zinc-600, plus exactly ONE amber #F59E0B accent) orbit on
three differently-tilted invisible rings (tilts ~0deg, 35deg, -25deg; radii
1.7 / 2.1 / 2.5), each satellite at its own speed between 0.3 and 0.8 rad/s.
Mark each orbit with a hairline torus (tube 0.004, zinc-300, opacity 0.6).
Rotate the whole group slowly at 0.05 rad/s. Lighting: ambient 0.7 + one
soft directional light, matte standard materials, no shadows.`,
  },
  {
    id: 'wave-grid',
    title: '波浪方块阵',
    label: 'WAVE GRID',
    description: '22×22 的哑光方块矩阵随径向正弦波起伏，涟漪中心跟随鼠标移动，安静而催眠。',
    categories: ['3d'],
    interaction: 'move',
    component: WaveGrid,
    prompt: `Create a React component with React Three Fiber: a 22x22 grid of thin
matte boxes (0.32 x 0.32 footprint, zinc-800, spacing 0.44) on a #FAFAFA
canvas, heights driven by a radial sine wave h = 0.15 + (sin(dist - t*2.2)
+ 1) * 0.5 * 1.1 where dist is the distance from a ripple center. Raycast
the pointer onto the grid plane and lerp the ripple center toward the hit
point at 0.08 per frame; ease back to the origin on leave. Render with a
single instancedMesh, lerping instance color from zinc-800 to zinc-200 by
wave height so crests read lighter — keep it strictly monochrome. Camera:
45deg elevated view, plus a slow breathing rotation of ±3deg. Ambient 0.7 +
one directional light, no shadows.`,
  },
  {
    id: 'marquee-3d',
    title: '立体滚动卡墙',
    label: 'MARQUEE 3D',
    description: 'CSS 3D 透视下的四列卡片墙垂直无限滚动，方向交错、速度各异，上下边缘渐隐。',
    categories: ['3d'],
    interaction: 'auto',
    component: Marquee3D,
    prompt: `Create a React component with Tailwind CSS (pure DOM, no WebGL): a 3D
marquee card wall. Inside a preview container, a perspective(900px) stage
holds a plane rotated rotateX(18deg) rotateZ(-10deg) containing 4 vertical
columns of small mock cards (white bg, hairline zinc-200 borders, soft
neutral gradient thumbnails with one subtle amber accent, tiny skeleton
title/text bars and mono tag chips). Each column scrolls vertically in an
infinite seamless loop (duplicate the card list, animate translateY 0 to
-50% with transform-only keyframes), alternating directions at slightly
different durations between 18s and 28s. Fade top and bottom edges with a
mask-image linear gradient, offset columns with small translateZ values for
parallax depth, and isolate each looping column in a React.memo component.`,
  },
  {
    id: 'dice-roll',
    title: '掷骰子',
    label: 'DICE ROLL',
    description: '点击任意处抛出一颗哑光白骰子，翻滚、落地、弹跳后稳稳停在随机点数上。',
    categories: ['3d'],
    interaction: 'click',
    component: DiceRoll,
    prompt: `Create a React component with React Three Fiber: a toy dice roller on a
#FAFAFA canvas. A white matte rounded die (@react-three/drei RoundedBox,
size 1.2, radius 0.12) with black pip dots (small dark spheres half-embedded
in each face, standard 1-6 layouts, opposite faces sum to 7). On pointer
down anywhere, toss the die: integrate simple physics in useFrame — upward
velocity 6.5-9 u/s, random horizontal drift and angular velocity ~8-14 rad/s
per axis, gravity 18 u/s^2, bounce off an invisible floor at y=0 with 0.5
restitution and angular damping 0.6, soft invisible walls at |x|,|z|=1.4.
When nearly still, slerp the quaternion over 600ms (ease-out cubic) to the
nearest axis-aligned orientation that puts a pre-rolled random face (1-6)
on top, then show a small mono chip overlay with the rolled number. Soft
studio lighting (ambient 0.75 + one directional) and drei ContactShadows.`,
  },
  {
    id: 'bouncing-balls',
    title: '弹跳小球',
    label: 'BOUNCING BALLS',
    description: '三颗哑光小球永不停歇地弹跳，落地瞬间挤压变形；点击任意处再丢下一颗新球。',
    categories: ['3d'],
    interaction: 'click',
    component: BouncingBalls,
    prompt: `Create a React component with React Three Fiber: a perpetual bouncing-ball
toy on a #FAFAFA canvas. Start with 3 matte spheres (zinc-700 #52525B,
zinc-400 #A1A1AA, and one amber #F59E0B; radii 0.24-0.38) integrating
simple physics in useFrame: gravity 14 u/s^2, floor bounce with restitution
0.9 but enforce a minimum rebound velocity (~5.2 u/s) so balls never stop
bouncing, side walls at |x|=3.1 with 0.9 restitution, and a squash-and-
stretch on impact (scaleY 1->0.85->1, scaleXZ up to 1.1, recovering over
120ms). On pointer down, raycast the click onto an invisible plane and drop
a NEW ball (random of the 3 colors, random size) from above that x position,
up to a max of 10 balls; show a small mono chip counter. Physics state lives
in refs keyed by ball id — no useState in useFrame. Soft ambient 0.75 + one
directional light, drei ContactShadows, matte standard materials.`,
  },
  {
    id: 'stack-blocks',
    title: '下落堆叠方块',
    label: 'STACK BLOCKS',
    description: '每次点击从上方落下一块圆角方块，落在塔顶轻轻回弹晃动；堆到 8 层后整体淡出重来。',
    categories: ['3d'],
    dark: true,
    interaction: 'click',
    component: StackBlocks,
    prompt: `Create a React component with React Three Fiber: a 3D stacking toy on a
dark #09090B canvas. Each pointer down drops a rounded box (@react-three/
drei RoundedBox, radius 0.06, ~0.95 x 0.42 x 0.95 randomized ±15%, random
muted tone from a 4-color palette: zinc-600 #52525B, zinc-400 #A1A1AA,
sage #9CAF88, sand #D9CDB8, tiny random x offset ±0.07) from 4.6 units
above onto the growing stack. Integrate the fall in useFrame (gravity
26 u/s^2), land with a small 0.35-restitution bounce, then a settle wobble:
rotation.z/x = tilt * exp(-3.2t) * cos(9t). The whole stack group slowly
orbits at 0.1 rad/s and sways on rotation.z with amplitude proportional to
stack height (up to ±0.014 rad). After the 8th block settles (~2.2s), fade
all materials out while sinking the stack 4.2 units over 0.9s, then clear
and restart. Dim ambient 0.4 + key directional 1.4 + weak fill, drei
ContactShadows, transparent materials for the fade. Mono chip shows the
block count.`,
  },
  {
    id: 'drag-knot',
    title: '可拖拽金属结',
    label: 'DRAG KNOT',
    description: '一颗抛光锌色金属环面结，按住拖拽即可甩动旋转，松手后带惯性滑行，静置 2 秒恢复慢速自转。',
    categories: ['3d'],
    dark: true,
    interaction: 'move',
    component: DragKnot,
    prompt: `Create a React component with React Three Fiber: a draggable polished
metal torus knot on a dark #09090B canvas. TorusKnot geometry (radius 1,
tube 0.32, 220x36 segments) with meshStandardMaterial zinc-300 #D4D4D8,
metalness 0.85, roughness 0.25. Pointer interaction with pointer capture:
while dragging, convert pointer delta (NDC) into angular velocity on both
axes (~4 rad per full-screen sweep); on release keep the inertia with
friction decay 0.95 per frame (frame-rate independent via pow(0.95, dt*60));
after 2s idle, lerp the yaw velocity back to a slow 0.25 rad/s auto-
rotation and pitch to 0. All motion state in refs, cursor grab/grabbing.
Lighting without network assets: drei Environment with resolution 256 and
3-4 Lightformers (top softbox intensity 3, two side strips, weak front
fill) plus ambient 0.15 — no HDR preset download.`,
  },
  {
    id: 'warp-field',
    title: '超空间穿越',
    label: 'WARP FIELD',
    description: '数百个星点从隧道深处拉成光线迎面冲来，速度周期性脉冲加速，配合轻微旋转营造跃迁感。',
    categories: ['3d'],
    dark: true,
    interaction: 'auto',
    component: WarpField,
    prompt: `Create a React component with React Three Fiber: a hyperspace warp
tunnel on a dark #09090B canvas. Render ~420 stars as a single
instancedMesh of thin boxes (0.02 x 0.02 x 1) distributed in a hollow
cylindrical tunnel (radius 1.2-10, depth 70 units) flying toward the
camera along +z. Each frame compute a pulsing speed: speed = 5 + 34 *
pow(0.5 + 0.5 * sin(t * 0.45), 3) so the tunnel periodically bursts into
warp. Stretch each instance along z proportionally to speed (stretch =
0.6 + speed * 0.075) so stars become light streaks; recycle any star
passing the camera back to the far end with a fresh random angle/radius.
Per-instance color: lerp from dim steel blue (#93C5FD) in the distance to
bright white (#FAFAFA) near the camera, brightness also scaling with
proximity. Rotate the whole group slowly around z (0.05 rad/s) for a
gentle tunnel roll. Camera fov 75 at z=5, meshBasicMaterial with
toneMapped false, no lights needed.`,
  },
  {
    id: 'wireframe-forms',
    title: '线框几何雕塑',
    label: 'WIREFRAME FORMS',
    description: '二十面体、圆环、八面体三层嵌套线框以不同轴速缓慢旋转，整体轻轻呼吸缩放——极简雕塑感。',
    categories: ['3d'],
    interaction: 'auto',
    component: WireframeForms,
    prompt: `Create a React component with React Three Fiber: a minimal wireframe
sculpture on a #FAFAFA canvas. Three nested wireframe solids — an outer
icosahedron (radius 1.55, zinc-400 #A1A1AA, opacity 0.75), a middle torus
(radius 1.02, tube 0.34, zinc-300 #D4D4D8, opacity 0.55, tilted ~65deg)
and an inner octahedron (radius 0.6, zinc-500 #71717A, opacity 0.9) — all
meshBasicMaterial wireframe, no lights. Each solid rotates on its own axes
at different slow speeds (0.1-0.32 rad/s, mixed directions). The parent
group breathes with scale = 1 + sin(t * 0.6) * 0.04 and drifts around y at
0.06 rad/s. Camera at [0, 0.4, 5], fov 42. Strictly monochrome, gallery-
quiet mood.`,
  },
  {
    id: 'icon-cloud',
    title: '图标球云',
    label: 'ICON CLOUD',
    description: '12 枚 lucide 图标分布在球面上缓缓自转，按住拖拽即可甩动球云改变转速与方向，松手带惯性衰减。',
    categories: ['3d'],
    interaction: 'move',
    component: IconCloud,
    prompt: `Create a React component with React Three Fiber + @react-three/drei:
a draggable icon cloud on a #FAFAFA canvas. Place 12 lucide-react icons
(Sparkles, Star, Heart, Zap, Moon, Music, Camera, Globe, Code2, Coffee,
Rocket, Hexagon; size 20, strokeWidth 1.5, zinc-600 #52525B) on a sphere
of radius 1.75 using Fibonacci distribution, rendered with drei Html
(center, zIndexRange [5,0], pointerEvents none). Add a faint icosahedron
wireframe sphere (zinc-200, opacity 0.5) for depth. The group auto-rotates
at 0.18 rad/s; pointer drag (pointer capture on the wrapper div) converts
horizontal/vertical drag deltas into extra yaw/pitch velocity (clamped,
pitch limited to ±0.45 rad), and on release the extra velocity decays with
friction pow(0.94, dt*60) back to the idle spin. All motion state in refs,
applied in useFrame; cursor grab/grabbing. Camera fov 42 at z=5.`,
  },
  {
    id: 'dot-globe',
    title: '点阵地球',
    label: 'DOT GLOBE',
    description: '约 600 个点按斐波那契球面分布成地球缓缓自转，两条发光弧线连接地表两点，光点沿弧线流动——精密仪表感。',
    categories: ['3d'],
    dark: true,
    interaction: 'auto',
    component: DotGlobe,
    prompt: `Create a React component with React Three Fiber: a dotted globe on a
dark #09090B canvas. Sample ~600 points on a Fibonacci sphere of radius 2
(golden-angle spiral), rendered as a single THREE.Points with vertexColors —
zinc-100 (#F4F4F5) at randomized brightness (0.3-1.0 multiplier) for
instrument-like depth; point size 0.035, sizeAttenuation, toneMapped false.
The group self-rotates at 0.12 rad/s with a fixed 0.32 rad tilt plus a tiny
breathing wobble. Add two glowing connection arcs between points on the
sphere: pick endpoint pairs in lat/lon, build a QuadraticBezierCurve3 with
the control point pushed outward along the midpoint normal (1.5-1.7x radius),
then TubeGeometry (64 segments, radius 0.011) with a white core and a second
wider tube (radius 0.045, opacity ~0.12 pulsing with sin(t)) as a halo. Place
a small bright white sphere travelling along each arc via curve.getPoint
((t*speed + offset) % 1). Camera at [0, 0.6, 5.2], fov 45, no lights.`,
  },
  {
    id: 'lanyard',
    title: '悬挂工牌',
    label: 'LANYARD',
    description: '一张工牌吊在细绳上，按住拖拽即可甩动，松手后带阻尼摆动回稳——轻重力的弹簧摆动物理。',
    categories: ['3d'],
    interaction: 'move',
    component: Lanyard,
    prompt: `Create a React component with React Three Fiber: a hanging staff badge on
a #FAFAFA canvas. Draw the badge with an offscreen Canvas 2D texture (512x320,
white rounded rect, hairline zinc-300 stroke, clip hole at top center, grey
avatar placeholder, 'STAFF' in bold JetBrains Mono zinc-950, a mono subtitle
'MOTIONVAULT / N°034', and a small barcode strip), applied as a CanvasTexture
(transparent, toneMapped false) on a 1.36 x 0.85 plane. The badge hangs from
a thin cylinder rope (radius 0.008, zinc-500, length 1.7) on a pivot group at
y=1.55 with a small anchor pin sphere. Physics in useFrame with all state in
refs: a spring-pendulum where rotation.z (theta) integrates
omega += (-k*theta - c*omega)*dt. While pointer-dragging (pointer capture on
the wrapper div, cursor grab/grabbing, touchAction none) the spring stiffens
(k=34, c=9) and targets clamp(pointerNDC.x * 1.3, ±1.15) so the badge follows
the drag; on release k=9, c=0.55 gives a loose underdamped swing back to
center. Add a subtle lerped rotation.y tilt from drag x. Camera [0, 0.1, 4.2],
fov 42, no lights.`,
  },
  {
    id: 'woven-cloth',
    title: '织物波浪',
    label: 'WOVEN CLOTH',
    description: '48×48 顶点的细线框平面做交错正弦波浪，经纬相位交错起伏，像一块在风里微微抖动的布。',
    categories: ['3d'],
    interaction: 'auto',
    component: WovenCloth,
    prompt: `Create a React component with React Three Fiber: a woven-cloth wave on a
#FAFAFA canvas. A PlaneGeometry(6.4, 4.2, 48, 48) rendered as a single
meshBasicMaterial wireframe (zinc-400 #A1A1AA, opacity 0.8, no lights). Cache
the base positions once, then in useFrame rewrite each vertex z as
z = sin(x*1.1 + t*1.2)*0.26 + cos(y*1.5 + t*0.9)*0.2 + weave, where weave =
((ix+iy)%2===0 ? 1 : -1) * 0.07 * sin(t*1.7 + x*2.3 + y*1.1) — the
alternating warp/weft phase makes it read as fabric rather than a water
surface; set position.needsUpdate each frame. Tilt the group -0.95 rad on x
and add a slow rotation.z sway (±0.04 rad, sin(t*0.18)). Camera at
[0, 1.4, 4.3], fov 45. Strictly monochrome, quiet gallery mood.`,
  },
  {
    id: 'keyboard-3d',
    title: '实体键盘按压',
    label: 'KEYBOARD 3D',
    description: '一块迷你机械键盘悬浮在柔光里：敲击真实键盘的 A–Z 或直接点击键帽，对应键帽带弹簧物理下沉回弹。',
    categories: ['3d'],
    interaction: 'click',
    component: Keyboard3D,
    prompt: `Create a React component with React Three Fiber: a mini mechanical
keyboard on a #FAFAFA canvas, viewed from a 45deg elevated camera
([0, 4.4, 4.0], fov 40, lookAt near origin). Build 26 keycaps in three
QWERTY rows ('QWERTYUIOP' / 'ASDFGHJKL' / 'ZXCVBNM', pitch 0.56, row x
offsets 0 / 0.14 / 0.36) sitting on a dark zinc-800 rounded plate
(RoundedBox 6.1 x 0.22 x 2.15, radius 0.09). Each keycap is two stacked
drei RoundedBoxes — a zinc-300 bottom lip (0.48^2 x 0.12) and a zinc-100
top face (0.43^2 x 0.16, radius 0.06) — plus a letter legend: draw each
character on a 128x128 offscreen canvas (zinc-600, 56px monospace,
centered) into a CanvasTexture applied to a 0.26 plane lying flat on the
top face (meshBasicMaterial, transparent, toneMapped false). Every key
owns a spring state in a stable ref map { v, vel, target }: integrate in
useFrame with stiffness 340 / damping 24 (slightly underdamped), position
the keycap group at y = -0.09 * v and lerp the top-face material color
zinc-100 -> zinc-300 with v. Wire window keydown/keyup listeners (ignore
repeats and modifier combos, match /^[A-Z]$/ on e.key.toUpperCase()) to
set target 1/0, release all on window blur, and mirror the same
press/release on the keycap meshes' pointer events (stopPropagation on
pointerdown). Show a mono chip overlay with the last pressed letter.
Lighting: ambient 0.75 + key directional 1.15 + weak fill, drei
ContactShadows under the plate. All motion state in refs — no setState in
the frame loop.`,
  },
  {
    id: 'book-flip',
    title: '桌上翻书',
    label: 'BOOK FLIP',
    description: '一本摊开在桌面上的书：点击或静置片刻，一页纸带着自然的卷曲弧度翻过去，翻到底再往回翻。',
    categories: ['3d'],
    interaction: 'click',
    component: BookFlip,
    prompt: `Create a React component with React Three Fiber: an open book lying on a
#FAFAFA table, camera at [0, 3.4, 3.1] fov 40 looking at the spine. The
book (local XY plane, group rotated -90deg on x so pages lie flat): two
cloth cover boards (zinc-700, 1.49 x 2.04 x 0.055) mirrored around a
zinc-800 spine box, an amber bookmark ribbon (#F59E0B, 0.07 x 0.3) peeking
past the bottom edge, and two flat page stacks (6 thin white boxes per
side, 1.35 x 1.9, thickness 0.012, stacked with 0.012 z steps). On pointer
down (or after ~3.8s idle), flip the top sheet: a PlaneGeometry(1.35, 1.9,
24, 1) translated +w/2 on x so it pivots at the spine, parented to a pivot
group whose rotation.y eases 0 -> PI over 1150ms (ease-in-out); while
mid-air curl the sheet in useFrame by rewriting vertex z =
0.34 * sin(PI * x / w) * sin(theta) so it arcs like real paper, flat at
both ends (cache base positions, set needsUpdate). Page faces are
CanvasTextures (340x480, off-white, hairline border, mono 'CHAPTER · 0N'
header, three abstract editorial layout variants — title bars / paragraph
skeleton / soft gradient figure — one subtle amber accent line, page
number footer), cycled per flip, DoubleSide material. When a flip settles,
decrement the source stack / increment the other (React state for counts,
frame-loop state in refs with a ref mirror to avoid stale closures); when
the right stack empties, flips reverse direction and pages come back.
Ambient 0.8 + key directional, drei ContactShadows, mono chip overlay
counting turned pages.`,
  },
  {
    id: 'curve-carousel',
    title: '环线飞行轮播',
    label: 'CURVE CAROUSEL',
    description: '七张卡片沿着一条闭合的 3D 环形跑道滑行巡播，转向时像过山车一样侧倾压弯；点击左右两侧切换。',
    categories: ['3d'],
    interaction: 'click',
    component: CurveCarousel,
    prompt: `Create a React component with React Three Fiber: a 3D carousel of seven
portrait cards flying along a closed racetrack loop on a #FAFAFA canvas.
Build the loop by sampling 40 points of a stadium outline (straights along
x with half-length 2.35, semicircle caps radius 1.55) into a closed
CatmullRomCurve3 (centripetal, arcLengthDivisions 400). Each card: a white
matte RoundedBox (1.02 x 1.36 x 0.05, radius 0.045) with a CanvasTexture
face (256x340: white card, muted low-saturation gradient thumbnail from a
6-duotone palette — mist/sand/sage/clay/ink/dawn — plus one amber-tinted
variant, mono 'FRAME · 0N' tag, dark title bar, two skeleton lines).
Per frame place card i at curve.getPointAt((i/7 + offset) mod 1), yaw it
from the tangent (atan2(tan.x, tan.z) + PI/2 so it faces outward), and
bank it into the motion: rotation.z = clamp(-angularVelocity * 0.16,
±0.22). Emphasize depth: scale 0.82 -> 1.12 and y 0.86 -> 1.02 by
frontness ((z/1.55+1)/2), and lerp the material color from zinc-300 to
white with frontness so back cards recede. The shared offset eases toward
a target (lerp rate ~4.2/s): clicking the left/right half of the preview
(invisible button overlays, cursor w-resize/e-resize) steps the target by
±1/7 so the whole train glides one card along the curve; auto-advance
every 3.2s when idle. Camera [0, 2.5, 4.6] fov 42 looking at [0, 0.75, 0],
ambient 0.8 + one directional, drei ContactShadows, mono chip overlay
counting switches.`,
  },
  {
    id: 'rubiks-cube',
    title: '魔方拧动',
    label: 'RUBIKS CUBE',
    description: '一颗哑光魔方在展台上缓缓旋转：点击或静置即随机拧动一层，27 个小块带贴纸真实归位。',
    categories: ['3d'],
    interaction: 'click',
    component: RubiksCube,
    prompt: `Create a React component with React Three Fiber: a Rubik's cube on a
#FAFAFA studio canvas, camera [0, 1.6, 4.1] fov 40. Build 27 cubies on a
3x3x3 grid (pitch 0.35): each is a dark zinc-800 RoundedBox (0.315, radius
0.045) with six sticker planes (0.246^2) mounted 0.004 proud of each face
in a muted low-saturation palette — white #F4F4F5, sand #D9CDB8, sage
#9CAF88, steel blue #93B4C8, clay #C99A8E, amber #F59E0B. The root group
acts as a slow turntable (rotation.y += 0.22*dt, fixed 0.42 rad x tilt
with a tiny breathing wobble). A move: pick a random axis, layer
(-1/0/1) and direction; pivot the layer by attaching the 9 affected cubies
(those whose rounded grid coordinate matches the layer) to a temporary
pivot group with Object3D.attach (preserves world transforms), then ease
pivot.rotation[axis] 0 -> dir * PI/2 over 460ms (ease-in-out) in useFrame.
On completion attach all cubies back to the root and snap them: round
positions to the grid and round the 3x3 rotation matrix elements to
{-1,0,1} before rebuilding the quaternion — this keeps every turn exactly
on-grid. Ignore new moves while one is animating; auto-twist every 2s when
idle, and pointer down anywhere triggers an immediate twist (tick ref
pattern, no setState in the frame loop). Ambient 0.7 + key directional
1.1 + fill 0.35, drei ContactShadows, mono chip overlay counting twisted
layers.`,
  },
  {
    id: 'flip-clock',
    title: '翻页时钟',
    label: 'FLIP CLOCK',
    description: '六块机械翻牌显示实时本地时间：每秒个位秒牌绕中轴翻落，落地时带一下轻微的铰链回弹。',
    categories: ['3d'],
    dark: true,
    interaction: 'auto',
    component: FlipClock,
    prompt: `Create a React component with React Three Fiber: a 3D split-flap clock on
a dark #09090B canvas showing real local time as HH:MM:SS. Six digit tiles
(dark zinc-800 RoundedBox 0.64 x 0.94 x 0.07, radius 0.05, pitch 0.78) with
two blinking colon dot pairs between the pairs (small 0.07 boxes, zinc-400,
opacity pulsing 0.35-0.85 with |sin(t*PI)|). Each tile has a 1px black hinge
line across its middle and four stacked faces at z≈0.037-0.041: a static top
half-plane (0.58 x 0.42 at y +0.235), a static bottom half-plane (y -0.235),
a top flap plane hinged at y=0 (child of a pivot group, offset y +0.235) and
a bottom flap plane (offset y -0.235). Digit faces are CanvasTextures: draw
each glyph 0-9 once on a 128x188 canvas (white #FAFAFA, 148px monospace,
centered) and crop two 128x92 canvases (top/bottom halves) into shared
MeshBasicMaterials (transparent, toneMapped false). Per-digit state lives in
a refs array { shown, flipping, from, to, t0 }: every useFrame read new
Date() and when a digit differs from 'shown', start a two-phase flip —
phase A (240ms, ease-in): the top flap carrying the OLD top half falls
forward around the hinge, rotation.x 0 -> PI/2, while the static top shows
the NEW digit so it is progressively revealed; phase B (260ms, ease-out):
the bottom flap carrying the NEW bottom half swings from rotation.x PI/2
(horizontal, edge-on) down to 0, followed by a 140ms hinge bounce
(-0.09 rad * sin decay). On completion settle 'shown' to the new digit and
hide both flaps. Camera [0, 0.4, 5.4] fov 38 looking at [0, 0.1, 0],
ambient 0.5 + one directional 0.9. A frosted mono chip overlay (white/10
border, white/70 text) shows 'LOCAL TIME · HH:MM:SS' via a 500ms interval
with cleanup on unmount.`,
  },
];
