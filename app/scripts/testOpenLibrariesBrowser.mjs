import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const require = createRequire(process.env.UIE_PLAYWRIGHT_PACKAGE || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.UIE_BASE_URL || 'http://10.89.2.12:18120';
const out = process.env.UIE_EVIDENCE_DIR || 'test-results/open-libraries';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
const errors = [],
  checks = [];
page.on('pageerror', e => errors.push(e.message));
const pass = t => {
  checks.push(t);
  console.log(`PASS ${t}`);
};
try {
  await page.goto(`${base}/resources`);
  await page.locator('.uie-resource-card').first().waitFor();
  assert.equal(await page.locator('.uie-resource-card').count(), 16);
  assert.match(await page.locator('.uie-resource-card').filter({ hasText: 'aimotions' }).innerText(), /书面许可/);
  await page.getByRole('combobox', { name: '资源提示词类型' }).selectOption('integration');
  assert.ok((await page.locator('.uie-resource-card').count()) < 16);
  await page.getByRole('textbox', { name: '搜索资源站' }).fill('React Bits');
  assert.equal(await page.locator('.uie-resource-card').count(), 2);
  pass('16 distinct source entries, access notes and source-type search');
  await page.goto(`${base}/?source=motion-vault&kind=recreation`);
  await page.getByRole('heading', { name: /探索组件.*202/ }).waitFor();
  await page.getByRole('combobox', { name: '搜索方式' }).selectOption('keyword');
  await page.getByRole('textbox', { name: '搜索组件' }).fill('模糊浮现');
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length === 1);
  await page.getByRole('button', { name: '收藏 模糊浮现', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: '取消收藏 模糊浮现', exact: true }).waitFor();
  pass('202 MotionVault items, Chinese search, persisted kind filter and favorites');
  await page.goto(`${base}/open/motion-vault--blur-fade-in`);
  await page.addStyleTag({ content: 'html{scroll-behavior:auto!important}' });
  assert.equal(await page.locator('iframe').count(), 0);
  await page.getByRole('button', { name: '开始体验', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await frame.locator('[data-effect="blur-fade-in"]').waitFor();
  await frame
    .getByText('Motion', { exact: false })
    .first()
    .waitFor({ timeout: 10000 })
    .catch(() => {});
  assert.ok((await frame.locator('main').innerText()).length > 0);
  assert.equal(await page.locator('iframe').getAttribute('sandbox'), 'allow-scripts');
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/motion-vault-preview.png`, fullPage: true });
  await page.getByRole('button', { name: '结束本次体验' }).click();
  assert.equal(await page.locator('iframe').count(), 0);
  await page.getByRole('button', { name: '开始体验', exact: true }).click();
  await frame.locator('[data-effect]').waitFor();
  await page.getByRole('button', { name: '重新体验', exact: true }).click();
  await frame.locator('[data-effect]').waitFor();
  await page.getByRole('tab', { name: '原始提示词', exact: true }).click();
  await page.locator('.uie-prompt pre').waitFor();
  assert.equal(await page.locator('iframe').count(), 0);
  const entry = await (await page.request.get(`${base}/open-libraries/motion-vault/entries/blur-fade-in.json`)).json();
  assert.equal(
    await page.locator('.uie-prompt pre').textContent(),
    await (await page.request.get(base + entry.prompt.url)).text()
  );
  await page.getByRole('tab', { name: '源码与依赖' }).click();
  await page.locator('.uie-prompt pre').waitFor();
  assert.equal(JSON.parse(await page.locator('.uie-prompt pre').textContent()).name, 'blur-fade-in');
  pass('Isolated live preview, end/replay/tab cleanup, verbatim prompt and complete source bundle');
  await page.goto(`${base}/?source=shadcn-studio`);
  await page.getByRole('heading', { name: /探索组件.*637/ }).waitFor();
  await page.goto(`${base}/open/shadcn-studio--button-29`);
  await page.getByRole('tab', { name: '源码与依赖' }).click();
  await page.locator('.uie-prompt pre').waitFor();
  const bundle = JSON.parse(await page.locator('.uie-prompt pre').textContent());
  assert.ok(bundle.files[0].content.includes('Button'));
  await page.getByRole('tab', { name: '原始提示词', exact: true }).click();
  await page.getByText('本次公开分发没有归档原始提示词。保留原站入口，不自行编写替代。').waitFor();
  assert.equal(await page.locator('.uie-prompt pre').count(), 0);
  pass('637 Studio bundles and explicit no-original-prompt state');
  const registry = await (await page.request.get(`${base}/personal-registry/index.json`)).json();
  assert.equal(registry.items.length, 1384);
  const io = registry.items.find(x => x.source === 'shadcn-io');
  await page.goto(base + io.path);
  await page.getByRole('tab', { name: '源码与依赖' }).click();
  await page.getByText('此官方仓库仅提供组件链接，未包含实现源码。').waitFor();
  assert.equal(await page.locator('iframe').count(), 0);
  assert.equal((await page.request.get(`${base}/open-libraries/motion-vault/bundles/missing.json`)).status(), 404);
  assert.equal((await page.request.get(`${base}/integrations/motion-vault/missing.js`)).status(), 404);
  assert.equal(
    (await (await page.request.get(`${base}/personal-registry/resources.json`)).json()).resources.length,
    16
  );
  pass('75 reference-only links, 1384 component/index entries, separate source registry and real 404s');
  await page.setViewportSize({ width: 390, height: 844 });
  for (const url of ['/resources', '/?source=motion-vault', '/open/motion-vault--blur-fade-in']) {
    await page.goto(base + url);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), url);
  }
  await page.getByRole('button', { name: '切换英文' }).click();
  await page.getByRole('tab', { name: 'Source notes' }).click();
  await page.getByRole('heading', { name: 'Source and delivery scope' }).waitFor();
  assert.deepEqual(errors, []);
  pass('390px layout, bilingual controls and no page exceptions');
  fs.writeFileSync(`${out}/result.json`, JSON.stringify({ status: 'passed', checks, errors }, null, 2));
} catch (e) {
  await page.screenshot({ path: `${out}/failure.png`, fullPage: true });
  fs.writeFileSync(
    `${out}/result.json`,
    JSON.stringify({ status: 'failed', checks, errors, error: e.message }, null, 2)
  );
  throw e;
} finally {
  await browser.close();
}
