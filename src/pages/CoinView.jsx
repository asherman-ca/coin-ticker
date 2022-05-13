import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	capitalize,
	changeDirection,
	decimalReducer,
} from '../utils/stringUtils';
import '../styles/CoinView.css';

const CoinView = () => {
	const [coin, setCoin] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins/${params.coinId}`
			);
			const response = await ref.json();
			setCoin(response);
			setLoading(false);
		};
		apiFetch();
		// setInterval(apiFetch, 15000);
	}, [params.coinId]);

	if (loading) {
		return (
			<div className='container'>
				<div className='coint-view'>Spinner</div>
			</div>
		);
	}
	{
		console.log('coin', coin);
	}

	return (
		<div className='container'>
			<div className='coin-view'>
				<header>
					<img src={coin.image.small} alt='logo' />
					{capitalize(coin.id)} (#{coin.market_cap_rank})
				</header>

				<div className='detail-row'>
					<div className='header'>Price Action</div>
					<div className='list'>
						<div className='col'>
							<div className='title'>Price</div>
							<div className='meta'>{coin.market_data.current_price.usd}</div>
						</div>
						<div className='col'>
							<div className='title'>/ 24hr</div>
							<div
								className={changeDirection(
									coin.market_data.price_change_percentage_24h
								)}
							>
								{decimalReducer(coin.market_data.price_change_percentage_24h)} %
							</div>
						</div>
						<div className='col'>
							<div className='title'>/ 7d</div>
							<div
								className={changeDirection(
									coin.market_data.price_change_percentage_7d
								)}
							>
								{decimalReducer(coin.market_data.price_change_percentage_7d)} %
							</div>
						</div>

						<div className='col'>
							<div className='title'>/ ATH</div>
							<div
								className={changeDirection(
									coin.market_data.ath_change_percentage.usd
								)}
							>
								{decimalReducer(coin.market_data.ath_change_percentage.usd)} %
							</div>
						</div>
					</div>
				</div>

				<div className='ticker-row'>
					<div className='header'>Tickers</div>
					<div className='tickers'>
						{coin.tickers.slice(0, 20).map((el) => (
							<div className='col'>
								<div className='title'>{el.market.name}</div>
								<div className='meta'>{Math.trunc(el.last)}</div>
							</div>
						))}
					</div>
				</div>

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
