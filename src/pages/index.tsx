import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Nav from '../components/Nav';
import { UnderlineLargeIcon } from '../components/icons/underline-large';
import ArrowDown from '../components/icons/arrow-down';
import SunIcon from '../components/icons/sun';
import MailIcon from '../components/icons/mail';
import TwitterIcon from '../components/icons/twitter';
import LinkedInIcon from '../components/icons/linked-in';
import GithubIcon from '../components/icons/github';
import MoonIcon from '../components/icons/moon';
import { InView } from 'react-intersection-observer';
import Head from 'next/head';
import useCurrentTheme from '../hooks/useCurrentTheme';
import { cn } from '../helpers';

const Home: NextPage = () => {
	const [currentTheme, toggleTheme] = useCurrentTheme();
	const [currentSection, setCurrentSection] = useState<
		'main' | 'about' | 'experience' | 'contact'
	>('main');
	const [currentTab, setCurrentTab] = useState<
		'studio14' | 'montech' | 'scrapays' | 'binary'
	>('studio14');

	const mainRef = useRef<HTMLDivElement>(null);
	const aboutRef = useRef<HTMLDivElement>(null);
	const experienceRef = useRef<HTMLDivElement>(null);
	const contactRef = useRef<HTMLDivElement>(null);

	const goToAbout = () => {
		aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	const handleOnVisibilityChanged = (
		inView: boolean,
		section: 'main' | 'about' | 'experience' | 'contact'
	) => {
		inView && setCurrentSection(section);
	};

	const handlePressNav = (
		section: 'main' | 'about' | 'experience' | 'contact'
	) => {
		switch (section) {
			case 'main':
				mainRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'about':
				aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'experience':
				experienceRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			case 'contact':
				contactRef.current?.scrollIntoView({ behavior: 'smooth' });
				break;
			default:
				break;
		}
	};

	const handleOnChangeTab = (
		tab: 'montech' | 'scrapays' | 'binary' | 'studio14'
	) => {
		setCurrentTab(tab);
	};

	useEffect(() => {
		document.documentElement.style.setProperty(
			'--scrollbar-background',
			`${currentTheme === 'light' ? 'white' : '#080b16'}`
		);
		document.documentElement.style.setProperty(
			'--scrollbar-thumb-background',
			`${currentTheme === 'dark' ? 'white' : '#080b16'}`
		);
	}, [currentTheme]);

	return (
		<>
			<Head>
				<title>Mus&apos;ab Olurode - Full Stack Developer</title>
				<meta
					name='description'
					content='Experienced full-stack developer with over 6 years of professional experience'
				/>
			</Head>
			<Nav
				currentSection={currentSection}
				currentTheme={currentTheme}
				onPressNav={handlePressNav}
			/>
			<div
				className={clsx(
					'relative snap-y snap-mandatory min-h-screen overflow-y-scroll',
					currentTheme === 'dark' ? 'bg-main' : 'bg-white'
				)}>
				<section
					ref={mainRef}
					className='h-screen container mx-auto flex items-center justify-center snap-center px-2 md:px-0'>
					<div className='text-3xl lg:text-7xl text-center'>
						<div className='overflow-hidden'>
							<p className='mb-8 animate-slide-in'>
								Hi!, I’m <br /> Mus&apos;ab Olurode, a
							</p>
						</div>
						<InView
							className='overflow-hidden'
							onChange={(inView) => handleOnVisibilityChanged(inView, 'main')}>
							<p className='font-bold mb-8 animate-slide-in'>
								Full Stack Developer
							</p>
						</InView>
						<div className='flex flex-col justify-center items-center'>
							<UnderlineLargeIcon
								className={clsx(
									'w-2/3 mx-auto lg:w-auto lg:mx-0 animate-slide-in-x delay-1000',
									currentTheme === 'dark' ? 'text-white' : 'text-main'
								)}
							/>
							<div
								className={clsx(
									'cursor-pointer rounded-full border-2 py-10 px-12 mt-16 animate-bounce delay-1000',
									currentTheme === 'dark' ? 'border-white' : 'border-main'
								)}
								onClick={goToAbout}>
								<ArrowDown
									className={clsx(
										'w-4 h-8 lg:w-auto lg:h-auto animate-slide-in delay-1000',
										currentTheme === 'dark' ? 'text-white' : 'text-main'
									)}
								/>
							</div>
						</div>
					</div>
				</section>

				<section
					className='h-screen container mx-auto flex flex-col justify-center snap-center px-2 md:px-0'
					ref={aboutRef}>
					<InView
						onChange={(inView) => handleOnVisibilityChanged(inView, 'about')}>
						<p className='text-2xl lg:text-6xl font-bold text-center'>
							About Me
						</p>
					</InView>
					<div
						className={clsx(
							'flex justify-between px-4 border-t-2 border-b-2 py-5 md:py-10 text-md md:text-2xl mt-12',
							currentTheme === 'dark'
								? 'border-t-white border-b-white'
								: 'border-t-main border-b-main'
						)}>
						<span>Developer</span>
						<span>Freerunner</span>
						<span>Bibliophile</span>
						<span>Gamer</span>
					</div>
					<p className='text-md md:text-2xl mt-12 lg:text-left'>
						I am Mus&apos;ab Olurode, a dedicated full-stack developer with an
						extensive background in software development, encompassing over 6
						years of hands-on experience in the field. Throughout my career,
						I&apos;ve honed my skills across both server and client-side
						development, contributing to a diverse array of projects. These
						experiences have not only broadened my technical expertise but have
						also nurtured my adaptability, allowing me to swiftly grasp new
						concepts and technologies as required.
					</p>
				</section>

				<section
					ref={experienceRef}
					className='h-screen container mx-auto flex flex-col justify-center snap-center px-2 md:px-0'>
					<InView
						onChange={(inView) =>
							handleOnVisibilityChanged(inView, 'experience')
						}>
						<p className='text-md md:text-2xl font-bold mb-4 md:mb-14'>
							Work Experience
						</p>
					</InView>
					<div className='flex flex-col lg:flex-row min-h-[428px] lg:min-h-[504px]'>
						<div className='tabs mb-4 lg:mb-0 flex-col lg:items-start lg:h-full lg:shrink-0'>
							<a
								className={cn(
									'tab lg:border-l-2 lg:border-b-0 tab-bordered text-lg lg:text-4xl py-2 lg:py-5 h-auto flex-grow w-full',
									currentTab === 'studio14' ? ' tab-active' : ''
								)}
								onClick={() => handleOnChangeTab('studio14')}>
								Studio 14
							</a>
							<a
								className={cn(
									'tab lg:border-l-2 lg:border-b-0 tab-bordered text-lg lg:text-4xl py-2 lg:py-5 h-auto flex-grow w-full',
									currentTab === 'scrapays' ? ' tab-active' : ''
								)}
								onClick={() => handleOnChangeTab('scrapays')}>
								Scrapays Technologies
							</a>
							<a
								className={cn(
									'tab lg:border-l-2 lg:border-b-0 tab-bordered text-lg lg:text-4xl py-2 lg:py-5 h-auto flex-grow w-full',
									currentTab === 'montech' ? ' tab-active' : ''
								)}
								onClick={() => handleOnChangeTab('montech')}>
								Montech Studios
							</a>
							<a
								className={cn(
									'tab lg:border-l-2 lg:border-b-0 tab-bordered text-lg lg:text-4xl py-2 lg:py-5 h-auto flex-grow w-full',
									currentTab === 'binary' ? ' tab-active' : ''
								)}
								onClick={() => handleOnChangeTab('binary')}>
								The Binary Agency
							</a>
						</div>
						<div className='relative flex-grow overflow-hidden'>
							<div
								className={cn(
									'flex-grow lg:pl-20 absolute top-0 left-0 opacity-0 -translate-x-40 transition-[opacity_transform]',
									'duration-300 lg:translate-x-40',
									currentTab === 'studio14' &&
										'opacity-100 translate-x-0 lg:translate-x-0'
								)}>
								<p className='text-lg lg:text-4xl font-bold'>
									Frontend Developer @ Studio 14
								</p>
								<p className='text-md md:text-2xl md:mt-5 mb-7'>
									November 2022 - Present
								</p>
								<ul className='text-md md:text-2xl list-disc list-outside pl-4 flex flex-col md:gap-y-10'>
									<li>Building sophisticated frontend applications.</li>
									<li>
										Building vanilla HTML templates for WordPress applications.
									</li>
								</ul>
							</div>
							<div
								className={cn(
									'flex-grow lg:pl-20 absolute top-0 left-0 opacity-0 -translate-x-40 transition-[opacity_transform]',
									'duration-300 lg:translate-x-40',
									currentTab === 'montech' &&
										'opacity-100 translate-x-0 lg:translate-x-0'
								)}>
								<p className='text-lg lg:text-4xl font-bold'>
									Backend Developer @ Montech Studios
								</p>
								<p className='text-md md:text-2xl md:mt-5 mb-7'>
									February 2022 - July 2022
								</p>
								<ul className='text-md md:text-2xl list-disc list-outside pl-4 flex flex-col md:gap-y-10'>
									<li>
										Built proof of concepts for existing project specifications.
									</li>
									<li>Managed and updated full-fledged web3 applications.</li>
								</ul>
							</div>
							<div
								className={cn(
									'flex-grow lg:pl-20 absolute top-0 left-0 opacity-0 -translate-x-40 transition-[opacity_transform]',
									'duration-300 lg:translate-x-40',
									currentTab === 'scrapays' &&
										'opacity-100 translate-x-0 lg:translate-x-0'
								)}>
								<p className='text-lg lg:text-4xl font-bold'>
									Full-stack Developer @ Scrapays Technologies
								</p>
								<p className='text-md md:text-2xl md:mt-5 mb-7'>
									January 2020 - December 2022
								</p>
								<ul className='text-md md:text-2xl list-disc list-outside pl-4 flex flex-col md:gap-y-10'>
									<li>
										Led the development of the company&apos;s flagship product
										as a principal engineer.
									</li>
									<li>
										Developed mobile apps, landing pages, dashboards and IOT
										applications for the company&apos;s product.
									</li>
								</ul>
							</div>
							<div
								className={cn(
									'flex-grow lg:pl-20 absolute top-0 left-0 opacity-0 -translate-x-40 transition-[opacity_transform]',
									'duration-300 lg:translate-x-40',
									currentTab === 'binary' &&
										'opacity-100 translate-x-0 lg:translate-x-0'
								)}>
								<p className='text-lg lg:text-4xl font-bold'>
									Software Engineer @ The Binary Agency
								</p>
								<p className='text-md md:text-2xl md:mt-5 mb-7'>
									February 2019 - January 2020
								</p>
								<ul className='text-md md:text-2xl list-disc list-outside pl-4 flex flex-col md:gap-y-10'>
									<li>
										Built and maintained web applications for multiple clients.
									</li>
									<li>
										Reviewed project specifications and developed solutions to
										meet the requirements.
									</li>
								</ul>
							</div>
						</div>
					</div>
				</section>

				<section
					ref={contactRef}
					className='h-screen container mx-auto flex flex-col justify-center items-center snap-center px-2 md:px-0'>
					<InView
						onChange={(inView) => handleOnVisibilityChanged(inView, 'contact')}>
						<p className='text-3xl lg:text-7xl'>Contact Me</p>
					</InView>
					<div className='flex justify-between mt-16 gap-x-5 lg:gap-x-16'>
						<a
							href='mailto:olurodemusab@gmail.com'
							title='Email'
							className={clsx(
								'btn btn-circle bg-transparent border-2 w-[50px] h-[50px] lg:w-[82px] lg:h-[82px] p-2 group',
								currentTheme === 'dark' ? 'border-white' : 'border-main'
							)}>
							<MailIcon
								className={clsx(
									'w-5 h-5 lg:w-auto lg:h-auto transition-colors group-hover:text-white',
									currentTheme === 'dark' ? 'text-white' : 'text-main'
								)}
							/>
						</a>
						<a
							href='https://twitter.com/_RedDxt'
							target='_blank'
							rel='noreferrer'
							title='Twitter'
							className={clsx(
								'btn btn-circle bg-transparent border-2 w-[50px] h-[50px] lg:w-[82px] lg:h-[82px] p-2 group',
								currentTheme === 'dark' ? 'border-white' : 'border-main'
							)}>
							<TwitterIcon
								className={clsx(
									'w-5 h-5 lg:w-auto lg:h-auto transition-colors group-hover:text-white',
									currentTheme === 'dark' ? 'text-white' : 'text-main'
								)}
							/>
						</a>
						<a
							href='https://www.linkedin.com/in/musab-olurode/'
							target='_blank'
							rel='noreferrer'
							title='LinkedIn'
							className={clsx(
								'btn btn-circle bg-transparent border-2 w-[50px] h-[50px] lg:w-[82px] lg:h-[82px] p-2 group',
								currentTheme === 'dark' ? 'border-white' : 'border-main'
							)}>
							<LinkedInIcon
								className={clsx(
									'w-5 h-5 lg:w-auto lg:h-auto transition-colors group-hover:text-white',
									currentTheme === 'dark' ? 'text-white' : 'text-main'
								)}
							/>
						</a>
						<a
							href='https://github.com/musab-olurode'
							target='_blank'
							rel='noreferrer'
							title='GitHub'
							className={clsx(
								'btn btn-circle bg-transparent border-2 w-[50px] h-[50px] lg:w-[82px] lg:h-[82px] p-2 group',
								currentTheme === 'dark' ? 'border-white' : 'border-main'
							)}>
							<GithubIcon
								className={clsx(
									'w-5 h-5 lg:w-auto lg:h-auto transition-colors group-hover:text-white',
									currentTheme === 'dark' ? 'text-white' : 'text-main'
								)}
							/>
						</a>
					</div>
				</section>

				<button
					data-theme={currentTheme == 'dark' ? 'light' : 'dark'}
					data-toggle-theme='dark,light'
					className={clsx(
						'btn btn-circle fixed right-5 bottom-10 lg:right-10 flex justify-center items-center w-[48px] h-[30px] lg:w-[82px] lg:h-[82px]',
						currentTheme == 'dark' ? 'bg-white hover:bg-[#C7C7C7]' : 'bg-main'
					)}
					onClick={toggleTheme}>
					<SunIcon
						className={cn(
							'absolute h-[22px] w-[22px] lg:h-auto lg:w-auto -rotate-90 scale-0 transition-transform',
							currentTheme == 'dark' && 'rotate-0 scale-100'
						)}
					/>
					<MoonIcon
						className={cn(
							'absolute h-[22px] w-[22px] lg:h-auto lg:w-auto rotate-90 scale-0 transition-transform',
							currentTheme == 'light' && 'rotate-0 scale-100'
						)}
					/>
				</button>
			</div>
		</>
	);
};

export default Home;
