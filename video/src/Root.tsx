import { Composition } from 'remotion';

import { CanooReel, DURATION, FPS } from './CanooReel';
import { PROJECTS_DURATION, PROJECTS_FPS, ProjectsReel } from './ProjectsReel';

export const Root = (): React.JSX.Element => (
	<>
		<Composition
			component={CanooReel}
			durationInFrames={DURATION}
			fps={FPS}
			height={1800}
			id='canoo-reel'
			width={1440}
		/>
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
