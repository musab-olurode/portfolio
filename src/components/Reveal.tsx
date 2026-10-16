'use client';

import { useEffect } from 'react';

/**
 * Marks every `.reveal` element and shows it once it scrolls into view.
 * The attribute is added from script, so without JS nothing is ever hidden.
 */
export default function Reveal() {
	useEffect(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const els = [...document.querySelectorAll<HTMLElement>('.reveal')];
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					entry.target.setAttribute('data-shown', '');
					observer.unobserve(entry.target);
				}
			},
			{ threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
		);
		for (const el of els) {
			el.setAttribute('data-reveal', '');
			observer.observe(el);
		}
		return () => observer.disconnect();
	}, []);

	return null;
}
