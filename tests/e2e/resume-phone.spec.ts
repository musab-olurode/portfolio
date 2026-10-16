import { expect, test } from '@playwright/test';

test.use({ viewport: { width: 390, height: 844 } });

test('the résumé PDF link is on top and tappable on a phone', async ({ page }) => {
	await page.goto('/resume');
	const link = page.getByRole('link', { name: 'Download PDF' });
	const box = (await link.boundingBox())!;
	const hit = await page.evaluate(({ x, y }) => document.elementFromPoint(x, y)?.closest('a')?.textContent ?? null, {
		x: box.x + box.width / 2,
		y: box.y + box.height / 2,
	});

	expect(hit).toBe('Download PDF');
});
