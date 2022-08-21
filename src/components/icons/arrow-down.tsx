import React from 'react';
import { IconProps } from '../../types/icons';

const ArrowDown: React.FC<IconProps> = ({ className }) => {
	return (
		<svg
			width='65'
			height='82'
			viewBox='0 0 65 82'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M61.7282 46.3359L58.9692 43.5802L47.6999 54.8488L36.4305 66.1173L36.4305 33.4504L36.4305 0.78369L32.3323 0.78369L28.2341 0.78369L28.2341 33.4504L28.2341 66.1173L16.9648 54.8488L5.6954 43.5802L2.93591 46.3364C1.41832 47.8522 0.19454 49.1465 0.216612 49.2125C0.238516 49.2784 7.49104 56.5673 16.3332 65.4098L32.4097 81.4872L48.4484 65.449C57.2697 56.628 64.4873 49.3389 64.4873 49.2511C64.4873 49.1633 63.2457 47.8514 61.7282 46.3359Z'
				className='fill-current'
			/>
		</svg>
	);
};

export default ArrowDown;
