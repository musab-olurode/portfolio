import React, { useEffect, useState } from 'react';
import { themeChange } from 'theme-change';
import { getCurrentTheme } from '../helpers';

function useCurrentTheme() {
	const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');

	useEffect(() => {
		if (localStorage) {
			themeChange(false);
			setCurrentTheme(getCurrentTheme());
		}
	}, []);

	const toggleTheme = () => {
		const newTheme = currentTheme === 'light' ? 'dark' : 'light';
		setCurrentTheme(newTheme);
	};

	return [currentTheme, toggleTheme] as const;
}

export default useCurrentTheme;
