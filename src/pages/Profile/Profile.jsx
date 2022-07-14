import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import {
	query,
	where,
	collection,
	getDocs,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';

import { calcPNL } from '../../utils/accounting';
import Spinner from '../../components/Spinner';

const Profile = ({ coins, coinsLoading }) => {
	const auth = getAuth();

	const [loading, setLoading] = useState(true);
	const [pnl, setPnl] = useState();
	const [userLikes, setUserLikes] = useState([]);
	const [user, setUser] = useState();

	console.log('coins', coins);
	console.log('coinsloading', coinsLoading);

	useEffect(() => {
		if (!coinsLoading) {
			const fetchTask = async () => {
				const ordersRef = collection(db, 'orders');

				const q = query(
					ordersRef,
					where('userRef', '==', auth.currentUser.uid),
					orderBy('timestamp', 'desc')
				);

				const snap = await getDocs(q);

				let orders = [];

				snap.forEach((doc) => {
					return orders.push({ data: doc.data(), id: doc.id });
				});

				setPnl(calcPNL(orders, coins));

				const usersRef = doc(db, 'users', auth.currentUser.uid);
				const docSnap = await getDoc(usersRef);
				setUser(docSnap.data());

				// get likes
				const likesRef = collection(db, 'likes');
				const q2 = query(
					likesRef,
					where('userRef', '==', auth.currentUser.uid)
				);
				const querySnap = await getDocs(q2);
				let likesCopy = [];
				querySnap.forEach((el) => likesCopy.push(el.data()));
				setUserLikes(likesCopy);

				setLoading(false);
			};
			fetchTask();
		}
	}, [coinsLoading]);

	if (loading || coinsLoading) {
		return (
			<div className='container'>
				<Spinner />
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='profile'>
				<div className='header-row'>Header</div>
				{console.log('user', user)}
				<div className='accounts-row'>accounts</div>
				{console.log('accounts', pnl)}
				<div className='likes-row'>likes</div>
				{console.log('likes', userLikes)}
			</div>
		</div>
	);
};

export default Profile;
