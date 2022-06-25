import { Link } from 'react-router-dom';
import { cleanInt } from '../../../utils/stringUtils';

const PnlItem = ({ account }) => {
	return (
		<div className='pnl-item' key={account.coin}>
			<Link to={`/${account.coinId}`}>{account.coin}</Link>
			<div className={account.pnl >= 0 ? 'pos-change' : 'neg-change'}>
				${cleanInt(account.pnl)}
			</div>
			<div className={account.rpnl >= 0 ? 'pos-change' : 'neg-change'}>
				${cleanInt(account.rpnl)}
			</div>
			<div>
				{account.totalCoins >= 0.01
					? cleanInt(account.totalCoins)
					: account.totalCoins.toFixed(4)}
			</div>
			<div>${cleanInt(account.averagePrice)}</div>
		</div>
	);
};

export default PnlItem;
