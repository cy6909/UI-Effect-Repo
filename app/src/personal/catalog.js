import { componentMetadata } from '../constants/Information.js';
import motionPromptsCatalog from './motion-prompts/catalog-data.js';
import { personalAiCatalog } from './personal-ai/catalog.js';
import openLibraryCatalog from './open-libraries/catalog-data.js';
import { enrichItem } from './discovery/enrich.js';

export const categoryLabels = {
  Components: ['交互组件', 'Components'],
  TextAnimations: ['文字动效', 'Text animations'],
  Animations: ['交互动效', 'Animations'],
  Backgrounds: ['动态背景', 'Backgrounds'],
  Micro: ['微交互', 'Micro interactions'],
  ScrollEffects: ['滚动叙事', 'Scroll stories'],
  Galleries: ['轮播与画廊', 'Sliders & galleries'],
  Navigation: ['导航菜单', 'Navigation'],
  PageTransitions: ['入场与转场', 'Reveals & transitions'],
  ThreeD: ['3D 与 WebGL', '3D & WebGL'],
  Footers: ['创意页脚', 'Creative footers']
};

// Keep translations separate from upstream identifiers and implementation files.
const titlePairs = `AnimatedContent|内容入场
BlobCursor|流体光标
ClickSpark|点击火花
Crosshair|十字准星
Cubes|立方体阵列
ElectricBorder|电流边框
FadeContent|淡入内容
GlareHover|悬浮反光
GradualBlur|渐进模糊
CrystalizedBall|水晶光球
ElectricLogo|电流标志
DitherVeil|抖色揭幕
GlowCursor|发光轨迹
GhostCursor|幽灵光标
ImageTrail|图片拖尾
LogoLoop|标志循环
Magnet|磁吸元素
MagnetLines|磁场线条
MetaBalls|融合液球
Strands|光纤丝带
MetallicPaint|金属流光
Noise|颗粒噪点
PixelTrail|像素拖尾
PixelTransition|像素转场
PixelSwap|像素切换
Ribbons|飘动丝带
ShapeBlur|形状模糊
SplashCursor|流体泼墨
StarBorder|星光边框
StickerPeel|揭开贴纸
TargetCursor|目标光标
LaserFlow|激光流动
Antigravity|反重力粒子
OrbitImages|轨道图片
MagicRings|魔法圆环
ASCIIText|字符艺术文字
BlurText|模糊渐显文字
CircularText|环形文字
CountUp|数字递增
CurvedLoop|曲线循环文字
DecryptedText|解密文字
FallingText|下落文字
FuzzyText|毛边文字
GlitchText|故障文字
GradientText|渐变文字
RotatingText|轮换文字
ScrambledText|乱序文字
ScrollFloat|滚动浮现
ScrollReveal|滚动揭示
ScrollVelocity|速度响应文字
ShinyText|流光文字
SplitText|逐字入场
TextCursor|文字光标
TextPressure|文字挤压
TextType|打字机
TrueFocus|焦点文字
VariableProximity|距离感应字形
Shuffle|洗牌文字
ParticleText|粒子文字
SplitFlapText|翻页显示牌
WarpText|扭曲文字
TechText|科技文字
StrokeText|描边文字
DepthText|立体文字
FoldText|折叠文字
EchoText|回声文字
MaskedHeading|遮罩标题
TextLoop|文字循环
AnimatedList|动态列表
BounceCards|弹跳卡片
BubbleMenu|气泡菜单
CardNav|卡片导航
CardSwap|卡片轮换
Carousel|卡片轮播
ChromaGrid|彩色光晕网格
HoloCard|全息卡片
CircularCarousel|环形轮播
FlexCarousel|伸缩轮播
DepthCarousel|纵深轮播
AccordionGallery|手风琴画廊
MorphSlider|形变滑动器
DriftWall|漂浮照片墙
CircularGallery|弧形画廊
Counter|滚动计数器
DecayCard|消散卡片
Dock|桌面程序坞
DomeGallery|穹顶画廊
ElasticSlider|弹性滑块
FlowingMenu|流动菜单
FluidGlass|流体玻璃
FlyingPosters|飞行海报
Folder|展开文件夹
GlassIcons|玻璃图标
GlassSurface|玻璃表面
GooeyNav|粘性导航
InfiniteSpiral|无限螺旋
InfiniteMenu|无限菜单
Lanyard|物理挂绳
MagicBento|交互便当盒
Masonry|瀑布流
ModelViewer|三维模型查看器
PillNav|胶囊导航
PixelCard|像素卡片
ProfileCard|个人资料卡
ScrollStack|滚动卡片堆叠
SpotlightCard|聚光灯卡片
BorderGlow|流光边界
LineSidebar|线条侧边栏
OptionWheel|选项转盘
SpecularButton|镜面按钮
ElasticMesh|弹性网格
RippleDistortion|涟漪扭曲
SwarmCursor|粒子群光标
HalftoneReveal|半色调揭示
ScrollExpand|滚动展开
CursorGrid|光标网格
CurvedInput|弧形输入框
Stack|卡片堆
Stepper|步骤向导
TiltedCard|倾斜卡片
StaggeredMenu|交错菜单
ReflectiveCard|反射卡片
PatternWaves|图案波浪
MicroSlats|细条阵列
ShapeWaves|形状波浪
AeroShards|空气碎片
GhostFibers|幽光纤维
Aurora|极光
Balatro|迷幻漩涡
Ballpit|物理球池
Beams|光束
ColorBends|弯曲色彩
CRTWarp|显像管扭曲
DarkVeil|暗色光幕
Dither|抖色背景
DotField|点阵场
DotGrid|交互点阵
FaultyTerminal|故障终端
Galaxy|星系
GradientBlinds|渐变百叶窗
Lightfall|光瀑
Ferrofluid|磁流体
MoltenMetal|熔融金属
GradientWaves|渐变波浪
WebThreads|蛛网丝线
Topography|地形等高线
LightTunnel|光隧道
SlicedWaves|切片波浪
AcidSquares|迷幻方格
Scanner|扫描光幕
Grainient|颗粒渐变
GridScan|网格扫描
GridDistortion|网格扭曲
GridMotion|运动网格
Hyperspeed|极速穿梭
Iridescence|虹彩
LetterGlitch|字符故障
LightRays|光线投射
Lightning|闪电
LineWaves|线条波浪
EvilEye|凝视之眼
Radar|雷达
SoftAurora|柔和极光
LiquidChrome|液态铬
Orb|能量球
Particles|粒子场
PixelBlast|像素爆发
Plasma|等离子体
PlasmaWave|等离子波
Prism|棱镜
PrismaticBurst|棱镜光爆
RippleGrid|涟漪网格
Silk|丝绸
SideRays|侧向光束
ShapeGrid|形状网格
Threads|流动丝线
Waves|波浪
LiquidEther|液态以太
FloatingLines|悬浮线条
LightPillar|光柱
PixelSnow|像素雪
SquishSwitch|挤压开关
HoldButton|长按按钮
PeekRating|探出评分
SpringCheck|弹簧复选框
PulseHeart|心跳收藏
RubberSegment|橡皮分段选项
SlideCommit|滑动确认
WarmTooltip|柔和提示
FuseButton|引线按钮
ScrubField|拖动数值框
LatticeLoader|格栅加载
DodgeField|躲闪输入框
CodeSlots|验证码槽位
WakeSlider|唤醒滑块
CometDial|彗星旋钮
JellyRadio|果冻单选
SwipeRow|侧滑列表项
GlideSelect|滑动选择
StatusMark|状态标记
CallChip|通话胶囊
BellToggle|铃铛开关
SlingButton|弹射按钮
SwipeToast|滑动通知
PromptBar|提示词输入栏
SloshGauge|液面仪表
VoicePill|语音胶囊
ThoughtLine|思考状态条
RefineFrame|调整边框
FolderFloat|浮起文件夹
BranchedMenu|分支菜单
FlipCard|翻面卡片
TearTicket|撕开票根
PaperCrumple|揉纸
Shredder|碎纸机`;
export const titlesZh = Object.fromEntries(titlePairs.split('\n').map(line => line.split('|')));
export const descriptionsZh = {
  DepthCarousel:
    '卡片沿三维轨道向纵深排列，支持拖动、键盘切换与自动播放。调整透视、间距和倾斜角度，探索不同的空间层次。',
  BlurText: '文字从模糊到清晰逐步浮现。调整字词间隔、入场方向与动画节奏，为标题和段落添加柔和的入场效果。',
  SpotlightCard: '光晕跟随指针在卡片表面移动，突出当前关注的位置。适合功能介绍、内容入口和可交互的信息卡片。'
};
const featured = [
  'DepthCarousel',
  'BlurText',
  'SpotlightCard',
  'Aurora',
  'GlassSurface',
  'Dock',
  'SplitText',
  'MagicBento',
  'Silk',
  'Lanyard',
  'TiltedCard',
  'SquishSwitch'
];
export const reactBitsCatalog = Object.values(componentMetadata)
  .map(item => ({
    ...item,
    source: 'react-bits',
    posterUrl: `/assets/personal-posters/${item.name}.webp`,
    id: `${item.category}/${item.name}`,
    titleZh: titlesZh[item.name] || item.name,
    path: new URL(item.docsUrl).pathname,
    variants: item.variants || ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW']
  }))
  .sort((a, b) => {
    const rank = item => (featured.includes(item.name) ? featured.indexOf(item.name) : 1000);
    return rank(a) - rank(b) || a.name.localeCompare(b.name);
  });

