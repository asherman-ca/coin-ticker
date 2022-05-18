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

import '../styles/Account.css';
import Spinner from '../components/Spinner';

const Account = () => {
	const auth = getAuth();

	const [loading, setLoading] = useState(false);
	const [coins, setCoins] = useState();
	const [orders, setOrders] = useState();
	const [formType, setFormType] = useState('buy');
	const [formData, setFormData] = useState({
		coin: '',
		price: 0,
		quantity: 0,
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
			setLoading(false);
		};

		const fetchCoins = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=30`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoins(response);
			setFormData((prev) => ({
				...prev,
				coin: response[0].name,
				price: response[0].market_data.current_price.usd,
			}));
			// setLoading(false);
		};

		fetchCoins();
		fetchUserOrders();
	}, [auth.currentUser.uid]);

	const onChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const onOrder = async (e) => {
		e.preventDefault();

		if (formData.price === 0 || formData.quantity === 0) {
			toast.error('Price and quantity required');
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
	};

	const onSelect = (e) => {
		let price;
		coins.forEach((el) => {
			if (el.symbol === e.target.value) {
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
		const ref = doc(db, 'orders', id);
		await deleteDoc(ref);
		const updatedOrders = orders.filter((order) => order.id !== id);
		setOrders(updatedOrders);
		toast.success('Order deleted');
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
						<div className='transaction-list'>
							{console.log('orders', orders)}
							{orders?.map((order) => (
								<div className='order-item'>
									<i
										className='fa-solid fa-trash-can'
										onClick={() => onDelete(order.id)}
									></i>
									<div>{order.data.coin}</div>
									<div>{order.data.type}</div>
									<div
										className={
											order.data.type === 'buy' ? 'pos-change' : 'neg-change'
										}
									>
										${order.data.quantity}
									</div>
									<div>@{order.data.price}</div>
								</div>
							))}
						</div>
					</div>
					<div className='accounting'>
						<div className='header'>Unrealized PNL</div>
					</div>
				</div>
				<div className='secondary-col'>
					<div className='form-div'>
						<div className='header'>
							<span onClick={() => setFormType('buy')}>Buy</span> /{' '}
							<span onClick={() => setFormType('sell')}>Sell</span>
						</div>
						<form onSubmit={onOrder} className='buy-sell-form'>
							{/* <input
								onChange={onChange}
								id='coin'
								placeholder='Coin'
								type='text'
							/> */}
							{console.log(formData)}
							<select name='coin' id='coin' onChange={onSelect}>
								{coins?.map((doc) => (
									<option value={doc.symbol}>{doc.name}</option>
								))}
								{/* <option value='BTC'>BTC</option>
								<option value='Eth'>Eth</option> */}
							</select>
							<input
								onChange={onChange}
								id='price'
								placeholder='$ / Coin'
								value={formData.price}
								type='number'
								required
							/>
							<input
								onChange={onChange}
								id='quantity'
								placeholder={formType === 'buy' ? '$ Spent' : '$ Received'}
								type='number'
								required
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
