import React from 'react';
import { IconProps } from '../../types/icons';

const SunIcon: React.FC<IconProps> = ({ className }) => {
	return (
		<svg
			width='48'
			height='48'
			viewBox='0 0 48 48'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			className={className}>
			<path
				d='M24 6V4M24 44V42M42 24H44M4 24H6M37 11L40 8M8 40L11 37M8 8L11 11M37 37L40 40'
				stroke='#080B16'
				strokeWidth='2'
				strokeLinecap='round'
			/>
			<path
				d='M24 32C28.4183 32 32 28.4183 32 24C32 19.5817 28.4183 16 24 16C19.5817 16 16 19.5817 16 24C16 28.4183 19.5817 32 24 32Z'
				stroke='#080B16'
				strokeWidth='2'
				strokeLinecap='round'
			/>
		</svg>
	);
};

export default SunIcon;
