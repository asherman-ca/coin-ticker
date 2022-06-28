import { Link } from 'react-router-dom';

import { cleanInt } from '../../../utils/stringUtils';

const OrderItem = ({ order, onDelete }) => {
	return (
		<div className='order-item'>
			<i className='fa-solid fa-circle-minus' onClick={onDelete}></i>
			<Link to={`/coins/${order.data.coinId}`} className='pnl-link'>
				<div className='order-item-link'>{order.data.coin}</div>
			</Link>
			<div className={order.data.type === 'buy' ? 'pos-change' : 'neg-change'}>
				{order.data.type}
			</div>
			<div>${cleanInt(order.data.spent)}</div>
			<div>${cleanInt(order.data.price)}</div>
		</div>
	);
};

export default OrderItem;
