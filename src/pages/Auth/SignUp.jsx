import React, { useState } from 'react';
import GateButton from '../../components/GateButton';

import { toast } from 'react-toastify';

const SignUp = () => {
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});

	const onSubmit = () => {
		if (Object.values(formData).some((el) => el == '')) {
			toast.error('Complete all fields');
		} else if (formData.password != formData.confirmPassword) {
			toast.error('Passwords must match');
		}
		console.log('formData', formData);
		console.log('hits');
	};

	const onChange = (e) => {
		setFormData((prev) => {
			return {
				...prev,
				[e.target.id]: e.target.value,
			};
		});
	};

	return (
		<div className='container'>
			<div className='auth'>
				<div className='auth-form-container'>
					<div className='header'>Sign Up</div>
					<div>to continue to Tickr</div>
					<form className='auth-form'>
						<input
							onChange={onChange}
							id='email'
							type='email'
							placeholder='Email'
						/>
						<input
							id='name'
							type='text'
							placeholder='Name'
							onChange={onChange}
						/>
						<input
							id='password'
							type='password'
							placeholder='Password'
							onChange={onChange}
						/>
						<input
							id='confirmPassword'
							type='password'
							placeholder='Confirm Password'
							onChange={onChange}
						/>
						<GateButton onClick={onSubmit}>Submit</GateButton>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
