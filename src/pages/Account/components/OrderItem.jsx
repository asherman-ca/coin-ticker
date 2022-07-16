import { Link } from 'react-router-dom';

import { cleanInt } from '../../../utils/stringUtils';

const OrderItem = ({ order, onDelete }) => {
	return (
		<div className='order-item'>
			<Link to={`/coins/${order.data.coinId}`}>
				<img src={order.data.image} alt='coin' />
				<div className='order-item-link'>{order.data.coin}</div>
			</Link>
			<div>${cleanInt(order.data.spent)}</div>
			<div className={order.data.type === 'buy' ? 'pos-change' : 'neg-change'}>
				{order.data.type}
			</div>
			<div>{cleanInt(order.data.spent / order.data.price)}</div>
			<div>${cleanInt(order.data.price)}</div>
		</div>
	);
};

export default OrderItem;
