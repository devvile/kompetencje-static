// Screenshot with web fonts guaranteed loaded.
// usage: node shot.js <url> <out.png> [width] [height] [dpr] [full]
//   full = "full" → fullPage screenshot (viewport height nadal steruje 100svh!)
const { chromium } = require('playwright');
(async () => {
  const [url, out, w = '1440', h = '840', dpr = '1', full = ''] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
  await p.emulateMedia({ reducedMotion: 'reduce' });
  // dev server Next 16.2 bywa nigdy „networkidle" (HMR) → fallback na load
  await p.goto(url, { waitUntil: 'networkidle', timeout: 15000 }).catch(async () => {
    await p.waitForLoadState('load');
    await p.waitForTimeout(1500);
  });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(150);
  await p.screenshot({ path: out, fullPage: full === 'full' });
  await b.close();
  console.log('shot:', out, w+'x'+h+'@'+dpr+'x');
})();
