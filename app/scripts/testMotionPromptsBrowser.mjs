import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const require = createRequire(process.env.UIE_PLAYWRIGHT_PACKAGE || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.UIE_BASE_URL || 'http://10.89.2.12:18120';
const out = path.resolve(process.env.UIE_EVIDENCE_DIR || 'test-results/motion-prompts');
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
const checks = [];
page.on('pageerror', e => errors.push(e.message));
const pass = text => {
  checks.push(text);
  console.log(`PASS ${text}`);
};
try {
  await page.goto(`${base}/?source=motion-prompts`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: /探索组件.*248/ }).waitFor();
  assert.equal(await page.locator('.uie-card').count(), 24);
  assert.equal(await page.getByRole('button', { name: /^Motion Prompts/ }).getAttribute('aria-pressed'), 'true');
  await page.waitForFunction(() =>
    Array.from(document.querySelectorAll('.uie-card .uie-poster'))
      .slice(0, 3)
      .every(img => img.complete && img.naturalWidth > 0)
  );
  await page.screenshot({ path: path.join(out, 'motion-catalog.png'), fullPage: false });
  pass('248 entries in the shared styled catalog, source filter selected');
  await page.getByRole('combobox', { name: '提示词范围' }).selectOption('full');
  await page.getByRole('heading', { name: /探索组件.*30/ }).waitFor();
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await page.getByRole('combobox', { name: '提示词范围' }).inputValue(), 'full');
  await page.getByRole('combobox', { name: '搜索方式' }).selectOption('keyword');
  await page.getByRole('textbox', { name: '搜索组件' }).fill('3D 滚动隧道');
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length === 1);
  await page.getByRole('button', { name: '收藏 3D 滚动隧道', exact: true }).click();
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(
    await page.getByRole('button', { name: '取消收藏 3D 滚动隧道', exact: true }).getAttribute('aria-pressed'),
    'true'
  );
  pass('Full-only filter, Chinese search, URL state and Motion Prompts favorites persist');
  await page.goto(`${base}/?source=motion-prompts&category=ScrollEffects`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: /滚动叙事.*71/ }).waitFor();
  await page.goto(`${base}/?source=react-bits`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: /探索组件.*215/ }).waitFor();
  pass('Semantic categories compose with source filtering and preserve the 215 React Bits entries');
  await page.goto(`${base}/motion-prompts/3d-scroll-tunnel?view=prompt`, { waitUntil: 'domcontentloaded' });
  await page.locator('.uie-prompt pre').waitFor();
  const raw = await context.request.get(`${base}/motion-prompts/prompts/3d-scroll-tunnel.md`);
  assert.equal(await page.locator('.uie-prompt pre').textContent(), await raw.text());
  assert.equal(await page.getByRole('button', { name: '复制原版提示词', exact: true }).count(), 1);
  assert.equal(await page.locator('iframe').count(), 0);
  await page.getByRole('tab', { name: '集成与来源' }).click();
  await page.locator('.uie-motion-metadata').waitFor();
  assert.match(await page.locator('.uie-motion-integration').innerText(), /不提供组件源码/);
  pass('Full public prompt matches official snapshot verbatim; source-code absence and attribution are explicit');
  await page.getByRole('tab', { name: '设计预览' }).click();
  const demo = page.getByRole('link', { name: '在原站体验交互' });
  assert.equal(await demo.getAttribute('target'), '_blank');
  assert.equal(await demo.getAttribute('href'), 'https://motionprompts.dev/components/3d-scroll-tunnel/index.html');
  await page.getByRole('button', { name: '从头播放' }).click();
  await page.waitForFunction(() => document.querySelector('.uie-motion-stage video')?.currentTime > 0.3, null, {
    timeout: 20000
  });
  await page.screenshot({ path: path.join(out, 'motion-preview.png'), fullPage: true });
  await page.getByRole('tab', { name: '原版提示词', exact: true }).click();
  assert.equal(await page.locator('.uie-motion-stage video').count(), 0);
  pass('Real upstream video plays; switching tabs disposes media; live interaction uses the original site');
  await page.goto(`${base}/motion-prompts/orbit-carousel-3d?view=prompt`, { waitUntil: 'domcontentloaded' });
  await page.locator('.uie-prompt pre').waitFor();
  assert.match(await page.locator('.uie-prompt pre').innerText(), /This prompt requires/);
  assert.equal(await page.getByRole('button', { name: '复制公开预览', exact: true }).count(), 1);
  assert.equal(await page.getByRole('button', { name: '复制原版提示词', exact: true }).count(), 0);
  await page.screenshot({ path: path.join(out, 'motion-excerpt.png'), fullPage: true });
  pass('Paid item remains an official excerpt, with no fake full prompt or source download');
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/?source=motion-prompts`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('heading', { name: /探索组件.*248/ }).waitFor();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await page.getByRole('button', { name: '打开分类' }).click();
  await page.locator('.uie-sidebar a').filter({ hasText: '滚动叙事' }).click();
  assert.ok(page.url().includes('source=motion-prompts'));
  await page.getByRole('heading', { name: /滚动叙事.*71/ }).waitFor();
  await page.waitForFunction(() => document.querySelector('.uie-sidebar').getBoundingClientRect().right <= 0);
  await page.screenshot({ path: path.join(out, 'motion-mobile.png'), fullPage: false });
  await page.goto(`${base}/motion-prompts/orbit-carousel-3d?view=prompt`, { waitUntil: 'domcontentloaded' });
  await page.locator('.uie-prompt pre').waitFor();
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  pass('390px mobile catalog and prompt detail fit; category navigation preserves source');
  await page.getByRole('button', { name: '切换英文' }).click();
  await page.getByRole('tab', { name: 'Integration & source' }).click();
  await page.getByRole('heading', { name: 'Before integrating this design' }).waitFor();
  pass('New details follow the existing bilingual shell');
  const registry = await (await context.request.get(`${base}/personal-registry/index.json`)).json();
  assert.equal(registry.items.length, 1384);
  assert.equal(registry.items.filter(x => x.source === 'motion-prompts').length, 248);
  assert.equal((await context.request.get(`${base}/motion-prompts/entries/not-real.json`)).status(), 404);
  assert.equal((await context.request.get(`${base}/motion-prompts/prompts/not-real.md`)).status(), 404);
  assert.deepEqual(errors, []);
  pass('Unified AI index contains 1384 items; missing resources return 404; no page exceptions');
  fs.writeFileSync(path.join(out, 'result.json'), JSON.stringify({ status: 'passed', checks, errors }, null, 2));
} catch (error) {
  await page.screenshot({ path: path.join(out, 'failure.png'), fullPage: true });
  fs.writeFileSync(
    path.join(out, 'result.json'),
    JSON.stringify({ status: 'failed', checks, errors, error: error.message }, null, 2)
  );
  throw error;
} finally {
  await browser.close();
}
