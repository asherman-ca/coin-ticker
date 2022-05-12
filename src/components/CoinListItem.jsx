import { Link } from 'react-router-dom';
import '../styles/CoinListItem.css';

const CoinListItem = ({ coin }) => {
	let changeType = '';
	if (coin.market_data.price_change_percentage_24h < -0.1) {
		changeType = 'neg-change';
	} else if (coin.market_data.price_change_percentage_24h > 0) {
		changeType = 'pos-change';
	}

	return (
		<tr className='coin-list-item'>
			<td>
				<Link to={`/${coin.id}`} className='link'>
					<img src={coin.image.thumb} /> {coin.id}
				</Link>
			</td>
			<td>$ {coin.market_data.current_price.usd}</td>
			<td className={changeType}>
				{Math.round(coin.market_data.price_change_percentage_24h * 10) / 10}%
			</td>
			<td>
				{Math.round((coin.market_data.market_cap.usd / 1000000000) * 10) / 10}B
			</td>
			{console.log(coin)}
		</tr>
	);
};

export default CoinListItem;
