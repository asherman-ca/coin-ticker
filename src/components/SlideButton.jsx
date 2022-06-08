import React from 'react';

const SlideButton = ({ children }) => {
	return (
		<div className='slide-button'>
			{children}
			<div className='button-bg'>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default SlideButton;
