import { expect, test } from '@playwright/test';

test('work and also-built pictures offer a 2400px copy for large screens', async ({ page }) => {
	await page.goto('/');
	const sets = await page
		.locator('#work img[srcset], #also-heading ~ * img[srcset], [data-testid="also-preview"] img[srcset]')
		.evaluateAll((imgs) => imgs.map((img) => img.getAttribute('srcset') ?? ''));

	expect(sets.length).toBeGreaterThanOrEqual(9);
	for (const set of sets) expect(set).toMatch(/@2x\.webp 2400w/);
});

test.describe('on a 3440px ultrawide', () => {
	test.use({ viewport: { width: 3440, height: 1440 } });
	test('the browser picks the 2400px copy', async ({ page }) => {
		await page.goto('/');
		const img = page.locator('#work-newborn img').first();

		await img.scrollIntoViewIfNeeded();
		await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.currentSrc)).toMatch(/@2x\.webp$/);
	});
});
