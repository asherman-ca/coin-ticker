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
				return orders.push(doc.data());
			});
			setOrders(orders);
			setLoading(false);
		};

		fetchUserOrders();
	}, [auth.currentUser.uid]);

	if (loading) {
		return (
			<div className='container'>
				<div className='account'>
					<Spinner />
				</div>
			</div>
		);
	}

	const onChange = (e) => {
		e.preventDefault();
		console.log(orders);
		setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const onOrder = async (e) => {
		e.preventDefault();
		console.log('buy', formData);
		console.log('auth', auth);

		let formDataCopy = {
			...formData,
			timestamp: serverTimestamp(),
		};

		await addDoc(collection(db, 'orders'), formDataCopy);
		toast.success('Order created');

		setOrders((prev) => [...prev, formData]);
	};

	return (
		<div className='container'>
			<div className='account'>
				<div className='primary-col'>
					<div className='header'>Transactions</div>
				</div>
				<div className='secondary-col'>
					<div className='form-div'>
						<div className='header'>
							<span onClick={() => setFormType('buy')}>Buy</span> /{' '}
							<span onClick={() => setFormType('sell')}>Sell</span>
						</div>
						<form onSubmit={onOrder} className='buy-sell-form'>
							<input
								onChange={onChange}
								id='coin'
								placeholder='Coin'
								type='text'
							/>
							<input
								onChange={onChange}
								id='price'
								placeholder='Price'
								type='number'
							/>
							<input
								onChange={onChange}
								id='quantity'
								placeholder='Quantity'
								type='number'
							/>
							<button type='submit' onClick={onOrder}>
								{formType === 'buy' ? 'Buy' : 'Sell'}
							</button>
						</form>
					</div>
					<div className='accounting'>
						<div className='header'>Profit Net Loss</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
