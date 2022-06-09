import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import {
	doc,
	deleteDoc,
	query,
	where,
	collection,
	getDocs,
	addDoc,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { calcPNL, invalidSell, invalidDelete } from '../utils/accounting';
import { cleanInt } from '../utils/stringUtils';
import Spinner from '../components/Spinner';
import OrderItem from '../components/OrderItem';
import SlideButton from '../components/SlideButton';
import GateButton from '../components/GateButton';

const Account = () => {
	const auth = getAuth();

	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState();
	const [orders, setOrders] = useState();
	const [formType, setFormType] = useState('buy');
	const [formData, setFormData] = useState({
		coin: '',
		price: 0,
		spent: 0,
		userRef: auth.currentUser.uid,
	});
	const [pnl, setPnl] = useState();

	useEffect(() => {
		const fetchTask = async () => {
			const ordersRef = collection(db, 'orders');

			const q = query(
				ordersRef,
				where('userRef', '==', auth.currentUser.uid),
				orderBy('timestamp', 'desc')
			);

			const snap = await getDocs(q);

			let orders = [];

			snap.forEach((doc) => {
				return orders.push({ data: doc.data(), id: doc.id });
			});
			setOrders(orders);

			// task 2

			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=30`
			);
			if (!ref.ok) {
				setLoading(true);
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoins(response);
			setFormData((prev) => ({
				...prev,
				coin: response[0].name,
				price: response[0].market_data.current_price.usd,
			}));

			// task 3

			setPnl(calcPNL(orders, response));
		};

		const fetchAllTask = async () => {
			await fetchTask();
			setLoading(false);
		};

		fetchAllTask();
	}, [auth.currentUser.uid]);

	const onChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.id]: Number(e.target.value) }));
	};

	const onOrder = async (e, type) => {
		e.preventDefault();

		console.log('type', type);

		if (formData.price === 0 || formData.spent === 0) {
			toast.error('Price and spent required');
		} else {
			if (type === 'sell' && invalidSell(orders, formData)) {
				toast.error('Insufficient coins');
			} else {
				let formDataCopy = {
					...formData,
					type: type,
					timestamp: serverTimestamp(),
				};

				const res = await addDoc(collection(db, 'orders'), formDataCopy);
				toast.success('Order created');

				await setOrders((prev) => [
					{ data: formDataCopy, id: res.id },
					...prev,
				]);
				const ordersCopy = [...orders, { data: formDataCopy, id: res.id }];
				setPnl(calcPNL(ordersCopy, coins));
			}
		}
	};

	const onSelect = (e) => {
		let price;
		coins.forEach((el) => {
			if (el.name === e.target.value) {
				price = el.market_data.current_price.usd;
			}
		});

		setFormData((prev) => ({
			...prev,
			price,
			coin: e.target.value,
		}));
	};

	const onDelete = async (id) => {
		const order = orders.filter((order) => order.id === id)[0];
		if (invalidDelete(orders, order)) {
			toast.error('Insufficient Funds');
		} else {
			const ref = doc(db, 'orders', id);
			await deleteDoc(ref);
			const updatedOrders = orders.filter((order) => order.id !== id);
			setOrders(updatedOrders);
			setPnl(calcPNL(updatedOrders, coins));
			toast.success('Order deleted');
		}
	};

	if (loading) {
		return (
			<div className='container'>
				<div className='account'>
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='account'>
				<div className='primary-col'>
					<div className='orders'>
						<div className='header'>Order History</div>
						<div className='order-item-header'>
							<i className='fa-solid fa-trash-can'></i>
							<div>Coin</div>
							<div>Type</div>
							<div>Amount</div>
							<div>Coin Price</div>
						</div>
						{orders.length >= 1 ? (
							<div className='list'>
								{orders.map((order) => (
									<OrderItem key={order.id} order={order} onDelete={onDelete} />
								))}
							</div>
						) : (
							<div className='default-order-message'>
								Place a buy order to begin
							</div>
						)}
					</div>
					<div className='accounting'>
						<div className='header'>Profit Net Loss</div>
						<div className='pnl-item-header'>
							<div>Coin</div>
							<div>U/PNL</div>
							<div>R/PNL</div>
							<div>Coins Held</div>
							<div>Avg Price</div>
						</div>
						{console.log('pnl', pnl)}
						{orders.length >= 1 ? (
							<div>
								{console.log(pnl)}
								{pnl.map((el) => {
									return (
										<div className='pnl-item' key={el.coin}>
											<div>{el.coin}</div>
											<div
												className={el.pnl >= 0 ? 'pos-change' : 'neg-change'}
											>
												${cleanInt(el.pnl)}
											</div>
											<div
												className={el.rpnl >= 0 ? 'pos-change' : 'neg-change'}
											>
												${cleanInt(el.rpnl)}
											</div>
											<div>
												{el.totalCoins >= 0.01
													? cleanInt(el.totalCoins)
													: el.totalCoins.toFixed(4)}
											</div>
											<div>${cleanInt(el.averagePrice)}</div>
										</div>
									);
								})}
							</div>
						) : (
							<div className='default-order-message'>No order history</div>
						)}
					</div>
				</div>
				<div className='secondary-col'>
					<div className='form-div'>
						<div className='header'>Market Order</div>
						<form onSubmit={onOrder} className='buy-sell-form'>
							<select name='coin' id='coin' onChange={onSelect}>
								{coins.map((doc) => (
									<option key={doc.id} value={doc.name}>
										{doc.name}
									</option>
								))}
							</select>
							<input
								onChange={onChange}
								id='price'
								placeholder={formData.price}
								type='number'
							/>
							<input
								onChange={onChange}
								id='spent'
								placeholder='$ Amount'
								type='number'
							/>
							<div className='button-row'>
								<GateButton onClick={(e) => onOrder(e, 'buy')} color='green'>
									{/* <i className='fa-solid fa-plus'></i>&nbsp;  */}
									Buy
								</GateButton>
								<GateButton onClick={(e) => onOrder(e, 'sell')} color='red'>
									{/* <i className='fa-solid fa-minus'></i>&nbsp;  */}
									Sell
								</GateButton>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
