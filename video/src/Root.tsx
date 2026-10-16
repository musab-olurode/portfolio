import { Composition } from 'remotion';

import { DURATION, FPS, PanelReel, type PanelReelProps } from './PanelReel';
import { PROJECTS_DURATION, PROJECTS_FPS, ProjectsReel } from './ProjectsReel';

const PANELS: { id: string; props: PanelReelProps }[] = [
	{
		id: 'canoo-reel',
		props: {
			web: 'canoo-web.mp4',
			apps: ['canoo-app-1.webp', 'canoo-app-2.webp'],
			background: '#000000',
			appHeight: 1387,
			appRadius: 48,
		},
	},
	{
		// Google Play listing art (screens 2 and 4): the app as it is today.
		id: 'scrapays-reel',
		props: {
			web: 'scrapays-web.mp4',
			apps: ['scrapays-app-1.webp', 'scrapays-app-2.webp'],
			background: '#effef9',
			appHeight: 1150,
			appRadius: 32,
		},
	},
];

export const Root = (): React.JSX.Element => (
	<>
		{PANELS.map(({ id, props }) => (
			<Composition
				key={id}
				component={PanelReel}
				defaultProps={props}
				durationInFrames={DURATION}
				fps={FPS}
				height={1800}
				id={id}
				width={1440}
			/>
		))}
		<Composition
			component={ProjectsReel}
			durationInFrames={PROJECTS_DURATION}
			fps={PROJECTS_FPS}
			height={1200}
			id='projects-reel'
			width={1920}
		/>
	</>
);
