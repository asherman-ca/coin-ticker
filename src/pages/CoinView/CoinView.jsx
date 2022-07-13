import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	getDoc,
	doc,
	updateDoc,
	deleteDoc,
	query,
	where,
	collection,
	getDocs,
	limit,
	addDoc,
} from 'firebase/firestore';
import { db } from '../../firebase.config';

import Embed from './components/Embed';
import Spinner from '../../components/Spinner';
import { capitalize } from '../../utils/stringUtils';
import TickerItem from './components/TickerItem';
import CoinViewHeader from './components/CoinViewHeader';

const CoinView = () => {
	const [coin, setCoin] = useState();
	const [loading, setLoading] = useState(true);

	const [loggedIn, setLoggedIn] = useState(false);
	const [userLoading, setUserLoading] = useState(true);
	const [userLike, setUserLike] = useState();
	const [likes, setLikes] = useState([]);

	const auth = getAuth();
	const params = useParams();
	const isMounted = useRef(true);

	useEffect(() => {
		const apiFetch = async () => {
			// get coin info
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins/${params.coinId}`
			);
			if (!ref.ok) {
				toast.error(`No results: "${params.coinId}"`);
				clearInterval(interId);
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoin(response);

			// get likes
			const likesRef = collection(db, 'likes');
			const q = query(likesRef, where('coinId', '==', params.coinId));
			const querySnap = await getDocs(q);
			let likes = [];
			querySnap.forEach((el) => likes.push({ id: el.id, data: el.data() }));
			setLikes(likes);
			setLoading(false);
		};
		let interId = setInterval(apiFetch, 10000);
		apiFetch();

		return () => {
			clearInterval(interId);
		};
	}, [params.coinId]);

	useEffect(() => {
		setUserLoading(true);
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, async (user) => {
				if (user) {
					setLoggedIn(true);
					// const likesRef = collection(db, 'likes');
					// console.log('coindid', params.coinId);
					// console.log('userId', auth.currentUser.uid);
					// const q = query(
					// 	likesRef,
					// 	where('coinId', '==', params.coinId),
					// 	where('userRef', '==', auth.currentUser.uid),
					// 	limit(20)
					// );
					// const querySnap = await getDocs(q);
					// // console.log('snap', querySnap);
					// querySnap.forEach((doc) => {
					// 	setUserLike({
					// 		data: doc.data(),
					// 		id: doc.id,
					// 	});
					// });
					likes.forEach((el) => {
						if (el.data.userRef === auth.currentUser.uid) {
							setUserLike(el);
						}
					});
				} else {
					setLoggedIn(false);
				}
				setUserLoading(false);
			});
		}
	}, [isMounted, likes]);

	if (loading || userLoading) {
		return (
			<div className='container'>
				<div className='coin-view'>
					<Spinner />
				</div>
			</div>
		);
	}

	const compare = (a, b) => {
		if (a.last < b.last) {
			return -1;
		} else {
			return 1;
		}
	};

	const based = coin.tickers?.filter(
		(el) => el.target === 'USDT' || el.target === 'USD'
	);

	const basedAndSymbol = based
		.filter((el) => coin.symbol.toUpperCase() === el.base)
		.slice(0, 24)
		.sort((a, b) => compare(a, b));

	return (
		<div className='home-container'>
			<div className='coin-view'>
				<div className='header-row'>
					<div>{capitalize(coin.id)} Price</div>
					<div>All About {capitalize(coin.id)}</div>
				</div>
				<CoinViewHeader
					coin={coin}
					user={auth.currentUser}
					userLike={userLike}
					totalLikes={likes.length}
				/>
				<div className='tickr-row'>
					<div className='tickrs'>
						<div className='header'>{coin.symbol.toUpperCase()} markets</div>
						{basedAndSymbol.map((tickr) => (
							<TickerItem key={tickr.trade_url} tickr={tickr} />
						))}
					</div>
				</div>
				<Embed symbol={coin.symbol} />
				{coin.description.en && (
					<div className='description-row'>
						<span>About {coin.symbol.toUpperCase()}</span>
						{coin.description.en.replace(/<\/?a[^>]*>/g, '')}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoinView;
