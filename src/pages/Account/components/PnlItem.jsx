import { Link } from 'react-router-dom';
import { changeDirection, cleanInt } from '../../../utils/stringUtils';

const PnlItem = ({ account }) => {
	const changeType = changeDirection(account.pnl);
	const rpnlChangeType = changeDirection(account.rpnl);

	return (
		<div className='pnl-item' key={account.coin}>
			<Link to={`/coins/${account.coinId}`} className='pnl-link'>
				<img src={account.image} alt='coin' />
				{account.coin}
			</Link>
			<div>${cleanInt(account.totalValue)}</div>
			<div className={changeType}>${cleanInt(account.pnl)}</div>
			<div className={rpnlChangeType}>${cleanInt(account.rpnl)}</div>
			<div>${cleanInt(account.averagePrice)}</div>
		</div>
	);
};

export default PnlItem;
