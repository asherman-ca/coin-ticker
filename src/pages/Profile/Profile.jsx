import React, { useEffect, useState } from 'react';
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
import AccountItem from './components/AccountItem';
import LikedCoinItem from './components/LikedCoinItem';
import { UserAuth } from '../../context/AuthContext';

const Profile = ({ coins, coinsLoading }) => {
	const [loading, setLoading] = useState(true);
	const [pnl, setPnl] = useState();
	const [userLikes, setUserLikes] = useState({});
	const [userData, setUserData] = useState();
	const [showLikes, setShowLikes] = useState(true);
	const { user } = UserAuth();

	useEffect(() => {
		if (!coinsLoading) {
			const fetchTask = async () => {
				// fetch orders
				const ordersRef = collection(db, 'orders');
				const q = query(
					ordersRef,
					where('userRef', '==', user.uid),
					orderBy('timestamp', 'desc')
				);
				const snap = await getDocs(q);
				let orders = [];
				snap.forEach((doc) => {
					return orders.push({ data: doc.data(), id: doc.id });
				});
				setPnl(calcPNL(orders, coins));

				// fetch user
				const usersRef = doc(db, 'users', user.uid);
				const docSnap = await getDoc(usersRef);
				setUserData(docSnap.data());

				// fetch likes and match coin data into an object
				const likesRef = collection(db, 'likes');
				const q2 = query(likesRef, where('userRef', '==', user.uid));
				const querySnap = await getDocs(q2);
				let likesCopy = {};
				querySnap.forEach((el) => (likesCopy[el.data().coinId] = el.data()));
				coins.forEach((coin) => {
					if (likesCopy[coin.id]) {
						likesCopy[coin.id] = { ...coin };
					}
				});
				setUserLikes(likesCopy);

				setLoading(false);
			};
			fetchTask();
		}
	}, [coinsLoading, user.uid, coins]);

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

	const newDate = userData.timestamp
		.toDate()
		.toDateString()
		.split(' ')
		.slice(1, 4)
		.join(' ');

	const sortedLikes = Object.values(userLikes).sort(
		(a, b) =>
			b.market_data.price_change_percentage_24h_in_currency.usd -
			a.market_data.price_change_percentage_24h_in_currency.usd
	);

	const sortedAccounts = pnl.sort((a, b) => b.totalValue - a.totalValue);

	return (
		<div className='profile-container'>
			<div className='profile'>
				<div className='header-row'>
					<img src='../Gekko2.jpeg' alt='Gekko' className='profile-image' />

					<div className='header-meta'>
						<div className='title'>
							<div>{userData.name}</div>
							<div>
								<div className='title-email'>{user.email}</div>
								<div className='subheader'>Joined {newDate}</div>
							</div>
						</div>
						<div className='tabs'>
							<div
								onClick={() => handleClick(false)}
								className={!showLikes ? 'underlined' : ''}
							>
								Assets <span>{pnl.length}</span>
							</div>
							<div
								onClick={() => handleClick(true)}
								className={showLikes ? 'underlined' : ''}
							>
								Favorited {Object.values(userLikes).length}
							</div>
						</div>
					</div>
				</div>

				{showLikes ? (
					<div className='likes-row'>
						{sortedLikes.map((coin) => {
							return <LikedCoinItem key={coin.id} coin={coin} />;
						})}
					</div>
				) : (
					<div className='accounts-row'>
						{sortedAccounts.map((account) => {
							return <AccountItem key={account.coinId} account={account} />;
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
