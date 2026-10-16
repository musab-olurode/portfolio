import { expect, test } from '@playwright/test';

const reel = '#work-canoo video';

for (const slug of ['canoo', 'scrapays']) {
	test(`the ${slug} panel has a silent looping reel with a poster`, async ({ page }) => {
		await page.goto('/');
		const video = page.locator(`#work-${slug} video`);

		await expect(video).toHaveAttribute('poster', `/work/${slug}-reel-poster.webp`);
		await expect(video).toHaveAttribute('preload', 'none');
		expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.playsInline)).toBe(true);
		const sources = await page
			.locator(`#work-${slug} video source`)
			.evaluateAll((els) => els.map((e) => e.getAttribute('src')));

		expect(sources).toEqual([
			`/work/${slug}-reel-2x.webm`,
			`/work/${slug}-reel-2x.mp4`,
			`/work/${slug}-reel.webm`,
			`/work/${slug}-reel.mp4`,
		]);
		const media = await page
			.locator(`#work-${slug} video source`)
			.evaluateAll((els) => els.map((e) => e.getAttribute('media')));

		expect(media[0]).toContain('min-resolution');
		expect(media[2]).toBeNull();

		const poster = await page.request.get(`/work/${slug}-reel-poster.webp`);

		expect(poster.status()).toBe(200);
	});
}

test('the Scrapays panel links its Android app on Google Play', async ({ page }) => {
	await page.goto('/');
	const link = page.locator('#work-scrapays').getByRole('link', { name: /Scrapays Agent/ });

	await expect(link).toHaveAttribute('href', 'https://play.google.com/store/apps/details?id=com.scrapays.agent');
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
