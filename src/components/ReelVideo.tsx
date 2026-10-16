'use client';

import { useEffect, useRef } from 'react';

interface Props {
	webm: string;
	mp4: string;
	poster: string;
	label: string;
	className?: string;
	/** Keep the space empty until the video actually plays, then fade it in. */
	hideUntilPlaying?: boolean;
}

/** A silent loop that plays only while on screen, and never under reduced motion. */
export default function ReelVideo({
	webm,
	mp4,
	poster,
	label,
	className,
	hideUntilPlaying = false,
}: Props): React.JSX.Element {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;

		if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
		const reveal = (): void => {
			delete video.dataset['pending'];
		};

		if (hideUntilPlaying) {
			video.dataset['pending'] = '';
			video.addEventListener('playing', reveal, { once: true });
		}
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry?.isIntersecting) {
					video.play().catch(() => undefined);
				} else {
					video.pause();
				}
			},
			{ threshold: 0.25 }
		);

		observer.observe(video);

		return () => {
			observer.disconnect();
			video.removeEventListener('playing', reveal);
		};
	}, [hideUntilPlaying]);

	return (
		<video
			ref={ref}
			loop
			muted
			playsInline
			aria-label={label}
			className={`transition-opacity duration-700 data-pending:opacity-0 ${className ?? ''}`}
			poster={poster}
			preload='none'>
			<source src={webm} type='video/webm' />
			<source src={mp4} type='video/mp4' />
		</video>
	);
}
