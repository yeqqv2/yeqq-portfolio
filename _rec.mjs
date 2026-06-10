import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:4173";
const VDIR = "/tmp/vids";
fs.mkdirSync(VDIR, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();

async function record(name, choreography) {
  const context = await browser.newContext({
    viewport: { width: 1600, height: 1200 },
    recordVideo: { dir: `${VDIR}/${name}`, size: { width: 1600, height: 1200 } },
  });
  const page = await context.newPage();
  let ok = false;
  for (let a = 0; a < 30 && !ok; a++) {
    try { await page.goto(BASE + "/", { waitUntil: "load", timeout: 8000 }); ok = true; }
    catch { await sleep(1000); }
  }
  await choreography(page);
  const video = page.video();
  await context.close();
  const p = await video.path();
  console.log(`${name} -> ${p}`);
  return p;
}

// loader: splash koreografisi görünür (~4.2s)
const loader = await record("loader", async () => {
  await sleep(4200);
});

// header: splash bitsin, sonra marquee aksın (ilk ~3.4s trim'lenecek)
const header = await record("header", async () => {
  await sleep(8800);
});

// menu: splash bitsin, hamburger aç, tut (ilk ~3.4s trim'lenecek)
const menu = await record("menu", async (page) => {
  await sleep(3400);
  try { await page.click("label.hamburger", { timeout: 3000 }); }
  catch (e) { console.error("menu click:", e.message); }
  await sleep(4400);
});

await browser.close();
fs.writeFileSync(`${VDIR}/paths.json`, JSON.stringify({ loader, header, menu }, null, 2));
console.log("DONE");
