import { expect, test } from '@playwright/test';

import { projects } from '../../src/content/profile';

test('lists the six projects in order with their links', async ({ page }) => {
	await page.goto('/');
	const names = await page.locator('#work h3:visible').allTextContents();

	expect(names).toEqual(projects.map((p) => p.name));
	for (const p of projects) {
		await expect(page.locator(`#work a[href="${p.url}"]`).first()).toBeAttached();
	}
	await expect(page.locator('#work a[href="https://pansaa.newborntoolkit.org/"]').first()).toBeAttached();
});

test('links the also-built entries, CV and résumé', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('link', { name: /Naseeb by Qadr/ })).toHaveAttribute(
		'href',
		'https://naseeb-by-qadr.pages.dev/'
	);
	await expect(page.locator('#cv')).toContainText('Senior Frontend Developer');
	await expect(page.locator('a[href="/musab-olurode-resume.pdf"]').first()).toBeAttached();
});

test('every mailto uses the custom domain and gmail never appears', async ({ page }) => {
	await page.goto('/');
	const mailtos = await page.locator('a[href^="mailto:"]').evaluateAll((as) => as.map((a) => a.getAttribute('href')));

	expect(mailtos.length).toBeGreaterThan(1);
	expect(new Set(mailtos)).toEqual(new Set(['mailto:me@musab.dev']));
	expect(await page.content()).not.toContain('gmail');
});

test.describe('on a phone', () => {
	test.use({ viewport: { width: 390, height: 844 } });
	test('has no horizontal scroll and releases the pin', async ({ page }) => {
		await page.goto('/');
		expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
		const sticky = await page
			.locator('#work *')
			.evaluateAll(
				(els) => els.filter((e) => getComputedStyle(e).position === 'sticky' && e.getClientRects().length > 0).length
			);

		expect(sticky).toBe(0);
	});
});
