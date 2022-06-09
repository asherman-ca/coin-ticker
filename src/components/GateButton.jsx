import React from 'react';

const GateButton = ({ children, onClick }) => {
	return (
		<div className='gate-button' onClick={onClick}>
			{children}
			<div className='button-bg'>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default GateButton;
