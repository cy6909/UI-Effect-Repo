import fs from 'node:fs';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { motionPromptsCatalog } from '../src/personal/catalog.js';
const sha = text => createHash('sha256').update(text).digest('hex');
for (const item of motionPromptsCatalog) {
  const detail = JSON.parse(fs.readFileSync(`public${item.detailUrl}`, 'utf8'));
  const prompt = fs.readFileSync(`public${detail.prompt.url}`);
  assert.equal(detail.id, item.id);
  assert.equal(detail.sourceAvailable, false);
  assert.equal(detail.prompt.sha256, sha(prompt));
  assert.equal(detail.prompt.access, item.promptAccess);
  if (item.promptAccess === 'preview') assert.match(prompt.toString(), /This prompt requires/);
  else assert.doesNotMatch(prompt.toString(), /This prompt requires the Unlimited plan/);
  assert.equal(detail.previewMode, 'remote-video');
  assert.equal(detail.license, '/motion-prompts/LICENSE.txt');
}
assert.match(fs.readFileSync('public/motion-prompts/LICENSE.txt', 'utf8'), /PolyForm Noncommercial/);
console.log('PASS: 248 official prompt hashes, access labels, source boundaries and license references');
