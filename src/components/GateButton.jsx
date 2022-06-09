import React from 'react';

const GateButton = ({ children, onClick, color }) => {
	const scheme = {
		red: 'red-button',
		green: 'green-button',
	};

	let buttonClass = 'gate-button';

	if (color) {
		buttonClass = `gate-button ${scheme[color]}`;
	}

	return (
		<div className={buttonClass} onClick={onClick}>
			{children}
			<div className='button-bg'>
				<div>{children}</div>
			</div>
		</div>
	);
};

export default GateButton;
