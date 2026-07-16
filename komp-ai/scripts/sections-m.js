// Wypisuje granice sekcji mobile (bounding rects) przy viewport 402.
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 402, height: 875 } });
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await p.evaluate(() => document.fonts.ready);
  const rows = await p.evaluate(() =>
    [...document.querySelectorAll("main > *")].map((el) => {
      const r = el.getBoundingClientRect();
      const y = r.top + window.scrollY;
      return `${el.tagName}.${el.className.split(" ").slice(0, 3).join(".")} y=${y.toFixed(1)} h=${r.height.toFixed(1)} bottom=${(y + r.height).toFixed(1)} visible=${r.height > 0}`;
    })
  );
  console.log(rows.join("\n"));
  await b.close();
})();
