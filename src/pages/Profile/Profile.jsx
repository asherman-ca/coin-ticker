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
	const [userLikes, setUserLikes] = useState({});
	const [user, setUser] = useState();
	const [showLikes, setShowLikes] = useState(false);

	useEffect(() => {
		if (!coinsLoading) {
			const fetchTask = async () => {
				// fetch orders
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

				// fetch user
				const usersRef = doc(db, 'users', auth.currentUser.uid);
				const docSnap = await getDoc(usersRef);
				setUser(docSnap.data());

				// fetch likes and match coin data into an object
				const likesRef = collection(db, 'likes');
				const q2 = query(
					likesRef,
					where('userRef', '==', auth.currentUser.uid)
				);
				const querySnap = await getDocs(q2);
				let likesCopy = {};
				querySnap.forEach((el) => (likesCopy[el.data().coinId] = el.data()));
				coins.forEach((coin) => {
					if (likesCopy[coin.id]) {
						likesCopy[coin.id] = { ...coin };
					}
				});
				console.log('likescopy', likesCopy);
				setUserLikes(likesCopy);

				setLoading(false);
			};
			fetchTask();
		}
	}, [coinsLoading]);

	const handleClick = (val) => {
		setShowLikes(val);
	};

	if (loading) {
		return (
			<div className='container'>
				<Spinner />
			</div>
		);
	}

	const newDate = user.timestamp.toDate().toDateString();

	return (
		<div className='profile-container'>
			<div className='profile'>
				<div className='header-row'>
					{console.log('user', user)}

					<img src='../Gekko2.jpeg' alt='Gekko' className='profile-image' />
					<div className='title'>
						<div className='header'>{user.name}</div>
						<div>
							<div>{user.email}</div>
							<div className='subheader'>Joined {newDate}</div>
						</div>
					</div>
					<div className='tabs'>
						<div onClick={() => handleClick(false)}>
							Assets <span>{pnl.length}</span>
						</div>
						<div onClick={() => handleClick(true)}>
							Favorited {Object.values(userLikes).length}
						</div>
					</div>
				</div>

				{showLikes ? (
					<div className='likes-row'>
						{Object.values(userLikes).map((like) => {
							// console.log('like', like);
							return <div key={like.id}>{like.id}</div>;
						})}
					</div>
				) : (
					<div className='accounts-row'>
						{/* {console.log('pnl', pnl)} */}
						{pnl.map((account) => {
							return <div>account</div>;
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
