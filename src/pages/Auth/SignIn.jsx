import React, { useState } from 'react';
import GateButton from '../../components/GateButton';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import OAuth from '../../components/OAuth';
import { UserAuth } from '../../context/AuthContext';
import { SignInValidators as validators } from '../../utils/validation';

const SignIn = () => {
	const navigate = useNavigate();
	const { signIn } = UserAuth();
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState({
		email: '',
		password: '',
	});

	const onSubmit = async (e) => {
		e.preventDefault();

		let errorFound = false;
		const errorsCopy = {};
		Object.keys(validators).forEach((key) => {
			if (!validators[key].action(formData[key])) {
				errorsCopy[key] = validators[key].message;
				errorFound = true;
			} else {
				errorsCopy[key] = '';
			}
		});
		setErrors((prev) => {
			return { ...prev, ...errorsCopy };
		});
		if (errorFound) {
			toast.error('Invalid form');
		} else {
			signIn(navigate, formData);
		}
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
				<OAuth />
				<div className='header'>Sign In</div>
				<div>to continue to Tickr</div>
				<form onSubmit={onSubmit} className='auth-form'>
					<div className='input-container'>
						<input
							onChange={onChange}
							id='email'
							type='email'
							placeholder='Email'
							className={errors.email ? 'invalid' : ''}
						/>
						{errors.email && <div className='form-error'>{errors.email}</div>}
					</div>

					<div className='input-container'>
						<input
							id='password'
							type='password'
							placeholder='Password'
							onChange={onChange}
							className={errors.password ? 'invalid' : ''}
						/>
						{errors.password && (
							<div className='form-error'>{errors.password}</div>
						)}
					</div>

					<Link to={'/password-reset'} className='pw-reset-link'>
						Forgot password?
					</Link>

					<div className='button-row'>
						<Link to={'/signup'}>Create account</Link>
						<GateButton onClick={onSubmit} type={true}>
							Submit
						</GateButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignIn;
