const archive = 'https://app.notion.com/p/';
const rows = [
  [
    'm01',
    'M01',
    '会员期限毛玻璃卡',
    'Frosted Glass Membership',
    'Components',
    'm01.html',
    '3f490f837c9581d6a66ad625443cd27d',
    '163 天、12 段连续有效期进度与 Montserrat 数字，支持卡外关闭和行程返回。',
    'A frosted membership sheet with 163 remaining days, twelve progress segments and itinerary navigation.'
  ],
  [
    'm02',
    'M02',
    '圆环计数通行卡',
    'Ring Counter Pass',
    'Animations',
    'm02-m06.html',
    '3f490f837c9581f29ed4fc2098dae5b4',
    '阅读通行卡浮起，数字与圆环沿同一时间轴增长，支持编号揭示。',
    'A floating reading pass with synchronized number and ring animation and a revealable code.'
  ],
  [
    'm03',
    'M03',
    '刻度尺时间凭证',
    'Timeline Ruler Pass',
    'Animations',
    'm02-m06.html',
    '3f490f837c9581f29ed4fc2098dae5b4',
    '53 根刻度依次扫到今天，保留年册信息和原位编号揭示。',
    'Fifty-three ticks sweep toward today, with journal details and an inline code reveal.'
  ],
  [
    'm04',
    'M04',
    '照片衔接抽屉',
    'Photo Detail Drawer',
    'Components',
    'm02-m06.html',
    '3f490f837c9581f29ed4fc2098dae5b4',
    '食谱照片缩放归位，详情抽屉与图片下缘贴合，可切换菜谱。',
    'A recipe photo settles into place as its attached detail drawer expands.'
  ],
  [
    'm05',
    'M05',
    '3D 翻面凭证',
    '3D Flip Pass',
    'ThreeD',
    'm02-m06.html',
    '3f490f837c9581f29ed4fc2098dae5b4',
    'NOMAD 卡片在原位沿 Y 轴翻转，正反面共享边界，支持返回。',
    'A NOMAD pass flips around its Y axis with matching front and back geometry.'
  ],
  [
    'm06',
    'M06',
    '拖动展开票根',
    'Pull-down Ticket Stub',
    'Micro',
    'm02-m06.html',
    '3f490f837c9581f29ed4fc2098dae5b4',
    '票根跟随把手拖动，超过 40% 后展开，否则回弹，支持键盘操作。',
    'A draggable ticket stub snaps open past 40 percent and springs back below the threshold.'
  ],
  [
    'calendar-cards',
    'R01',
    '交互日历卡片',
    'Interactive Calendar Cards',
    'Components',
    'calendar-cards.html',
    '3f490f837c95818fb334d12cd0925b8e',
    '四个月份与十条摄影记录，从选中格子铺色展开详情，再沿原点收回。此版本使用 Web Animations API。',
    'Four months and ten photo entries reveal from a selected grid cell. This implementation uses the Web Animations API.'
  ]
];

export const personalAiCatalog = rows.map(
  ([slug, code, titleZh, name, category, file, page, description, descriptionEn]) => ({
    id: `personal-ai/${slug}`,
    slug,
    code,
    titleZh,
    name,
    category,
    description,
    descriptionEn,
    source: 'personal-ai',
    sourceAvailable: true,
    variants: ['HTML'],
    path: `/personal-ai/${slug}`,
    detailUrl: `/personal-ai/entries/${slug}.json`,
    sourceUrl: `/personal-ai/source/${file}`,
    demoUrl: `/personal-ai/demos/${slug}.html`,
    posterUrl: `/personal-ai/posters/${slug}.png`,
    docsUrl: archive + page,
    promptUrl: code === 'R01' ? '/personal-ai/source/calendar-cards-prompt.md' : null,
    promptAccess: code === 'R01' ? 'full' : 'unavailable',
    promptKind: code === 'R01' ? 'user-provided-original' : 'not-archived',
    tags: [code, '个人 AI 实现', 'Personal AI', 'HTML', 'Notion', '独立原型'],
    provenance: {
      implementation: 'user-ai-implementation',
      agent: 'unknown',
      model: 'unknown',
      reasoningEffort: 'unknown',
      skillsLoaded: 'unknown',
      attempts: 'unknown',
      firstPassVerified: false,
      reference: code === 'R01' ? 'https://motionprompts.dev/component/cards/' : archive + page,
      runtime: code === 'R01' ? 'Web Animations API (offline prototype)' : 'HTML / CSS / JavaScript',
      media: 'Original user-supplied prototype media; not the original reference photography',
      acceptance: 'archived candidate; not final visual acceptance'
    }
  })
);
