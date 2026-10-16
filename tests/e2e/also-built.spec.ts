import { expect, test } from '@playwright/test';

test('the preview shows the first entry, then follows the hovered row', async ({ page }) => {
	await page.goto('/');
	const preview = page.getByTestId('also-preview');

	await preview.scrollIntoViewIfNeeded();
	await expect(preview.locator('img[data-active]')).toHaveAttribute('src', /naseeb/);
	await page.getByRole('link', { name: /Sandwell Business Growth/ }).hover();
	await expect(preview.locator('img[data-active]')).toHaveAttribute('src', /sandwell/);
});

test.describe('on a phone', () => {
	test.use({ viewport: { width: 390, height: 844 } });
	test('each entry with a site shows its own picture', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('#also-heading ~ ul img:visible')).toHaveCount(4);
	});
});
