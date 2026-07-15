// Screenshot a single element (fonts loaded). usage:
//   node shot-el.js <url> <out.png> <selector> [nth] [width] [dpr]
const { chromium } = require("playwright");
(async () => {
  const [url, out, selector, nth = "0", w = "1440", dpr = "1"] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: 1200, }, deviceScaleFactor: +dpr });
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  const el = p.locator(selector).nth(+nth);
  await el.scrollIntoViewIfNeeded();
  await el.screenshot({ path: out });
  await b.close();
  console.log("shot:", out);
})();
