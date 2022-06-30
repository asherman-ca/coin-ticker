import React from 'react';

const GateButton = ({ children, onClick, color, type }) => {
	const scheme = {
		red: 'red-button',
		green: 'green-button',
	};

	let buttonClass = 'gate-button';

	if (color) {
		buttonClass = `gate-button ${scheme[color]}`;
	}

	return (
		<button
			type={type ? 'submit' : 'button'}
			className={buttonClass}
			onClick={onClick}
		>
			{children}
			<div className='button-bg'>
				<div>{children}</div>
			</div>
		</button>
	);
};

export default GateButton;
