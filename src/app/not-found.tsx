import Link from 'next/link';

export default function NotFound() {
	return (
		<main className='flex min-h-svh flex-col justify-between px-4 py-7 sm:px-8'>
			<Link href='/' className='link-underline self-start'>
				Mus&apos;ab Olurode
			</Link>
			<div>
				<h1 className='text-display'>Page not found</h1>
				<p className='mt-6 text-lg'>
					That address doesn&apos;t exist.{' '}
					<Link href='/' className='underline underline-offset-4'>
						Back to the home page
					</Link>
					.
				</p>
			</div>
		</main>
	);
}
