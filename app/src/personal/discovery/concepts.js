// Separate observed traits from suggested applications. Synonyms describe query intent.
const rows = [
  ['membership', '会员权益', 'Membership', 'use', '会员|权益|通行证|年卡|会员卡|membership|annual pass|member card'],
  ['hero', '首页主视觉', 'Hero section', 'use', '首页|首屏|主视觉|落地页|hero|landing page|homepage'],
  [
    'product',
    '产品展示',
    'Product showcase',
    'use',
    '商品|产品展示|产品图|电商|product showcase|ecommerce|product image'
  ],
  ['portfolio', '作品展示', 'Portfolio', 'use', '作品集|摄影|作品|portfolio|photography'],
  ['auth', '登录验证', 'Authentication', 'use', '登录|注册|密码|验证|login|sign in|signup|authentication|password|otp'],
  ['form', '信息输入', 'Data entry', 'use', '表单|输入|填资料|填写|填写信息|form|input|textarea|field'],
  [
    'selection',
    '选择筛选',
    'Selection',
    'use',
    '选择|筛选|选项|偏好|select|filter|checkbox|radio|combobox|picker|slider|dial|knob'
  ],
  [
    'dashboard',
    '数据概览',
    'Dashboard',
    'use',
    '后台|数据|看板|统计|仪表盘|报表|指标|dashboard|table|metrics|statistics|chart'
  ],
  ['calendar', '日程记录', 'Calendar', 'use', '日历|日期|预约|排期|行程|calendar|date|booking|schedule'],
  [
    'chat',
    '对话助手',
    'Chat assistant',
    'use',
    '聊天|对话|助手|消息输入|AI 助手|chat|assistant|conversation|message|prompt input'
  ],
  [
    'navigation',
    '导航入口',
    'Navigation',
    'use',
    '导航|菜单|目录|侧栏|工具栏|nav|navigation|menu|sidebar|dock|toolbar'
  ],
  ['content', '信息展示', 'Information', 'use', '信息|内容|列表|资料|阅读|content|list|profile|reading'],
  ['footer', '页尾联系', 'Footer', 'use', '页脚|页尾|联系|footer|contact'],
  ['card', '卡片组织', 'Cards', 'structure', '卡片|卡组|权益卡|卡券|卡面|凭证|card|deck|ticket|pass'],
  ['layout', '分块布局', 'Block layout', 'structure', '布局|便当盒|分块|bento|layout|grid layout'],
  ['gallery', '图片浏览', 'Image browsing', 'structure', '相册|画廊|图片|照片|图集|gallery|image|photo|masonry'],
  ['carousel', '轮播展示', 'Carousel', 'structure', '轮播|左右切换|多图切换|carousel|slideshow|slider'],
  ['button', '按钮操作', 'Button', 'structure', '按钮|点击确认|主操作|button|cta|call to action'],
  ['text', '文字呈现', 'Typography', 'structure', '文字|标题|文案|text|headline|title|typography'],
  [
    'expand',
    '内容展开',
    'Expansion',
    'motion',
    '展开|收起|折叠|抽屉|弹层|expand|collapse|drawer|dialog|accordion|sheet|modal'
  ],
  ['transition', '状态衔接', 'Transition', 'motion', '转场|过渡|切换页面|遮罩|transition|mask|wipe|morph'],
  ['flip', '翻面旋转', 'Flip / rotate', 'motion', '翻面|翻转|旋转|flip|rotation|rotating|rotate'],
  [
    'drag',
    '拖拽操作',
    'Dragging',
    'interaction',
    '拖拽|拖动|跟手|拉动|滑动操作|drag|draggable|swipe|pull down|pull-down'
  ],
  ['hover', '悬停反馈', 'Hover', 'interaction', '悬停|划过|靠近|经过|hover|on hover'],
  [
    'pointer',
    '指针响应',
    'Pointer response',
    'interaction',
    '鼠标|指针|跟随|磁吸|pointer|cursor|magnetic|mouse|proximity'
  ],
  ['click', '点击触发', 'Click', 'interaction', '点击|轻触|按下|click|tap|press'],
  ['scroll', '滚动驱动', 'Scroll', 'interaction', '滚动|下滑页面|随页面|scroll|sticky|pinned'],
  [
    'autoplay',
    '持续播放',
    'Continuous motion',
    'interaction',
    '自动播放|循环播放|持续播放|autoplay|auto-play|looping|infinite animation|continuous animation'
  ],
  [
    'reveal',
    '入场显现',
    'Reveal',
    'motion',
    '进入|入场|出现|渐入|浮现|显现|淡入|reveal|fade in|fade-in|entrance|appear'
  ],
  ['typing', '逐字显示', 'Typing', 'motion', '打字|逐字|解码|乱序|typing|typewriter|scramble|decrypt'],
  [
    'counter',
    '数值变化',
    'Counting',
    'motion',
    '数字变化|数字增长|数字滚动|数字|计数|数值|count|counter|ticker|odometer|number'
  ],
  ['background', '背景氛围', 'Background', 'structure', '背景|背景墙|底色|background|backdrop'],
  ['loading', '等待进度', 'Loading', 'motion', '等待|加载|进度|骨架|loading|loader|progress|spinner|skeleton'],
  [
    'feedback',
    '状态反馈',
    'Feedback',
    'motion',
    '成功|错误|提醒|提示|反馈|完成|feedback|notification|toast|alert|success|error'
  ],
  [
    'physics',
    '弹性运动',
    'Spring motion',
    'motion',
    '弹簧|弹性|回弹|弹跳|果冻|物理|spring|elastic|bounce|jelly|physics'
  ],
  ['parallax', '层次视差', 'Parallax', 'motion', '视差|景深|纵深|parallax|depth'],
  ['glitch', '故障失真', 'Glitch', 'visual', '故障|失真|解构|glitch|distortion|distort|shatter'],
  ['glass', '玻璃质感', 'Glass', 'visual', '毛玻璃|玻璃|透明磨砂|glass|frosted|glassmorphism'],
  ['gradient', '渐变色彩', 'Gradient', 'visual', '渐变|流光|极光|gradient|aurora|iridescent'],
  ['glow', '发光强调', 'Glow', 'visual', '发光|光晕|聚光|霓虹|光效|glow|neon|spotlight|shimmer|shine'],
  ['particles', '粒子点缀', 'Particles', 'visual', '粒子|彩带|火花|碎片|particle|confetti|spark|dust|firework'],
  ['geometry', '几何图形', 'Geometry', 'visual', '几何|点阵|网格|线条|geometry|grid|mesh|dot|lines|hexagon'],
  [
    'material',
    '材质纹理',
    'Material',
    'visual',
    '纹理|纸张|绸缎|布料|液体|texture|noise|grain|paper|silk|cloth|liquid'
  ],
  ['three-d', '三维空间', '3D', 'visual', '3d|三维|立体|透视|空间感|three dimensional|webgl|webgpu|perspective'],
  ['subtle', '柔和氛围', 'Subtle', 'visual', '柔和|轻柔|低调|克制|平静|subtle|gentle|soft|calm|minimal'],
  ['energetic', '鲜明动感', 'Energetic', 'visual', '活泼|强烈|炫酷|跳动|动感|energetic|vibrant|bouncy|bold'],
  ['border', '边框强调', 'Border', 'visual', '边框|描边|外框|border|outline|stroke'],
  ['tech', '科技风格', 'Technical', 'visual', '科技|赛博|终端|黑客|tech|cyber|terminal|hacker']
];
export const concepts = Object.fromEntries(
  rows.map(([id, zh, en, facet, words]) => [id, { id, labels: [zh, en], facet, terms: words.split('|') }])
);
export const facetLabels = {
  interaction: ['交互方式', 'Interaction'],
  motion: ['变化方式', 'Motion'],
  visual: ['视觉特点', 'Visual traits'],
  structure: ['内容结构', 'Structure'],
  use: ['应用方向', 'Applications'],
  delivery: ['交付方式', 'Delivery']
};
export const deliveryTags = {
  'local-demo': { id: 'local-demo', labels: ['站内可体验', 'Live local preview'], facet: 'delivery' },
  'source-bundle': { id: 'source-bundle', labels: ['源码可获取', 'Source available'], facet: 'delivery' },
  'reference-only': { id: 'reference-only', labels: ['原站参考', 'Upstream reference'], facet: 'delivery' },
  'video-preview': { id: 'video-preview', labels: ['录像预览', 'Video preview'], facet: 'delivery' }
};
export const tagById = { ...concepts, ...deliveryTags };
const patterns = new Map();
export function termMatches(text, term) {
  if (/[\u3400-\u9fff]/.test(term)) return text.includes(term);
  if (!patterns.has(term)) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    patterns.set(term, new RegExp(`\\b${escaped.replaceAll(' ', '[ -]+')}(?:s|ing)?\\b`, 'i'));
  }
  return patterns.get(term).test(text);
}
