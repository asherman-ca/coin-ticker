import { createContext, useContext, useEffect, useState } from 'react';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
	signInWithPopup,
	GoogleAuthProvider,
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
	getDoc,
} from 'firebase/firestore';

const UserContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState({});

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

	const signIn = async (navigate, formData) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				formData.email,
				formData.password
			);

			if (userCredential.user) {
				navigate('/account');
			}
		} catch (error) {
			toast.error('Invalid credentials');
		}
	};

	const oAuth = async (navigate) => {
		try {
			// const auth = getAuth();
			const provider = new GoogleAuthProvider();
			const result = await signInWithPopup(auth, provider);
			const user = result.user;

			// Check for user
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);

			// If user, doesn't exist, create user
			if (!docSnap.exists()) {
				await setDoc(doc(db, 'users', user.uid), {
					name: user.displayName,
					email: user.email,
					timestamp: serverTimestamp(),
					balance: 0,
					testBalance: 100000,
					lastFaucet: '',
				});
			}
			navigate('/account');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	const logout = () => {
		signOut(auth);
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
		<UserContext.Provider value={{ createUser, user, logout, signIn, oAuth }}>
			{children}
		</UserContext.Provider>
	);
};

export const UserAuth = () => {
	return useContext(UserContext);
};
