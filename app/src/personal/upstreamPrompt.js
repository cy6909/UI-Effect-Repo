// Extracted without changing the English template from React Bits commit 7b69ba1.
export function getActiveCode(codeObject, lang, style) {
  if (!codeObject) return { source: '', label: '', css: '' };

  if (lang === 'TS' && style === 'TW' && codeObject.tsTailwind)
    return { source: codeObject.tsTailwind, label: 'TypeScript + Tailwind', css: '' };
  if (lang === 'TS' && codeObject.tsCode)
    return { source: codeObject.tsCode, label: 'TypeScript + CSS', css: codeObject.css || '' };
  if (style === 'TW' && codeObject.tailwind)
    return { source: codeObject.tailwind, label: 'JavaScript + Tailwind', css: '' };

  return { source: codeObject.code || '', label: 'JavaScript + CSS', css: codeObject.css || '' };
}

export function buildPrompt(componentName, codeObject, propData, lang, style) {
  const { source, label, css } = getActiveCode(codeObject, lang, style);
  const usage = codeObject.usage || '';
  const deps = codeObject.dependencies || '';

  let prompt = `## Integrate the <${componentName} /> component from React Bits

You are helping integrate an open-source React component into an existing application.

### Component: ${componentName}
### Variant: ${label}
${deps ? `### Dependencies: ${deps}` : ''}

---

### Usage Example
\`\`\`jsx
${usage}
\`\`\`
`;

  if (propData && propData.length > 0) {
    prompt += `
### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
${propData.map(p => `| ${p.name} | ${p.type} | ${p.default || '—'} | ${p.description} |`).join('\n')}
`;
  }

  prompt += `
### Full Component Source
\`\`\`${lang === 'TS' ? 'tsx' : 'jsx'}
${source}
\`\`\`
`;

  if (css) {
    prompt += `
### Component CSS
\`\`\`css
${css}
\`\`\`
`;
  }

  prompt += `
### Integration Instructions
1. Install any listed dependencies.
2. Copy the component source into the appropriate directory in the project.
${css ? '3. Import the CSS file alongside the component.\n' : ''}${css ? '4' : '3'}. Import and render the component using the usage example above as a starting point.
${css ? '5' : '4'}. Adjust props as needed for the specific use case — refer to the props table for all available options.

### More from React Bits
The full library index, including everything reactbits.dev offers, is at https://reactbits.dev/llms.txt — fetch it if this component is not the right fit or the project needs more pieces.
`;

  return prompt;
}

// Chinese translation of the upstream instructions. Code, dependency strings,
// property values and upstream property descriptions are preserved verbatim.
export function buildPromptZh(componentName, codeObject, propData, lang, style) {
  const { source, label, css } = getActiveCode(codeObject, lang, style);
  const usage = codeObject.usage || '';
  const deps = codeObject.dependencies || '';
  let prompt = `## 集成 React Bits 的 <${componentName} /> 组件

你正在协助将一个开源 React 组件集成到现有应用中。

### 组件：${componentName}
### 代码版本：${label}
${deps ? `### 依赖：${deps}` : ''}

---

### 使用示例
\`\`\`jsx
${usage}
\`\`\`
`;
  if (propData && propData.length > 0) {
    prompt += `
### 参数（字段与说明保留上游原文）
| 参数 | 类型 | 默认值 | 说明 |
|------|------|---------|-------------|
${propData.map(p => `| ${p.name} | ${p.type} | ${p.default || '—'} | ${p.description} |`).join('\n')}
`;
  }
  prompt += `
### 完整组件源码
\`\`\`${lang === 'TS' ? 'tsx' : 'jsx'}
${source}
\`\`\`
`;
  if (css) {
    prompt += `
### 组件 CSS
\`\`\`css
${css}
\`\`\`
`;
  }
  prompt += `
### 集成步骤
1. 安装列出的依赖。
2. 将组件源码复制到项目中的适当目录。
${css ? '3. 在组件旁导入 CSS 文件。\n' : ''}${css ? '4' : '3'}. 以上面的使用示例为起点，导入并渲染组件。
${css ? '5' : '4'}. 根据具体使用场景调整参数；全部可用选项请参考参数表。

### React Bits 的更多内容
https://reactbits.dev/llms.txt 提供 reactbits.dev 的完整库索引。如果此组件不合适或项目需要更多组件，请读取该索引。
`;
  return prompt;
}
