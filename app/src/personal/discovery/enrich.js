import { classifyItem, normalizeText } from './taxonomy.js';
import { concepts, tagById } from './concepts.js';
import { termMatches } from './concepts.js';

const applicationTags = {
  cards: ['membership', 'product'],
  forms: ['form'],
  choices: ['selection'],
  calendar: ['calendar'],
  dialogs: ['form', 'content'],
  tables: ['dashboard'],
  accordion: ['content'],
  tabs: ['navigation'],
  layout: ['hero', 'dashboard'],
  media: ['product', 'portfolio'],
  ai: ['chat'],
  auth: ['auth'],
  content: ['content'],
  buttons: ['button'],
  feedback: ['feedback'],
  loading: ['loading'],
  toggle: ['selection'],
  pointer: ['button', 'hero'],
  reveal: ['hero', 'content'],
  typing: ['hero', 'tech'],
  'text-layout': ['hero'],
  counter: ['dashboard', 'membership'],
  particles: ['hero', 'feedback'],
  grid: ['hero', 'dashboard'],
  texture: ['hero'],
  scene: ['hero'],
  parallax: ['product', 'portfolio'],
  pinned: ['product', 'hero'],
  'scroll-progress': ['hero'],
  carousel: ['product', 'portfolio'],
  gallery: ['portfolio', 'product'],
  stack: ['card'],
  menu: ['navigation'],
  dock: ['navigation'],
  sidebar: ['navigation'],
  transition: ['content'],
  flip: ['membership', 'product'],
  physics: ['card'],
  objects: ['hero', 'product'],
  shader: ['hero'],
  footer: ['footer'],
  glitch: ['tech'],
  gradient: ['hero']
};
const overrides = {
  'Components/DepthCarousel': {
    what: [
      '将卡片沿纵深层叠排列，让当前项目突出、前后项目仍有线索。',
      'Layers cards along a depth axis so the active item stands out while neighbors remain visible.'
    ],
    where: ['商品多图、作品集、精选内容浏览', 'Product imagery, portfolios and featured content'],
    why: [
      '层叠关系保留上下文，适合逐项探索；重要信息不宜只放在后排卡片中。',
      'Layering retains context for sequential exploration; keep essential information out of hidden cards.'
    ]
  },
  'Components/SpotlightCard': {
    what: [
      '让聚光区域随指针移动，突出卡片当前被关注的位置。',
      'Moves a spotlight with the pointer to emphasize the part of a card being explored.'
    ],
    where: [
      '桌面功能卡、产品卖点、可点击的展示入口',
      'Desktop feature cards, product benefits and clickable showcases'
    ],
    why: [
      '局部光照提供轻量的悬停反馈，帮助识别可交互区域；触屏需另设清晰的点击样式。',
      'Localized light gives hover feedback; touch interfaces need an explicit alternative cue.'
    ]
  },
  'personal-ai/m01': {
    what: [
      '用毛玻璃会员卡展示163天剩余期限、12段连续进度与行程入口。',
      'A frosted membership card shows 163 remaining days, twelve progress segments and an itinerary action.'
    ],
    where: ['会员权益、旅行年卡、资格有效期', 'Membership benefits, annual travel passes and validity periods'],
    why: [
      '大数字回答还剩多久，分段进度解释时间位置，四个事实字段帮助核对权益。',
      'The number answers how long remains, progress locates today and four facts explain the entitlement.'
    ]
  },
  'personal-ai/m06': {
    what: [
      '让票根随把手下拉，超过40%阈值时展开，否则回弹。',
      'A ticket stub follows the handle and snaps open past a 40% threshold.'
    ],
    where: [
      '电子票券、凭证编号、需要时才展示的次要详情',
      'Digital tickets, pass codes and on-demand secondary details'
    ],
    why: [
      '把详情藏在可拉出的票根里，减少初始信息量，同时保留明确的展开动作。',
      'A pull-out stub reduces initial information load while offering a clear reveal action.'
    ]
  },
  'personal-ai/calendar-cards': {
    what: [
      '点击月份卡中的亮格，从该格铺色展开摄影记录，再沿原点收回。',
      'An active cell fills its month card with color to reveal a photo entry, then retracts to the origin.'
    ],
    where: ['摄影日志、打卡记录、按月份组织的作品集', 'Photo journals, activity logs and month-based portfolios'],
    why: [
      '格子先概括记录密度，点开再看单条内容；当前示例亮格为展示数据，不等同真实日期绑定。',
      'Cells summarize activity before revealing details; demo cells are not bound to real calendar dates.'
    ]
  }
};

