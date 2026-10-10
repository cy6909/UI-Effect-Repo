import { createRequire } from 'node:module';
import fs from 'node:fs';
import items from '../src/personal/open-libraries/catalog-data.js';
const require = createRequire(process.env.UIE_PLAYWRIGHT_PACKAGE || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.UIE_BASE_URL || 'http://10.89.2.12:18121';
const out = process.env.UIE_EVIDENCE_DIR || 'test-results/open-capture';
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync('public/open-libraries/motion-vault/posters', { recursive: true });
const b = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader']
});
const results = [];
try {
  for (const item of items.filter(x => x.source === 'motion-vault')) {
    const page = await b.newPage({ viewport: { width: 720, height: 570 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    try {
      await page.goto(`${base}${item.demoUrl}`, { waitUntil: 'load', timeout: 20000 });
      await page.locator(`[data-effect="${item.slug}"]`).waitFor({ timeout: 10000 });
      await page.waitForTimeout(700);
      if (item.interaction === 'hover' || item.interaction === 'move') await page.mouse.move(360, 280);
      if (item.interaction === 'click') await page.mouse.click(360, 280);
      await page.waitForTimeout(250);
      if (await page.getByRole('alert').count()) errors.push('Preview boundary fallback');
      if (!(await page.locator('main').innerHTML()).length) errors.push('Empty preview');
      await page.screenshot({
        path: `public/open-libraries/motion-vault/posters/${item.slug}.jpg`,
        type: 'jpeg',
        quality: 72
      });
    } catch (e) {
      errors.push(e.message);
    }
    results.push({ id: item.id, errors });
    await page.close();
    if (results.length % 20 === 0)
      console.log(`Rendered ${results.length}/202; failures ${results.filter(r => r.errors.length).length}`);
  }
} finally {
  await b.close();
  fs.writeFileSync(
    `${out}/capture.json`,
    JSON.stringify({ total: results.length, failures: results.filter(x => x.errors.length), results }, null, 2)
  );
}
console.log(`Finished ${results.length}; failures ${results.filter(r => r.errors.length).length}`);
