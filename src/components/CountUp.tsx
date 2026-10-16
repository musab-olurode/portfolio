'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
	value: number;
	format?: (n: number) => string;
}

const defaultFormat = (n: number) => n.toLocaleString('en-US');

export default function CountUp({ value, format = defaultFormat }: Props): React.JSX.Element {
	const ref = useRef<HTMLSpanElement>(null);
	const [shown, setShown] = useState(value);

	useEffect(() => {
		const el = ref.current;

		if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let frame = 0;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				observer.disconnect();
				const start = performance.now();
				const duration = 1200;
				const tick = (t: number) => {
					const p = Math.min(1, (t - start) / duration);

					setShown(Math.round(value * (1 - Math.pow(1 - p, 3))));
					if (p < 1) frame = requestAnimationFrame(tick);
				};

				frame = requestAnimationFrame(tick);
			},
			{ threshold: 0.6 }
		);

		observer.observe(el);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(frame);
		};
	}, [value]);

	// The final value, invisible, fixes the box's width; the counting value sits on top of it,
	// right-aligned, so nothing after the number moves while it counts.
	return (
		<span ref={ref} className='inline-grid justify-items-end tabular-nums'>
			<span aria-hidden className='invisible col-start-1 row-start-1'>
				{format(value)}
			</span>
			<span aria-hidden className='col-start-1 row-start-1'>
				{format(shown)}
			</span>
			<span className='sr-only'>{format(value)}</span>
		</span>
	);
}
