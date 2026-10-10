import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { personalAiCatalog } from '../src/personal/personal-ai/catalog.js';

const hash = bytes => createHash('sha256').update(bytes).digest('hex');
fs.mkdirSync('public/personal-ai/demos', { recursive: true });
fs.mkdirSync('public/personal-ai/entries', { recursive: true });
for (const item of personalAiCatalog) {
  const bytes = fs.readFileSync(`public${item.sourceUrl}`);
  const original = bytes.toString('utf8');
  if (!original.includes('</body>')) throw new Error(`Invalid HTML: ${item.sourceUrl}`);
  // Only the preview adapter chooses a scene. Downloads remain the original bytes.
  const adapter = /^M0[2-6]$/.test(item.code)
    ? `<style>.head,.tabs,aside{display:none!important}.app{max-width:none;padding:12px}.stage{grid-template-columns:1fr;min-height:720px;padding:12px}</style><script>document.querySelector('[data-case="${item.code}"]')?.click();</script>`
    : '';
  fs.writeFileSync(`public${item.demoUrl}`, original.replace('</body>', `${adapter}</body>`));
  const entry = {
    schemaVersion: 1,
    ...item,
    source: item.source,
    files: [
      {
        url: item.sourceUrl,
        sha256: hash(bytes),
        bytes: bytes.length,
        type: 'text/html',
        scope: item.code.match(/^M0[2-6]$/) ? 'shared M02-M06 original workbench' : 'standalone prototype'
      }
    ],
    prompt: item.promptUrl
      ? {
          url: item.promptUrl,
          sha256: hash(fs.readFileSync(`public${item.promptUrl}`)),
          language: 'en',
          kind: item.promptKind
        }
      : null,
    preview: {
      url: item.demoUrl,
      sandbox: 'allow-scripts',
      adapter: adapter ? 'select archived scene and hide workbench navigation; source unchanged' : 'none'
    },
    license: '/personal-ai/NOTICE.txt'
  };
  fs.writeFileSync(`public${item.detailUrl}`, JSON.stringify(entry, null, 2) + '\n');
}
console.log(`Exported ${personalAiCatalog.length} personal AI prototypes with original source hashes.`);
