import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE = process.env.BASE_URL || 'https://dino-cookies.pages.dev';
const OUT_DIR = process.env.OUT_DIR || 'docs/redesign/audits/2026-03-07-prod-admin/screenshots';

const PAGES = [
  { key: 'home', path: '/' },
  { key: 'admin', path: '/admin' },
];

const VIEWPORTS = [
  { key: 'desktop-1440x900', width: 1440, height: 900 },
  { key: 'tablet-834x1112', width: 834, height: 1112 },
  { key: 'mobile-390x844', width: 390, height: 844 },
];

function joinUrl(base, path) {
  return base.replace(/\/$/, '') + path;
}

await fs.mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
let context;

try {
  context = await browser.newContext();

  for (const pageDef of PAGES) {
    for (const vp of VIEWPORTS) {
      const page = await context.newPage();
      await page.setViewportSize({ width: vp.width, height: vp.height });

      const url = joinUrl(BASE, pageDef.path);
      const outPath = `${OUT_DIR}/${pageDef.key}-${vp.key}.png`;

      await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 });
      // buffer for layout stabilization
      await page.waitForTimeout(750);

      await page.screenshot({ path: outPath, fullPage: true });
      console.log(`${outPath}  <=  ${url}`);
      await page.close();
    }
  }
} finally {
  if (context) await context.close().catch(() => {});
  await browser.close().catch(() => {});
}
