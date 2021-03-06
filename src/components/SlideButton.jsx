import React from 'react';

const SlideButton = ({ children, onClick }) => {
	return (
		<div className='slide-button' onClick={onClick}>
			{children}
			<div className='button-bg'>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default SlideButton;
