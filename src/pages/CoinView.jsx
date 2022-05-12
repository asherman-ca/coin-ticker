import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
		setInterval(apiFetch, 15000);
	}, [params.coinId]);

	if (loading) {
		return <div className='container'>Spinner</div>;
	}

	console.log('coin', coin);

	return (
		<div className='container'>
			<div className='coin-view'>
				<div className='header'>{coin.id}</div>
				<div className='details'>{coin.market_data.current_price.usd}</div>
			</div>
		</div>
	);
};

export default CoinView;
