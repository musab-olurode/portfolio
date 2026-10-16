'use client';

import { useEffect, useState } from 'react';

import { switchTheme, type Theme } from '@/lib/theme';

export default function ThemeToggle(): React.JSX.Element {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect -- sync with the theme the head script already applied
		setTheme(document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light');
	}, []);

	const next: Theme = theme === 'dark' ? 'light' : 'dark';

	return (
		<button
			aria-label={`Switch to ${next} theme`}
			className='cursor-pointer link-underline'
			type='button'
			onClick={(event) => {
				const rect = event.currentTarget.getBoundingClientRect();

				setTheme(next);
				void switchTheme(next, { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
			}}>
			{next === 'dark' ? 'Dark' : 'Light'}
		</button>
	);
}
