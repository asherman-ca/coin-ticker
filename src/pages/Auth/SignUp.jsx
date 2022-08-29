import React, { useState } from 'react';
import GateButton from '../../components/GateButton';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import OAuth from '../../components/OAuth';
import { UserAuth } from '../../context/AuthContext';
import { SignUpValidators } from '../../utils/validation';

const SignUp = () => {
	const navigate = useNavigate();
	const { createUser } = UserAuth();
	const [formData, setFormData] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
		balance: 0,
		testBalance: 100000,
		lastFaucet: {},
	});
	const [errors, setErrors] = useState({
		email: '',
		name: '',
		password: '',
		confirmPassword: '',
	});
	const validators = SignUpValidators(formData);

	const onSubmit = async (e) => {
		let errorFound = false;
		e.preventDefault();
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
			createUser(navigate, formData);
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
				<div className='header'>Sign Up</div>
				<div>to continue to Tickr</div>
				<form className='auth-form'>
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
							id='name'
							type='text'
							placeholder='Name'
							onChange={onChange}
							className={errors.name ? 'invalid' : ''}
						/>
						{errors.name && <div className='form-error'>{errors.name}</div>}
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
					<div className='input-container'>
						<input
							id='confirmPassword'
							type='password'
							placeholder='Confirm Password'
							onChange={onChange}
							className={errors.confirmPassword ? 'invalid' : ''}
						/>
						{errors.confirmPassword && (
							<div className='form-error'>{errors.confirmPassword}</div>
						)}
					</div>
					<div className='button-row'>
						<Link to={'/signin'}>Already registered?</Link>
						<GateButton onClick={onSubmit} type={true}>
							Submit
						</GateButton>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUp;
