// Captures the live project sites into public/work/<slug>.webp.
// Usage: npm run screenshots [-- slug ...]
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';
import sharp from 'sharp';

const SITES = {
	'canoo-web': 'https://canoo.ca/',
	newborn: 'https://newborntoolkit.org/',
	cematchmaker: 'https://cematchmaker.com/',
	worldkite: 'https://worldkite.co.uk/',
	ericc: 'https://ericchelpdesk.org/',
	scrapays: 'https://scrapays.com/',
};

// Prefer the most privacy-preserving choice on consent banners.
const DECLINE = /^(reject( all)?|decline( all)?|only (necessary|essential)|necessary only|deny|refuse)/i;
const CLOSE = /^(close|dismiss|no thanks|ok|got it|accept)$/i;

async function dismissBanners(page) {
	for (const pattern of [DECLINE, CLOSE]) {
		const button = page.getByRole('button', { name: pattern }).first();
		if (await button.isVisible().catch(() => false)) {
			await button.click({ timeout: 2000 }).catch(() => {});
			await page.waitForTimeout(600);
		}
	}
}

const only = process.argv.slice(2);
const targets = Object.entries(SITES).filter(([slug]) => !only.length || only.includes(slug));

await mkdir('public/work', { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 1800 }, deviceScaleFactor: 1 });

for (const [slug, url] of targets) {
	const page = await context.newPage();
	try {
		await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
	} catch {
		await page.waitForTimeout(3000);
	}
	await page.waitForTimeout(1500);
	await dismissBanners(page);
	const png = await page.screenshot({ clip: { x: 0, y: 0, width: 1440, height: 1800 } });
	const out = `public/work/${slug}.webp`;
	const info = await sharp(png).resize({ width: 1200 }).webp({ quality: 80 }).toFile(out);
	console.log(`${out} ${Math.round(info.size / 1024)} KB`);
	await page.close();
}

await browser.close();
