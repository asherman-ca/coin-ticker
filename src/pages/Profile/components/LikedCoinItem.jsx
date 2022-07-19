import React from 'react';
import { Link } from 'react-router-dom';

import { cleanInt, changeDirection } from '../../../utils/stringUtils';

const LikedCoinItem = ({ coin }) => {
	console.log('like', coin);

	const changeType = changeDirection(
		coin.market_data.price_change_percentage_24h_in_currency.usd
	);

	return (
		<Link to={`/coins/${coin.id}`} className='liked-coin-item'>
			<div className='content'>
				<div className='name'>{coin.name}</div>
				<img src={coin.image.large} alt='' />
				<div className='price'>
					<div>${cleanInt(coin.market_data.current_price.usd)}</div>
					<div className={changeType}>
						{coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
							2
						)}
						%
					</div>
				</div>
			</div>
		</Link>
	);
};

export default LikedCoinItem;
