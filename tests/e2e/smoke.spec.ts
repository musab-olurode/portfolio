import { expect, test } from '@playwright/test';

test('home renders', async ({ page }) => {
	const errors: string[] = [];

	page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toContainText("Mus'ab Olurode");
	expect(errors).toEqual([]);
});
