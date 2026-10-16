// Records a smooth scroll through canoo.ca at 4:5 for the portfolio clip.
import { rename, rm } from 'node:fs/promises';

import { chromium } from '@playwright/test';

const OUT_DIR = 'video/public/raw';
const browser = await chromium.launch();
const context = await browser.newContext({
	viewport: { width: 1080, height: 1350 },
	deviceScaleFactor: 1,
	recordVideo: { dir: OUT_DIR, size: { width: 1080, height: 1350 } },
});
const page = await context.newPage();

await page.goto('https://canoo.ca/', { waitUntil: 'networkidle', timeout: 60_000 }).catch(() => undefined);
for (const name of [/^(reject|decline)( all)?/i, /^(close|dismiss|got it|ok)$/i]) {
	const button = page.getByRole('button', { name }).first();

	if (await button.isVisible().catch(() => false)) await button.click({ timeout: 2000 }).catch(() => undefined);
}
await page.addStyleTag({
	content: 'html { scroll-behavior: auto !important; } ::-webkit-scrollbar { display: none; }',
});
await page.waitForTimeout(1500);

// Ease-in-out scroll of ~2.4 screens over 9 seconds, one step per frame.
const distance = 1350 * 2.4;
const frames = 9 * 60;

await page.evaluate(
	async ({ distance, frames }) => {
		const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

		for (let i = 0; i <= frames; i++) {
			window.scrollTo(0, distance * ease(i / frames));
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}
	},
	{ distance, frames }
);
await page.waitForTimeout(800);

const video = page.video();

await context.close();
await browser.close();
const path = await video.path();

await rm('video/public/canoo-web.webm', { force: true });
await rename(path, 'video/public/canoo-web.webm');
await rm(OUT_DIR, { recursive: true, force: true });
console.log('wrote video/public/canoo-web.webm');
