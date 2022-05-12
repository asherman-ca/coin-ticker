import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CoinView.css';

const CoinView = () => {
	const [coin, setCoin] = useState();
	const [loading, setLoading] = useState(true);
	const params = useParams();

	useEffect(() => {
		fetch(`https://api.coingecko.com/api/v3/coins/${params.coinId}`)
			.then((response) => response.json())
			.then((response) => setCoin(response))
			.then(() => setLoading(false));
	}, [params.coinId]);

	if (loading) {
		return <div className='container'>Spinner</div>;
	}

	return (
		<div className='container'>
			{console.log(coin)}
			<div className='coin-view'>
				<div className='header'>
					<div>{coin.id}</div>
					<div>{coin.market_data.current_price.usd}</div>
				</div>
				<div className='details'></div>
			</div>
		</div>
	);
};

export default CoinView;
