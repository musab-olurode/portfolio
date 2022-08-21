export const getCurrentTheme = () =>
	localStorage.getItem('theme') as 'light' | 'dark';
