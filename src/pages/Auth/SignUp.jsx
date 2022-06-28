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
	});

	const navigate = useNavigate();

	const onSubmit = async () => {
		if (Object.values(formData).some((el) => el == '')) {
			toast.error('Complete all fields');
		} else if (formData.password != formData.confirmPassword) {
			toast.error('Passwords must match');
		}

		const existingUserRef = collection(db, 'users');
		const q = query(
			existingUserRef,
			where('email', '==', formData.email),
			limit(10)
		);
		const existingUserSnap = await getDocs(q);
		if (existingUserSnap.empty) {
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
			formDataCopy.timestamp = serverTimestamp();

			await setDoc(doc(db, 'users', user.uid), formDataCopy);
			toast.success('User created');
			navigate('/account');
		} else {
			toast.error('Email address already in use');
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
						<div className='button-row'>
							<Link to={'/signin'}>Already registered?</Link>
							<GateButton onClick={onSubmit}>Submit</GateButton>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
