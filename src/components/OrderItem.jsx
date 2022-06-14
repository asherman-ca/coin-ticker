import { cleanInt } from '../utils/stringUtils';

const OrderItem = ({ order, onDelete }) => {
	return (
		<div className='order-item'>
			<i className='fa-solid fa-trash-can' onClick={onDelete}></i>
			<div>{order.data.coin}</div>
			<div className={order.data.type === 'buy' ? 'pos-change' : 'neg-change'}>
				{order.data.type}
			</div>
			<div>${cleanInt(order.data.spent)}</div>
			<div>${cleanInt(order.data.price)}</div>
		</div>
	);
};

export default OrderItem;
