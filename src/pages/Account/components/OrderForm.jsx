import React, { useState, useEffect } from 'react';
import GateButton from '../../../components/GateButton';
import { cleanInt } from '../../../utils/stringUtils';

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
	user,
	userId,
	setUser,
	onFaucet,
	pnl,
}) => {
	const [displayBalance, setDisplayBalance] = useState(user.testBalance);

	useEffect(() => {
		if (user.testBalance < displayBalance) {
			setDisplayBalance((prev) => prev - 1);
		} else if (user.testBalance > displayBalance) {
			setDisplayBalance((prev) => prev + 1);
		}
	}, [user.testBalance, displayBalance]);

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
				<div className='input-container'>
					<div>$</div>
					<input
						onChange={(e) => onChange(e, setFormData)}
						id='price'
						placeholder={cleanInt(formData.price)}
						type='number'
						disabled={true}
						className='disabled-input'
					/>
				</div>
				<div className='input-container'>
					<div>$</div>
					<input
						onChange={(e) => onChange(e, setFormData)}
						id='spent'
						placeholder='Amount'
						type='number'
					/>
				</div>
				<div className='button-row'>
					<GateButton
						onClick={(e) =>
							onOrder(
								e,
								'buy',
								formData,
								orders,
								setOrders,
								setPnl,
								coins,
								userId,
								user,
								setUser
							)
						}
						color='green'
					>
						Buy
					</GateButton>
					<GateButton
						onClick={(e) =>
							onOrder(
								e,
								'sell',
								formData,
								orders,
								setOrders,
								setPnl,
								coins,
								userId,
								user,
								setUser
							)
						}
						color='red'
					>
						Sell
					</GateButton>
				</div>
			</form>
			<div className='assets-header'>
				<div>
					<div className='assets-header-title'>Assets</div>
					<div>Balance</div>
				</div>
				<div>
					<div>USD</div>
					<div>
						${cleanInt(displayBalance)}
						{console.log('rerender')}
						{console.log('displayBal', displayBalance)}
					</div>
					{console.log('pnl on form', pnl)}
				</div>
			</div>
			<GateButton onClick={() => onFaucet(userId, user, setUser)}>
				Faucet
			</GateButton>
		</div>
	);
};

export default OrderForm;
