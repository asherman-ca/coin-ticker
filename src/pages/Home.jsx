import { useEffect, useState } from 'react';
import CoinListItem from '../components/CoinListItem';
import Spinner from '../components/Spinner';

const Home = () => {
	const [coins, setCoins] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=20`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoins(response);
			setLoading(false);
		};
		apiFetch();
		// setInterval(apiFetch, 15000);
	}, []);

	if (loading) {
		return (
			<div className='container'>
				<div className='home'>
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div className='home-container'>
			<div className='home'>
				<div className='header'>
					<span>Live Cryptocurrency Prices</span>

					<span>Top Coins by Market Cap</span>
				</div>

				<div className='coin-list'>
					<div className='coin-list-header'>
						<div className='col link-col'></div>
						<div className='col'>Price</div>
						<div className='col'>/ 1hr</div>
						<div className='col daily-col'>/ 24hr</div>
						<div className='col weekly-col'>/ 7d</div>
						<div className='col'>Vol</div>
						<div className='col'>M Cap</div>
					</div>
					{coins.map((coin) => (
						<CoinListItem coin={coin} key={coin.id} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Home;
