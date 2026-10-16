const FRAME_RATIO = 5 / 4; // Height over width of the 4:5 work frame.
const SECONDS_PER_SCREEN = 7;

export interface ImageSize {
	width: number;
	height: number;
}
export interface Pan {
	end: string;
	duration: string;
}

/** How far a full-page capture must scroll inside the 4:5 frame, and how long that takes. */
export function panFor({ width, height }: ImageSize): Pan | null {
	const frameHeight = width * FRAME_RATIO;
	const travel = height - frameHeight;

	if (travel <= 0) return null;
	const screens = travel / frameHeight;

	return {
		end: `-${(Math.round((travel / height) * 10_000) / 100).toString()}%`,
		duration: `${(Math.round(screens * SECONDS_PER_SCREEN * 10) / 10).toString()}s`,
	};
}
