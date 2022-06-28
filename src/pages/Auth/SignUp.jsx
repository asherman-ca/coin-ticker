import React from 'react';

const SignUp = () => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('hits');
	};

	return (
		<div className='container'>
			<div className='auth'>
				Sign Up
				<form action='' className='auth-form' onSubmit={(e) => onSubmit(e)}>
					<input type='text' />
				</form>
			</div>
		</div>
	);
};

export default SignUp;
