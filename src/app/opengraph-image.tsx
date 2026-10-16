import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { profile } from '@/content/profile';

export const dynamic = 'force-static';
export const alt = "Mus'ab Olurode, full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
	const serif = await readFile(join(process.cwd(), 'src/assets/InstrumentSerif-Regular.ttf'));
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '64px 72px',
					background: '#f3f3f0',
					color: '#141414',
					fontFamily: 'Instrument Serif',
				}}>
				<div style={{ fontSize: 30 }}>musab.dev</div>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div style={{ fontSize: 150, lineHeight: 0.9, letterSpacing: '-0.03em' }}>{profile.name}</div>
					<div style={{ fontSize: 46, marginTop: 28, maxWidth: 940, lineHeight: 1.1 }}>{profile.promise}</div>
				</div>
			</div>
		),
		{ ...size, fonts: [{ name: 'Instrument Serif', data: serif, style: 'normal', weight: 400 }] }
	);
}
