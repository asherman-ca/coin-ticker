import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import { UserAuth } from '../../context/AuthContext';

const CoinView = () => {
	const [coin, setCoin] = useState();
	const [loading, setLoading] = useState(true);
	const [userLike, setUserLike] = useState();
	const [likes, setLikes] = useState([]);

	const { user } = UserAuth();
	const params = useParams();

	useEffect(() => {
		const apiFetch = async () => {
			// get coin info
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins/${params.coinId}`
			);
			if (!ref.ok) {
				toast.error(`No results: "${params.coinId}"`);
				// clearInterval(interId);
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoin(response);

			// get likes
			const likesRef = collection(db, 'likes');
			const q = query(likesRef, where('coinId', '==', params.coinId));
			const querySnap = await getDocs(q);
			let likesCopy = [];
			querySnap.forEach((el) => likesCopy.push({ id: el.id, data: el.data() }));
			setLikes(likesCopy);

			console.log('coinview user', user);

			if (user) {
				likesCopy.forEach((el) => {
					if (el.data.userRef === user.uid) {
						setUserLike(el);
					}
				});
			}

			setLoading(false);
		};
		// let interId = setInterval(apiFetch, 10000);
		apiFetch();

		// return () => {
		// 	clearInterval(interId);
		// };
	}, [params.coinId, user]);

	const onLike = async () => {
		if (!user) {
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
					userRef: user.uid,
					coinId: coin.id,
				});
				setUserLike({
					id: newDoc.id,
					data: {
						userRef: user.uid,
						coinId: coin.id,
					},
				});
				setLikes((prev) => {
					return [
						...prev,
						{
							id: newDoc.id,
							data: {
								userRef: user.uid,
								coinId: coin.id,
							},
						},
					];
				});
			}
		}
	};

	if (loading) {
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
