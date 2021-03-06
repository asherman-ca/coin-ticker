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
					testBalance: 100000,
					lastFaucet: '',
				});
			}
			navigate('/profile');
		} catch (error) {
			toast.error('Could not authorize with Google');
		}
	};

	return (
		<div onClick={onGoogleClick} className='oauth'>
			<i className='fa-brands fa-google'></i>Gmail Access
		</div>
	);
}

export default OAuth;
