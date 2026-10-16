// Captures a smooth 4:5 scroll through each panel reel's website, frame by frame.
// Usage: node video/scripts/record-panels.mjs [slug ...]
import { chromium } from '@playwright/test';

import { captureScroll, preparePage } from './scroll-frames.mjs';

const PANELS = { canoo: 'https://canoo.ca/', scrapays: 'https://scrapays.com/' };
const slugs = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(PANELS);

const browser = await chromium.launch();

for (const slug of slugs) {
	const url = PANELS[slug];

	if (!url) throw new Error(`unknown panel: ${slug}`);
	const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 4 / 3 }); // 1440×1800.

	await preparePage(page, url);
	await captureScroll(page, { out: `video/public/${slug}-web.mp4`, frames: 9 * 30, distance: 1350 * 2.4, hold: 30 });
	await page.close();
	console.log(`wrote video/public/${slug}-web.mp4`);
}
await browser.close();
