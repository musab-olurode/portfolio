import { MenuIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { UnderlineSmallIcon } from './icons/underline-small';

interface NavProps {
	currentTheme: 'light' | 'dark';
	currentSection: 'main' | 'about' | 'experience' | 'contact';
	onPressNav: (section: 'main' | 'about' | 'experience' | 'contact') => void;
}

const Nav: React.FC<NavProps> = ({
	currentTheme,
	currentSection,
	onPressNav,
}) => {
	return (
		<div
			className={clsx(
				'fixed [width:calc(100%-7px)] z-50',
				currentTheme === 'light' ? 'bg-white' : 'bg-main'
			)}>
			<div className='navbar container mx-auto lg:-mt-5'>
				<div className='flex-1'>
					<a
						className='btn btn-ghost normal-case text-xl md:text-3xl hover:bg-transparent focus:bg-transparent'
						onClick={() => onPressNav('main')}>
						{"Mus'ab"}
					</a>
				</div>
				<div className='flex-none'>
					<div className='dropdown dropdown-end'>
						<label
							tabIndex={0}
							className='btn btn-square btn-ghost lg:hidden hover:bg-transparent focus:bg-transparent'>
							<MenuIcon className='w-10 h-10' />
						</label>
						<ul
							tabIndex={0}
							className='dropdown-content menu p-2 shadow bg-base-100 border-[0.2px] border-white rounded-box w-52'>
							<li>
								<a
									className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'
									onClick={() => onPressNav('about')}>
									About Me
									{currentSection === 'about' && (
										<UnderlineSmallIcon
											className={clsx(
												currentTheme === 'light' ? 'text-main' : 'text-white'
											)}
										/>
									)}
								</a>
							</li>
							<li>
								<a
									className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'
									onClick={() => onPressNav('experience')}>
									Experience
									{currentSection === 'experience' && (
										<UnderlineSmallIcon
											className={clsx(
												currentTheme === 'light' ? 'text-main' : 'text-white'
											)}
										/>
									)}
								</a>
							</li>
							<li>
								<Link href='/resume'>
									<a className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'>
										Résumé
									</a>
								</Link>
							</li>
							<li>
								<a
									className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'
									onClick={() => onPressNav('contact')}>
									Contact
									{currentSection === 'contact' && (
										<UnderlineSmallIcon
											className={clsx(
												currentTheme === 'light' ? 'text-main' : 'text-white'
											)}
										/>
									)}
								</a>
							</li>
						</ul>
					</div>

					<ul className='menu menu-horizontal p-0 text-2xl hidden lg:flex'>
						<li>
							<a
								className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'
								onClick={() => onPressNav('about')}>
								About Me
								{currentSection === 'about' && (
									<UnderlineSmallIcon
										className={clsx(
											currentTheme === 'light' ? 'text-main' : 'text-white'
										)}
									/>
								)}
							</a>
						</li>
						<li>
							<a
								className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'
								onClick={() => onPressNav('experience')}>
								Experience
								{currentSection === 'experience' && (
									<UnderlineSmallIcon
										className={clsx(
											currentTheme === 'light' ? 'text-main' : 'text-white'
										)}
									/>
								)}
							</a>
						</li>
						<li>
							<Link href='/resume'>
								<a className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'>
									Résumé
								</a>
							</Link>
						</li>
						<li>
							<a
								className='hover:bg-transparent focus:bg-transparent flex flex-col items-center mt-5'
								onClick={() => onPressNav('contact')}>
								Contact
								{currentSection === 'contact' && (
									<UnderlineSmallIcon
										className={clsx(
											currentTheme === 'light' ? 'text-main' : 'text-white'
										)}
									/>
								)}
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Nav;
