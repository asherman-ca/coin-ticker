import React from 'react';

import { cleanInt } from '../../../utils/stringUtils';

const TickerItem = ({ tickr }) => {
	return (
		<a
			href={`${tickr.trade_url}`}
			target='_blank'
			rel='noopener noreferrer'
			className='tickr-item'
		>
			<img
				src={`./exchangeLogos/${tickr.market.identifier}.png`}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = './logo192.png';
				}}
			/>
			<div>
				<div className='title'>{tickr.market.name}</div>
				<div className='subtitle'>{tickr.target}</div>
			</div>
			<div>
				<div>${cleanInt(tickr.last)}</div>
				<div className='subtitle'>
					${(tickr.converted_volume.usd / 1000000).toFixed(2)}M
				</div>
			</div>
		</a>
	);
};

export default TickerItem;
