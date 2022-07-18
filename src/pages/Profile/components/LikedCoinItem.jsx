import React from 'react';
import { cleanInt } from '../../../utils/stringUtils';

const LikedCoinItem = ({ coin }) => {
	console.log('like', coin);
	return (
		<div className='liked-coin-item'>
			<div className='content'>
				<div className='name'>{coin.name}</div>
				<img src={coin.image.large} alt='' />
				<div className='price'>
					<div>${cleanInt(coin.market_data.current_price.usd)}</div>
					<div>
						{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
							2
						)}
						%
					</div>
				</div>
			</div>
		</div>
	);
};

export default LikedCoinItem;
