// @vitest-environment jsdom
import { afterEach, describe, expect, test, vi } from 'vitest';
import { resolveTheme, switchTheme, THEME_KEY } from '@/lib/theme';

afterEach(() => {
	vi.restoreAllMocks();
	localStorage.clear();
	delete document.documentElement.dataset.theme;
});

describe('resolveTheme', () => {
	test('a stored choice wins', () => {
		expect(resolveTheme('dark', false)).toBe('dark');
		expect(resolveTheme('light', true)).toBe('light');
	});

	test('falls back to the system preference', () => {
		expect(resolveTheme(null, true)).toBe('dark');
		expect(resolveTheme(null, false)).toBe('light');
		expect(resolveTheme('purple', true)).toBe('dark');
	});
});

describe('switchTheme', () => {
	test('applies and stores the theme without view transitions', async () => {
		await switchTheme('dark', { x: 0, y: 0 });
		expect(document.documentElement.dataset.theme).toBe('dark');
		expect(localStorage.getItem(THEME_KEY)).toBe('dark');
	});

	test('still applies the theme when storage throws', async () => {
		vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
			throw new Error('blocked');
		});
		await switchTheme('dark', { x: 0, y: 0 });
		expect(document.documentElement.dataset.theme).toBe('dark');
	});
});
