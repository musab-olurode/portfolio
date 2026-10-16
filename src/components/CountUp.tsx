'use client';

import { useEffect, useRef, useState } from 'react';

type Props = { value: number; format?: (n: number) => string };

const defaultFormat = (n: number) => n.toLocaleString('en-US');

export default function CountUp({ value, format = defaultFormat }: Props) {
	const ref = useRef<HTMLSpanElement>(null);
	const [shown, setShown] = useState(value);

	useEffect(() => {
		const el = ref.current;
		if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		let frame = 0;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) return;
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

	return (
		<span ref={ref} className='tabular-nums'>
			{format(shown)}
		</span>
	);
}
