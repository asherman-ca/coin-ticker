// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyDMsRg4fIQfMRpI6jbulJ1zgSoqRyKCqG4',
	authDomain: 'tickr-78023.firebaseapp.com',
	projectId: 'tickr-78023',
	storageBucket: 'tickr-78023.appspot.com',
	messagingSenderId: '712960981431',
	appId: '1:712960981431:web:72f6710b8110e38cc6d032',
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();
