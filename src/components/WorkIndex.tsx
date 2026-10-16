'use client';

import { useEffect, useState } from 'react';

interface Item {
	slug: string;
	name: string;
}

/** The pinned list beside the work run; the project in view is set in full ink. */
export default function WorkIndex({ items }: { items: Item[] }): React.JSX.Element {
	const [active, setActive] = useState<string | null>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id.replace('work-', ''));
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);

		for (const item of items) {
			const el = document.getElementById(`work-${item.slug}`);

			if (el) observer.observe(el);
		}

		return () => {
			observer.disconnect();
		};
	}, [items]);

	return (
		<ol className='mt-12 hidden text-lead lg:block'>
			{items.map((item) => (
				<li key={item.slug}>
					<a
						aria-current={active === item.slug ? 'true' : undefined}
						className={`inline-block py-1 transition-[color,translate] duration-300 ${
							active && active !== item.slug ? 'text-soft' : 'text-ink'
						} ${active === item.slug ? 'translate-x-3' : ''}`}
						href={`#work-${item.slug}`}>
						{item.name}
					</a>
				</li>
			))}
		</ol>
	);
}
