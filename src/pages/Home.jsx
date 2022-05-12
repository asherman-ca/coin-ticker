import { useEffect, useState } from 'react';
import CoinListItem from '../components/CoinListItem';
import '../styles/Home.css';

const Home = () => {
	const [coins, setCoins] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch(`https://api.coingecko.com/api/v3/coins?per_page=20`)
			.then((response) => response.json())
			.then((response) => setCoins(response))
			.then(() => setLoading(false));
	}, []);

	// const interval = setInterval(
	// 	fetch(`https://api.coingecko.com/api/v3/coins?per_page=20`)
	// 		.then((response) => response.json())
	// 		.then((response) => console.log(response)),
	// 	5000
	// );

	// const fetchData = () => {
	// 	fetch(`https://api.coingecko.com/api/v3/coins?per_page=20`)
	// 		.then((response) => response.json())
	// 		.then((response) => setCoins(response));
	// };

	// setInterval(fetchData, 5000);

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<div className='container'>
			{console.log(coins)}
			<div className='home'>
				<div className='header'>
					<span>Cryptocurrency Prices Live</span>
					<span>Top Coins by Market Cap</span>
				</div>
				<div className='coin-list-container'>
					<table className='coin-list'>
						<tr>
							<th>Coin</th>
							<th>Price</th>
							<th>% / 24hr</th>
							<th>Market Cap</th>
						</tr>
						{coins.map((coin) => (
							<CoinListItem coin={coin} key={coin.id} />
						))}
					</table>
				</div>
			</div>
		</div>
	);
};

export default Home;
