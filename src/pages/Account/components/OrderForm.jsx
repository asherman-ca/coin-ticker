import React from 'react';
import GateButton from '../../../components/GateButton';

const OrderForm = ({
	onOrder,
	onSelect,
	onChange,
	formData,
	setFormData,
	coins,
	orders,
	setOrders,
	setPnl,
}) => {
	console.log('coins', coins);
	return (
		<div className='form-div'>
			<div className='header'>Market Order</div>
			<form className='buy-sell-form'>
				<select
					name='coin'
					id='coin'
					onChange={(e) => onSelect(e, setFormData, coins)}
				>
					{coins.map((doc) => (
						<option key={doc.id} value={doc.name}>
							{doc.name}
						</option>
					))}
				</select>
				<input
					onChange={(e) => onChange(e, setFormData)}
					id='price'
					placeholder={formData.price}
					type='number'
				/>
				<input
					onChange={(e) => onChange(e, setFormData)}
					id='spent'
					placeholder='$ Amount'
					type='number'
				/>
				<div className='button-row'>
					<GateButton
						onClick={(e) =>
							onOrder(e, 'buy', formData, orders, setOrders, setPnl, coins)
						}
						color='green'
					>
						Buy
					</GateButton>
					<GateButton
						onClick={(e) =>
							onOrder(e, 'sell', formData, orders, setOrders, setPnl, coins)
						}
						color='red'
					>
						Sell
					</GateButton>
				</div>
			</form>
		</div>
	);
};

export default OrderForm;
