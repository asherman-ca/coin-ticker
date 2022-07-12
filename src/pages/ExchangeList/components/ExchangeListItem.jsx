import React, { useEffect, useState } from 'react';

import Spinner from '../../../components/Spinner';
import { cleanInt } from '../../../utils/stringUtils';

const ExchangeListItem = ({ exchange }) => {
	const [loading, setLoading] = useState(true);
	const [exchangeDeets, setExchangeDeets] = useState();

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/exchanges/${exchange.id}`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setExchangeDeets(response);

			setLoading(false);
		};
		apiFetch();
	}, []);

	if (loading) {
		return (
			<div className='exchange-list-item'>
				<div className='list-item-content'>
					<Spinner />
				</div>
			</div>
		);
	}

	console.log('name', exchange.name);
	console.log('deets', exchangeDeets);

	return (
		<a
			className='exchange-list-item'
			target='_blank'
			rel='noopener noreferrer'
			href={`${exchange.name !== 'Kraken' ? exchange.url : ''}`}
		>
			{console.log('name', exchange.name)}
			<div className='list-item-content'>
				<div>
					<div className='image-container'>
						<img src={exchange.image} alt='exchange' />
					</div>
				</div>
				<div className='list-item-meta'>
					<div className='meta-header'>
						<span>
							{exchange.name
								.split(' ')
								.filter((el) => el !== 'Exchange')
								.join('')}
						</span>
						<span>{exchangeDeets.country}</span>
					</div>
					<div className='meta-content'>
						{exchangeDeets.tickers.slice(0, 6).map((tickr) => {
							return (
								<div>
									<div
										key={`${tickr.base} - ${tickr.target} - ${tickr.market.name}`}
									>
										{tickr.base} / {tickr.target}
									</div>
									<div>${cleanInt(tickr.converted_volume.usd, 1000000)}M</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</a>
	);
};

export default ExchangeListItem;
