import '../../styles/globals.scss';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';

function MyApp({ Component, pageProps }: AppProps) {
	<Analytics />;

	return <Component {...pageProps} />;
}

export default MyApp;
