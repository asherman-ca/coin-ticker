import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import {
	doc,
	deleteDoc,
	query,
	where,
	collection,
	getDocs,
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

			if (auth.currentUser) {
				likes.forEach((el) => {
					if (el.data.userRef === auth.currentUser.uid) {
						setUserLike(el);
					}
				});
			}

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
	}, [isMounted]);

	const onLike = async () => {
		if (!loggedIn) {
			toast.error('Must be logged in');
		} else {
			if (userLike) {
				await deleteDoc(doc(db, 'likes', userLike.id));
				setLikes((prev) => {
					return prev.filter((like) => like.id !== userLike.id);
				});
				setUserLike(null);
			} else {
				const newDoc = await addDoc(collection(db, 'likes'), {
					userRef: auth.currentUser.uid,
					coinId: coin.id,
				});
				setUserLike({
					id: newDoc.id,
					data: {
						userRef: auth.currentUser.uid,
						coinId: coin.id,
					},
				});
				setLikes((prev) => {
					return [
						...prev,
						{
							id: newDoc.id,
							data: {
								userRef: auth.currentUser.uid,
								coinId: coin.id,
							},
						},
					];
				});
			}
		}
	};

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
					userLike={userLike}
					totalLikes={likes.length}
					onLike={onLike}
				/>
				<div className='tickr-row'>
					<div className='tickrs'>
						<div className='header'>{coin.symbol.toUpperCase()} markets</div>
						{basedAndSymbol.map((tickr) => (
							<TickerItem
								key={`${tickr.trade_url} - ${tickr.market.identifier}`}
								tickr={tickr}
							/>
						))}
					</div>
				</div>

				{coin.description.en && (
					<div className='description-row'>
						<span>About {coin.symbol.toUpperCase()}</span>
						{coin.description.en.replace(/<\/?a[^>]*>/g, '')}
					</div>
				)}
				<Embed symbol={coin.symbol} />
			</div>
		</div>
	);
};

export default CoinView;
