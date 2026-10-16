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

// The recording spends its first ~6 s loading; the scroll starts just after.
const WEB_START = Math.round(5.6 * FPS);
const WEB_END = Math.round(8.5 * FPS);
const LOOP_FADE = FPS;
const CANOO_BLACK = '#000000';

const ease = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

function Web(): React.JSX.Element {
	return (
		<OffthreadVideo
			muted
			src={staticFile('canoo-web.webm')}
			style={{ width: '100%', height: '100%', objectFit: 'cover' }}
			trimBefore={WEB_START}
		/>
	);
}

function Phone({ src, delay }: { src: string; delay: number }): React.JSX.Element {
	const frame = useCurrentFrame();
	const { fps } = useVideoConfig();
	const enter = spring({ frame: frame - delay, fps, config: { damping: 200 } });
	const drift = interpolate(frame, [0, DURATION - WEB_END], [0, -40], ease);

	return (
		<Img
			src={staticFile(src)}
			style={{
				height: 1040,
				borderRadius: 36,
				opacity: enter,
				transform: `translateY(${(1 - enter) * 120 + drift}px)`,
			}}
		/>
	);
}

function App(): React.JSX.Element {
	return (
		<AbsoluteFill
			style={{
				background: CANOO_BLACK,
				alignItems: 'center',
				justifyContent: 'center',
				flexDirection: 'row',
				gap: 40,
			}}>
			<Phone delay={6} src='canoo-app-1.webp' />
			<Phone delay={16} src='canoo-app-2.webp' />
		</AbsoluteFill>
	);
}

/** A silent loop for the Canoo panel: the real website scrolling, then the app. */
export function CanooReel(): React.JSX.Element {
	const frame = useCurrentFrame();
	const appIn = interpolate(frame, [WEB_END - 15, WEB_END + 15], [0, 1], ease);
	const loopIn = interpolate(frame, [DURATION - LOOP_FADE, DURATION], [0, 1], ease);

	return (
		<AbsoluteFill style={{ background: CANOO_BLACK }}>
			<Sequence durationInFrames={WEB_END + 15}>
				<Web />
			</Sequence>
			<Sequence from={WEB_END - 15}>
				<AbsoluteFill style={{ opacity: appIn }}>
					<App />
				</AbsoluteFill>
			</Sequence>
			{/* Fade back to the opening frame so the loop has no seam. */}
			<Sequence from={DURATION - LOOP_FADE}>
				<AbsoluteFill style={{ opacity: loopIn }}>
					<Freeze frame={0}>
						<Web />
					</Freeze>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
}
