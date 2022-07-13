import React from 'react';
import {
	capitalize,
	changeDirection,
	decimalReducer,
	cleanInt,
} from '../../../utils/stringUtils';

const CoinViewHeader = ({ coin, user }) => {
	const onLike = () => {
		if (user) {
			console.log('hits');
		}
	};

	return (
		<div className='sub-header-col'>
			<div className='detail-row'>
				<div className='header-col'>
					<img src={coin.image.large} alt='' />
					<div>
						<div className='title'>{capitalize(coin.id)}</div>
						<div className='subtitle'>{coin.symbol.toUpperCase()}</div>
					</div>
				</div>

				<div className='col'>
					<div className='title'>Price</div>
					<div className='meta'>
						${cleanInt(coin.market_data.current_price.usd)}
					</div>
				</div>

				<div className='col'>
					<div className='title'>24hr</div>
					<div
						className={
							changeDirection(coin.market_data.price_change_percentage_24h) +
							' meta'
						}
					>
						{decimalReducer(coin.market_data.price_change_percentage_24h)}%
					</div>
				</div>

				<div className='col'>
					<div className='title'>7d</div>
					<div
						className={
							changeDirection(coin.market_data.price_change_percentage_7d) +
							' meta'
						}
					>
						{decimalReducer(coin.market_data.price_change_percentage_7d)}%
					</div>
				</div>

				<div className='col'>
					<div className='title'>ATH</div>
					<div
						className={
							changeDirection(coin.market_data.ath_change_percentage.usd) +
							' meta'
						}
					>
						{decimalReducer(coin.market_data.ath_change_percentage.usd)}%
					</div>
				</div>

				<div className='col'>
					<div className='title'>Volume</div>
					<div className='meta'>
						${(coin.market_data.total_volume.usd / 1000000000).toFixed(2)}B
					</div>
				</div>

				<div className='col'>
					<div className='title'>Market Cap</div>
					<div className='meta'>
						${(coin.market_data.market_cap.usd / 1000000000).toFixed(2)}B
					</div>
				</div>
			</div>

			<div className='social-row'>
				<div className='col'>
					<i className='fa-regular fa-heart' onClick={onLike}></i> 1562
				</div>
			</div>
		</div>
	);
};

export default CoinViewHeader;
