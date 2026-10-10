import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { createHash } from 'node:crypto';
const require = createRequire(path.resolve('vendor/motion-vault/package.json'));
const ts = require('typescript');
const root = process.argv[2];
if (!root) throw new Error('Usage: node scripts/importOpenLibraries.mjs <reviewed-repository-root>');
const out = 'public/open-libraries';
fs.mkdirSync(out, { recursive: true });
const hash = text => createHash('sha256').update(text).digest('hex');
const catalog = [];
const categoryMap = {
  text: 'TextAnimations',
  card: 'Components',
  '3d': 'ThreeD',
  particle: 'Backgrounds',
  background: 'Backgrounds',
  button: 'Micro',
  scroll: 'ScrollEffects',
  svg: 'Animations',
  loader: 'Micro',
  spring: 'Animations'
};
function write(item, detail) {
  const dir = `${out}/${item.source}`;
  fs.mkdirSync(`${dir}/entries`, { recursive: true });
  fs.writeFileSync(
    `${dir}/entries/${item.slug}.json`,
    JSON.stringify({ schemaVersion: 1, ...item, ...detail }, null, 2) + '\n'
  );
  catalog.push(item);
}
const mv = path.join(root, 'MotionVault');
fs.mkdirSync(`${out}/motion-vault/prompts`, { recursive: true });
fs.mkdirSync(`${out}/motion-vault/bundles`, { recursive: true });
fs.copyFileSync(`${mv}/LICENSE`, `${out}/motion-vault/LICENSE.txt`);
const mvCommit = JSON.parse(fs.readFileSync('vendor/motion-vault/UPSTREAM.json')).commit;
const environment = {
  upstreamCommit: mvCommit,
  files: ['package.json', 'package-lock.json', 'tailwind.config.js', 'postcss.config.js'].map(file => {
    const content = fs.readFileSync(`${mv}/${file}`, 'utf8');
    return { path: file, content, sha256: hash(content) };
  })
};
fs.writeFileSync(`${out}/motion-vault/environment.json`, JSON.stringify(environment, null, 2) + '\n');
for (const filename of fs.readdirSync(`${mv}/src/data/effects`).filter(f => f.endsWith('.ts') && f !== 'index.ts')) {
  const file = ts.createSourceFile(
    filename,
    fs.readFileSync(`${mv}/src/data/effects/${filename}`, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );
  const imports = new Map();
  for (const st of file.statements)
    if (ts.isImportDeclaration(st) && st.importClause?.name)
      imports.set(st.importClause.name.text, st.moduleSpecifier.text);
  for (const match of fs
    .readFileSync(`${mv}/src/data/effects/${filename}`, 'utf8')
    .matchAll(/const\s+(\w+)\s*=\s*lazy\(\(\)\s*=>\s*import\(['"]([^'"]+)['"]\)\)/g))
    imports.set(match[1], match[2]);
  function literal(n) {
    if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) return n.text;
    if (ts.isArrayLiteralExpression(n)) return n.elements.map(literal);
    if (n.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (n.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (ts.isIdentifier(n) && imports.has(n.text)) return imports.get(n.text);
    if (ts.isObjectLiteralExpression(n))
      return Object.fromEntries(
        n.properties.map(p => {
          if (!ts.isPropertyAssignment(p)) throw new Error('Unexpected metadata');
          return [p.name.text, literal(p.initializer)];
        })
      );
    throw new Error(`Unsupported metadata node ${n.kind}`);
  }
  for (const st of file.statements)
    if (ts.isVariableStatement(st))
      for (const decl of st.declarationList.declarations) {
        if (!decl.initializer || !ts.isArrayLiteralExpression(decl.initializer)) continue;
        for (const e of literal(decl.initializer)) {
          const slug = e.id,
            source = 'motion-vault';
          if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Unsafe slug');
          const visited = new Set(),
            files = [];
          function visit(spec, from = 'src') {
            const rel = spec.startsWith('@/')
              ? `src/${spec.slice(2)}`
              : path.posix.normalize(path.posix.join(from, spec));
            const candidate = ['', '.tsx', '.ts', '.css', '/index.tsx', '/index.ts']
              .map(x => rel + x)
              .find(p => fs.existsSync(`${mv}/${p}`) && fs.statSync(`${mv}/${p}`).isFile());
            if (!candidate || !candidate.startsWith('src/')) throw new Error(`Missing local source ${spec}`);
            if (visited.has(candidate)) return;
            visited.add(candidate);
            const content = fs.readFileSync(`${mv}/${candidate}`, 'utf8');
            files.push({ path: candidate, content, sha256: hash(content) });
            const parsed = ts.createSourceFile(candidate, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
            for (const statement of parsed.statements)
              if (ts.isImportDeclaration(statement)) {
                const dep = statement.moduleSpecifier.text;
                if (dep.startsWith('@/') || dep.startsWith('.')) visit(dep, path.posix.dirname(candidate));
              }
          }
          visit(e.component);
          visit('@/index.css');
          const dependencies = JSON.parse(fs.readFileSync(`${mv}/package.json`)).dependencies;
          const bundle = {
            name: slug,
            files,
            dependencies,
            environmentUrl: '/open-libraries/motion-vault/environment.json',
            license: `/open-libraries/${source}/LICENSE.txt`,
            upstreamCommit: mvCommit,
            notes:
              'Original preview module and transitive local imports. Requires the upstream React 19/Tailwind 3 environment; exact lockfile and Tailwind/PostCSS configuration are linked in environmentUrl. Package dependency versions here are declared ranges.'
          };
          const bundleText = JSON.stringify(bundle, null, 2) + '\n';
          fs.writeFileSync(`${out}/${source}/bundles/${slug}.json`, bundleText);
          fs.writeFileSync(`${out}/${source}/prompts/${slug}.md`, e.prompt);
          const item = {
            id: `${source}/${slug}`,
            slug,
            name: e.label,
            titleZh: e.title,
            description: e.description,
            tags: [...e.categories, e.interaction, 'MotionVault'],
            source,
            category: categoryMap[e.categories[0]] || 'Animations',
            path: `/open/${source}--${slug}`,
            detailUrl: `/open-libraries/${source}/entries/${slug}.json`,
            promptAccess: 'full',
            promptKind: 'recreation',
            sourceAvailable: true,
            variants: ['TSX'],
            demoUrl: `/integrations/motion-vault/index.html?effect=${slug}`,
            docsUrl: `https://github.com/xiyu519/MotionVault/tree/${mvCommit}/src/components/effects`,
            previewMode: 'local',
            posterUrl: '/open-libraries/motion-vault/posters/' + slug + '.jpg',
            interaction: e.interaction
          };
          write(item, {
            license: bundle.license,
            upstreamCommit: mvCommit,
            prompt: {
              url: `/open-libraries/${source}/prompts/${slug}.md`,
              sha256: hash(e.prompt),
              language: 'en',
              kind: 'recreation'
            },
            bundle: { url: `/open-libraries/${source}/bundles/${slug}.json`, sha256: hash(bundleText) },
            provenance: { model: 'unknown', reasoningEffort: 'unknown', firstPassVerified: false }
          });
        }
      }
}
const studio = path.join(root, 'shadcn-studio');
fs.mkdirSync(`${out}/shadcn-studio/bundles`, { recursive: true });
fs.copyFileSync(`${studio}/LICENSE.md`, `${out}/shadcn-studio/LICENSE.txt`);
const validStudioGroups = new Set(
  [...fs.readFileSync(studio + '/src/config/components.tsx', 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map(m => m[1])
);
const typeZh = {
  accordion: '折叠面板',
  alert: '提示条',
  avatar: '头像',
  badge: '徽标',
  breadcrumb: '面包屑',
  button: '按钮',
  calendar: '日历',
  card: '卡片',
  checkbox: '复选框',
  collapsible: '折叠区域',
  combobox: '组合选择',
  dialog: '对话框',
  drawer: '抽屉',
  dropdown: '下拉菜单',
  form: '表单',
  input: '输入框',
  navigation: '导航',
  pagination: '分页',
  popover: '浮层',
  progress: '进度条',
  radio: '单选',
  select: '选择器',
  separator: '分隔线',
  sheet: '侧边面板',
  skeleton: '骨架屏',
  slider: '滑块',
  switch: '开关',
  table: '表格',
  tabs: '标签页',
  textarea: '多行输入',
  toast: '通知',
  tooltip: '工具提示',
  toggle: '切换',
  typography: '排版',
  command: '命令面板',
  sonner: '通知',
  scroll: '滚动区域',
  context: '上下文菜单',
  data: '数据表格',
  date: '日期选择'
};
for (const filename of fs
  .readdirSync(`${studio}/public/r`)
  .sort()
  .filter(x => x.endsWith('.json'))) {
  const raw = fs.readFileSync(`${studio}/public/r/${filename}`, 'utf8'),
    e = JSON.parse(raw);
  if (!e.files?.length || e.files.some(f => typeof f.content !== 'string')) continue;
  const slug = e.name,
    source = 'shadcn-studio';
  if (!/^[a-z0-9-]+$/.test(slug)) throw new Error('Unsafe registry name');
  fs.writeFileSync(`${out}/${source}/bundles/${slug}.json`, raw);
  const group = slug.replace(/-\d+$/, '');
  const category = /button|toggle|switch|checkbox|radio|slider|progress|skeleton|tooltip/.test(group)
    ? 'Micro'
    : /navigation|breadcrumb|pagination|menu/.test(group)
      ? 'Navigation'
      : 'Components';
  const item = {
    id: `${source}/${slug}`,
    slug,
    name: e.title || slug,
    titleZh: `${typeZh[group.split('-')[0]] || '界面组件'} ${slug}`,
    description: e.description || e.title || slug,
    tags: [group, 'Shadcn Studio', '源码', 'source'],
    source,
    category,
    path: `/open/${source}--${slug}`,
    detailUrl: `/open-libraries/${source}/entries/${slug}.json`,
    promptAccess: 'unavailable',
    promptKind: 'none',
    sourceAvailable: true,
    variants: ['TSX'],
    docsUrl: validStudioGroups.has(group)
      ? `https://shadcnstudio.com/docs/components/${group}`
      : `https://github.com/shadcnstudio/shadcn-studio/blob/72a20331970218848103184b61e1efa9d0e08dea/public/r/${filename}`,
    previewMode: 'external'
  };
  write(item, {
    license: `/open-libraries/${source}/LICENSE.txt`,
    upstreamCommit: '72a20331970218848103184b61e1efa9d0e08dea',
    prompt: null,
    bundle: { url: `/open-libraries/${source}/bundles/${slug}.json`, sha256: hash(raw) },
    registryDependencies: e.registryDependencies || [],
    dependencies: e.dependencies || []
  });
}
const io = path.join(root, 'shadcn-io');
fs.mkdirSync(`${out}/shadcn-io`, { recursive: true });
fs.copyFileSync(`${io}/LICENSE`, `${out}/shadcn-io/LICENSE.txt`);
const seen = new Set();
for (const match of fs
  .readFileSync(`${io}/README.md`, 'utf8')
  .matchAll(/\*\*\[([^\]]+)\]\((https:\/\/www\.shadcn\.io\/[^)]+)\)\*\*\s*\|\s*([^|]+)\|/g)) {
  const [, name, url, desc] = match;
  if (seen.has(url)) continue;
  seen.add(url);
  const slug = new URL(url).pathname.slice(1).replaceAll('/', '--');
  const source = 'shadcn-io',
    item = {
      id: `${source}/${slug}`,
      slug,
      name,
      titleZh: `${name} · 组件参考`,
      description: desc.trim(),
      tags: ['shadcn.io', 'reference', '原站参考'],
      source,
      category: 'Components',
      path: `/open/${source}--${slug}`,
      detailUrl: `/open-libraries/${source}/entries/${slug}.json`,
      promptAccess: 'external',
      promptKind: 'installation',
      sourceAvailable: false,
      variants: [],
      docsUrl: url,
      previewMode: 'external'
    };
  write(item, {
    license: `/open-libraries/${source}/LICENSE.txt`,
    upstreamCommit: '2dc66e0e7b159fa92e761c84f3c5325c9700c415',
    prompt: null,
    bundle: null,
    notes:
      'Official MIT repository contains README links only. Component source and licensing must be checked at each linked page; Pro assets are not imported.'
  });
}
fs.mkdirSync('src/personal/open-libraries', { recursive: true });
fs.writeFileSync(
  'src/personal/open-libraries/catalog-data.js',
  `// Generated from reviewed upstream snapshots; run importOpenLibraries.mjs on machine 12.\nexport default ${JSON.stringify(catalog, null, 2)};\n`
);
const counts = Object.fromEntries(
  [...new Set(catalog.map(x => x.source))].map(s => [s, catalog.filter(x => x.source === s).length])
);
fs.writeFileSync(
  `${out}/manifest.json`,
  JSON.stringify({ schemaVersion: 1, counts, total: catalog.length }, null, 2) + '\n'
);
console.log(counts);
