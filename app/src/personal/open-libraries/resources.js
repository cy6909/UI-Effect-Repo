// Site-level references are deliberately separate from imported component counts.
export const resources = [
  [
    'motion-vault',
    'MotionVault',
    'https://xiyu519.github.io/MotionVault/',
    'recreation',
    'imported',
    'MIT 源码、原始提示词与本地逐项预览。',
    'MIT source, original prompts and local per-effect previews.',
    'https://github.com/xiyu519/MotionVault'
  ],
  [
    'aimotions',
    'aimotions',
    'https://aimotions.art/',
    'intent',
    'reference',
    '单条 Prompt 可用于项目；整库再发布须书面许可，保留原站入口。',
    'Individual prompts can be used in projects; republishing the collection requires written permission.',
    'https://aimotions.art/legal-notice/'
  ],
  [
    '21st',
    '21st.dev',
    'https://21st.dev/',
    'integration',
    'account',
    '社区作者与许可各异；官网当前提供每日 2 次免费复制，登录后按站点额度使用。',
    'Community authors and licenses vary. The site currently offers two free copies daily; use its account flow.',
    'https://21st.dev/'
  ],
  [
    'nuxus',
    'Nuxus',
    'https://www.nuxus.dev/',
    'integration',
    'reference',
    '社区多来源组件与源码型 Prompt；未取得整库再分发依据，保留官方检索入口。',
    'Multi-author components and source-based prompts; collection redistribution was not established.',
    'https://www.nuxus.dev/terms'
  ],
  [
    'flux',
    'Flux UI',
    'https://flux-ui.pro/',
    'recreation',
    'account',
    '组件、代码与 Prompt 通过原站获取；账户额度及具体条目的许可由原站管理。',
    'Get components, code and prompts through the provider; account limits and item licenses apply.',
    'https://flux-ui.pro/'
  ],
  [
    'agentic',
    'Agentic UI',
    'https://agenticui.in/prompts/components',
    'integration',
    'reference',
    '官方声明免费组件；条款按套餐授予项目使用权，未确认整库镜像授权。使用可访问的不带 www 域名。',
    'The site advertises free components; terms grant project use by plan, without an established collection redistribution grant. Use the working non-www host.',
    'https://agenticui.in/terms'
  ],
  [
    'shadcn-studio',
    'Shadcn Studio',
    'https://shadcnstudio.com/components',
    'integration',
    'imported',
    '导入官方 MIT 仓库的完整 registry 源码包；未归档原始 Prompt，演示在原站打开。',
    'Imports complete registry source bundles from the official MIT repository. No original prompt was archived; demos open upstream.',
    'https://github.com/shadcnstudio/shadcn-studio'
  ],
  [
    'jiro',
    'Jiro Build',
    'https://jiro.build/',
    'recreation',
    'account',
    '完整页面与模板 Prompt，免费和 Premium 混合；保存入口，未镜像付费正文。',
    'Page and template prompts mix free and Premium access. No paid content is mirrored.',
    'https://jiro.build/'
  ],
  [
    'uivibes',
    'UIVibes',
    'https://uivibes.pro/components',
    'integration',
    'account',
    '公开预览；源码、示例和 Prompt 需要免费账户或 Pro，按原站流程获取。',
    'Public previews; source, examples and prompts require a free account or Pro.',
    'https://uivibes.pro/legal/terms'
  ],
  [
    'prompts-css',
    'Prompts CSS',
    'https://www.promptscss.com/',
    'intent',
    'reference',
    '基础动效的短意图提示词，含免费示例与付费完整库；不当作工程级复现规格。',
    'Short visual-intent prompts, with free examples and a paid collection; not full implementation specifications.',
    'https://www.promptscss.com/'
  ],
  [
    'motion-atlas',
    'Motion Atlas',
    'https://nicheworks.app/tools/motion-atlas/',
    'intent',
    'reference',
    '动效词典、比较与导出入口；当前数据脚本返回 403，未宣称导入 30 个效果。',
    'Motion dictionary, comparison and export. Its data script returned 403 during review; no 30-item import is claimed.',
    'https://nicheworks.app/tools/motion-atlas/'
  ],
  [
    'component-hunt',
    'Component Hunt',
    'https://componenthunt.dev/mellow-ui/orbit-composer',
    'integration',
    'reference',
    '聚合作者组件与集成说明；部分为录像预览，完整源码与许可跟随原作者。',
    'Aggregates author components and integration instructions; some previews are recordings. Code and licensing follow the author.',
    'https://componenthunt.dev/terms'
  ],
  [
    'react-bits-pro',
    'React Bits Pro',
    'https://pro.reactbits.dev/',
    'integration',
    'paid',
    '付费组件、区块及 Agent Kit；仅保留官方入口，区别于已接入的免费版。',
    'Paid components, blocks and Agent Kit. Kept as an official link, separate from the imported free edition.',
    'https://pro.reactbits.dev/'
  ],
  [
    'shadcn-io',
    'shadcn.io',
    'https://www.shadcn.io/examples',
    'installation',
    'indexed',
    '官方 MIT 仓库目前是 README 链接目录；导入该索引，未把链接冒充源码。Pro 内容不导入。',
    'The official MIT repository currently contains README links. That index is imported; links are not source bundles. No Pro assets imported.',
    'https://github.com/shadcnio/react-shadcn-components'
  ],
  [
    'react-bits',
    'React Bits',
    'https://reactbits.dev/',
    'integration',
    'existing',
    '已接入 215 个组件及原版 Copy prompt；提示词包含源码，是集成型而非独立复现型。',
    'Already includes 215 components and original Copy prompts. These include source and are integration prompts.',
    'https://github.com/DavidHDev/react-bits'
  ],
  [
    'motion-examples',
    'Motion Examples',
    'https://motion.dev/examples',
    'none',
    'reference',
    '真实 Demo 与代码为主；免费和 Motion+ 混合，按示例访问，不假设库的 MIT 许可覆盖全部付费示例。',
    'Primarily live demos and code, mixing free and Motion+ examples. The library license is not assumed to cover all premium examples.',
    'https://motion.dev/examples'
  ]
].map(([id, name, url, promptKind, status, noteZh, noteEn, policyUrl]) => ({
  id,
  name,
  url,
  promptKind,
  status,
  noteZh,
  noteEn,
  policyUrl,
  checkedOn: '2026-10-09'
}));
export const promptKindLabels = {
  recreation: ['复现描述', 'Recreation prompt'],
  integration: ['源码集成', 'Source integration'],
  intent: ['视觉意图', 'Visual intent'],
  installation: ['安装指令', 'Installation'],
  none: ['未提供 Prompt', 'No prompt'],
  unknown: ['尚未确认', 'Unknown']
};
