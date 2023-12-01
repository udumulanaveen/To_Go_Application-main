import React from 'react';
import * as _ from 'lodash';
export default function Button({ position='', children, theme, onClick, disabled }) {
	return (
		<button
		
			style={{position:position}}
			onClick={() => {
				_.isFunction(onClick) && onClick();
			}}
			disabled={disabled}
			className={`btn ${theme}`}
		>
			{children || 'Click Here'}
		</button>
	);
}