export { motionPromptsCatalog, personalAiCatalog, openLibraryCatalog };
export const catalog = [...reactBitsCatalog, ...motionPromptsCatalog, ...personalAiCatalog, ...openLibraryCatalog].map(
  enrichItem
);
export const sourceLabels = {
  'react-bits': 'React Bits',
  'motion-prompts': 'Motion Prompts',
  'personal-ai': '个人 AI 实现',
  'motion-vault': 'MotionVault',
  'shadcn-studio': 'Shadcn Studio',
  'shadcn-io': 'shadcn.io'
};
export const getPromptKind = item =>
  item.promptKind === 'user-provided-original'
    ? 'recreation'
    : item.promptKind === 'not-archived'
      ? 'none'
      : item.promptKind ||
        (item.source === 'react-bits' ? 'integration' : item.source === 'motion-prompts' ? 'recreation' : 'unknown');

export function filterCatalog(
  items,
  {
    query = '',
    category = 'all',
    subcategory = 'all',
    tag = 'all',
    source = 'all',
    access = 'all',
    kind = 'all',
    savedOnly = false,
    saved = []
  } = {}
) {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return items.filter(item => {
    const haystack = [
      item.name,
      item.titleZh,
      item.description,
      item.category,
      sourceLabels[item.source],
      ...(categoryLabels[item.category] || []),
      ...item.tags
    ]
      .join(' ')
      .toLocaleLowerCase();
    return (
      (category === 'all' || category === item.category) &&
      (subcategory === 'all' || subcategory === item.subcategory) &&
      (tag === 'all' || item.discoveryTags?.some(t => t.id === tag)) &&
      (source === 'all' || source === item.source) &&
      (kind === 'all' || getPromptKind(item) === kind) &&
      (access === 'all' ||
        (access === 'full'
          ? item.source === 'react-bits' || item.promptAccess === 'full'
          : item.promptAccess === access)) &&
      (!savedOnly || saved.includes(item.id)) &&
      terms.every(term => haystack.includes(term))
    );
  });
}
