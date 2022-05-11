import { useEffect, useState } from 'react';

const CoinView = () => {
	const [coin, setCoin] = useState();
	useEffect(() => {
		fetch(`https://api.coingecko.com/api/v3/coins/bitcoin`)
			.then((response) => response.json())
			.then((response) => console.log(response));
	}, []);

	return (
		<div className='container'>
			<div className='coin-view'>coin view</div>
		</div>
	);
};

export default CoinView;
