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
				<div className='image-container'>
					<img src={exchange.image} alt='' />
				</div>
				<div className='list-item-meta'>
					<div className='meta-header'>{exchange.name}</div>
					<div className='meta-content'>
						<div>
							<div>BTC Volume</div>
							<div>${cleanInt(exchange.btcVolUsd, 1000000000)} B</div>
						</div>
						<div>
							<div>Trust Rank</div>
							<div>{exchange.trust_score_rank}</div>
						</div>
						<div>
							<div>Trust Score</div>
							<div>{exchange.trust_score}</div>
						</div>
					</div>
				</div>
			</div>
		</a>
	);
};

export default ExchangeListItem;
