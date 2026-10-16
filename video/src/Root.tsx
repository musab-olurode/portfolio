import { Composition } from 'remotion';

import { CanooReel, DURATION, FPS } from './CanooReel';

export const Root = (): React.JSX.Element => (
	<Composition component={CanooReel} durationInFrames={DURATION} fps={FPS} height={1350} id='canoo-reel' width={1080} />
);
