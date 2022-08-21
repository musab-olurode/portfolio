import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html data-theme='dark'>
				<Head>
					<link
						rel='preload'
						href='/fonts/space-grotesk/SpaceGrotesk-VariableFont_wght.ttf'
						as='font'
						type='font/ttf'
						crossOrigin='anonymous'
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
