import { expect, test } from '@playwright/test';

const reel = 'header video';

test('the hero montage is a silent loop that appears once it plays', async ({ page }) => {
	await page.goto('/');
	const video = page.locator(reel);

	expect(await video.evaluate((v: HTMLVideoElement) => v.muted && v.loop && v.playsInline)).toBe(true);
	const sources = await page.locator(`${reel} source`).evaluateAll((els) => els.map((e) => e.getAttribute('src')));

	expect(sources).toEqual(['/work/projects-reel.webm', '/work/projects-reel.mp4']);
	await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(false);
	await expect.poll(() => video.evaluate((v) => getComputedStyle(v).opacity)).toBe('1');
});

test('the montage never sits on top of the name', async ({ page }) => {
	await page.goto('/');
	const name = (await page.getByRole('heading', { level: 1 }).boundingBox())!;
	const video = (await page.locator(reel).boundingBox())!;

	expect(video.y).toBeGreaterThanOrEqual(name.y + name.height);
});

test.describe('with reduced motion', () => {
	test.use({ reducedMotion: 'reduce' });
	test('the montage shows its still frame and does not play', async ({ page }) => {
		await page.goto('/');
		const video = page.locator(reel);

		await page.waitForTimeout(800);
		expect(await video.evaluate((v: HTMLVideoElement) => v.paused)).toBe(true);
		expect(await video.evaluate((v) => getComputedStyle(v).opacity)).toBe('1');
		await expect(video).toHaveAttribute('poster', '/work/projects-reel-poster.webp');
	});
});

for (const viewport of [
	{ width: 1440, height: 900 },
	{ width: 2000, height: 820 },
	{ width: 1280, height: 720 },
]) {
	test.describe(`desktop ${viewport.width}×${viewport.height}`, () => {
		test.use({ viewport });
		test('the whole hero row, Hire me included, stays above the fold', async ({ page }) => {
			await page.goto('/');
			const button = (await page.getByRole('link', { name: 'Hire me' }).boundingBox())!;
			const video = (await page.locator(reel).boundingBox())!;

			expect(button.y + button.height).toBeLessThanOrEqual(viewport.height);
			expect(video.y + video.height).toBeLessThanOrEqual(button.y);
		});
	});
}
