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

	const btcTickers = exchangeDeets.tickers.filter(
		(ticker) => ticker.base === 'BTC'
	);

	const ethTickers = exchangeDeets.tickers.filter(
		(ticker) => ticker.base === 'ETH'
	);

	const displayTickers = [btcTickers[0], ethTickers[0]];

	// if (exchange.name === 'BitMEX') {
	console.log('name', exchange.name);
	console.log('displays', displayTickers);
	// }

	return (
		<a
			className='exchange-list-item'
			target='_blank'
			rel='noopener noreferrer'
			href={`${exchange.url}`}
		>
			<div className='list-item-content'>
				<div>
					<div className='image-container'>
						<img src={exchange.image} alt='exchange' />
					</div>
					<div className='social-container'>
						<i className='fa-brands fa-facebook'></i>
						<i className='fa-brands fa-reddit'></i>
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
						{displayTickers.map((tickr) => {
							// console.log('name', exchange.name);
							// console.log('tickr', tickr);
							if (tickr) {
								return (
									<div
										key={`${tickr.base} - ${tickr.target} - ${tickr.market.name}`}
									>
										<div>
											<div>
												{tickr.base} / {tickr.target}
											</div>
											<div>${cleanInt(tickr.last)}</div>
										</div>
										<div>
											<div>Volume</div>
											<div>
												${cleanInt(tickr.converted_volume.usd, 1000000)}M
											</div>
										</div>
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
		</a>
	);
};

export default ExchangeListItem;
