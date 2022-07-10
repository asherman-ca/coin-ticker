import React from 'react';
import { cleanInt } from '../../../utils/stringUtils';

const ExchangeListItem = ({ exchange }) => {
	return (
		<a
			className='exchange-list-item'
			target='_blank'
			rel='noopener noreferrer'
			href={`${exchange.url}`}
		>
			{/* {console.log('namef', exchange)} */}
			<div className='list-item-content'>
				<img src={exchange.image} alt='' />
				<div className='list-item-meta'>
					<div>{exchange.name}</div>
					<div>{cleanInt(exchange.btcVolUsd, 1000000000)} B</div>
				</div>
			</div>
		</a>
	);
};

export default ExchangeListItem;
