import React from 'react';
import { Link } from 'react-router-dom';

import { cleanInt, changeDirection } from '../../../utils/stringUtils';

const TrendingCard = ({ coins, title }) => {
	return (
		<div className='trending-card'>
			<div className='title'>
				<i className='fa-solid fa-fire' />
				<div>{title}</div>
			</div>
			<div className='list'>
				{coins.map((coin, idx) => (
					<Link
						to={`/coins/${coin.id}`}
						key={`${coin.symbol} - ${idx}`}
						className='item'
					>
						<div className='coin-title'>
							<span>{idx + 1}</span> <img src={coin.image.thumb} alt='' />{' '}
							{coin.name} <span>{coin.symbol}</span>
						</div>
						<div
							className={
								title.includes('Daily')
									? changeDirection(
											coin.market_data.price_change_percentage_24h
									  )
									: changeDirection(coin.market_data.price_change_percentage_7d)
							}
						>
							{title.includes('Daily')
								? cleanInt(coin.market_data.price_change_percentage_24h)
								: cleanInt(coin.market_data.price_change_percentage_7d)}
							%
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default TrendingCard;
