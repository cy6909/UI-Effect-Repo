import type { FC } from 'react';

export type CategoryId = 'text' | 'card' | '3d' | 'particle' | 'background' | 'button' | 'scroll' | 'svg' | 'loader' | 'spring';

export type Effect = {
  /** kebab-case, e.g. 'blur-fade-in' */
  id: string;
  /** 中文标题 */
  title: string;
  /** 英文小标签 (mono, uppercase) */
  label: string;
  /** 中文描述 1–2 句 */
  description: string;
  /** 所属分类（可多挂，主分类放第一个） */
  categories: CategoryId[];
  /** 英文，面向 AI 编程工具的完整实现提示词 */
  prompt: string;
  /** 预览窗是否用深色底 */
  dark?: boolean;
  interaction?: 'hover' | 'click' | 'move' | 'scroll' | 'auto';
  /** 实时预览组件（懒挂载，离屏暂停） */
  component: FC;
};
