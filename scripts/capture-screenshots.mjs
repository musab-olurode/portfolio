// Captures the live project sites into public/work/<slug>.webp.
// Usage: npm run screenshots [-- slug ...]
import { mkdir, readFile, writeFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';
import sharp from 'sharp';

const MAX_HEIGHT = 5760; // Four 1440px-wide screens: enough for a slow scroll, not the whole site.

const SITES = {
	'canoo-web': 'https://canoo.ca/',
	newborn: 'https://newborntoolkit.org/',
	cematchmaker: 'https://cematchmaker.com/',
	worldkite: 'https://worldkite.co.uk/',
	ericc: 'https://ericchelpdesk.org/',
	scrapays: 'https://scrapays.com/',
	naseeb: 'https://naseeb-by-qadr.pages.dev/',
	sandwell: 'https://www.sandwell.gov.uk/SBG/',
	'gender-lens': 'https://gender-lens-wp.s14staging.uk/',
	'this-site': process.env['SITE_URL'] ?? 'http://localhost:8787/',
};

// Prefer the most privacy-preserving choice on consent banners.
const DECLINE = /^(reject( all)?|decline( all)?|only (necessary|essential)|necessary only|deny|refuse)/i;
const CLOSE = /^(close|dismiss|no thanks|ok|got it|accept)$/i;

async function dismissBanners(page) {
	for (const pattern of [DECLINE, CLOSE]) {
		const button = page.getByRole('button', { name: pattern }).first();

		if (await button.isVisible().catch(() => false)) {
			await button.click({ timeout: 2000 }).catch(() => undefined);
			await page.waitForTimeout(600);
		}
	}
}

// Previews for the 'Also built' list: one 16:10 screen, no scroll needed.
const SINGLE_SCREEN = new Set(['naseeb', 'sandwell', 'gender-lens', 'this-site']);
const MANIFEST = 'src/content/work-images.json';
const only = process.argv.slice(2);
const targets = Object.entries(SITES).filter(([slug]) => !only.length || only.includes(slug));

await mkdir('public/work', { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
	viewport: { width: 1440, height: 900 },
	// Twice the density, so the large copy stays sharp on wide and retina screens.
	deviceScaleFactor: 2,
	// Some council sites refuse the headless user agent.
	userAgent:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
});

const sizes = JSON.parse(await readFile(MANIFEST, 'utf8').catch(() => '{}'));

for (const [slug, url] of targets) {
	const page = await context.newPage();

	try {
		await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 });
	} catch {
		await page.waitForTimeout(3000);
	}
	await page.waitForTimeout(1500);
	await dismissBanners(page);
	// Scroll through once so lazy images and reveal animations load, then return to the top.
	await page.evaluate(async (max) => {
		for (let y = 0; y < Math.min(document.documentElement.scrollHeight, max); y += 600) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 250));
		}
		window.scrollTo(0, 0);
	}, MAX_HEIGHT);
	await page.waitForTimeout(1200);
	const full = await page.screenshot({ fullPage: !SINGLE_SCREEN.has(slug) });
	const { height = 0 } = await sharp(full).metadata();
	const png = await sharp(full, { limitInputPixels: false })
		.extract({ left: 0, top: 0, width: 2880, height: Math.min(height, MAX_HEIGHT * 2) })
		.toBuffer();
	// Two copies: 1200px for most screens, 2400px only for wide or high-density ones (srcset).
	const small = await sharp(png, { limitInputPixels: false })
		.resize({ width: 1200 })
		.webp({ quality: 80 })
		.toFile(`public/work/${slug}.webp`);
	const large = await sharp(png, { limitInputPixels: false })
		.resize({ width: 2400 })
		.webp({ quality: 74 })
		.toFile(`public/work/${slug}-2x.webp`);

	sizes[slug] = { width: small.width, height: small.height };
	console.log(
		`${slug} ${small.width}x${small.height} ${Math.round(small.size / 1024)} KB, -2x ${Math.round(large.size / 1024)} KB`
	);
	await page.close();
}

await writeFile(MANIFEST, `${JSON.stringify(sizes, null, '\t')}\n`);

await browser.close();
