// Captures a smooth 4:5 scroll through canoo.ca, frame by frame, for the Canoo panel reel.
import { chromium } from '@playwright/test';

import { captureScroll, preparePage } from './scroll-frames.mjs';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 4 / 3 }); // 1440×1800.

await preparePage(page, 'https://canoo.ca/');
await captureScroll(page, { out: 'video/public/canoo-web.mp4', frames: 9 * 30, distance: 1350 * 2.4, hold: 30 });
await browser.close();
console.log('wrote video/public/canoo-web.mp4');
