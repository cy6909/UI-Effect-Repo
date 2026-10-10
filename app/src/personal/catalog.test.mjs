import { test } from 'node:test';
import assert from 'node:assert/strict';
import { catalog, reactBitsCatalog, motionPromptsCatalog, personalAiCatalog, categoryLabels, filterCatalog, titlesZh } from './catalog.js';
import { buildPrompt, buildPromptZh } from './upstreamPrompt.js';

test('all imported entries have unique routes, stable IDs and Chinese names', () => {
  assert.equal(new Set(catalog.map(x => x.id)).size, catalog.length);
  assert.equal(new Set(catalog.map(x => x.path)).size, catalog.length);
  for (const item of reactBitsCatalog) {
    assert.ok(titlesZh[item.name], item.name);
    assert.ok(item.path.startsWith('/'));
  }
});

test('Motion Prompts public catalog merges without collisions or invented source availability', () => {
  assert.equal(reactBitsCatalog.length, 215);
  assert.equal(motionPromptsCatalog.length, 248);
  assert.equal(catalog.length, 1384);
  assert.equal(motionPromptsCatalog.filter(x => x.promptAccess === 'full').length, 30);
  assert.equal(motionPromptsCatalog.filter(x => x.promptAccess === 'preview').length, 218);
  for (const item of motionPromptsCatalog) {
    assert.ok(categoryLabels[item.category]);
    assert.match(item.titleZh, /[\u3400-\u9fff]/);
    assert.ok(item.path.startsWith('/motion-prompts/'));
    assert.deepEqual(item.variants, []);
    assert.equal(new URL(item.demoUrl).origin, 'https://motionprompts.dev');
  }
  assert.equal(filterCatalog(catalog, { source: 'motion-prompts', access: 'full' }).length, 30);
  assert.equal(filterCatalog(catalog, { source: 'motion-prompts', category: 'ScrollEffects' }).length, 71);
  assert.equal(filterCatalog(catalog, { source: 'react-bits', access: 'preview' }).length, 0);
  assert.equal(filterCatalog(catalog, { source: 'motion-prompts', query: '轨道 轮播' })[0].slug, 'orbit-carousel-3d');
});
test('personal implementations preserve provenance and missing-prompt boundaries', () => {
  assert.equal(personalAiCatalog.length, 7);
  assert.equal(filterCatalog(catalog, { source: 'personal-ai' }).length, 7);
  assert.equal(filterCatalog(catalog, { source: 'personal-ai', access: 'unavailable' }).length, 6);
  assert.equal(filterCatalog(catalog, { source: 'personal-ai', query: 'M06' })[0].slug, 'm06');
  assert.equal(new Set(personalAiCatalog.map(x => x.sourceUrl)).size, 3);
  for (const item of personalAiCatalog) {
    assert.equal(item.provenance.model, 'unknown');
    assert.equal(item.provenance.firstPassVerified, false);
  }
});
test('open library kinds distinguish prompts, source bundles and reference links', () => {
  assert.equal(filterCatalog(catalog,{source:'motion-vault',kind:'recreation',access:'full'}).length,202);
  assert.equal(filterCatalog(catalog,{source:'shadcn-studio',kind:'none'}).length,637);
  assert.equal(filterCatalog(catalog,{source:'shadcn-io',access:'external'}).length,75);
  assert.equal(filterCatalog(catalog,{source:'react-bits',kind:'recreation'}).length,0);
  assert.equal(filterCatalog(catalog,{source:'react-bits',kind:'integration'}).length,215);
});
test('Chinese and English search compose with category and saved filters', () => {
  assert.equal(filterCatalog(catalog, { query: '纵深 轮播' })[0].name, 'DepthCarousel');
  assert.equal(filterCatalog(catalog, { query: 'DEPTHCAROUSEL' })[0].titleZh, '纵深轮播');
  assert.equal(filterCatalog(catalog, { query: '纵深', category: 'Backgrounds' }).length, 0);
  assert.equal(filterCatalog(catalog, { savedOnly: true, saved: [] }).length, 0);
  assert.equal(filterCatalog(catalog, { query: 'no-such-component-zyx' }).length, 0);
});
test('translated prompts preserve upstream code blocks, dependencies and props in all variants', () => {
  const code = {
    code: 'JS SOURCE',
    tsCode: 'TS SOURCE',
    tailwind: 'JS TW SOURCE',
    tsTailwind: 'TS TW SOURCE',
    css: '.original { color: red }',
    usage: '<Original count={12} />',
    dependencies: 'gsap motion'
  };
  const props = [{ name: 'count', type: 'number', default: '12', description: 'Original property description' }];
  for (const [lang, style, source] of [
    ['JS', 'CSS', code.code],
    ['TS', 'CSS', code.tsCode],
    ['JS', 'TW', code.tailwind],
    ['TS', 'TW', code.tsTailwind]
  ]) {
    const en = buildPrompt('Original', code, props, lang, style);
    const zh = buildPromptZh('Original', code, props, lang, style);
    const blocks = text => [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map(x => x[1]);
    assert.deepEqual(blocks(en), blocks(zh));
    for (const text of [en, zh]) {
      assert.ok(text.includes(source));
      assert.ok(text.includes(code.dependencies));
      assert.ok(text.includes('| count | number | 12 | Original property description |'));
    }
    assert.ok(en.startsWith('## Integrate the <Original /> component from React Bits'));
    assert.ok(zh.startsWith('## 集成 React Bits 的 <Original /> 组件'));
  }
});
