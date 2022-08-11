import React, { useState } from 'react';
import GateButton from '../../components/GateButton';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import {
	setDoc,
	doc,
	serverTimestamp,
	collection,
	query,
	where,
	limit,
	getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase.config';

const SignUp = () => {
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
	const validators = {
		email: {
			action: (string) => string?.includes('@'),
			message: 'Email format required',
		},
		name: {
			action: (string) => string?.length > 2,
			message: 'Minimum 3 characters',
		},
		password: {
			action: (string) => string?.length > 5,
			message: 'Minimum 6 characters',
		},
		confirmPassword: {
			action: (string) => string === formData.password,
			message: 'Must match password',
		},
	};

	const navigate = useNavigate();

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
			const existingUserRef = collection(db, 'users');
			const q = query(
				existingUserRef,
				where('email', '==', formData.email),
				limit(10)
			);
			const existingUserSnap = await getDocs(q);
			if (existingUserSnap.empty) {
				try {
					const auth = getAuth();
					const userCredential = await createUserWithEmailAndPassword(
						auth,
						formData.email,
						formData.password
					);
					const user = userCredential.user;

					updateProfile(auth.currentUser, {
						displayName: formData.name,
					});

					const formDataCopy = { ...formData };
					delete formDataCopy.password;
					delete formDataCopy.confirmPassword;
					formDataCopy.timestamp = serverTimestamp();

					await setDoc(doc(db, 'users', user.uid), formDataCopy);
					toast.success('User created');
					navigate('/account');
				} catch (error) {
					console.log(error);
					toast.error('Server error');
				}
			} else {
				toast.error('Email address already in use');
			}
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
