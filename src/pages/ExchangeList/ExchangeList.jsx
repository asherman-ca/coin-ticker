import React, { useState, useEffect } from 'react';

import ExchangeListItem from './components/ExchangeListItem';

const ExchangeList = () => {
	const [exchanges, setExchanges] = useState();
	const [loading, setLoading] = useState(true);

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

	if (loading) {
		return <div>Loading</div>;
	}

	return (
		<div className='container exchange-container'>
			<div className='exchange-list'>
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
