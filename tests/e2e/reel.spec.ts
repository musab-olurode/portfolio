import { expect, test } from '@playwright/test';

const reel = '#work-canoo video';

test('the Canoo panel has a silent looping reel with a poster', async ({ page }) => {
	await page.goto('/');
	const video = page.locator(reel);

	await expect(video).toHaveAttribute('poster', '/work/canoo-reel-poster.webp');
	await expect(video).toHaveAttribute('preload', 'none');
	expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.playsInline)).toBe(true);
	const sources = await page.locator(`${reel} source`).evaluateAll((els) => els.map((e) => e.getAttribute('src')));

	expect(sources).toEqual([
		'/work/canoo-reel@2x.webm',
		'/work/canoo-reel@2x.mp4',
		'/work/canoo-reel.webm',
		'/work/canoo-reel.mp4',
	]);
	const media = await page.locator(`${reel} source`).evaluateAll((els) => els.map((e) => e.getAttribute('media')));

	expect(media[0]).toContain('min-resolution');
	expect(media[2]).toBeNull();
});

test('the reel plays only once it is in view', async ({ page }) => {
	await page.goto('/');
	const video = page.locator(reel);

	expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
	await video.scrollIntoViewIfNeeded();
	await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
});

test.describe('with reduced motion', () => {
	test.use({ reducedMotion: 'reduce' });
	test('the reel stays on its poster', async ({ page }) => {
		await page.goto('/');
		const video = page.locator(reel);

		await video.scrollIntoViewIfNeeded();
		await page.waitForTimeout(800);
		expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
	});
});
