// Editorial application guidance. These are suggestions, not upstream validation claims.
const rows = [
  [
    'cards',
    '卡片与权益',
    'Cards & passes',
    'card|membership|pass|ticket|会员|凭证|票根|卡片',
    '将一组相关信息组织成独立卡片，突出当前内容。',
    'Groups related information into a card and establishes a clear focus.',
    '会员权益、产品摘要、内容推荐',
    'Membership benefits, product summaries and recommendations',
    '独立边界便于比较、选择和逐项阅读。',
    'A distinct boundary makes items easier to compare, select and read.',
    'card'
  ],
  [
    'forms',
    '输入与表单',
    'Inputs & forms',
    'input|textarea|form|field|输入|表单',
    '提供填写、编辑或提交信息的界面。',
    'Provides an interface for entering, editing or submitting information.',
    '资料编辑、设置、搜索框和数据录入',
    'Profile editing, settings, search and data entry',
    '将输入内容与操作集中，帮助用户完成明确任务。',
    'Keeps input and actions together around a concrete task.',
    'form'
  ],
  [
    'choices',
    '选择与筛选',
    'Selection & filters',
    'select|combobox|autocomplete|picker|radio|checkbox|选择|筛选|单选|复选',
    '在多个候选项之间提供选择入口。',
    'Provides a way to choose between available options.',
    '商品筛选、偏好设置、分类切换',
    'Product filters, preferences and category selection',
    '将可选范围可视化，减少记忆与输入负担。',
    'Visible choices reduce recall and typing effort.',
    'selection'
  ],
  [
    'calendar',
    '日期与时间',
    'Dates & time',
    'calendar|date|time|日历|日期|时间',
    '将日期、时间或时间段组织成可阅读的界面。',
    'Organizes dates, times or periods into a readable interface.',
    '预约、行程、活动记录和排期',
    'Booking, itineraries, activity logs and scheduling',
    '时间结构让事件位置与范围更容易理解。',
    'A time structure makes event positions and ranges easier to understand.',
    'calendar'
  ],
  [
    'dialogs',
    '弹层与抽屉',
    'Dialogs & drawers',
    'dialog|modal|sheet|drawer|overlay|弹层|抽屉|面板',
    '在当前页面上展开一层聚焦内容。',
    'Opens a focused layer of content over the current page.',
    '详情查看、编辑确认、移动端操作面板',
    'Details, edit confirmations and mobile action panels',
    '保留背景上下文，同时把注意力收拢到当前步骤。',
    'Preserves page context while focusing attention on the current step.',
    'expand'
  ],
  [
    'tables',
    '表格与统计',
    'Tables & metrics',
    'table|chart|statistic|dashboard|metric|数据|表格|统计|图表',
    '以结构化区域展示数据、指标或记录。',
    'Presents data, metrics or records in structured regions.',
    '后台列表、统计概览、价格比较',
    'Admin lists, dashboards and pricing comparisons',
    '固定的对齐关系便于扫描差异和定位信息。',
    'Consistent alignment helps readers scan differences and locate information.',
    'dashboard'
  ],
  [
    'accordion',
    '折叠与展开',
    'Accordions',
    'accordion|collapsible|collapse|折叠',
    '把次要内容收起，在需要时逐项展开。',
    'Keeps secondary content collapsed until it is needed.',
    '常见问题、设置分组、较长的说明',
    'FAQs, grouped settings and long explanations',
    '减少初始信息量，同时保留按需深入的路径。',
    'Reduces initial information load while retaining access to detail.',
    'expand'
  ],
  [
    'tabs',
    '标签页与分段',
    'Tabs & segments',
    'tabs|tabbed|segment|标签页|分段',
    '在同一位置切换不同内容或状态。',
    'Switches between related content or states in one location.',
    '设置页面、产品信息、多个视图',
    'Settings, product details and alternate views',
    '固定外层布局使用户能比较内容而不丢失位置。',
    'A stable surrounding layout preserves orientation between views.',
    'navigation'
  ],
  [
    'layout',
    '网格与布局',
    'Grids & layouts',
    'grid|bento|masonry|layout|section|网格|布局|拼贴',
    '把多个信息块排列成有层级的组合。',
    'Arranges multiple content blocks into a hierarchy.',
    '功能展示、仪表盘、内容首页',
    'Feature sections, dashboards and content homepages',
    '通过面积、顺序和分组区分重点与辅助信息。',
    'Size, order and grouping separate primary and supporting information.',
    'layout'
  ],
  [
    'media',
    '图片与媒体',
    'Images & media',
    'image|photo|video|media|图片|照片|视频',
    '围绕图片或媒体内容提供展示方式。',
    'Provides a presentation centered on images or media.',
    '作品集、商品展示、摄影记录',
    'Portfolios, products and photo journals',
    '让视觉内容先传达主题，再承接文字或操作。',
    'Lets visuals establish the subject before text and actions.',
    'gallery'
  ],
  [
    'ai',
    '对话与 AI',
    'Chat & AI',
    'chat|message|prompt|reasoning|conversation|assistant|对话|助手|聊天',
    '组织消息、输入或生成过程相关的界面。',
    'Organizes messages, input or generation-related UI.',
    '聊天助手、消息中心、生成工具',
    'Chat assistants, messaging and generation tools',
    '区分输入、输出和过程，便于持续交流。',
    'Separates input, output and progress in an ongoing conversation.',
    'chat'
  ],
  [
    'auth',
    '登录与验证',
    'Authentication UI',
    'login|sign.in|sign.up|password|auth|register|otp|验证码|密码|登录',
    '呈现账号输入、验证或访问入口。',
    'Presents account entry, verification or access controls.',
    '登录、注册、账号安全设置',
    'Sign-in, registration and account security settings',
    '把身份相关步骤集中，帮助用户理解当前操作。',
    'Groups identity-related steps into a coherent flow.',
    'auth'
  ],
  [
    'content',
    '信息与标记',
    'Information & indicators',
    'badge|avatar|list|typography|label|separator|breadcrumb|标记|列表|头像|徽标',
    '为信息增加层级、标记或阅读结构。',
    'Adds hierarchy, indicators or reading structure to content.',
    '列表、个人资料、状态与内容说明',
    'Lists, profiles, status and explanatory content',
    '用明确的视觉角色帮助用户快速识别信息类型。',
    'Distinct visual roles help readers recognize information types.',
    'content'
  ],
  [
    'buttons',
    '按钮与操作',
    'Buttons & actions',
    'button|cta|action|按钮|操作',
    '突出一个可执行的动作入口。',
    'Highlights an actionable control.',
    '提交、购买、确认、主要行动按钮',
    'Submit, purchase, confirmation and primary calls to action',
    '清晰的按钮形态与反馈帮助用户识别可操作位置。',
    'A clear button shape and feedback make actions recognizable.',
    'button'
  ],
  [
    'feedback',
    '状态与反馈',
    'Status & feedback',
    'toast|sonner|alert|notification|status|check|success|error|提示|通知|状态|反馈',
    '展示操作结果、提醒或当前状态。',
    'Communicates a result, notification or current state.',
    '保存结果、错误提示、消息提醒',
    'Save results, errors and notifications',
    '及时反馈连接操作与结果，减少不确定感。',
    'Timely feedback connects an action with its outcome.',
    'feedback'
  ],
  [
    'loading',
    '加载与进度',
    'Loading & progress',
    'load|spinner|skeleton|progress|preload|加载|进度|骨架',
    '在等待或进展过程中提供可见的状态。',
    'Provides a visible state during waiting or progress.',
    '异步请求、上传、页面载入',
    'Async requests, uploads and page loading',
    '让等待过程可感知；是否显示真实百分比需由业务数据决定。',
    'Makes waiting visible; real percentages must come from application data.',
    'loading'
  ],
  [
    'toggle',
    '开关与切换',
    'Toggles',
    'toggle|switch|theme|开关|切换',
    '表达两种或多种可切换状态。',
    'Represents switchable states.',
    '偏好设置、主题切换、功能启停',
    'Preferences, themes and feature switches',
    '控件状态与选择结果对应，便于确认当前设置。',
    'The control reflects the selection and makes the current setting clear.',
    'selection'
  ],
  [
    'pointer',
    '指针与跟随',
    'Pointer interactions',
    'cursor|pointer|magnet|follow|proximity|spotlight|鼠标|指针|磁吸|跟随|聚光',
    '围绕指针位置或接近行为形成视觉响应。',
    'Builds a visual response around pointer position or proximity.',
    '桌面导航、按钮、可探索的展示区',
    'Desktop navigation, buttons and exploratory showcases',
    '反馈跟随用户动作，让可操作区域更容易被发现。',
    'Feedback follows the user’s action and reveals interactive regions.',
    'pointer'
  ],
  [
    'reveal',
    '渐入与显现',
    'Reveals',
    'reveal|fade|blur|appear|entrance|入场|浮现|渐入|显现',
    '让内容逐步进入视野，建立出现顺序。',
    'Brings content into view with a deliberate reveal sequence.',
    '标题入场、内容区段、结果展示',
    'Title entrances, content sections and results',
    '分阶段出现可引导阅读顺序，避免同时争夺注意力。',
    'Staged visibility can guide reading order instead of competing for attention.',
    'reveal'
  ],
  [
    'typing',
    '打字与解码',
    'Typing & decoding',
    'typewriter|typing|scramble|decrypt|打字|解码|乱序',
    '用逐字或字符变化表现文字出现的过程。',
    'Reveals text through character-by-character changes.',
    '短标题、终端风格、状态文案',
    'Short titles, terminal aesthetics and status copy',
    '字符节奏适合少量重点文字，长文应保持可快速阅读。',
    'Character rhythm suits short highlights; long passages should remain readable.',
    'typing'
  ],
  [
    'glitch',
    '故障与碎裂',
    'Glitch & distortion',
    'glitch|distort|shatter|pixel|故障|失真|碎裂|像素',
    '通过错位、破碎或失真改变内容表面。',
    'Changes a surface through displacement, fragmentation or distortion.',
    '科技主题、游戏界面、实验性标题',
    'Technology themes, game interfaces and experimental titles',
    '异常视觉强调风格与瞬间变化，适合短时强调。',
    'Visual disruption emphasizes style and moments of change.',
    'glitch'
  ],
  [
    'gradient',
    '渐变与流光',
    'Gradients & shine',
    'gradient|shine|shimmer|aurora|iridescen|渐变|流光|极光',
    '使用颜色过渡或流动的亮度形成层次。',
    'Creates depth through color transitions or moving highlights.',
    '品牌标题、主视觉、重点背景',
    'Brand titles, hero visuals and accent backgrounds',
    '连续色彩适合营造氛围，前景信息需要保持对比度。',
    'Continuous color builds atmosphere while foreground content needs contrast.',
    'gradient'
  ],
  [
    'text-layout',
    '排版与循环',
    'Text composition',
    'marquee|circular|rotate|orbit|curve|path|文字|text|环形|跑马灯',
    '通过文字排列或位置变化形成视觉节奏。',
    'Creates rhythm through text arrangement and movement.',
    '品牌展示、短口号、装饰性文字区域',
    'Brand showcases, short slogans and decorative text regions',
    '重复或空间排布强化识别，关键正文应保留静态阅读方式。',
    'Repetition and spatial layout aid recognition; essential text needs a stable reading option.',
    'text'
  ],
  [
    'counter',
    '数字与计数',
    'Numbers & counters',
    'counter|count|ticker|number|odometer|数字|计数',
    '突出数字、数值变化或计数过程。',
    'Emphasizes numbers, changing values or counting.',
    '统计摘要、进度、会员剩余期限',
    'Metric summaries, progress and remaining membership time',
    '变化过程可以解释状态迁移，但目标数值必须可清晰读取。',
    'The transition explains change while keeping the final value readable.',
    'counter'
  ],
  [
    'particles',
    '粒子与轨迹',
    'Particles & trails',
    'particle|confetti|spark|dust|snow|rain|trail|粒子|彩带|火花|轨迹|雪',
    '用离散点、碎片或轨迹营造动态层次。',
    'Uses points, fragments or trails to create motion layers.',
    '完成庆祝、氛围背景、指针点缀',
    'Completion celebrations, atmospheric backgrounds and pointer accents',
    '离散元素适合表达能量与方向，避免遮挡主要操作。',
    'Discrete elements convey energy and direction without needing to cover controls.',
    'particles'
  ],
  [
    'grid',
    '网格与几何',
    'Grids & geometry',
    'grid|mesh|line|dot|hexagon|triangle|geometr|网格|几何|点阵|线条',
    '以点、线或重复几何形状组织画面。',
    'Organizes a surface with points, lines or repeated geometry.',
    '技术产品、数据主题、结构化背景',
    'Technical products, data themes and structured backgrounds',
    '规则结构为前景提供秩序与空间参照。',
    'Regular structure gives the foreground order and spatial reference.',
    'geometry'
  ],
  [
    'texture',
    '纹理与材质',
    'Textures & materials',
    'noise|grain|silk|cloth|paper|fabric|liquid|water|glass|纹理|纸|丝|液|玻璃',
    '通过表面纹理或材质变化营造触感。',
    'Suggests a tactile surface through texture or material changes.',
    '品牌氛围、卡片表面、艺术展示',
    'Brand atmosphere, card surfaces and art showcases',
    '材质能区分层次与风格，正文与操作仍需清晰。',
    'Material distinguishes layers and style while text and controls stay legible.',
    'material'
  ],
  [
    'scene',
    '光影与空间',
    'Light & atmosphere',
    'light|beam|ray|space|galaxy|star|cosmic|sky|光|星|空间',
    '用光影或空间层次构建场景氛围。',
    'Builds atmosphere with light and spatial layers.',
    '活动主视觉、品牌首页、沉浸式展示',
    'Event visuals, brand homepages and immersive showcases',
    '场景感适合建立第一印象，后续内容需要明确入口。',
    'Atmosphere establishes an impression while follow-up content needs clear access.',
    'hero'
  ],
  [
    'parallax',
    '视差与景深',
    'Parallax & depth',
    'parallax|depth|视差|景深|纵深',
    '让不同层次产生位移差，形成前后关系。',
    'Moves layers differently to establish depth.',
    '产品展示、故事页面、空间感画廊',
    'Product showcases, stories and spatial galleries',
    '相对运动帮助用户辨认层次和焦点。',
    'Relative movement helps readers perceive layers and focus.',
    'parallax'
  ],
  [
    'pinned',
    '固定与横向滚动',
    'Pinned & horizontal',
    'pin|sticky|horizontal|固定|吸顶|横向',
    '在滚动过程中保留焦点，或引导内容沿横向展开。',
    'Keeps a focal region during scrolling or presents content horizontally.',
    '分步讲解、产品过程、连续内容展示',
    'Step-by-step explanations, product processes and sequences',
    '稳定的焦点使多阶段内容更容易跟随。',
    'A stable focus helps users follow multiple stages.',
    'scroll'
  ],
  [
    'scroll-progress',
    '滚动进度与驱动',
    'Scroll-driven changes',
    'progress|scrub|timeline|scroll|滚动|进度|时间轴',
    '将页面滚动位置与内容变化关联。',
    'Connects page position with content changes.',
    '故事叙述、章节导航、阅读进度',
    'Storytelling, chapter navigation and reading progress',
    '变化由用户前进速度控制，适合连续叙事。',
    'User-controlled progress suits a continuous narrative.',
    'scroll'
  ],
  [
    'carousel',
    '轮播与切换',
    'Carousels',
    'carousel|slider|slide|轮播|滑块|滑动',
    '依次切换一组内容，并突出当前项目。',
    'Cycles through a set of content with one item in focus.',
    '商品图、案例、推荐内容',
    'Product images, case studies and recommendations',
    '在有限区域保留多个项目，适合少量重点内容。',
    'Keeps multiple items in limited space, suited to a focused collection.',
    'carousel'
  ],
  [
    'gallery',
    '画廊与排列',
    'Galleries',
    'gallery|masonry|image|photo|画廊|相册|图片|照片',
    '用连续或成组的图片组织浏览体验。',
    'Organizes browsing through grouped or continuous images.',
    '摄影作品、商品目录、灵感集合',
    'Photo portfolios, product catalogs and inspiration collections',
    '图片之间的并置帮助用户比较风格与内容。',
    'Juxtaposed images make styles and content easier to compare.',
    'gallery'
  ],
  [
    'stack',
    '堆叠与卡组',
    'Stacks & decks',
    'stack|deck|pile|fan|堆叠|叠|卡组',
    '用层叠关系表达多个内容项之间的顺序。',
    'Uses layered cards to express item order.',
    '待办卡组、故事卡片、推荐浏览',
    'Task decks, story cards and recommendation browsing',
    '保留下一项的视觉线索，帮助预期后续内容。',
    'Visible layers hint at what comes next.',
    'card'
  ],
  [
    'menu',
    '菜单与入口',
    'Menus',
    'menu|nav|navbar|菜单|导航',
    '集中展示页面或功能入口。',
    'Groups page or feature destinations.',
    '站点导航、应用入口、移动菜单',
    'Site navigation, application entry points and mobile menus',
    '入口聚合减少寻找路径的成本。',
    'Grouped destinations reduce the effort of finding a route.',
    'navigation'
  ],
  [
    'dock',
    'Dock 与工具栏',
    'Docks & toolbars',
    'dock|toolbar|icon|底栏|工具栏|图标',
    '将高频入口收拢为一组紧凑控件。',
    'Collects frequent actions in a compact group.',
    '工具面板、应用切换、桌面式入口',
    'Tool panels, app switching and desktop-style navigation',
    '固定位置与视觉分组便于重复使用。',
    'A consistent location and grouping support repeated use.',
    'navigation'
  ],
  [
    'sidebar',
    '侧栏与树形',
    'Sidebars & trees',
    'sidebar|tree|side.nav|侧栏|树形',
    '以纵向层级展示多个区域或路径。',
    'Presents areas or routes as a vertical hierarchy.',
    '后台系统、文档、复杂目录',
    'Admin applications, documentation and large catalogs',
    '层级与缩进可以呈现归属关系，适合较多入口。',
    'Hierarchy and indentation show relationships among many destinations.',
    'navigation'
  ],
  [
    'transition',
    '转场与遮罩',
    'Transitions & masks',
    'transition|mask|wipe|morph|curtain|转场|遮罩|过渡|形变',
    '把一个视觉状态衔接到下一个状态。',
    'Connects one visual state to the next.',
    '页面切换、内容替换、展开收回',
    'Page changes, content replacement and opening or closing',
    '连续变化解释前后关系，避免突然跳变。',
    'Continuity explains the relationship between states.',
    'transition'
  ],
  [
    'flip',
    '翻面与旋转',
    'Flips & rotation',
    'flip|rotate|rotation|翻面|翻转|旋转',
    '通过旋转或翻面展示另一种状态。',
    'Uses rotation or a flip to present another state.',
    '凭证正反面、产品细节、趣味卡片',
    'Pass fronts and backs, product details and playful cards',
    '同一对象连续变化，适合说明两面内容的关联。',
    'A continuous transformation links the two views of one object.',
    'flip'
  ],
  [
    'physics',
    '弹性与拖动',
    'Springs & dragging',
    'spring|elastic|drag|bounce|physics|jelly|弹簧|弹性|拖动|拖拽|回弹',
    '以弹性位移或物理感运动表现交互过程。',
    'Uses spring-like displacement or physical motion in an interaction.',
    '卡片操作、切换反馈、可探索界面',
    'Card manipulation, state feedback and exploratory interfaces',
    '运动的跟随与收敛能表现动作与结果的关系。',
    'Following and settling motion connect an action to its result.',
    'physics'
  ],
  [
    'objects',
    '3D 物体',
    '3D objects',
    'sphere|cube|orb|torus|knot|globe|book|dice|object|球|立方|地球|物体',
    '通过三维形体、透视或光照表现空间对象。',
    'Presents a spatial object using geometry, perspective or lighting.',
    '产品主视觉、品牌图形、交互展示',
    'Product heroes, brand graphics and interactive showcases',
    '立体关系适合表现形状与空间特征。',
    'Spatial relationships emphasize shape and dimensional qualities.',
    'three-d'
  ],
  [
    'shader',
    'Shader 与场景',
    'Shaders & scenes',
    'shader|webgl|scene|terrain|plane|fluid|webgpu|着色|场景|地形',
    '利用渲染效果形成连续变化的视觉场景。',
    'Uses rendering effects to form a changing visual scene.',
    '实验性主视觉、艺术展示、氛围空间',
    'Experimental heroes, art showcases and atmospheric spaces',
    '连续表面变化适合传达风格与空间感；应评估设备负担。',
    'Continuous surface changes express style and space; assess device cost.',
    'three-d'
  ],
  [
    'footer',
    '页脚信息',
    'Footer content',
    'footer|foot|contact|页脚|联系',
    '在页面末尾组织联系、导航与补充信息。',
    'Organizes contact, navigation and supporting information at the page end.',
    '官网页尾、作品集联系区',
    'Website footers and portfolio contact sections',
    '为浏览结束提供明确的下一步。',
    'Offers a clear next step at the end of browsing.',
    'footer'
  ]
];

