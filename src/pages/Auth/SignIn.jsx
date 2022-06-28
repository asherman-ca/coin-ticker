import React, { useState } from 'react';
import GateButton from '../../components/GateButton';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

const SignIn = () => {
	const [formData, setFormData] = useState({
		email: '',

		password: '',
	});

	const onSubmit = () => {
		if (Object.values(formData).some((el) => el == '')) {
			toast.error('Complete all fields');
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
					<div className='header'>Sign In</div>
					<div>to continue to Tickr</div>
					<form className='auth-form'>
						<input
							onChange={onChange}
							id='email'
							type='email'
							placeholder='Email'
						/>

						<input
							id='password'
							type='password'
							placeholder='Password'
							onChange={onChange}
						/>

						<div className='button-row'>
							<Link to={'/signup'}>Need an account?</Link>
							<GateButton onClick={onSubmit}>Submit</GateButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
