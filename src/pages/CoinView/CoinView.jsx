import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Embed from './components/Embed';
import Spinner from '../../components/Spinner';
import { capitalize } from '../../utils/stringUtils';
import TickerItem from './components/TickerItem';
import CoinViewHeader from './components/CoinViewHeader';

const CoinView = () => {
	const auth = getAuth();
	const [coin, setCoin] = useState();
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);
	const [userLoading, setUserLoading] = useState(true);
	const isMounted = useRef(true);
	const params = useParams();

	useEffect(() => {
		const apiFetch = async () => {
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
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				} else {
					setLoggedIn(false);
				}
				setUserLoading(false);
			});
		}
	}, [isMounted]);

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
				<CoinViewHeader coin={coin} user={auth.currentUser} />
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