export const profiles = Object.fromEntries(
  rows.map(([id, zh, en, pattern, whatZh, whatEn, whereZh, whereEn, whyZh, whyEn, concept]) => [
    id,
    {
      id,
      labels: [zh, en],
      pattern: new RegExp(pattern, 'i'),
      what: [whatZh, whatEn],
      where: [whereZh, whereEn],
      why: [whyZh, whyEn],
      concept
    }
  ])
);
profiles.paths = {
  id: 'paths',
  labels: ['路径与描边', 'Paths & strokes'],
  pattern: /draw|stroke|path|signature|strands|描边|路径|签名|线条/i,
  what: ['沿轮廓或路径绘制线条，展示形状形成的过程。', 'Draws a shape along its outline or path.'],
  where: ['Logo、图标、流程连线与签名展示', 'Logos, icons, flow connections and signatures'],
  why: [
    '轨迹将注意力引向形状或方向，适合解释顺序关系。',
    'A trace draws attention to a shape or direction and can explain sequence.'
  ],
  concept: 'geometry'
};
profiles.breadcrumbs = {
  id: 'breadcrumbs',
  labels: ['路径与分页', 'Paths & pagination'],
  pattern: /breadcrumb|pagination|面包屑|分页/i,
  what: [
    '展示当前路径或分页位置，并提供切换入口。',
    'Shows the current path or page position with navigation controls.'
  ],
  where: ['多层目录、搜索结果、后台列表', 'Nested catalogs, search results and admin lists'],
  why: ['可见的位置线索帮助用户理解归属与剩余内容。', 'Visible position cues explain hierarchy and remaining content.'],
  concept: 'navigation'
};
export const categoryChildren = {
  Components: [
    'auth',
    'ai',
    'forms',
    'choices',
    'calendar',
    'dialogs',
    'tables',
    'accordion',
    'tabs',
    'layout',
    'media',
    'cards',
    'feedback',
    'loading',
    'buttons',
    'menu',
    'counter',
    'pointer',
    'texture',
    'content'
  ],
  TextAnimations: ['typing', 'counter', 'glitch', 'gradient', 'pointer', 'reveal', 'text-layout'],
  Animations: [
    'pointer',
    'particles',
    'flip',
    'physics',
    'reveal',
    'paths',
    'glow',
    'texture',
    'gallery',
    'transition'
  ],
  Backgrounds: ['gradient', 'particles', 'grid', 'glitch', 'physics', 'texture', 'scene'],
  Micro: [
    'auth',
    'buttons',
    'toggle',
    'choices',
    'forms',
    'counter',
    'feedback',
    'loading',
    'menu',
    'physics',
    'pointer'
  ],
  ScrollEffects: ['parallax', 'pinned', 'reveal', 'scroll-progress'],
  Galleries: ['stack', 'carousel', 'parallax', 'gallery'],
  Navigation: ['dock', 'sidebar', 'tabs', 'breadcrumbs', 'menu'],
  PageTransitions: ['loading', 'reveal', 'transition'],
  ThreeD: ['flip', 'carousel', 'particles', 'stack', 'texture', 'scene', 'objects', 'shader'],
  Footers: ['footer']
};
profiles.glow = {
  what: ['以移动高光或发亮边缘强调目标区域。', 'Emphasizes a region with moving highlights or illuminated edges.'],
  where: ['焦点卡片、主要入口、视觉展示区', 'Focus cards, primary entry points and visual showcases'],
  why: [
    '亮度差异引导注意力，适合少量重点；避免所有区域同时争夺视线。',
    'Contrast directs attention to a few priorities; avoid highlighting everything at once.'
  ],
  id: 'glow',
  labels: ['高光与边框', 'Highlights & borders'],
  pattern: /glow|glare|light|laser|border|ring|高光|反光|边框|光线/i,
  concept: 'glow'
};
profiles.dialogs.pattern = /dialog|modal|sheet|drawer|overlay|popover|弹层|抽屉|面板|浮层/i;
profiles.choices.pattern =
  /select|combobox|autocomplete|picker|radio|checkbox|slider|dial|knob|选择|筛选|单选|复选|滑块/i;
