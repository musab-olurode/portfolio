import { alsoBuilt } from '@/content/profile';

export default function AlsoBuilt() {
	return (
		<section aria-labelledby='also-heading' className='px-4 py-28 sm:px-8 lg:py-40 lg:pl-[22vw]'>
			<h2 id='also-heading' className='mb-8 text-2xl font-medium'>
				Also built
			</h2>
			<ul className='group/list max-w-3xl text-lg'>
				{alsoBuilt.map((item) => {
					const row = (
						<>
							<span>{item.name}</span>
							<span className='text-soft text-base sm:text-lg'>{item.kind}</span>
							<span className='tabular-nums sm:text-right'>{item.year}</span>
						</>
					);
					const cls =
						'grid grid-cols-[1fr_auto] gap-x-6 py-3 sm:grid-cols-[16rem_1fr_4rem] sm:items-baseline transition-colors duration-200 group-has-[:hover]/list:text-soft hover:!text-ink [&>span:nth-child(2)]:col-span-2 [&>span:nth-child(2)]:row-start-2 sm:[&>span:nth-child(2)]:col-span-1 sm:[&>span:nth-child(2)]:row-start-auto';
					return (
						<li key={item.name}>
							{item.url ? (
								<a href={item.url} target='_blank' rel='noreferrer' className={cls}>
									{row}
								</a>
							) : (
								<div className={cls}>{row}</div>
							)}
						</li>
					);
				})}
			</ul>
		</section>
	);
}
