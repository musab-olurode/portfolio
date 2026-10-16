import type { MetadataRoute } from 'next';

import { profile } from '@/content/profile';

export const dynamic = 'force-static';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: `${profile.name} — Full-stack engineer`,
		short_name: profile.name,
		description: 'Full-stack engineer with 7+ years building web apps, mobile apps and the backends behind them.',
		start_url: '/',
		display: 'browser',
		background_color: '#f3f3f0',
		theme_color: '#f3f3f0',
		icons: [
			{ src: '/icon.png', sizes: '512x512', type: 'image/png' },
			{ src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
		],
	};
}
