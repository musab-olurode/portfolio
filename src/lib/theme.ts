export type Theme = 'light' | 'dark';

export const THEME_KEY = 'theme';

export function resolveTheme(stored: string | null, prefersDark: boolean): Theme {
	if (stored === 'light' || stored === 'dark') return stored;
	return prefersDark ? 'dark' : 'light';
}

/** Runs in <head> before paint, so the first frame already has the right theme. */
export const themeInitScript = `(function(){try{var s=null;try{s=localStorage.getItem('${THEME_KEY}')}catch(e){}var d=window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.dataset.theme=s==='light'||s==='dark'?s:d?'dark':'light'}catch(e){}})()`;

export function applyTheme(theme: Theme): void {
	document.documentElement.dataset.theme = theme;
	try {
		localStorage.setItem(THEME_KEY, theme);
	} catch {
		// Storage can be blocked; the theme still applies for this visit.
	}
}

export async function switchTheme(next: Theme, origin: { x: number; y: number }): Promise<void> {
	const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
	if (!document.startViewTransition || reduced) {
		applyTheme(next);
		return;
	}

	const transition = document.startViewTransition(() => applyTheme(next));
	await transition.ready;
	const radius = Math.hypot(
		Math.max(origin.x, window.innerWidth - origin.x),
		Math.max(origin.y, window.innerHeight - origin.y)
	);
	document.documentElement.animate(
		{ clipPath: [`circle(0px at ${origin.x}px ${origin.y}px)`, `circle(${radius}px at ${origin.x}px ${origin.y}px)`] },
		{ duration: 600, easing: 'cubic-bezier(0.2, 0, 0, 1)', pseudoElement: '::view-transition-new(root)' }
	);
}