profiles.gradient.pattern = /gradient|shine|shimmer|aurora|iridescen|color.bends|渐变|流光|极光|色彩/i;
profiles.objects.pattern =
  /sphere|cube|orb|torus|knot|globe|book|dice|object|keyboard|lanyard|rope|ring|球|立方|地球|物体|挂绳/i;
profiles.hooks = {
  id: 'hooks',
  labels: ['状态与工具 Hook', 'State & utility hooks'],
  pattern: /hook|^use[A-Z]/,
  what: [
    '提供状态、事件或浏览器能力的复用逻辑，本身不一定包含可见动效。',
    'Reusable state, event or browser logic that may not include a visible animation.'
  ],
  where: ['交互状态管理、响应式布局、偏好保存', 'Interaction state, responsive layouts and saved preferences'],
  why: [
    '把重复逻辑与视觉分开，便于多个界面复用；需配合组件代码使用。',
    'Separates recurring logic from visuals for reuse across components.'
  ],
  concept: 'content'
};
profiles['image-trail'] = {
  id: 'image-trail',
  labels: ['图片拖尾', 'Image trails'],
  pattern: /image.trail|photo.trail|图片拖尾|图像轨迹/i,
  what: [
    '沿指针移动路径依次出现图片，形成短暂的视觉轨迹。',
    'Reveals images along pointer movement to form a temporary visual trail.'
  ],
  where: [
    '摄影作品集、创意工作室首页、图片探索区',
    'Photo portfolios, creative studio homepages and image explorations'
  ],
  why: [
    '移动动作逐张揭示作品，适合营造探索感；关键信息仍需独立可见。',
    'Movement reveals work one image at a time and encourages exploration; keep essential information independently visible.'
  ],
  concept: 'pointer'
};
categoryChildren.Animations.unshift('image-trail');
categoryChildren.Components.push('carousel', 'gallery', 'objects', 'text-layout', 'hooks');
categoryChildren.Micro.push('cards');
categoryChildren.Animations.push('carousel', 'accordion', 'calendar', 'scene');
categoryChildren.ThreeD.push('grid');
profiles.light = {
  id: 'light',
  labels: ['光线与光幕', 'Light & beams'],
  pattern: /beam|veil|fiber|light|plasma|radar|scanner|rays|web.threads|lamp|caustic|circuit|光|扫描/i,
  what: [
    '以光线、光幕或明暗变化构成画面氛围。',
    'Builds atmosphere through beams, light fields or changes in brightness.'
  ],
  where: ['品牌首屏、科技主题、内容展示背景', 'Brand heroes, technical themes and showcase backgrounds'],
  why: [
    '光照层次提供方向与空间感，适合衬托前景；文字区域应保留足够对比。',
    'Light layers convey direction and depth behind content; preserve text contrast.'
  ],
  concept: 'glow'
};
categoryChildren.Backgrounds.push('light');
profiles.accordion.pattern = /accordion|collapsible|collapse|expand|折叠|展开/i;
profiles.carousel.pattern = /carousel|slider|loop|轮播|循环/i;
profiles.scene.pattern = /scene|landscape|terrain|orb|prism|eye|balatro|galaxy|day.night|map|场景|地形|昼夜|地图/i;
profiles.texture.pattern = /texture|cloth|fabric|silk|metal|topo|ripple|glass|dither|材质|纹理|金属|波纹|玻璃|抖色/i;
profiles.particles.pattern = /particle|confetti|spark|dust|snow|rain|trail|starfield|粒子|彩带|火花|轨迹|雪|星空/i;
profiles.physics.pattern = /spring|elastic|drag|bounce|physics|jelly|meta.balls|peel|弹簧|弹性|拖动|拖拽|回弹|撕|剥离/i;
for (const category of Object.keys(categoryChildren)) {
  if (category === 'Footers') continue;
  const id = `other-${category}`;
  profiles[id] = {
    id,
    labels: ['其他方案', 'Other patterns'],
    pattern: /$a/,
    what: [
      '提供此类别下的一种界面呈现方式，具体行为可对照原始说明与演示。',
      'Provides a presentation pattern in this category; consult the original description and demo for exact behavior.'
    ],
    where: ['需要相应界面表达的原型与设计探索', 'Prototypes and design explorations requiring this presentation'],
    why: [
      '先根据内容结构与交互目标选择，再通过实际预览确认是否合适。',
      'Choose by content structure and interaction goals, then verify the fit in the actual preview.'
    ],
    concept: 'content'
  };
  categoryChildren[category].push(id);
}
export const subcategories = Object.entries(categoryChildren).flatMap(([category, ids]) =>
  ids.map(profile => ({ id: `${category}/${profile}`, category, profile, labels: profiles[profile].labels }))
);
export const subcategoryById = Object.fromEntries(subcategories.map(s => [s.id, s]));

