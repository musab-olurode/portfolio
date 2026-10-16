// Records a short 16:10 scroll through each live project for the hero montage.
// Writes video/public/sites/<slug>.webm and video/public/sites/manifest.json (scroll start per clip).
import { mkdir, readdir, rename, rm, writeFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';

const SITES = [
	['canoo', 'Canoo', 'https://canoo.ca/'],
	['newborn', 'Newborn Toolkit', 'https://newborntoolkit.org/'],
	['pansaa', 'PANSAA', 'https://pansaa.newborntoolkit.org/'],
	['cematchmaker', 'CEMatchMaker', 'https://cematchmaker.com/'],
	['worldkite', 'WorldKite', 'https://worldkite.co.uk/'],
	['ericc', 'Ericc Help Desk', 'https://ericchelpdesk.org/'],
	['scrapays', 'Scrapays', 'https://scrapays.com/'],
	['sandwell', 'Sandwell Business Growth', 'https://www.sandwell.gov.uk/SBG/'],
	['gender-lens', 'Gender Lens', 'https://gender-lens-wp.s14staging.uk/'],
	['naseeb', 'Naseeb by Qadr', 'https://naseeb-by-qadr.pages.dev/'],
];
const OUT = 'video/public/sites';
const SIZE = { width: 1280, height: 800 };
const SCROLL_SECONDS = 3;

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const manifest = [];

for (const [slug, name, url] of SITES) {
	const dir = `${OUT}/tmp-${slug}`;
	const context = await browser.newContext({
		viewport: SIZE,
		recordVideo: { dir, size: SIZE },
		userAgent:
			'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
	});
	const page = await context.newPage();
	const t0 = Date.now();

	await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 }).catch(() => undefined);
	for (const label of [/^(reject|decline)( all)?/i, /^(close|dismiss|got it|ok)$/i]) {
		const button = page.getByRole('button', { name: label }).first();

		if (await button.isVisible().catch(() => false)) await button.click({ timeout: 2000 }).catch(() => undefined);
	}
	// Some sites' CSP blocks injected <style> tags; inline styles from script still apply.
	await page.evaluate(() => {
		document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
		document.documentElement.style.setProperty('scrollbar-width', 'none');
	});
	await page.waitForTimeout(1200);
	const scrollStart = (Date.now() - t0) / 1000;

	await page.evaluate(
		async ({ distance, frames }) => {
			const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

			for (let i = 0; i <= frames; i++) {
				window.scrollTo(0, distance * ease(i / frames));
				await new Promise((resolve) => requestAnimationFrame(resolve));
			}
		},
		{ distance: SIZE.height * 1.2, frames: SCROLL_SECONDS * 60 }
	);
	await page.waitForTimeout(600);
	await context.close();
	const [file] = await readdir(dir);

	await rename(`${dir}/${file}`, `${OUT}/${slug}.webm`);
	await rm(dir, { recursive: true, force: true });
	manifest.push({ slug, name, scrollStart });
	console.log(`${slug} scroll starts at ${scrollStart.toFixed(2)}s`);
}

await browser.close();
await writeFile(`${OUT}/manifest.json`, `${JSON.stringify(manifest, null, '\t')}\n`);
