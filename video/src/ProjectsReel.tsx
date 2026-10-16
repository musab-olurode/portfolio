import { loadFont } from '@remotion/google-fonts/Geist';
import { AbsoluteFill, Freeze, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame } from 'remotion';

import manifest from '../public/sites/manifest.json';

const { fontFamily } = loadFont('normal', { weights: ['500'], subsets: ['latin'] });

export const PROJECTS_FPS = 30;
const CLIP = Math.round(2.5 * PROJECTS_FPS);
const FADE = 10;
const STEP = CLIP - FADE;

export const PROJECTS_DURATION = manifest.length * STEP + FADE;

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

interface Clip {
	slug: string;
	name: string;
	scrollStart: number;
}

function Footage({ clip }: { clip: Clip }): React.JSX.Element {
	return (
		<OffthreadVideo
			muted
			src={staticFile(`sites/${clip.slug}.mp4`)}
			style={{ width: '100%', height: '100%', objectFit: 'cover' }}
			// Start a beat into the scroll so every clip opens already moving.
			trimBefore={Math.round((clip.scrollStart + 0.2) * PROJECTS_FPS)}
		/>
	);
}

function Label({ name }: { name: string }): React.JSX.Element {
	return (
		<div
			style={{
				position: 'absolute',
				left: 42,
				bottom: 42,
				padding: '18px 27px',
				background: '#141414',
				color: '#f3f3f0',
				fontFamily,
				fontSize: 39,
				fontWeight: 500,
				letterSpacing: '-0.01em',
			}}>
			{name}
		</div>
	);
}

function Shot({ clip }: { clip: Clip }): React.JSX.Element {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [0, FADE], [0, 1], clamp);

	return (
		<AbsoluteFill style={{ opacity }}>
			<Footage clip={clip} />
			<Label name={clip.name} />
		</AbsoluteFill>
	);
}

/** Every live project, one after another, as a silent loop for the hero. */
export function ProjectsReel(): React.JSX.Element {
	const first = manifest[0];

	return (
		<AbsoluteFill style={{ background: '#e4e4df' }}>
			{manifest.map((clip, i) => (
				<Sequence key={clip.slug} durationInFrames={CLIP} from={i * STEP}>
					<Shot clip={clip} />
				</Sequence>
			))}
			{first && (
				// The opening frame fades back in at the end, so the loop has no seam.
				<Sequence from={PROJECTS_DURATION - FADE}>
					<Freeze frame={0}>
						<Shot clip={first} />
					</Freeze>
				</Sequence>
			)}
		</AbsoluteFill>
	);
}
