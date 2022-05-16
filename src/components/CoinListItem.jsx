import { Link } from 'react-router-dom';
import { capitalize } from '../utils/stringUtils';
import '../styles/CoinListItem.css';

const CoinListItem = ({ coin }) => {
	let changeType = '';
	if (coin.market_data.price_change_percentage_24h < -0.05) {
		changeType = 'neg-change';
	} else if (coin.market_data.price_change_percentage_24h >= 0.05) {
		changeType = 'pos-change';
	}

	return (
		<Link to={`/${coin.id}`} className='link coin-list-item'>
			{/* <div className='coin-list-item'> */}
			<div className='col link-col'>
				<img src={coin.image.thumb} />{' '}
				<span className='coin-list-item-span'>{capitalize(coin.id)}</span>
			</div>
			<div className='col'>
				<span className='price-span'>
					${coin.market_data.current_price.usd}
				</span>
			</div>
			<div className='col'>
				<span className={changeType}>
					{Math.round(coin.market_data.price_change_percentage_24h * 10) / 10}%
				</span>
			</div>
			<div className='col'>
				<span>
					{Math.round(
						((coin.market_data.total_volume.usd / 1000000000) * 10) / 10
					)}
					B
				</span>
			</div>
			<div className='col'>
				<span>
					{Math.round((coin.market_data.market_cap.usd / 1000000000) * 10) / 10}
					B
				</span>
			</div>
			{/* </div> */}
		</Link>
	);
};

export default CoinListItem;
