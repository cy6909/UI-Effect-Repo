import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(process.env.UIE_PLAYWRIGHT_PACKAGE || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.UIE_BASE_URL || 'http://10.89.2.12:18120';
const output = path.resolve(process.env.UIE_EVIDENCE_DIR || 'test-results/personal');
fs.mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
const external = [];
page.on('pageerror', e => errors.push(e.message));
page.on('request', r => {
  if (r.url().startsWith('http') && !r.url().startsWith(base)) external.push(r.url());
});
const checks = [];
const check = name => {
  checks.push(name);
  console.log(`PASS ${name}`);
};
try {
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: '探索组件' }).waitFor();
  assert.equal(await page.locator('.uie-card').count(), 24);
  await page.screenshot({ path: path.join(output, 'desktop-library.png'), fullPage: true });
  check('Chinese-first catalog, 24-card initial page');
  await page.getByRole('button', { name: /^React Bits/ }).click();
  const search = page.getByRole('textbox', { name: '搜索组件' });
  await page.getByRole('combobox', { name: '搜索方式' }).selectOption('keyword');
  await search.fill('纵深');
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length === 1);
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await search.inputValue(), '纵深');
  await page.getByRole('button', { name: '收藏 纵深轮播', exact: true }).click();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(
    await page.getByRole('button', { name: '取消收藏 纵深轮播', exact: true }).getAttribute('aria-pressed'),
    'true'
  );
  await page.getByRole('combobox', { name: '类别筛选' }).selectOption('Backgrounds');
  await page.getByRole('heading', { name: '这里还没有匹配的组件' }).waitFor();
  await page.getByRole('button', { name: '查看全部组件' }).click();
  check('Chinese search, URL persistence, favorites persistence, intersecting filters and empty state');
  await page.getByRole('button', { name: '切换英文' }).click();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  await page.getByRole('button', { name: 'Switch to Chinese' }).click();
  check('Bilingual preference survives reload');
  await page.goto(`${base}/components/depth-carousel`, { waitUntil: 'networkidle' });
  await page.getByRole('heading', { name: '纵深轮播', exact: true }).waitFor();
  const frame = page.frameLocator('.uie-demo-frame');
  await frame.locator('.depth-carousel').waitFor();
  await frame
    .locator('.depth-carousel__img')
    .first()
    .evaluate(img => img.decode());
  const before = await frame.locator('.depth-carousel__dot.is-active').getAttribute('aria-label');
  await frame.locator('.depth-carousel__arrow--next').click();
  await page.waitForTimeout(800);
  const after = await frame.locator('.depth-carousel__dot.is-active').getAttribute('aria-label');
  assert.notEqual(before, after);
  await page.screenshot({ path: path.join(output, 'desktop-depth-carousel.png'), fullPage: true });
  await page.getByRole('button', { name: '结束本次体验' }).click();
  assert.equal(await page.locator('iframe').count(), 0);
  await page.getByRole('button', { name: '重新体验', exact: true }).click();
  await page.frameLocator('iframe').locator('.depth-carousel').waitFor();
  check('Deep link, working carousel controls, finish/dispose and replay');
  await page.getByRole('tab', { name: '组件源码', exact: true }).click();
  await page.locator('.uie-source pre').waitFor();
  await page.getByRole('combobox', { name: '代码版本' }).selectOption('JS-TW');
  await page.locator('.uie-source pre').waitFor();
  assert.match(await page.locator('.uie-source pre').innerText(), /DepthCarousel/);
  const bundle = await context.request.get(`${base}/r/DepthCarousel-JS-TW.json`);
  assert.equal(bundle.status(), 200);
  assert.ok((await bundle.json()).files.length > 0);
  check('Source variant switching and complete downloadable JSON bundle');
  await page.getByRole('tab', { name: '原版提示词', exact: true }).click();
  await page.locator('.uie-prompt pre').waitFor();
  const chinesePrompt = await page.locator('.uie-prompt pre').innerText();
  assert.match(chinesePrompt, /集成 React Bits 的 <DepthCarousel/);
  assert.match(chinesePrompt, /完整组件源码/);
  assert.equal(await page.locator('.uie-provenance').count(), 0);
  await page.getByRole('button', { name: 'English', exact: true }).click();
  const englishPrompt = await page.locator('.uie-prompt pre').innerText();
  assert.match(englishPrompt, /## Integrate the <DepthCarousel/);
  assert.match(englishPrompt, /Full Component Source/);
  const codeBlocks = text => [...text.matchAll(/```[^\n]*\n([\s\S]*?)```/g)].map(x => x[1]);
  assert.deepEqual(codeBlocks(chinesePrompt), codeBlocks(englishPrompt));
  await page.getByRole('button', { name: '复制原版提示词', exact: true }).click();
  await page.screenshot({ path: path.join(output, 'desktop-prompt.png'), fullPage: true });
  check('Original upstream prompt in Chinese and English with identical code blocks');
  await page.goto(`${base}/backgrounds/aurora?view=prompt`, { waitUntil: 'networkidle' });
  await page.locator('.uie-prompt pre').waitFor();
  assert.match(await page.locator('.uie-prompt pre').innerText(), /<Aurora/);
  assert.equal(await page.locator('iframe').count(), 0);
  check('Prompt-only deep link extracts upstream data without keeping the graphics demo running');
  const missing = await context.request.get(`${base}/personal-registry/not-real.json`);
  assert.equal(missing.status(), 404);
  const registry = await context.request.get(`${base}/personal-registry/index.json`);
  assert.ok((await registry.json()).items.length > 200);
  check('Machine-readable catalog and real 404 for unknown assets');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: '打开分类' }).click();
  await page.locator('.uie-sidebar a').filter({ hasText: '动态背景' }).click();
  await page.getByRole('heading', { name: /^动态背景/ }).waitFor();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  await page.screenshot({ path: path.join(output, 'mobile-library.png'), fullPage: true });
  await page.goto(`${base}/components/depth-carousel`, { waitUntil: 'networkidle' });
  await page.frameLocator('iframe').locator('.depth-carousel').waitFor();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));
  await page.screenshot({ path: path.join(output, 'mobile-detail.png'), fullPage: true });
  check('390px mobile navigation and detail without horizontal overflow');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(base, { waitUntil: 'networkidle' });
  assert.ok(await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
  await page.getByRole('combobox', { name: '搜索方式' }).selectOption('keyword');
  await page.getByRole('textbox', { name: '搜索组件' }).fill('BlurText');
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length === 1);
  check('Reduced-motion catalog remains functional');
  assert.equal(external.filter(url => /google-analytics|googletagmanager|pro\.reactbits/.test(url)).length, 0);
  assert.deepEqual(errors, []);
  check('No page exceptions or upstream analytics / Pro requests in exercised flows');
  fs.writeFileSync(
    path.join(output, 'result.json'),
    JSON.stringify({ status: 'passed', host: '10.89.2.12', base, checks, errors, external }, null, 2)
  );
} catch (error) {
  await page.screenshot({ path: path.join(output, 'failure.png'), fullPage: true });
  fs.writeFileSync(
    path.join(output, 'result.json'),
    JSON.stringify({ status: 'failed', checks, errors, external, failure: error.message }, null, 2)
  );
  throw error;
} finally {
  await browser.close();
}
