import React from 'react';

export default function PageWrapper({ children }) {
	return (
		<div className='wrapper'>
			{children}
			<img style={{position: "fixed"}} className='todoBoyImg' src={require('../assets/toGoBoy.svg').default} alt='' />
		</div>
	);
}
