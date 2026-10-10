import type { CategoryId } from '@/types/effect';

export type CategoryMeta = {
  id: CategoryId;
  /** 中文名 */
  title: string;
  /** 英文标签 */
  label: string;
  /** 一句话说明 */
  description: string;
  path: string;
  /** 目标效果数量（用于索引页展示） */
  plannedCount: number;
};

export const categories: CategoryMeta[] = [
  { id: 'text', title: '文字动效', label: 'TEXT', description: '逐字、逐词、解码与流光', path: '/text', plannedCount: 26 },
  { id: 'card', title: '卡片动效', label: 'CARD', description: '倾斜、聚光、磁吸、堆叠与多卡排列', path: '/cards', plannedCount: 41 },
  { id: '3d', title: '3D 动效', label: '3D', description: 'React Three Fiber 构建的空间场景', path: '/3d', plannedCount: 23 },
  { id: 'particle', title: '粒子效果', label: 'PARTICLE', description: 'Canvas 粒子网络、文字与彩带', path: '/particles', plannedCount: 19 },
  { id: 'background', title: '背景动效', label: 'BACKGROUND', description: '为页面注入氛围的动态底色', path: '/backgrounds', plannedCount: 19 },
  { id: 'button', title: '按钮动效', label: 'BUTTON', description: '让每一次点击都有回应', path: '/buttons', plannedCount: 19 },
  { id: 'scroll', title: '滚动叙事', label: 'SCROLL', description: '滚动驱动的页面叙事', path: '/scroll', plannedCount: 16 },
  { id: 'svg', title: 'SVG 描边', label: 'SVG', description: '路径描绘与形变', path: '/svg', plannedCount: 14 },
  { id: 'loader', title: '加载器', label: 'LOADER', description: '等待也可以很美', path: '/loaders', plannedCount: 13 },
  { id: 'spring', title: '弹簧物理', label: 'SPRING', description: '果冻般的弹性交互', path: '/spring', plannedCount: 12 },
];

export const categoryChipLabel: Record<CategoryId, string> = {
  text: '文字',
  card: '卡片',
  '3d': '3D',
  particle: '粒子',
  background: '背景',
  button: '按钮',
  scroll: '叙事',
  svg: 'SVG',
  loader: '加载',
  spring: '弹簧',
};

export const interactionHint: Record<NonNullable<import('@/types/effect').Effect['interaction']>, string> = {
  hover: '悬停触发',
  click: '点击触发',
  move: '移动鼠标',
  scroll: '滚动触发',
  auto: '自动播放',
};
