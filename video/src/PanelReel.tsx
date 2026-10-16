import {
	AbsoluteFill,
	Freeze,
	Img,
	interpolate,
	OffthreadVideo,
	Sequence,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const FPS = 30;
export const DURATION = 14 * FPS;

// The capture starts on the first frame of the scroll.
const WEB_END = Math.round(8.5 * FPS);
const LOOP_FADE = FPS;

const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

export interface PanelReelProps extends Record<string, unknown> {
	/** Scroll recording of the website, in `public/`. */
	web: string;
	/** Two app screens, in `public/`, shown side by side after the website. */
	apps: [string, string];
	/** Background behind the app screens. */
	background: string;
	/** Height of each app screen in px; the frame is 1440×1800. */
	appHeight: number;
	appRadius: number;
}

function Web({ src }: { src: string }): React.JSX.Element {
	return <OffthreadVideo muted src={staticFile(src)} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />;
}

function Screen({ src, delay, height, radius }: { src: string; delay: number; height: number; radius: number }) {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const enter = spring({ frame: frame - delay, fps, config: { damping: 200 } });
	const drift = interpolate(frame, [0, DURATION - WEB_END], [0, -53], ease);

	return (
		<Img
			src={staticFile(src)}
			style={{
				height,
				borderRadius: radius,
				opacity: enter,
				transform: `translateY(${(1 - enter) * 160 + drift}px)`,
			}}
		/>
	);
}

/** A silent loop for a project panel: the real website scrolling, then two app screens. */
export function PanelReel({ web, apps, background, appHeight, appRadius }: PanelReelProps): React.JSX.Element {
	const frame = useCurrentFrame();
	const appIn = interpolate(frame, [WEB_END - 15, WEB_END + 15], [0, 1], ease);
	const loopIn = interpolate(frame, [DURATION - LOOP_FADE, DURATION], [0, 1], ease);

	return (
		<AbsoluteFill style={{ background }}>
			<Sequence durationInFrames={WEB_END + 15}>
				<Web src={web} />
			</Sequence>
			<Sequence from={WEB_END - 15}>
				<AbsoluteFill
					style={{
						opacity: appIn,
						background,
						alignItems: 'center',
						justifyContent: 'center',
						flexDirection: 'row',
						gap: 54,
					}}>
					<Screen delay={6} height={appHeight} radius={appRadius} src={apps[0]} />
					<Screen delay={16} height={appHeight} radius={appRadius} src={apps[1]} />
				</AbsoluteFill>
			</Sequence>
			{/* Fade back to the opening frame so the loop has no seam. */}
			<Sequence from={DURATION - LOOP_FADE}>
				<AbsoluteFill style={{ opacity: loopIn }}>
					<Freeze frame={0}>
						<Web src={web} />
					</Freeze>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
}
