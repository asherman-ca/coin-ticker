import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ExchangeView = () => {
	const [exchange, setExchange] = useState();
	const [loading, setLoading] = useState();
	const params = useParams();

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/exchanges/${params.exchangeId}`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setExchange(response);
			setLoading(false);
		};
		apiFetch();
	}, []);

	if (loading) {
		return <div>Loading</div>;
	}

	return <div>{console.log('exchange', exchange)}ExchangeView</div>;
};

export default ExchangeView;
