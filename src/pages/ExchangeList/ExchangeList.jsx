import React, { useState, useEffect } from 'react';
import Spinner from '../../components/Spinner';

import ExchangeListItem from './components/ExchangeListItem';

const ExchangeList = ({ coinsLoading, btcPrice }) => {
	const [exchanges, setExchanges] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!coinsLoading) {
			const apiFetch = async () => {
				const ref = await fetch(
					`https://api.coingecko.com/api/v3/exchanges?per_page=50`
				);
				if (!ref.ok) {
					throw new Error('Thrown Error Thrown');
				}
				const response = await ref.json();

				setExchanges([
					...response.map((exchange) => ({
						...exchange,
						btcVolUsd: exchange.trade_volume_24h_btc * btcPrice,
					})),
				]);

				setLoading(false);
			};
			apiFetch();
		}
	}, [coinsLoading, btcPrice]);

	if (loading || coinsLoading) {
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
				<div className='exchange-list-header'>
					<span>Top Crypto Exchanges</span>
					<span>Sorted by Trust Rank</span>
				</div>
				<div className='exchanges'>
					<div className='header'>Exchanges</div>
					<div className='list'>
						{exchanges.map((exchange) => {
							return <ExchangeListItem key={exchange.id} exchange={exchange} />;
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ExchangeList;

// const [calcsLoading, setCalcsLoading] = useState(true);

// useEffect(() => {
// 	if (!coinsLoading && !loading) {
// setExchanges((prev) => {
// 	return [
// 		...prev.map((exchange) => {
// 			return {
// 				...exchange,
// 				btcThing: exchange.trade_volume_24h_btc * btcPrice,
// 			};
// 		}),
// 	];
// 		});
// 		setCalcsLoading(false);
// 	}
// }, [coinsLoading, loading]);
