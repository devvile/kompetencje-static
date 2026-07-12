// Screenshot with web fonts guaranteed loaded.
// usage: node shot.js <url> <out.png> [width] [height] [dpr]
const { chromium } = require('playwright');
(async () => {
  const [url, out, w = '1440', h = '840', dpr = '1'] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +dpr });
  await p.goto(url, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(150);
  await p.screenshot({ path: out });
  await b.close();
  console.log('shot:', out, w+'x'+h+'@'+dpr+'x');
})();
