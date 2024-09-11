import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const getCurrentTheme = () =>
	(localStorage.getItem('theme') as 'light' | 'dark') || 'dark';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
