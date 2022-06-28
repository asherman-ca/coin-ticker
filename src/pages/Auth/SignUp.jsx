import React from 'react';

const SignUp = () => {
	const onSubmit = (e) => {
		e.preventDefault();
		console.log('hits');
	};

	return (
		<div className='container'>
			<div className='auth'>
				<div className='auth-form-container'>
					<div className='header'>Sign Up</div>
					<div>to continue to Tickr</div>
					<form className='auth-form' onSubmit={(e) => onSubmit(e)}>
						<input type='text' />
						<input type='text' />
						<input type='text' />
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
