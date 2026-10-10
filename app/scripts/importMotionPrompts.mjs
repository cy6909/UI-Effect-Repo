// Run on machine 12 against the official licensed distribution, never a gated endpoint.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { titleZh, categoryMap } from '../src/personal/motion-prompts/translations.js';

const source = process.argv[2];
const apiFile = process.argv[3];
if (!source || !apiFile)
  throw new Error('Usage: node scripts/importMotionPrompts.mjs <official-repository> <public-catalog.json>');
const commit = execFileSync('git', ['-C', source, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const distribution = JSON.parse(fs.readFileSync(path.join(source, 'src/mcp-index.json'), 'utf8'));
const api = JSON.parse(fs.readFileSync(apiFile, 'utf8'));
if (api.count !== distribution.count)
  throw new Error('Catalog and distribution counts differ; review upstream revisions first');
const apiBySlug = new Map(api.components.map(item => [item.slug, item]));
const output = path.resolve('public/motion-prompts');
fs.mkdirSync(path.join(output, 'entries'), { recursive: true });
fs.mkdirSync(path.join(output, 'prompts'), { recursive: true });
const sha = data => createHash('sha256').update(data).digest('hex');
const url = value => {
  if (!value) return null;
  const resolved = new URL(value, 'https://motionprompts.dev');
  if (resolved.origin !== 'https://motionprompts.dev')
    throw new Error(`Unexpected upstream origin: ${resolved.origin}`);
  return resolved.href;
};
const catalog = distribution.components.map(item => {
  if (!/^[a-z0-9-]+$/.test(item.slug)) throw new Error(`Invalid slug: ${item.slug}`);
  const live = apiBySlug.get(item.slug);
  if (!live || !categoryMap[item.category]) throw new Error(`Unmapped catalog entry: ${item.slug}`);
  const prompt = fs.readFileSync(path.join(source, 'components', item.slug, 'prompt.md'));
  const access = item.access === 'paid' ? 'preview' : 'full';
  if (access === 'preview' && !prompt.toString().includes('This prompt requires'))
    throw new Error(`Expected official gated preview: ${item.slug}`);
  const promptPath = `/motion-prompts/prompts/${item.slug}.md`;
  fs.writeFileSync(path.join(output, 'prompts', `${item.slug}.md`), prompt);
  const summary = {
    id: `motion-prompts/${item.slug}`,
    name: item.title,
    slug: item.slug,
    titleZh: titleZh(item.title, item.category),
    category: categoryMap[item.category],
    source: 'motion-prompts',
    sourceCategory: item.category,
    description: item.description,
    tags: [...new Set([...(item.tags || []), ...(item.deps || []), 'Motion Prompts'])],
    path: `/motion-prompts/${item.slug}`,
    docsUrl: url(live.page),
    demoUrl: url(live.demo),
    posterUrl: url(live.thumb),
    videoUrl: url(live.preview),
    promptAccess: access,
    detailUrl: `/motion-prompts/entries/${item.slug}.json`,
    variants: []
  };
  const detail = {
    schemaVersion: 1,
    ...summary,
    upstreamCommit: commit,
    license: '/motion-prompts/LICENSE.txt',
    attribution: 'motionprompts.dev · Vanguardia',
    sourceAvailable: false,
    previewMode: 'remote-video',
    prompt: {
      language: 'en',
      access,
      url: promptPath,
      sha256: sha(prompt),
      upstreamUrl: url(live.prompt),
      distributionUrl: `https://github.com/VanguardiaAI/motionprompts-mcp/blob/${commit}/components/${item.slug}/prompt.md`
    },
    motion: live.motion,
    capabilities: live.capabilities || [],
    conflicts: live.conflicts_with || [],
    dependencies: item.deps || [],
    integration: {
      standaloneDemo: true,
      sourceDistributed: false,
      previewUsesUpstreamMedia: true,
      requiresBundler: true
    },
    accountUrl: 'https://motionprompts.dev/account/',
    sourcePage: url(live.page)
  };
  fs.writeFileSync(path.join(output, 'entries', `${item.slug}.json`), JSON.stringify(detail, null, 2) + '\n');
  return summary;
});
fs.copyFileSync(path.join(source, 'LICENSE'), path.join(output, 'LICENSE.txt'));
fs.mkdirSync('src/personal/motion-prompts', { recursive: true });
fs.writeFileSync(
  'src/personal/motion-prompts/catalog-data.js',
  '// Generated from the official Motion Prompts distribution. See public/motion-prompts/NOTICE.txt.\nexport default ' +
    JSON.stringify(catalog, null, 2) +
    ';\n'
);
const manifest = {
  schemaVersion: 1,
  upstream: 'https://github.com/VanguardiaAI/motionprompts-mcp',
  commit,
  importedOn: '2026-10-09',
  count: catalog.length,
  fullPrompts: catalog.filter(x => x.promptAccess === 'full').length,
  previewPrompts: catalog.filter(x => x.promptAccess === 'preview').length,
  sourceCodeImported: false,
  mediaCopied: false,
  license: 'PolyForm Noncommercial 1.0.0 plus visible attribution',
  catalogHash: sha(JSON.stringify(catalog))
};
fs.writeFileSync(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
fs.writeFileSync(
  path.join(output, 'NOTICE.txt'),
  'Motion Prompts content © 2026 motionprompts.dev / Vanguardia.\nOfficial metadata and publicly distributed prompts are included under PolyForm Noncommercial 1.0.0 with mandatory visible attribution. See LICENSE.txt.\n218 paid prompts are previews only; no access controls were bypassed. Component source code is not distributed by this package. Media and interactive demos remain hosted upstream and are linked, not copied.\n'
);
console.log(JSON.stringify(manifest, null, 2));
