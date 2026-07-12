const { chromium } = require("playwright");
(async () => {
  const url = process.argv[2] || "http://localhost:3000";
  const b = await chromium.launch();
  for (const w of [375, 768, 1440, 1920, 2560]) {
    const p = await b.newPage({ viewport: { width: w, height: 900 } });
    await p.goto(url, { waitUntil: "networkidle" });
    const r = await p.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      cw: document.documentElement.clientWidth,
    }));
    console.log(`${w}: scrollW=${r.sw} clientW=${r.cw} ${r.sw > r.cw + 1 ? "H-SCROLL!" : "ok"}`);
    await p.close();
  }
  await b.close();
})();
