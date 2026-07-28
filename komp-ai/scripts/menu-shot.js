// Walidacja mobilnego menu: screenshot zamknięte / otwarte / po zamknięciu.
// usage: node menu-shot.js <url> <outPrefix> [width] [height]
const { chromium } = require('playwright');
(async () => {
  const [url, out = 'menu', w = '390', h = '844'] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 2 });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  await p.screenshot({ path: `${out}-closed.png` });
  await p.click('button[aria-label="Otwórz menu"]');
  await p.waitForTimeout(900);
  await p.screenshot({ path: `${out}-open.png` });
  await p.click('[role="dialog"] button[aria-label="Zamknij menu"]');
  await p.waitForTimeout(700);
  await p.screenshot({ path: `${out}-reclosed.png` });
  await b.close();
  console.log('menu shots:', out);
})();
