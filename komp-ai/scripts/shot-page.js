// Full-page screenshot (fonts loaded). usage: node shot-page.js <url> <out.png> [width] [height]
const { chromium } = require("playwright");
(async () => {
  const [url, out, w = "1440", h = "900"] = process.argv.slice(2);
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: 1 });
  await p.emulateMedia({ reducedMotion: 'reduce' });
  await p.goto(url, { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  // Scroll through to trigger lazy-loaded images, then back to top.
  await p.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await p.waitForLoadState("networkidle");
  await p.waitForTimeout(400);
  await p.screenshot({ path: out, fullPage: true });
  await b.close();
  console.log("shot:", out);
})();
