import React, { useState } from 'react';
import GateButton from '../../components/GateButton';

const PasswordReset = () => {
	// const [email, setEmail] = useState();

	const onSubmit = () => {
		console.log('hits');
	};

	return (
		<div className='container'>
			<div className='auth'>
				<div className='auth-form-container'>
					<div className='header'>Password Reset</div>
					<div>Enter your email to recovery password</div>
					<form action='' className='auth-form'>
						<input type='email' placeholder='email' />
						<div className='button-row'>
							<GateButton onClick='onSubmit'>Submit</GateButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
