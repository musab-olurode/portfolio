import { expect, type Page, test } from '@playwright/test';

const hiddenCount = (page: Page) =>
	page.evaluate(
		() =>
			[...document.querySelectorAll('main h2, main h3, main p, main img, header h1 span')].filter(
				(el) => el.getClientRects().length > 0 && Number(getComputedStyle(el).opacity) < 1
			).length
	);

test.describe('without JavaScript', () => {
	test.use({ javaScriptEnabled: false });
	test('every heading, paragraph and image is visible', async ({ page }) => {
		await page.goto('/');
		await page.waitForTimeout(1500);
		expect(await hiddenCount(page)).toBe(0);
	});
});

test.describe('with reduced motion', () => {
	test.use({ reducedMotion: 'reduce' });
	test('nothing stays hidden after scrolling', async ({ page }) => {
		await page.goto('/');
		await page.evaluate(() => {
			window.scrollTo(0, document.body.scrollHeight);
		});
		await page.waitForTimeout(300);
		await page.evaluate(() => {
			window.scrollTo(0, 0);
		});
		await page.waitForTimeout(300);
		expect(await hiddenCount(page)).toBe(0);
	});
});

test('sections reveal as they scroll into view', async ({ page }) => {
	await page.goto('/');
	const heading = page.locator('#cv-heading');

	await expect(heading).toHaveAttribute('data-reveal', '');
	await expect(heading).not.toHaveAttribute('data-shown', '');
	await heading.scrollIntoViewIfNeeded();
	await expect(heading).toHaveAttribute('data-shown', '');
});

test('theme toggle works without view transitions and persists without a flash', async ({ page }) => {
	await page.addInitScript(() => {
		// @ts-expect-error simulate a browser without the API
		delete Document.prototype.startViewTransition;
	});
	await page.goto('/');
	await page.getByRole('button', { name: 'Switch to dark theme' }).click();
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	await page.reload({ waitUntil: 'domcontentloaded' });
	await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
	expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe('rgb(26, 32, 57)');
});
