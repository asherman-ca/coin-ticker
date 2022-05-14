import { Link } from 'react-router-dom';
import { capitalize } from '../utils/stringUtils';
import '../styles/CoinListItem.css';

const CoinListItem = ({ coin }) => {
	let changeType = '';
	if (coin.market_data.price_change_percentage_24h < -0.08) {
		changeType = 'neg-change';
	} else if (coin.market_data.price_change_percentage_24h > 0.08) {
		changeType = 'pos-change';
	}

	return (
		<div className='coin-list-item'>
			<div className='col link-col'>
				<Link to={`/${coin.id}`} className='link'>
					<img src={coin.image.thumb} />{' '}
					<span className='coin-list-item-span'>{capitalize(coin.id)}</span>
				</Link>
			</div>
			<div className='col'>
				<span className='price-span'>
					${coin.market_data.current_price.usd}
				</span>
			</div>
			<div className='col'>
				<span>
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
		</div>
		// <tr className='coin-list-item'>
		// 	<td>
		// 		<Link to={`/${coin.id}`} className='link'>
		// 			<img src={coin.image.thumb} /> {capitalize(coin.id)}
		// 		</Link>
		// 	</td>
		// 	<td>$ {coin.market_data.current_price.usd}</td>
		// 	<td className={changeType}>
		// 		{Math.round(coin.market_data.price_change_percentage_24h * 10) / 10}%
		// 	</td>
		// 	<td>
		// 		{Math.round((coin.market_data.market_cap.usd / 1000000000) * 10) / 10}B
		// 	</td>
		// </tr>
	);
};

export default CoinListItem;
