import { Link } from 'react-router-dom';
import {
	capitalize,
	changeDirection,
	cleanInt,
} from '../../../utils/stringUtils';

const CoinListItem = ({ coin }) => {
	const changeType = changeDirection(
		coin.market_data.price_change_percentage_24h
	);

	const changeType1h = changeDirection(
		coin.market_data.price_change_percentage_1h_in_currency.usd
	);

	const changeTypeWeek = changeDirection(
		coin.market_data.price_change_percentage_7d
	);

	return (
		<Link to={`/coins/${coin.id}`} className='link coin-list-item'>
			<div className='col link-col'>
				<img src={coin.image.thumb} />
				<span className='coin-list-item-span'>{capitalize(coin.name)}</span>
			</div>
			<div className='col'>
				<span className='price-span'>
					${cleanInt(coin.market_data.current_price.usd)}
				</span>
			</div>
			<div className='col hr-col'>
				<span className={changeType1h}>
					{coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
						2
					)}
					%
				</span>
			</div>
			<div className='col daily-col'>
				<span className={changeType}>
					{coin.market_data.price_change_percentage_24h.toFixed(2)}%
				</span>
			</div>
			<div className='col weekly-col'>
				<span className={changeTypeWeek}>
					{coin.market_data.price_change_percentage_7d.toFixed(2)}%
				</span>
			</div>
			<div className='col vol-col'>
				<span>
					${(coin.market_data.total_volume.usd / 1000000000).toFixed(2)}B
				</span>
			</div>
			<div className='col mcap-col'>
				<span>
					${(coin.market_data.market_cap.usd / 1000000000).toFixed(2)}B
				</span>
			</div>
		</Link>
	);
};

export default CoinListItem;
