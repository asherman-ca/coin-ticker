import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from 'firebase/auth';
import { db } from '../firebase.config';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';
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

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

	// const createUser = async (email, password) => {
	// 	return createUserWithEmailAndPassword(auth, email, password);
	// };

	const createUser = async (navigate, formData) => {
		console.log('formData', formData);
		const existingUserRef = collection(db, 'users');
		const q = query(
			existingUserRef,
			where('email', '==', formData.email),
			limit(10)
		);
		const existingUserSnap = await getDocs(q);
		if (existingUserSnap.empty) {
			try {
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
	};

	const signIn = (email, password) => {
		return signInWithEmailAndPassword(auth, email, password);
	};

	const logout = () => {
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			console.log(currentUser);
			setUser(currentUser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserContext.Provider value={{ createUser, user, logout, signIn }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
