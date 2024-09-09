import { NextApiHandler } from 'next';
import puppeteer from 'puppeteer';

const Handler: NextApiHandler = async (req, res) => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(`http://${req.headers.host}/resume`, {
		waitUntil: ['networkidle2'],
	});
	await page.emulateMediaType('print');

	// Create PDF Buffer
	const buffer = await page.pdf({ format: 'a4' });

	// Return pdf buffer to caller.
	res.end(buffer);

	// Close browser **after** we returned the PDF to the caller.
	await browser.close();
};

export default Handler;
