import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import items from '../src/personal/open-libraries/catalog-data.js';
import { resources } from '../src/personal/open-libraries/resources.js';
const hash = s => createHash('sha256').update(s).digest('hex');
assert.equal(items.length, 914);
assert.equal(new Set(items.map(x => x.id)).size, 914);
assert.equal(resources.length, 16);
assert.equal(new Set(resources.map(x => new URL(x.url).hostname)).size, 16);
for (const item of items) {
  const d = JSON.parse(fs.readFileSync(`public${item.detailUrl}`));
  assert.ok(fs.existsSync(`public${d.license}`));
  assert.match(fs.readFileSync(`public${d.license}`, 'utf8'), /MIT/);
  for (const field of ['prompt', 'bundle'])
    if (d[field]) assert.equal(hash(fs.readFileSync(`public${d[field].url}`)), d[field].sha256);
  if (item.source === 'motion-vault') {
    assert.ok(d.prompt && d.bundle);
    assert.equal(item.previewMode, 'local');
  }
  if (item.source === 'shadcn-studio') {
    assert.ok(d.bundle);
    assert.equal(d.prompt, null);
  }
  if (item.source === 'shadcn-io') {
    assert.equal(d.bundle, null);
    assert.equal(item.sourceAvailable, false);
  }
}
console.log(
  'PASS: 914 entries, all bundle/prompt hashes, MIT notices, 16 unique resources and explicit source boundaries'
);
