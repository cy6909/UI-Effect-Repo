import fs from 'node:fs';
import path from 'node:path';
import { componentMetadata } from '../src/constants/Information.js';
import { createHash } from 'node:crypto';
import motionItems from '../src/personal/motion-prompts/catalog-data.js';
import './generatePersonalAi.mjs';
import { personalAiCatalog } from '../src/personal/personal-ai/catalog.js';
import openItems from '../src/personal/open-libraries/catalog-data.js';
import { resources } from '../src/personal/open-libraries/resources.js';
import { getPromptKind, catalog } from '../src/personal/catalog.js';
import { subcategories } from '../src/personal/discovery/taxonomy.js';
import { tagById, facetLabels } from '../src/personal/discovery/concepts.js';

const output = path.resolve('public/personal-registry');
fs.mkdirSync(output, { recursive: true });
const hash = text => createHash('sha256').update(text).digest('hex');
const template = fs.readFileSync('src/personal/upstreamPrompt.js', 'utf8');
fs.writeFileSync(path.join(output, 'upstreamPrompt.js'), template);
const items = Object.values(componentMetadata).map(item => {
  const variants = item.variants || ['JS-CSS', 'JS-TW', 'TS-CSS', 'TS-TW'];
  const sources = variants.map(variant => {
    const file = `public/r/${item.name}-${variant}.json`;
    const raw = fs.readFileSync(file, 'utf8');
    const registry = JSON.parse(raw);
    if (!registry.files?.length || registry.files.some(f => typeof f.content !== 'string'))
      throw new Error(`Incomplete source: ${file}`);
    return {
      variant,
      url: `/r/${item.name}-${variant}.json`,
      sha256: hash(raw),
      dependencies: registry.dependencies || []
    };
  });
  const entry = {
    schemaVersion: 2,
    id: `${item.category}/${item.name}`,
    name: item.name,
    category: item.category,
    description: item.description,
    path: new URL(item.docsUrl).pathname,
    upstreamUrl: item.docsUrl,
    upstreamCommit: '7b69ba117ca7876dc9ca5ff3c09cf514de4b2d62',
    license: '/LICENSE.md',
    sources,
    prompt: {
      kind: 'upstream-source-assisted-integration',
      languages: ['en', 'zh'],
      english: 'Original React Bits Copy prompt template; unchanged English instructions.',
      chinese:
        'Translation of upstream instructions; source, dependency strings and property descriptions stay verbatim.',
      templateUrl: '/personal-registry/upstreamPrompt.js',
      templateSha256: hash(template),
      usage:
        'The live demo supplies configured usage, props, source and selected code variant to the template. Open Original prompt in the component detail or Copy for AI in the preview.',
      originalSource:
        'https://github.com/DavidHDev/react-bits/blob/7b69ba117ca7876dc9ca5ff3c09cf514de4b2d62/src/components/common/TabsLayout.jsx'
    }
  };
  fs.writeFileSync(path.join(output, `${item.name}.json`), JSON.stringify(entry, null, 2) + '\n');
  return {
    id: entry.id,
    name: item.name,
    category: item.category,
    path: entry.path,
    url: `/personal-registry/${item.name}.json`
  };
});
items.forEach(item => {
  item.source = 'react-bits';
});
items.push(
  ...motionItems.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    source: item.source,
    path: item.path,
    promptAccess: item.promptAccess,
    url: item.detailUrl
  }))
);
items.push(
  ...personalAiCatalog.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    source: item.source,
    path: item.path,
    promptAccess: item.promptAccess,
    url: item.detailUrl
  }))
);
items.push(
  ...openItems.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category,
    source: item.source,
    path: item.path,
    promptAccess: item.promptAccess,
    promptKind: item.promptKind,
    sourceAvailable: item.sourceAvailable,
    url: item.detailUrl
  }))
);
items.forEach(item => {
  item.promptKind ||= getPromptKind(catalog.find(entry => entry.id === item.id));
});
for (const item of items) {
  const enriched = catalog.find(entry => entry.id === item.id);
  item.subcategory = enriched.subcategory;
  item.traits = enriched.discoveryTags.map(tag => tag.id);
}
fs.writeFileSync(
  path.join(output, 'discovery.json'),
  JSON.stringify(
    {
      schemaVersion: 1,
      subcategories,
      tags: Object.values(tagById),
      facets: facetLabels,
      items: catalog.map(({ id, subcategory, discoveryTags, guide }) => ({
        id,
        subcategory,
        tags: discoveryTags,
        guide
      }))
    },
    null,
    2
  ) + '\n'
);
fs.writeFileSync(
  path.join(output, 'index.json'),
  JSON.stringify({ schemaVersion: 3, discoveryUrl: '/personal-registry/discovery.json', items }, null, 2) + '\n'
);
fs.writeFileSync(path.join(output, 'resources.json'), JSON.stringify({ schemaVersion: 1, resources }, null, 2) + '\n');
fs.copyFileSync('LICENSE.md', 'public/LICENSE.md');
fs.writeFileSync(
  'public/llms.txt',
  `# UI / Bits — Personal React Bits library\n\nRead /personal-registry/index.json to discover ${items.length} catalog entries. Follow each item URL for available content, dependencies, SHA-256 checksums and its source-specific license. React Bits entries include component source variants; personal-ai entries include archived HTML source. Resolve relative URLs against this origin.\n\nReact Bits prompts use the original Copy prompt. English is unchanged. Chinese translates its instructions while preserving source code, dependency names, API values and property descriptions. These prompts integrate supplied source; no invented standalone recreation specifications or model-generation claims are included. The live UI builds the prompt from the selected demo configuration; the reusable template is /personal-registry/upstreamPrompt.js.\n\nUpstream: https://github.com/DavidHDev/react-bits\nPersonal fork: https://github.com/cy6909/react-bits\nLicense: /LICENSE.md\n`
);
fs.appendFileSync(
  'public/llms.txt',
  '\n## Motion Prompts\nMotion Prompts entries link to official public metadata and prompt snapshots under /motion-prompts/. Thirty prompts are full public text; 218 are official excerpts only. Respect prompt.access and never treat excerpts as full prompts. This distribution does not include component source or copied media. Interactive demos open on motionprompts.dev; cross-site embedding is not supported. Preview images/videos remain upstream. License: /motion-prompts/LICENSE.txt (PolyForm Noncommercial 1.0.0 with attribution). Credit: https://motionprompts.dev . No invented or independently validated model-generation result is claimed.\n'
);
console.log(`Exported ${items.length} entries across React Bits and Motion Prompts.`);
fs.appendFileSync(
  'public/llms.txt',
  '\n## Discovery and application guidance\n/personal-registry/discovery.json contains bilingual subcategories, faceted traits and editorial what/where/why guidance for every entry. Trait basis distinguishes source metadata from application suggestions and catalog availability. Guidance is not an original reproduction prompt or a claim of verified behavior. Intent search uses local synonym matching and relevance ranking; no model calls are made.\n'
);
fs.appendFileSync(
  'public/llms.txt',
  '\n## Open libraries and source directory\nMotionVault: 202 original recreation prompts and source bundles, isolated React 19 previews. Shadcn Studio: 637 MIT registry source bundles; original prompts are not included. shadcn.io: 75 official README reference links, not component source. Follow source-specific MIT licenses under /open-libraries/. /personal-registry/resources.json lists 16 website-level references and access boundaries separately from imported entries. Recreation prompts, source integration, visual intent and install instructions are different kinds. No model reproduction claim is made.\n'
);
fs.appendFileSync(
  'public/llms.txt',
  '\n## Personal AI implementations\nSeven user-archived HTML prototypes are grouped under personal-ai. Follow their entry URLs for exact original HTML hashes and scope. M02-M06 share one original workbench with five scene previews. R01 uses Web Animations API, not the GSAP project. Only R01 has an archived original prompt; do not invent missing prompts or model/first-pass provenance. Fonts/media/design references retain their separate rights. Notice: /personal-ai/NOTICE.txt .\n'
);
