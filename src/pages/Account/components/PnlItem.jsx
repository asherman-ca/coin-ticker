import { Link } from 'react-router-dom';
import { cleanInt } from '../../../utils/stringUtils';

const PnlItem = ({ account }) => {
	return (
		<div className='pnl-item' key={account.coin}>
			<Link to={`/coins/${account.coinId}`} className='pnl-link'>
				<img src={account.image} alt='coin' />
				{account.coin}
			</Link>
			<div>${cleanInt(account.totalValue)}</div>
			<div>${cleanInt(account.pnl)}</div>
			<div>${cleanInt(account.rpnl)}</div>
			<div>${cleanInt(account.averagePrice)}</div>
		</div>
	);
};

export default PnlItem;
