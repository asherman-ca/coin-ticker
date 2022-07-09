import React, { useState, useEffect } from 'react';

import ExchangeListItem from './components/ExchangeListItem';

const ExchangeList = () => {
	const [exchanges, setExchanges] = useState();
	const [loading, setLoading] = useState();

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/exchanges?per_page=100`
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

	return <div>{console.log('exchanges', exchanges)}ExchangeList</div>;
};

export default ExchangeList;
