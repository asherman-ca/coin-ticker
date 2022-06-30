import React from 'react';

const NotFound = () => {
	return (
		<div className='container'>
			<div className='default-col'>
				<i
					className='fa-solid fa-triangle-exclamation'
					style={{ marginRight: '.5rem' }}
				></i>
				Page Not Found
			</div>
		</div>
	);
};

export default NotFound;
