import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

import GateButton from '../../components/GateButton';

const PasswordReset = () => {
	const [email, setEmail] = useState();
	const [errors, setErrors] = useState({ email: '' });

	const validators = {
		email: (string) => !string?.includes('@'),
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		if (validators['email'](email)) {
			setErrors((prev) => {
				return { ...prev, email: 'Invalid Email Address' };
			});
		} else {
			try {
				const auth = getAuth();
				await sendPasswordResetEmail(auth, email);
				toast.success('Email was sent');
			} catch (error) {
				toast.error('Reset email error');
			}
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
						<div className='input-container'>
							<input onChange={onChange} type='email' placeholder='Email' />
							{errors.email && <div className='form-error'>{errors.email}</div>}
						</div>
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
