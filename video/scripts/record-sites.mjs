// Captures a short 16:10 scroll through each live project for the hero montage, frame by frame.
// Writes video/public/sites/<slug>.mp4 and video/public/sites/manifest.json.
import { mkdir, rm, writeFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';

import { captureScroll, preparePage } from './scroll-frames.mjs';

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
const VIEWPORT = { width: 1280, height: 800 };

const only = process.argv.slice(2);

if (!only.length) await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
	viewport: VIEWPORT,
	deviceScaleFactor: 1.5, // 1920×1200 frames.
	userAgent:
		'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36',
});

for (const [slug, , url] of SITES.filter(([slug]) => !only.length || only.includes(slug))) {
	const page = await context.newPage();

	await preparePage(page, url);
	await captureScroll(page, { out: `${OUT}/${slug}.mp4`, frames: 90, distance: VIEWPORT.height * 1.2 });
	await page.close();
	console.log(`captured ${slug}`);
}

await browser.close();
await writeFile(
	`${OUT}/manifest.json`,
	`${JSON.stringify(
		SITES.map(([slug, name]) => ({ slug, name, scrollStart: 0 })),
		null,
		'\t'
	)}\n`
);
