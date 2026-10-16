// Renders the LinkedIn profile banner (1584×396): real website screenshots and app store screens on the site's ground.
// The bottom-left quarter stays empty because LinkedIn's profile photo covers it.
// Output: video/out/linkedin-banner.jpg (gitignored; upload by hand).
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';

const font = (await readFile('src/assets/InstrumentSerif-Regular.ttf')).toString('base64');
// Websites are full-page captures shown from the top; apps are store screens shown whole.
const shots = [
	{ src: 'public/work/canoo-web-2x.webp', width: 240 },
	{ src: 'video/public/canoo-app-2.webp', width: 146, app: true },
	{ src: 'public/work/newborn-2x.webp', width: 240 },
	{ src: 'video/public/scrapays-app-1.webp', width: 178, app: true },
	{ src: 'public/work/cematchmaker-2x.webp', width: 240 },
];
const images = await Promise.all(
	shots.map(async (shot) => ({ ...shot, b64: (await readFile(shot.src)).toString('base64') }))
);

const html = `<!doctype html><html><head><style>
@font-face { font-family: 'Instrument Serif'; src: url(data:font/ttf;base64,${font}); }
* { margin: 0; box-sizing: border-box; }
body { width: 1584px; height: 396px; position: relative; overflow: hidden; background: #f3f3f0; color: #141414; font-family: 'Instrument Serif', serif; }
.site { position: absolute; left: 56px; top: 44px; font-size: 44px; line-height: 1; letter-spacing: -0.01em; }
.line { position: absolute; left: 56px; top: 100px; font-size: 24px; line-height: 1.15; color: #5c5c58; max-width: 360px; }
.strip { position: absolute; left: 470px; top: 40px; bottom: 40px; display: flex; gap: 14px; }
.shot { flex: none; background-size: 100% auto; background-position: top center; background-repeat: no-repeat; }
.app { background-size: cover; background-position: center; border-radius: 10px; }
</style></head><body>
<div class="site">musab.dev</div>
<div class="line">Web, mobile and backend</div>
<div class="strip">${images
	.map(
		({ b64, width, app }) =>
			`<div class="shot${app ? ' app' : ''}" style="width:${width}px;background-image:url(data:image/webp;base64,${b64})"></div>`
	)
	.join('')}</div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1584, height: 396 }, deviceScaleFactor: 2 });

await page.setContent(html, { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);
const jpg = await page.screenshot({ type: 'jpeg', quality: 88 });

await browser.close();
await mkdir('video/out', { recursive: true });
await writeFile('video/out/linkedin-banner.jpg', jpg);
console.log(`wrote video/out/linkedin-banner.jpg (${Math.round(jpg.byteLength / 1024)} KB)`);
