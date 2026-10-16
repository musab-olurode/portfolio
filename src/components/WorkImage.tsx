/* eslint-disable @next/next/no-img-element -- static export: next/image cannot build a srcset, so this does. */

interface Props extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
	/** The 1200px copy; a 2400px copy sits beside it as `<name>@2x.webp`. */
	src: string;
	width: number;
	height: number;
	sizes: string;
}

/** A capture with a 1200px and a 2400px copy; the browser fetches only the one it needs. */
export default function WorkImage({ src, alt = '', ...rest }: Props): React.JSX.Element {
	const large = src.replace(/\.webp$/, '@2x.webp');

	return <img alt={alt} decoding='async' loading='lazy' src={src} srcSet={`${src} 1200w, ${large} 2400w`} {...rest} />;
}
