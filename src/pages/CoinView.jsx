import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { capitalize } from '../utils/stringUtils';
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

	return (
		<div className='container'>
			<div className='coin-view'>
				{console.log('coin', coin)}
				<header>
					<img src={coin.image.small} alt='logo' />
					{capitalize(coin.id)} (#{coin.market_cap_rank})
				</header>

				<div className='details'>
					<div className='row'>
						<div className='title'>Price</div>
						<div className='meta'>{coin.market_data.current_price.usd}</div>
					</div>
					<div className='row'>
						<div className='title'>% / 24hr</div>
						<div className='meta'>
							{coin.market_data.price_change_percentage_24h}
						</div>
					</div>
					<div className='row'>
						<div className='title'>% / 7d</div>
						<div className='meta'>
							{coin.market_data.price_change_percentage_7d}
						</div>
					</div>

					<div className='row'>
						<div className='title'>% / ATH</div>
						<div className='meta'>
							{coin.market_data.ath_change_percentage.usd}
						</div>
					</div>

					<div className='row'>
						<div className='title'>% / ATH</div>
						<div className='meta'>
							{coin.market_data.ath_change_percentage.usd}
						</div>
					</div>
				</div>

				<div className='description'>
					<span>About:</span>
					<span>{coin.description.en}</span>
				</div>
			</div>
		</div>
	);
};

export default CoinView;
