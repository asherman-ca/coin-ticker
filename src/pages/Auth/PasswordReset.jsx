import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import GateButton from '../../components/GateButton';

const PasswordReset = () => {
	const [email, setEmail] = useState();

	const onSubmit = async (e) => {
		e.preventDefault();
		try {
			const auth = getAuth();
			await sendPasswordResetEmail(auth, email);
			toast.success('Email was sent');
		} catch (error) {
			toast.error('could not send reset email');
		}
	};

	const onChange = (e) => {
		setEmail(e.target.value);
	};

	return (
		<div className='container'>
			<div className='auth'>
				<div className='auth-form-container'>
					<div className='header'>Password Reset</div>
					<div>Enter your email to recovery password</div>
					<form onSubmit={onSubmit} className='auth-form'>
						<input onChange={onChange} type='email' placeholder='Email' />
						<div className='button-row'>
							<GateButton onClick={onSubmit} type={true}>
								Submit
							</GateButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PasswordReset;
