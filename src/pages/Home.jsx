import { useEffect, useState } from 'react';
import CoinListItem from '../components/CoinListItem';
import '../styles/Home.css';

const Home = () => {
	const [coins, setCoins] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=20`
			);
			const response = await ref.json();
			setCoins(response);
			setLoading(false);
		};
		apiFetch();
	}, []);

	// const apiReFetch = async () => {
	// 	const ref = await fetch(
	// 		`https://api.coingecko.com/api/v3/coins?per_page=20`
	// 	);
	// 	const response = await ref.json();
	// 	console.log('res', response);
	// 	setCoins(response);
	// };

	// setInterval(apiReFetch, 10000);

	// const tickr = () => {
	// 	setTick((prev) => {
	// 		return tick + 1;
	// 	});
	// };

	// setInterval(() => setTick(( + 1), 5000);

	// console.log('hits');

	// const liveCoinFetchr = async () => {
	// 	console.log('hits');
	// 	const thing = await fetch(
	// 		new Request('https://api.livecoinwatch.com/coins/list'),
	// 		{
	// 			method: 'POST',
	// 			headers: new Headers({
	// 				'content-type': 'application/json',
	// 				'x-api-key': '17e3d2ac-c2cf-4fb7-a839-fdf9fc65e6a9',
	// 			}),
	// 			body: JSON.stringify({
	// 				current: 'USD',
	// 				sort: 'rank',
	// 				order: 'ascending',
	// 				offset: 0,
	// 				limit: 20,
	// 				meta: false,
	// 			}),
	// 		}
	// 	);
	// 	const res = await thing.json();
	// 	console.log('livewatchres', res);
	// };

	// liveCoinFetchr();

	// setInterval(liveCoinFetchr, 3000);

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<div className='container'>
			{console.log(coins)}
			<div className='home'>
				<div className='header'>
					<span>Live Cryptocurrency Prices</span>

					<span>Top Coins by Market Cap</span>
				</div>
				<div className='coin-list-container'>
					<table className='coin-list'>
						<thead>
							<tr>
								<th>Coin</th>
								<th>Price</th>
								<th>% / 24hr</th>
								<th>Market Cap</th>
							</tr>
						</thead>
						<tbody>
							{coins.map((coin) => (
								<CoinListItem coin={coin} key={coin.id} />
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Home;
