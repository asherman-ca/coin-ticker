import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { query, where, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

import Embed from './components/Embed';
import Spinner from '../../components/Spinner';
import { capitalize } from '../../utils/stringUtils';
import TickerItem from './components/TickerItem';
import CoinViewHeader from './components/CoinViewHeader';
import { UserAuth } from '../../context/AuthContext';
import { onLike, tickerFilter } from './CoinViewActions';

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

	if (loading) {
		return (
			<div className='container'>
				<div className='coin-view'>
					<Spinner />
				</div>
			</div>
		);
	}

	const basedAndSymbol = tickerFilter(coin);

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
					onLike={() => onLike(user, setLikes, setUserLike, userLike, coin)}
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
