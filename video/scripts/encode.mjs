// Compresses the rendered reels for the web: a large copy for wide or retina screens and a
// small one for everything else, each as VP9 WebM and H.264 MP4, plus a poster frame.
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

import sharp from 'sharp';

const run = promisify(execFile);
const REELS = [
	{
		name: 'canoo-reel',
		large: '1440:1800',
		small: '864:1080',
		posterAt: '0',
		quality: { large: { webm: '36', mp4: '27' }, small: { webm: '38', mp4: '29' } },
	},
	{
		// Ten busy pages compress less well; trade a little detail for weight.
		name: 'projects-reel',
		large: '1920:1200',
		small: '1280:800',
		posterAt: '0.4',
		quality: { large: { webm: '43', mp4: '32' }, small: { webm: '45', mp4: '33' } },
	},
];

for (const reel of REELS) {
	const input = `video/out/${reel.name}.mp4`;

	for (const size of /** @type {const} */ (['large', 'small'])) {
		const scale = `scale=${reel[size]}:flags=lanczos`;
		const base = `public/work/${reel.name}${size === 'large' ? '@2x' : ''}`;

		await run('ffmpeg', [
			'-v',
			'error',
			'-y',
			'-i',
			input,
			'-vf',
			scale,
			'-c:v',
			'libvpx-vp9',
			'-b:v',
			'0',
			'-crf',
			reel.quality[size].webm,
			'-row-mt',
			'1',
			'-deadline',
			'good',
			'-cpu-used',
			'1',
			'-an',
			`${base}.webm`,
		]);
		await run('ffmpeg', [
			'-v',
			'error',
			'-y',
			'-i',
			input,
			'-vf',
			scale,
			'-c:v',
			'libx264',
			'-preset',
			'veryslow',
			'-tune',
			'animation',
			'-crf',
			reel.quality[size].mp4,
			'-pix_fmt',
			'yuv420p',
			'-movflags',
			'+faststart',
			'-an',
			`${base}.mp4`,
		]);
	}
	const poster = `public/work/${reel.name}-poster.webp`;

	await run('ffmpeg', ['-v', 'error', '-y', '-ss', reel.posterAt, '-i', input, '-frames:v', '1', '/tmp/poster.png']);
	await sharp('/tmp/poster.png')
		.resize({ width: Number(reel.small.split(':')[0]) * 1.5 })
		.webp({ quality: 80 })
		.toFile(poster);
	console.log(`encoded ${reel.name}`);
}
