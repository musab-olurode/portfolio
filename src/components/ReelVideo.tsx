'use client';

import { useEffect, useRef } from 'react';

interface Props {
	webm: string;
	mp4: string;
	poster: string;
	label: string;
	className?: string;
}

/** A silent loop that plays only while on screen, and never under reduced motion. */
export default function ReelVideo({ webm, mp4, poster, label, className }: Props): React.JSX.Element {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;

		if (!video || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
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
		};
	}, []);

	return (
		<video ref={ref} loop muted playsInline aria-label={label} className={className} poster={poster} preload='none'>
			<source src={webm} type='video/webm' />
			<source src={mp4} type='video/mp4' />
		</video>
	);
}