export function normalizeText(value = '') {
  return String(value)
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[-_/]+/g, ' ');
}
export function classifyItem(item) {
  const ids = categoryChildren[item.category];
  const slug = item.slug || '';
  const exact = slug.startsWith('date-picker')
    ? 'calendar'
    : slug.startsWith('input-otp')
      ? 'auth'
      : slug.startsWith('ai--')
        ? 'ai'
        : slug.startsWith('button--')
          ? 'buttons'
          : slug.startsWith('hooks--')
            ? 'hooks'
            : slug.startsWith('text--')
              ? 'text-layout'
              : null;
  if (exact && ids.includes(exact))
    return { id: `${item.category}/${exact}`, profile: profiles[exact], basis: 'source-identifier' };
  const title = normalizeText(`${item.slug || ''} ${item.name} ${item.titleZh}`);
  const context = normalizeText(
    `${item.sourceCategory || ''} ${(item.tags || []).join(' ')} ${item.description || ''}`
  );
  const overrides = {
    'personal-ai/m03': 'calendar',
    'Components/DepthCarousel': 'carousel',
    'Components/FlyingPosters': 'gallery',
    'Components/Folder': 'content',
    'Components/ModelViewer': 'objects',
    'Animations/PixelSwap': 'transition',
    'motion-vault/dotted-map': 'scene',
    'motion-vault/marquee-3d': 'objects'
  };
  if (overrides[item.id] && ids.includes(overrides[item.id]))
    return {
      id: `${item.category}/${overrides[item.id]}`,
      profile: profiles[overrides[item.id]],
      basis: 'source-identifier'
    };
  let best = ids[ids.length - 1],
    score = 0;
  for (const id of ids) {
    const p = profiles[id];
    const n = (p.pattern.test(title) ? 10 : 0) + (p.pattern.test(context) ? 2 : 0);
    if (n > score) {
      best = id;
      score = n;
    }
  }
  return {
    id: `${item.category}/${best}`,
    profile: profiles[best],
    basis: score ? 'source-metadata' : 'category-fallback'
  };
}
