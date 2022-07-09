import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';

import ExchangeListItem from './components/ExchangeListItem';

const ExchangeList = ({ coinsLoading, btcPrice }) => {
	const [exchanges, setExchanges] = useState();
	const [loading, setLoading] = useState(true);

	const [calcsLoading, setCalcsLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/exchanges?per_page=50`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setExchanges(response);

			setLoading(false);
		};
		apiFetch();
	}, []);

	useEffect(() => {
		if (!coinsLoading && !loading) {
			setExchanges((prev) => {
				return [
					...prev.map((exchange) => {
						return {
							...exchange,
							btcThing: exchange.trade_volume_24h_btc * btcPrice,
						};
					}),
				];
			});
			setCalcsLoading(false);
		}
	}, [coinsLoading, loading]);

	if (loading || calcsLoading) {
		return (
			<div className='container'>
				<div className='exchange-list'>
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div className='container exchange-container'>
			{console.log(exchanges)}
			<div className='exchange-list'>
				<div className='exchanges'>
					<div className='header'>Exchanges</div>
					<div className='list'>
						{exchanges.map((exchange) => {
							return (
								<ExchangeListItem
									key={exchange.id}
									exchange={exchange}
									// btcPrice={btcPrice}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExchangeList;
