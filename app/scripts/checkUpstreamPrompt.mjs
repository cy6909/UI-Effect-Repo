import { execFileSync } from 'node:child_process';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { buildPrompt } from '../src/personal/upstreamPrompt.js';

const source = execFileSync('git', ['show', '7b69ba117ca7876dc9ca5ff3c09cf514de4b2d62:src/components/common/TabsLayout.jsx'], { encoding: 'utf8' });
const start = source.indexOf('function getActiveCode(');
const end = source.indexOf('const TabsLayout =', start);
assert.ok(start >= 0 && end > start);
const original = vm.runInNewContext(source.slice(start, end) + '\nbuildPrompt;');
let checks = 0;
for (const style of ['CSS', 'TW']) {
  for (const lang of ['JS', 'TS']) {
    for (const detailed of [false, true]) {
      const code = { code: 'const source = "JS";\n', tsCode: 'const source: string = "TS";\n', tailwind: 'JS TW', tsTailwind: 'TS TW', css: detailed ? '.sample { color: red; }' : '', dependencies: detailed ? 'gsap motion' : '', usage: '<Example speed={2} />' };
      const props = detailed ? [{ name: 'speed', type: 'number', default: '2', description: 'Original speed' }] : [];
      assert.equal(buildPrompt('Example', code, props, lang, style), original('Example', code, props, lang, style));
      checks++;
    }
  }
}
console.log(`PASS: ${checks} English outputs exactly match the original upstream builder.`);
