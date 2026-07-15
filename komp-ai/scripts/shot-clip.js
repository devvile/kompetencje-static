// Screenshot a clip rect around a section, extended below to show bleed across
// the next section boundary. usage:
//   node shot-clip.js <url> <out.png> <selectorText> [padBelow] [width]
const { chromium } = require("playwright");
(async () => {
  const [url, out, sel, padBelow = "220", w = "1440"] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: 9200 }, deviceScaleFactor: 1 });
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(200);
  const el = p.locator(`text=${sel}`).first();
  await el.scrollIntoViewIfNeeded();
  // locate the enclosing <section>
  const box = await p.evaluate((t) => {
    const nodes = [...document.querySelectorAll("section")];
    const s = nodes.find((n) => n.textContent.includes(t));
    const r = s.getBoundingClientRect();
    return { x: r.x + window.scrollX, y: r.y + window.scrollY, w: r.width, h: r.height };
  }, sel);
  await p.screenshot({ path: out, clip: { x: box.x, y: box.y, width: box.w, height: box.h + Number(padBelow) } });
  await b.close();
  console.log("shot:", out, JSON.stringify(box));
})();
