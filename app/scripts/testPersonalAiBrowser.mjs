import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { personalAiCatalog } from '../src/personal/personal-ai/catalog.js';
const require = createRequire(process.env.UIE_PLAYWRIGHT_PACKAGE || import.meta.url);
const { chromium } = require('playwright');
const base = process.env.UIE_BASE_URL || 'http://10.89.2.12:18120';
const out = process.env.UIE_EVIDENCE_DIR || 'test-results/personal-ai';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({
  executablePath: '/usr/bin/google-chrome',
  headless: true,
  args: ['--no-sandbox', '--disable-dev-shm-usage']
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 } });
const errors = [],
  checks = [];
page.on('pageerror', e => errors.push(e.message));
const pass = s => {
  checks.push(s);
  console.log(`PASS ${s}`);
};
try {
  for (const item of personalAiCatalog) {
    await page.goto(`${base}${item.path}`, { waitUntil: 'domcontentloaded' });
    await page.addStyleTag({ content: 'html { scroll-behavior: auto !important; }' });
    const frame = page.frameLocator('.uie-personal-frame');
    assert.equal(await page.locator('.uie-personal-frame').getAttribute('sandbox'), 'allow-scripts');
    if (item.code === 'M01') {
      await frame.locator('#curtain.visible').waitFor();
      assert.equal(await frame.locator('#remaining').textContent(), '163');
      assert.equal(await frame.locator('.slot').count(), 12);
      await frame.locator('#primary').click();
      await frame.locator('#itinerary.show').waitFor();
      await frame.locator('#return').click();
      await frame.locator('#curtain.visible').waitFor();
    } else if (item.code !== 'R01') {
      await frame.locator(`#screen-${item.code}.active`).waitFor();
      if (item.code === 'M02') {
        await frame.locator('#open02').click();
        await frame.locator('#count02').filter({ hasText: /^163$/ }).waitFor();
        await frame.locator('#toggle02').click();
        assert.equal(await frame.locator('#code02').textContent(), 'LF7K-2QXP');
      }
      if (item.code === 'M03') {
        await frame.locator('#open03').click();
        await frame.locator('#ticks03 i.today').waitFor();
        assert.equal(await frame.locator('#ticks03 i').count(), 53);
        assert.equal(await frame.locator('#ticks03 i.today').getAttribute('data-index'), '29');
      }
      if (item.code === 'M04') {
        await frame.locator('#open04').click();
        await frame.locator('#photo04.open').waitFor();
        await frame.locator('#shuffle04').click();
        assert.equal(await frame.locator('#recipe04').textContent(), '牛油果早餐碗');
      }
      if (item.code === 'M05') {
        await frame.locator('#open05').click();
        await frame.locator('#flip05.back').waitFor();
        await frame.locator('#return05').click();
        await frame.locator('#flip05:not(.back)').waitFor();
        await frame.locator('#open05').click();
      }
      if (item.code === 'M06') {
        const grip = frame.locator('#grip06');
        for (const [distance, expanded] of [
          [20, 'false'],
          [64, 'true']
        ]) {
          await grip.scrollIntoViewIfNeeded();
          await grip.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
          await page.waitForTimeout(400);
          const box = await grip.boundingBox();
          const x = box.x + box.width / 2,
            y = box.y + box.height / 2;
          await page.mouse.move(x, y);
          await page.mouse.down();
          await page.mouse.move(x, y + distance, { steps: 8 });
          await page.mouse.up();
          assert.equal(await grip.getAttribute('aria-expanded'), expanded);
        }
      }
    } else {
      assert.equal(await frame.locator('.card').count(), 4);
      assert.equal(await frame.locator('.pad.active').count(), 10);
      await frame.locator('.pad.active').first().click();
      await frame.locator('.card-content[aria-hidden="false"]').waitFor();
      await frame.locator('.card-back').click();
      await frame.locator('.card-back').waitFor({ state: 'detached' });
      await frame.locator('.pad.active').first().click();
      await frame.locator('.card-content[aria-hidden="false"]').waitFor();
    }
    // Wait for archived animations to settle before recording the visual state.
    await page.waitForTimeout(item.code === 'R01' ? 2300 : 900);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: path.join(out, `${item.slug}.png`), fullPage: true });
    if (process.env.UIE_GENERATE_POSTERS === '1') {
      fs.mkdirSync('public/personal-ai/posters', { recursive: true });
      const target =
        item.code === 'M01'
          ? frame.locator('#stage')
          : item.code === 'R01'
            ? frame.locator('.card').first()
            : frame.locator('.phone');
      await target.screenshot({ path: `public${item.posterUrl}` });
    }
    const entry = await (await page.request.get(`${base}${item.detailUrl}`)).json();
    const response = await page.request.get(`${base}${entry.files[0].url}`);
    assert.equal(
      createHash('sha256')
        .update(await response.body())
        .digest('hex'),
      entry.files[0].sha256
    );
    assert.match(response.headers()['content-security-policy'], /sandbox;/);
    await page.getByRole('button', { name: '结束本次体验', exact: true }).click();
    assert.equal(await page.locator('iframe').count(), 0);
    await page.getByRole('button', { name: '重新体验', exact: true }).click();
    await page.locator('iframe').waitFor();
    await page.getByRole('tab', { name: 'HTML 源码', exact: true }).click();
    await page.locator('.uie-prompt pre').waitFor();
    assert.equal(await page.locator('iframe').count(), 0);
    assert.equal(await page.locator('.uie-prompt pre').textContent(), await response.text());
    await page.getByRole('tab', { name: '原始提示词', exact: true }).click();
    if (item.code === 'R01') {
      await page.locator('.uie-prompt pre').waitFor();
      assert.match(await page.locator('.uie-prompt pre').textContent(), /Interactive Calendar Cards/);
    } else {
      await page.getByText('归档未提供这份实现的独立原始提示词。现有 Skill 规范仍可在 Notion 查看。').waitFor();
      assert.equal(await page.locator('.uie-prompt pre').count(), 0);
    }
    pass(`${item.code}: real interaction, sandbox, original source hash, dispose/replay and prompt availability`);
  }
  await page.goto(`${base}/?source=personal-ai`);
  await page.getByRole('heading', { name: /探索组件.*7/ }).waitFor();
  assert.equal(await page.locator('.uie-card').count(), 7);
  await page.getByRole('combobox', { name: '搜索方式' }).selectOption('keyword');
  await page.getByRole('textbox', { name: '搜索组件' }).fill('票根');
  await page.waitForFunction(() => document.querySelectorAll('.uie-card').length === 1);
  await page.getByRole('button', { name: '收藏 拖动展开票根', exact: true }).click();
  await page.reload();
  await page.getByRole('button', { name: '取消收藏 拖动展开票根', exact: true }).waitFor();
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of ['m01', 'm04', 'calendar-cards']) {
    await page.goto(`${base}/personal-ai/${slug}`);
    await page.frameLocator('iframe').locator('body').waitFor();
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    const frame = page.frames().find(f => f.url().includes(`/demos/${slug}`));
    assert.ok(
      await frame.evaluate(() => document.documentElement.scrollWidth <= innerWidth),
      `${slug} iframe overflow`
    );
    await page.screenshot({ path: path.join(out, `${slug}-mobile.png`), fullPage: true });
  }
  await page.getByRole('button', { name: '切换英文' }).click();
  await page.getByRole('tab', { name: 'Provenance', exact: true }).click();
  await page.getByText('Unknown; not verified as a first-pass, no-skills generation').waitFor();
  assert.equal((await page.request.get(`${base}/personal-ai/source/missing.html`)).status(), 404);
  assert.equal((await page.request.get(`${base}/personal-ai/demos/missing.html`)).status(), 404);
  const registry = await (await page.request.get(`${base}/personal-registry/index.json`)).json();
  assert.equal(registry.items.length, 1384);
  assert.equal(registry.items.filter(x => x.source === 'personal-ai').length, 7);
  assert.deepEqual(errors, []);
  pass('Search, favorites, mobile fit, bilingual provenance, 1384-item registry and 404 boundaries');
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
