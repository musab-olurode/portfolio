import { expect, test } from '@playwright/test';

test.describe('hero', () => {
	test('shows who, what and how to hire', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByRole('heading', { level: 1 })).toHaveText("Mus'ab Olurode");
		await expect(page.getByRole('link', { name: 'Hire me' })).toHaveAttribute('href', 'mailto:me@musab.dev');
		await expect(page.getByText('Senior Full Stack Engineer, Institute for Canadian Citizenship')).toBeVisible();
	});

	test('logs no errors or hydration warnings', async ({ page }) => {
		const messages: string[] = [];
		page.on('console', (m) => (m.type() === 'error' || /hydrat/i.test(m.text())) && messages.push(m.text()));
		await page.goto('/');
		await page.waitForTimeout(500);
		expect(messages).toEqual([]);
	});
});

test.describe('overlap line in Tokyo', () => {
	test.use({ timezoneId: 'Asia/Tokyo' });
	test('says the days do not overlap', async ({ page }) => {
		await page.goto('/');
		await expect(page.getByText("Our workdays don't overlap")).toBeVisible();
		await expect(page.locator('body')).not.toContainText('NaN');
	});
});

test.describe('overlap line in London', () => {
	test.use({ timezoneId: 'Europe/London' });
	test('counts eight hours', async ({ page }) => {
		await page.clock.setFixedTime(new Date('2026-10-16T13:20:00Z'));
		await page.goto('/');
		await expect(page.getByText('8 hours of overlap')).toBeVisible();
	});
});
