import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog, filterCatalog, categoryLabels } from '../catalog.js';
import { subcategoryById, subcategories } from './taxonomy.js';
import { tagById } from './concepts.js';
import { rankByIntent, parseIntent } from './search.js';

test('every imported entry has bilingual guidance, valid child category and attributable traits', () => {
  assert.equal(catalog.length, 1384);
  assert.equal(new Set(subcategories.map(s => s.id)).size, subcategories.length);
  for (const item of catalog) {
    assert.equal(subcategoryById[item.subcategory].category, item.category, item.id);
    assert.ok(item.discoveryTags.length > 0, item.id);
    assert.equal(new Set(item.discoveryTags.map(t => t.id)).size, item.discoveryTags.length, item.id);
    for (const tag of item.discoveryTags) {
      assert.ok(tagById[tag.id], item.id);
      assert.ok(['source-metadata', 'editorial-suggestion', 'catalog-availability'].includes(tag.basis));
    }
    for (const field of ['what', 'where', 'why']) {
      assert.equal(item.guide[field].length, 2);
      assert.ok(
        item.guide[field].every(text => typeof text === 'string' && text.length >= 6),
        `${item.id} ${field}`
      );
    }
    assert.equal(item.guide.editorial, true);
  }
});
test('child counts partition each category and compose with source and trait filters', () => {
  for (const category of Object.keys(categoryLabels)) {
    for (const source of ['all', 'react-bits', 'motion-vault', 'shadcn-studio', 'personal-ai']) {
      const parent = filterCatalog(catalog, { category, source });
      const children = subcategories
        .filter(s => s.category === category)
        .flatMap(s => filterCatalog(catalog, { category, source, subcategory: s.id }));
      assert.deepEqual(children.map(i => i.id).sort(), parent.map(i => i.id).sort());
    }
  }
  assert.equal(filterCatalog(catalog, { category: 'Micro', subcategory: 'Components/cards' }).length, 0);
  const result = filterCatalog(catalog, {
    source: 'personal-ai',
    tag: 'drag',
    savedOnly: true,
    saved: ['personal-ai/m06']
  });
  assert.deepEqual(
    result.map(i => i.id),
    ['personal-ai/m06']
  );
});
const cases = [
  ['适合会员卡的展开效果', 'personal-ai/m01', 1],
  ['拖动票根展开', 'personal-ai/m06', 1],
  ['滚动时文字逐渐出现', 'TextAnimations/ScrollReveal', 3],
  ['想做一个产品图片轮播', 'motion-prompts/gsap-clip-carousel', 3],
  ['适合数据看板的数字增长', 'motion-vault/stats-count', 3],
  ['carosel', 'Components/DepthCarousel', 3],
  ['draggable ticket reveal', 'personal-ai/m06', 10]
];
for (const [query, id, k] of cases)
  test(`intent: ${query}`, () => {
    assert.ok(
      rankByIntent(catalog, query)
        .slice(0, k)
        .some(r => r.item.id === id),
      id
    );
  });
test('exclusions, unmatched query, keyword precision and bilingual concepts', () => {
  for (const query of ['柔和背景，不要粒子', 'subtle background without particles']) {
    const results = rankByIntent(catalog, query);
    assert.ok(results.length > 0);
    assert.ok(results.every(r => !r.item.discoveryTags.some(t => t.id === 'particles')));
    assert.ok(results.slice(0, 3).every(r => r.item.discoveryTags.some(t => t.id === 'background')));
  }
  assert.equal(rankByIntent(catalog, 'no-such-component-zyx').length, 0);
  assert.ok(rankByIntent(catalog, '不要粒子').length > 0);
  assert.deepEqual(
    filterCatalog(catalog, { source: 'react-bits', query: '纵深' }).map(i => i.id),
    ['Components/DepthCarousel']
  );
  assert.ok(parseIntent('without particles').negative.includes('particles'));
});
