import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1920, height: 956 } });
await page.goto("http://localhost:5173/projects", { waitUntil: "networkidle" });
await page.waitForTimeout(1500);
const data = await page.evaluate(() => {
  const cards = [...document.querySelectorAll(".project-card-3d")].slice(0, 4);
  const rect = (e) => { const r = e.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), cx: Math.round(r.x + r.width/2), cy: Math.round(r.y + r.height/2) }; };
  return {
    viewport: { w: innerWidth, h: innerHeight },
    stage: rect(document.querySelector(".projects-stage")),
    horizontal: rect(document.querySelector(".projects-horizontal")),
    track: rect(document.querySelector(".projects-track")),
    cards: cards.map(rect),
  };
});
console.log(JSON.stringify(data, null, 2));
await browser.close();
