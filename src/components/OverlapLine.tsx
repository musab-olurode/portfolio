'use client';

import { useEffect, useState } from 'react';
import { getOverlap, overlapSentence, type Overlap } from '@/lib/overlap';

export default function OverlapLine() {
	const [overlap, setOverlap] = useState<Overlap | null>(null);

	useEffect(() => {
		const update = () => setOverlap(getOverlap(new Date(), Intl.DateTimeFormat().resolvedOptions().timeZone));
		update();
		const id = setInterval(update, 60_000);
		return () => clearInterval(id);
	}, []);

	return (
		<p className='text-lg' aria-live='off'>
			<span className='bg-step-2 inline-block px-4 py-3'>
				It&apos;s <time className='tabular-nums'>{overlap?.myTime ?? '—:—'}</time> in my working day (GMT+1).
			</span>{' '}
			<span className='mt-3 inline-block sm:mt-0 sm:ml-3'>{overlap ? overlapSentence(overlap) : null}</span>
		</p>
	);
}
