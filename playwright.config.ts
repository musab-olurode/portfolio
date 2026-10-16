import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
	testDir: 'tests/e2e',
	fullyParallel: true,
	reporter: 'list',
	use: { baseURL: 'http://localhost:4173' },
	projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
	webServer: {
		// No analytics beacon in test builds: local visits must not count, and it can't report from localhost.
		command: 'NEXT_PUBLIC_CF_BEACON_TOKEN= npm run build && npm run serve',
		url: 'http://localhost:4173',
		reuseExistingServer: !process.env['CI'],
		timeout: 180_000,
	},
});
