import { useEffect, useState } from 'react';
import '../styles/Home.css';

const Home = () => {
	const [coins, setCoins] = useState();

	useEffect(() => {
		fetch(`https://api.coingecko.com/api/v3/coins?per_page=20`)
			.then((response) => response.json())
			.then((response) => console.log(response));
	}, []);

	// const interval = setInterval(
	// 	fetch(`https://api.coingecko.com/api/v3/coins?per_page=20`)
	// 		.then((response) => response.json())
	// 		.then((response) => console.log(response)),
	// 	5000
	// );

	const fetchData = () => {
		fetch(`https://api.coingecko.com/api/v3/coins?per_page=20`).then(
			(response) => console.log(response.json())
		);
	};

	setInterval(fetchData, 5000);

	return (
		<div className='container'>
			<div className='home'>
				<div className='header'>
					<span>Cryptocurrency Prices Live</span>
					<span>Top Coins by Market Cap</span>
				</div>
				<div className='coin-list'>Coin list</div>
			</div>
		</div>
	);
};

export default Home;
