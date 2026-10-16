import { expect, test } from '@playwright/test';

test('home has title, canonical and a working OG image', async ({ page, request }) => {
	await page.goto('/');
	await expect(page).toHaveTitle("Mus'ab Olurode — Full-stack engineer");
	await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://musab.dev');
	const og = await page.locator('meta[property="og:image"]').getAttribute('content');

	expect(og).toBeTruthy();
	const res = await request.get(new URL(og!).pathname);

	expect(res.status()).toBe(200);
});

test('unknown paths show the 404 page', async ({ page }) => {
	await page.goto('/does-not-exist');
	await expect(page.getByText('Page not found')).toBeVisible();
});
