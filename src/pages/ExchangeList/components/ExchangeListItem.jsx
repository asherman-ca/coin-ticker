import React from 'react';
import { cleanInt } from '../../../utils/stringUtils';

const ExchangeListItem = ({ exchange, btcPrice }) => {
	return (
		<a
			className='exchange-list-item'
			target='_blank'
			rel='noopener noreferrer'
			href={`${exchange.url}`}
		>
			{/* {console.log('ex', exchange.trust_score_rank)} */}
			{/* {console.log('namef', exchange.name)} */}
			<div className='list-item-content'>
				<img src={exchange.image} alt='' />
				<div className='list-item-meta'>
					<div>{exchange.name}</div>
					<div>{cleanInt(exchange.trade_volume_24h_btc)}</div>
				</div>
			</div>
		</a>
	);
};

export default ExchangeListItem;
