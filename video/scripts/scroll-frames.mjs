// Captures a smooth scroll one frame at a time (lossless screenshots, not a screencast),
// then joins the frames into a high-quality intermediate clip for Remotion.
import { execFile } from 'node:child_process';
import { mkdir, rm } from 'node:fs/promises';
import { promisify } from 'node:util';

const run = promisify(execFile);
const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * @param {import('@playwright/test').Page} page  A loaded page.
 * @param {{ out: string, frames: number, distance: number, hold?: number, fps?: number }} options
 */
export async function captureScroll(page, { out, frames, distance, hold = 0, fps = 30 }) {
	const dir = `${out}.frames`;

	await rm(dir, { recursive: true, force: true });
	await mkdir(dir, { recursive: true });
	for (let i = 0; i < frames + hold; i++) {
		const t = Math.min(1, i / (frames - 1));

		await page.evaluate((y) => window.scrollTo(0, y), Math.round(distance * ease(t)));
		await page.waitForTimeout(16);
		await page.screenshot({ path: `${dir}/${String(i).padStart(4, '0')}.png` });
	}
	await run('ffmpeg', [
		'-v',
		'error',
		'-y',
		'-framerate',
		String(fps),
		'-i',
		`${dir}/%04d.png`,
		'-c:v',
		'libx264',
		'-crf',
		'12',
		'-preset',
		'slow',
		'-pix_fmt',
		'yuv420p',
		out,
	]);
	await rm(dir, { recursive: true, force: true });
}

/** Opens a page, dismisses consent banners and readies it for a clean capture. */
export async function preparePage(page, url) {
	await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 }).catch(() => undefined);
	for (const label of [/^(reject|decline)( all)?/i, /^(close|dismiss|got it|ok)$/i]) {
		const button = page.getByRole('button', { name: label }).first();

		if (await button.isVisible().catch(() => false)) await button.click({ timeout: 2000 }).catch(() => undefined);
	}
	// Some sites' CSP blocks injected <style>; inline styles from script still apply.
	await page.evaluate(() => {
		document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
		document.documentElement.style.setProperty('scrollbar-width', 'none');
	});
	// Load lazy images and scroll-triggered content, then return to the top.
	await page.evaluate(async () => {
		for (let y = 0; y < 3000; y += 500) {
			window.scrollTo(0, y);
			await new Promise((resolve) => setTimeout(resolve, 200));
		}
		window.scrollTo(0, 0);
	});
	await page.waitForTimeout(1200);
}