export function enrichItem(item) {
  const classification = classifyItem(item),
    p = classification.profile;
  const text = normalizeText(
    `${item.slug || ''} ${item.name} ${item.titleZh} ${item.description || ''} ${item.descriptionEn || ''} ${(item.tags || []).join(' ')} ${item.interaction || ''}`
  );
  const observed = [];
  for (const c of Object.values(concepts)) if (c.terms.some(term => termMatches(text, term))) observed.push(c.id);
  const interactions = { hover: 'hover', click: 'click', move: 'pointer', scroll: 'scroll' };
  if (interactions[item.interaction]) observed.push(interactions[item.interaction]);
  if (item.category === 'Backgrounds') observed.push('background');
  if (item.id === 'personal-ai/m01') observed.push('membership', 'expand', 'card', 'counter');
  if (item.id === 'personal-ai/m06') observed.push('expand', 'drag', 'card');
  const suggestions = applicationTags[p.id] || [];
  const primary = [p.concept, ...observed];
  const tagIds = [...new Set([...primary, ...suggestions, ...(item.id === 'personal-ai/m06' ? ['membership'] : [])])];
  const local = item.source === 'react-bits' || item.source === 'personal-ai' || item.previewMode === 'local';
  const source = item.source === 'react-bits' || item.source === 'personal-ai' || item.sourceAvailable === true;
  if (local) tagIds.push('local-demo');
  if (source) tagIds.push('source-bundle');
  if (item.source === 'motion-prompts') tagIds.push('video-preview');
  if (!local && !source) tagIds.push('reference-only');
  const featureTags = tagIds.filter(id => ['visual', 'motion', 'interaction'].includes(tagById[id]?.facet));
  const nativeDescription = /[\u3400-\u9fff]/.test(item.description || '') ? item.description : null;
  const featureNames = featureTags.slice(0, 3).map(id => tagById[id].labels[0]);
  const guide = {
    what: [
      nativeDescription?.length > 12
        ? nativeDescription
        : `${p.what[0]}${featureNames.length ? `主要特点：${featureNames.join('、')}。` : ''}`,
      item.descriptionEn || (!nativeDescription && item.description) || p.what[1]
    ],
    where: p.where,
    why: p.why,
    ...overrides[item.id],
    editorial: true,
    basis: 'upstream metadata + curated application guidance',
    classificationBasis: classification.basis,
    caution: local
      ? [
          '应用前请在目标设备上确认交互、文字可读性和减少动态效果设置。',
          'Before using it, check interaction, readability and reduced-motion behavior on target devices.'
        ]
      : [
          '此条目可能需在原站体验或安装依赖后验证，应用建议不等于已完成项目集成。',
          'This entry may require upstream preview or dependency installation; application guidance is not an integration guarantee.'
        ]
  };
  const observedSet = new Set(observed);
  return {
    ...item,
    subcategory: classification.id,
    discoveryTags: tagIds.map(id => ({
      ...tagById[id],
      basis: observedSet.has(id)
        ? 'source-metadata'
        : tagById[id].facet === 'delivery'
          ? 'catalog-availability'
          : 'editorial-suggestion'
    })),
    guide
  };
}
