'use client';

import { useState } from 'react';

import { alsoBuilt } from '@/content/profile';

import WorkImage from '@/components/WorkImage';

const withImages = alsoBuilt.filter((item) => item.image);

export default function AlsoBuilt(): React.JSX.Element {
	const [active, setActive] = useState(withImages[0]?.name);

	return (
		<section aria-labelledby='also-heading' className='px-4 py-28 sm:px-8 lg:grid lg:grid-cols-12 lg:gap-6 lg:py-40'>
			<div className='lg:col-span-6 lg:col-start-2'>
				<h2 className='reveal mb-8 text-lead' id='also-heading'>
					Also built
				</h2>
				<ul className='reveal group/list text-lg' style={{ '--d': '80ms' } as React.CSSProperties}>
					{alsoBuilt.map((item) => {
						const row = (
							<>
								{item.image && (
									<WorkImage
										alt=''
										className='col-span-2 mb-3 aspect-16/10 h-auto w-full bg-step-2 object-cover object-top sm:col-span-3 lg:hidden'
										height={750}
										sizes='100vw'
										src={item.image}
										width={1200}
									/>
								)}
								<span>{item.name}</span>
								<span className='col-span-2 row-start-auto text-base text-soft sm:col-span-1 sm:text-lg'>
									{item.kind}
								</span>
								<span className='row-start-auto tabular-nums sm:text-right'>{item.year}</span>
							</>
						);
						const cls =
							'grid grid-cols-[1fr_auto] gap-x-6 py-3 transition-colors duration-200 group-has-[:hover]/list:text-soft hover:text-ink! sm:grid-cols-[14rem_1fr_4rem] sm:items-baseline';

						return (
							<li key={item.name}>
								{item.url ? (
									<a
										className={cls}
										href={item.url}
										rel='noreferrer'
										target='_blank'
										onFocus={() => {
											if (item.image) setActive(item.name);
										}}
										onMouseEnter={() => {
											if (item.image) setActive(item.name);
										}}>
										{row}
									</a>
								) : (
									<div className={cls}>{row}</div>
								)}
							</li>
						);
					})}
				</ul>
			</div>

			{/* Desktop: one preview beside the list follows the row you point at. */}
			<div
				aria-hidden
				className='reveal relative hidden aspect-16/10 self-center overflow-hidden bg-step-2 lg:col-span-5 lg:col-start-8 lg:block'
				data-testid='also-preview'
				style={{ '--d': '160ms' } as React.CSSProperties}>
				{withImages.map((item) => (
					<WorkImage
						key={item.name}
						alt=''
						className='absolute inset-0 size-full object-cover object-top opacity-0 transition-opacity duration-500 data-active:opacity-100'
						data-active={active === item.name ? '' : undefined}
						height={750}
						sizes='42vw'
						src={item.image ?? ''}
						width={1200}
					/>
				))}
			</div>
		</section>
	);
}
