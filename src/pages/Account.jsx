import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase.config';
import {
	getDoc,
	doc,
	updateDoc,
	deleteDoc,
	query,
	where,
	collection,
	getDocs,
	limit,
	addDoc,
	orderBy,
	serverTimestamp,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

import { calcPNL, invalidSell, invalidDelete } from '../utils/accounting';
import { cleanInt } from '../utils/stringUtils';
import Spinner from '../components/Spinner';
import OrderItem from '../components/OrderItem';

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

	useEffect(() => {
		const fetchUserOrders = async () => {
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
		};

		const fetchCoins = async () => {
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
		};

		const fetchAll = async () => {
			await fetchCoins();
			await fetchUserOrders();
			setLoading(false);
		};

		fetchAll();
	}, [auth.currentUser.uid]);

	const onChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.id]: Number(e.target.value) }));
	};

	const onOrder = async (e) => {
		e.preventDefault();

		if (formData.price === 0 || formData.spent === 0) {
			toast.error('Price and spent required');
		} else {
			if (formType === 'sell' && invalidSell(orders, formData)) {
				toast.error('Insufficient coins');
			} else {
				let formDataCopy = {
					...formData,
					type: formType,
					timestamp: serverTimestamp(),
				};

				const res = await addDoc(collection(db, 'orders'), formDataCopy);
				toast.success('Order created');

				setOrders((prev) => [{ data: formDataCopy, id: res.id }, ...prev]);
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
							orders?.map((order) => (
								<OrderItem key={order.id} order={order} onDelete={onDelete} />
							))
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
						{orders.length >= 1 ? (
							calcPNL(orders, coins).map((el) => {
								return (
									<div className='pnl-item' key={el.coin}>
										<div>{el.coin}</div>
										<div className={el.pnl >= 0 ? 'pos-change' : 'neg-change'}>
											${cleanInt(el.pnl)}
										</div>
										<div className={el.rpnl >= 0 ? 'pos-change' : 'neg-change'}>
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
							})
						) : (
							<div className='default-order-message'>No order history</div>
						)}
					</div>
				</div>
				<div className='secondary-col'>
					<div className='form-div'>
						<div className='header'>
							<span
								onClick={() => setFormType('buy')}
								className={formType === 'buy' ? 'active' : ''}
							>
								Buy
							</span>{' '}
							/{' '}
							<span
								onClick={() => setFormType('sell')}
								className={formType === 'sell' ? 'active' : ''}
							>
								Sell
							</span>
						</div>
						<form onSubmit={onOrder} className='buy-sell-form'>
							<select name='coin' id='coin' onChange={onSelect}>
								{coins?.map((doc) => (
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
								placeholder={formType === 'buy' ? '$ Spent' : '$ Received'}
								type='number'
							/>
							<button type='submit' onClick={onOrder}>
								{formType === 'buy' ? 'Buy' : 'Sell'}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
