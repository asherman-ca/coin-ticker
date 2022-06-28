import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

function OAuth() {
	const navigate = useNavigate();

	const onGoogleClick = async () => {
		try {
			const auth = getAuth();
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
					testBalance: 0,
				});
			}
			navigate('/account');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	// return <i className='fa-solid fa-circle-user' onClick={onGoogleClick}></i>;
	return (
		<div onClick={onGoogleClick}>
			<i className='fa-brands fa-google'></i>Google
		</div>
	);
}

export default OAuth;
