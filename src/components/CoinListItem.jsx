import { Link } from "react-router-dom";
import { capitalize, changeDirection } from "../utils/stringUtils";
import "../styles/CoinListItem.css";

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
		<Link to={`/${coin.id}`} className='link coin-list-item'>
			<div className='col link-col'>
				<img src={coin.image.thumb} />{" "}
				<span className='coin-list-item-span'>{capitalize(coin.id)}</span>
			</div>
			<div className='col'>
				<span className='price-span'>
					$
					{coin.market_data.current_price.usd > 1
						? coin.market_data.current_price.usd
								.toString()
								.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, "$&,")
						: coin.market_data.current_price.usd}
				</span>
			</div>
			<div className='col'>
				<span className={changeType1h}>
					{Math.round(
						coin.market_data.price_change_percentage_1h_in_currency.usd * 10
					) / 10}
					%
				</span>
			</div>
			<div className='col daily-col'>
				<span className={changeType}>
					{Math.round(coin.market_data.price_change_percentage_24h * 10) / 10}%
				</span>
			</div>
			<div className='col weekly-col'>
				<span className={changeTypeWeek}>
					{Math.round(coin.market_data.price_change_percentage_7d * 10) / 10}%
				</span>
			</div>
			<div className='col'>
				<span>
					{(coin.market_data.total_volume.usd / 1000000000).toFixed(2)}B
				</span>
			</div>
			<div className='col'>
				<span>
					{(coin.market_data.market_cap.usd / 1000000000).toFixed(2)}B
				</span>
			</div>
		</Link>
	);
};

export default CoinListItem;
