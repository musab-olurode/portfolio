// Renders the 1200×630 link-preview card (Open Graph / X / WhatsApp) as a light JPEG.
// Output: src/app/opengraph-image.jpg (+ .alt.txt), picked up by Next's file convention.
import { readFile, writeFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';

const font = (await readFile('src/assets/InstrumentSerif-Regular.ttf')).toString('base64');
const photo = (await readFile('src/assets/headshot.jpg')).toString('base64');

const html = `<!doctype html><html><head><style>
@font-face { font-family: 'Instrument Serif'; src: url(data:font/ttf;base64,${font}); }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; display: flex; background: #f3f3f0; color: #141414; font-family: 'Instrument Serif', serif; }
.text { flex: 1; display: flex; flex-direction: column; justify-content: space-between; padding: 56px 0 60px 64px; }
.site { font-size: 30px; }
.name { font-size: 132px; line-height: 0.88; letter-spacing: -0.03em; }
.promise { margin-top: 26px; font-size: 40px; line-height: 1.1; max-width: 640px; }
.photo { width: 430px; height: 630px; background: url(data:image/jpeg;base64,${photo}) 88% 40% / 128% auto no-repeat; }
</style></head><body>
<div class="text"><div class="site">musab.dev</div>
<div><div class="name">Mus'ab<br>Olurode</div>
<div class="promise">Full-stack engineer. I build the whole product: the app, the website and the backend.</div></div></div>
<div class="photo"></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });

await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const jpg = await page.screenshot({ type: 'jpeg', quality: 86 });

await browser.close();
await writeFile('src/app/opengraph-image.jpg', jpg);
await writeFile('src/app/opengraph-image.alt.txt', "Mus'ab Olurode, full-stack engineer: portrait and name");
console.log(`wrote src/app/opengraph-image.jpg (${Math.round(jpg.byteLength / 1024)} KB)`);
