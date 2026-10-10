import { createRequire } from 'node:module';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const require = createRequire(process.env.UIE_PLAYWRIGHT_PACKAGE || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.UIE_BASE_URL || 'http://10.89.2.12:18120';
const out = process.env.UIE_EVIDENCE_DIR || 'test-results/discovery';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--disable-dev-shm-usage', '--enable-unsafe-swiftshader']
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 } });
const errors = [],
  checks = [];
page.on('pageerror', error => errors.push(error.message));
const pass = name => {
  checks.push(name);
  console.log(`PASS ${name}`);
};
try {
  await page.goto(`${base}/?category=Components&source=react-bits`);
  await page.getByRole('combobox', { name: '子类筛选' }).selectOption('Components/carousel');
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length > 0);
  assert.match(page.url(), /sub=Components%2Fcarousel/);
  assert.ok(await page.locator('.uie-subnav a[aria-current=page]').count());
  assert.ok((await page.locator('.uie-card').count()) < 24);
  await page.reload();
  assert.equal(await page.getByRole('combobox', { name: '子类筛选' }).inputValue(), 'Components/carousel');
  pass('hierarchical sidebar, child counts and URL persistence');
  await page.screenshot({ path: `${out}/subcategory-desktop.png`, fullPage: true });
  await page.locator('.uie-card .uie-feature-tags button').first().click();
  assert.ok(new URL(page.url()).searchParams.get('tag'));
  assert.equal(new URL(page.url()).searchParams.get('sub'), 'Components/carousel');
  pass('card trait filters compose with source and subcategory');
  await page.goto(`${base}/`);
  await page.getByRole('textbox', { name: '搜索组件' }).fill('适合会员卡的展开效果');
  await page.waitForFunction(() => document.querySelector('.uie-card h3')?.textContent === '会员期限毛玻璃卡');
  assert.match(await page.locator('.uie-card').first().innerText(), /匹配：.*会员权益/);
  await page.screenshot({ path: `${out}/intent-results.png`, fullPage: true });
  pass('natural-language membership intent ranks the personal implementation first');
  await page.getByRole('textbox', { name: '搜索组件' }).fill('柔和背景，不要粒子');
  await page.getByText(/理解为：.*排除：粒子点缀/).waitFor();
  assert.ok(await page.locator('.uie-card').count());
  const discovery = await (await page.request.get(`${base}/personal-registry/discovery.json`)).json();
  const registry = await (await page.request.get(`${base}/personal-registry/index.json`)).json();
  assert.equal(discovery.items.length, 1384);
  assert.equal(registry.items.length, 1384);
  assert.equal(registry.discoveryUrl, '/personal-registry/discovery.json');
  pass('negation feedback and complete machine-readable discovery export');
  await page.goto(`${base}/?source=react-bits&mode=keyword&q=${encodeURIComponent('纵深')}`);
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length === 1);
  await page.getByRole('textbox', { name: '搜索组件' }).fill('zzzyyxnomatch');
  await page.getByRole('heading', { name: '这里还没有匹配的组件' }).waitFor();
  pass('keyword mode remains precise and unknown queries show an empty state');
  const detailPaths = [
    '/components/depth-carousel',
    '/personal-ai/m06',
    '/open/motion-vault--blur-fade-in',
    '/open/shadcn-studio--accordion-01'
  ];
  // Select a Motion Prompts route from the current registry instead of assuming its slug.
  const mp = registry.items.find(item => item.source === 'motion-prompts');
  if (mp?.path) detailPaths.push(mp.path);
  for (const path of detailPaths) {
    await page.goto(`${base}${path}`);
    const guide = page.getByRole('region', { name: '组件应用指南' });
    await guide.waitFor();
    assert.ok(await guide.locator('.uie-feature-tags a').count());
    await guide.locator('summary').click();
    assert.ok((await guide.locator('dd').first().innerText()).length > 5);
    assert.ok((await guide.locator('dd').last().innerText()).length > 5);
  }
  await page.screenshot({ path: `${out}/component-guide.png`, fullPage: true });
  pass('application guides and trait links in each detail renderer');
  await page.goto(`${base}/?category=Micro&sub=Micro%2Fbuttons&tag=click`);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await page.getByRole('combobox', { name: '子类筛选' }).waitFor();
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), true);
  await page.getByRole('button', { name: '打开分类' }).click();
  await page.locator('.uie-subnav a').filter({ hasText: '选择与筛选' }).click();
  await page.waitForFunction(() => document.querySelector('.uie-sidebar').getBoundingClientRect().right <= 0);
  assert.equal(new URL(page.url()).searchParams.get('sub'), 'Micro/choices');
  await page.getByRole('button', { name: '切换英文' }).click();
  assert.equal(await page.getByRole('combobox', { name: 'Subcategory filter' }).inputValue(), 'Micro/choices');
  await page.screenshot({ path: `${out}/mobile-discovery.png`, fullPage: true });
  pass('mobile hierarchy navigation, no horizontal overflow and English labels');
  assert.deepEqual(errors, []);
  fs.writeFileSync(`${out}/result.json`, JSON.stringify({ base, checks, errors }, null, 2));
} finally {
  await browser.close();
}
