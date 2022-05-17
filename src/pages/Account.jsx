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
	const [orders, setOrders] = useState();
	const [formType, setFormType] = useState('buy');
	const [formData, setFormData] = useState({
		coin: 'BTC',
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
				return orders.push(doc.data());
			});
			setOrders(orders);
			setLoading(false);
		};

		fetchUserOrders();
	}, [auth.currentUser.uid]);

	const onChange = (e) => {
		// e.preventDefault();
		console.log(orders);
		setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const onOrder = async (e) => {
		e.preventDefault();
		console.log('buy', formData);
		console.log('auth', auth);

		if (formData.price === 0 || formData.quantity === 0) {
			toast.error('Price and quantity required');
		} else {
			let formDataCopy = {
				...formData,
				type: formType,
				timestamp: serverTimestamp(),
			};

			await addDoc(collection(db, 'orders'), formDataCopy);
			toast.success('Order created');

			setOrders((prev) => [...prev, formDataCopy]);
		}
	};

	const onSelect = (e) => {
		setFormData((prev) => ({
			...prev,
			coin: e.target.value,
		}));
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
							{orders?.map((order) => (
								<div className='order-item'>
									<i className='fa-solid fa-trash-can'></i>
									<div>{order.coin}</div>
									<div>{order.price}</div>
									<div>{order.quantity}</div>
									<div>{order.type}</div>
								</div>
							))}
						</div>
					</div>
					<div className='accounting'>
						<div className='header'>Profit N/L</div>
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
							<select name='coin' id='coin' onChange={onSelect}>
								<option value='BTC'>BTC</option>
								<option value='Eth'>Eth</option>
							</select>
							<input
								onChange={onChange}
								id='price'
								placeholder='Price'
								type='number'
								required
							/>
							<input
								onChange={onChange}
								id='quantity'
								placeholder='Quantity'
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
