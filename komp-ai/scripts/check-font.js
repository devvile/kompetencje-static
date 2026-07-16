// Sprawdza computed font-family napisu MACHINE.
const { chromium } = require("playwright");
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1440, height: 833 } });
  await p.goto("http://localhost:3000", { waitUntil: "networkidle" });
  const info = await p.evaluate(() => {
    const spans = [...document.querySelectorAll("section h2 span")];
    const el = spans.find((s) => s.textContent.trim() === "MACHINE");
    if (!el) return "brak spana MACHINE";
    const cs = getComputedStyle(el);
    const html = getComputedStyle(document.documentElement);
    return {
      fontFamily: cs.fontFamily,
      fontWeight: cs.fontWeight,
      stroke: cs.webkitTextStroke,
      varPoppins: html.getPropertyValue("--font-poppins"),
      varOutline: cs.getPropertyValue("--font-outline"),
      className: el.className,
    };
  });
  console.log(JSON.stringify(info, null, 2));
  await b.close();
})();
