import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Embed from './components/Embed';
import Spinner from '../../components/Spinner';
import {
	capitalize,
	changeDirection,
	decimalReducer,
	nameReducer,
	cleanInt,
} from '../../utils/stringUtils';
import TickerItem from './components/TickerItem';

const CoinView = () => {
	const [coin, setCoin] = useState();
	const [loading, setLoading] = useState(true);
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

	if (loading) {
		return (
			<div className='container'>
				<div className='coin-view'>
					<Spinner />
				</div>
			</div>
		);
	}

	const based = coin.tickers?.filter(
		(el) => el.target === 'USDT' || el.target === 'USD'
	);

	const basedAndSymbol = based
		.filter((el) => coin.symbol.toUpperCase() === el.base)
		.slice(0, 24);

	return (
		<div className='home-container'>
			<div className='coin-view'>
				<header>
					<img src={coin.image.small} alt='logo' />
					{capitalize(coin.id)} ({coin.symbol})
				</header>

				<div className='detail-row'>
					<div className='col'>
						<div className='title'>Price</div>
						<div className='meta'>
							${cleanInt(coin.market_data.current_price.usd)}
						</div>
					</div>
					<div className='col'>
						<div className='title'>/ 24hr</div>
						<div
							className={
								changeDirection(coin.market_data.price_change_percentage_24h) +
								' meta'
							}
						>
							{decimalReducer(coin.market_data.price_change_percentage_24h)}%
						</div>
					</div>
					<div className='col'>
						<div className='title'>/ 7d</div>
						<div
							className={
								changeDirection(coin.market_data.price_change_percentage_7d) +
								' meta'
							}
						>
							{decimalReducer(coin.market_data.price_change_percentage_7d)}%
						</div>
					</div>

					<div className='col'>
						<div className='title'>/ ATH</div>
						<div
							className={
								changeDirection(coin.market_data.ath_change_percentage.usd) +
								' meta'
							}
						>
							{decimalReducer(coin.market_data.ath_change_percentage.usd)}%
						</div>
					</div>

					<div className='col'>
						<div className='title'>Volume</div>
						<div className='meta'>
							${(coin.market_data.total_volume.usd / 1000000000).toFixed(2)}B
						</div>
					</div>

					<div className='col'>
						<div className='title'>Market Cap</div>
						<div className='meta'>
							${(coin.market_data.market_cap.usd / 1000000000).toFixed(2)}B
						</div>
					</div>
				</div>

				<Embed symbol={coin.symbol} />

				{console.log('tickets', coin)}

				<div className='tickr-row'>
					<div className='header'>Tickrs</div>
					<div className='tickrs'>
						{basedAndSymbol.map((tickr) => (
							<TickerItem key={tickr.trade_url} tickr={tickr} />
						))}
					</div>
				</div>

				{/* <div className='ticker-row'>
					<div className='header'>Tickrs</div>
					<div className='tickers'>
						{basedAndSymbol.map((el) => (
							<div key={el.trade_url} className='col'>
								<div className='title'>{nameReducer(el.market.name)}</div>
								<div className='meta'>
									${el.last < 1.1 ? el.last.toFixed(4) : el.last.toFixed(2)}
								</div>
							</div>
						))}
					</div>
				</div> */}

				{coin.description.en && (
					<div className='description-row'>
						<span>About</span>
						{coin.description.en.replace(/<\/?a[^>]*>/g, '')}
					</div>
				)}
			</div>
		</div>
	);
};

export default CoinView;
