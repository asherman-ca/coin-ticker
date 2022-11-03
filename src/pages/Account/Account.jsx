import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { db } from '../../firebase.config';
import {
	query,
	where,
	collection,
	getDocs,
	orderBy,
	doc,
	getDoc,
} from 'firebase/firestore';

import { calcPNL } from '../../utils/accounting';
import Spinner from '../../components/Spinner';
import OrderItem from './components/OrderItem';
import {
	onOrder,
	onChange,
	onSelect,
	onDelete,
	onFaucet,
} from './AccountActions';
import OrderForm from './components/OrderForm';
import PnlItem from './components/PnlItem';

const Account = () => {
	const auth = getAuth();
	const [loading, setLoading] = useState(true);
	const [coins, setCoins] = useState();
	const [orders, setOrders] = useState();
	const [formData, setFormData] = useState({
		coin: '',
		price: 0,
		spent: 0,
		userRef: auth.currentUser.uid,
	});
	const [pnl, setPnl] = useState();
	const [user, setUser] = useState();

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
			console.log('response', response);

			setFormData((prev) => ({
				...prev,
				coin: response[0].name,
				price: response[0].market_data.current_price.usd,
				coinId: response[0].id,
				image: response[0].image.small,
				imageLarge: response[0].image.large,
			}));

			// task 3

			setPnl(calcPNL(orders, response));

			// task 4

			const usersRef = doc(db, 'users', auth.currentUser.uid);
			const docSnap = await getDoc(usersRef);
			setUser(docSnap.data());
		};

		const fetchAllTask = async () => {
			await fetchTask();
			setLoading(false);
		};

		fetchAllTask();
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

	return (
		<div className='container account-container'>
			<div className='account'>
				<div className='primary-col'>
					<div className='orders'>
						<div className='header'>
							<div>Order History</div>
							<div className='order-item-header'>
								<div>Coin</div>
								<div>Value</div>
								<div>Type</div>
								<div>Quantity</div>
								<div>Price</div>
							</div>
						</div>
						{orders.length >= 1 ? (
							<div className='list'>
								{orders.map((order) => (
									<OrderItem
										key={order.id}
										order={order}
										onDelete={() =>
											onDelete(order.id, orders, setOrders, setPnl, coins)
										}
									/>
								))}
							</div>
						) : (
							<div className='default-order-message'>
								Place a buy order to begin
							</div>
						)}
					</div>

					<div className='accounting'>
						<div className='header'>
							<div>Assets</div>
							<div className='pnl-item-header'>
								<div>Coin</div>
								<div>Value</div>
								<div>U/PNL</div>
								<div>R/PNL</div>
								<div>Avg Price</div>
							</div>
						</div>
						{orders.length >= 1 ? (
							<div>
								{pnl.map((account) => (
									<PnlItem key={account.coin} account={account} />
								))}
							</div>
						) : (
							<div className='default-order-message'>No order history</div>
						)}
					</div>
				</div>
				<div className='secondary-col'>
					<OrderForm
						onOrder={onOrder}
						onSelect={onSelect}
						onChange={onChange}
						formData={formData}
						setFormData={setFormData}
						coins={coins}
						orders={orders}
						setOrders={setOrders}
						setPnl={setPnl}
						user={user}
						userId={auth.currentUser.uid}
						setUser={setUser}
						onFaucet={onFaucet}
					/>
				</div>
			</div>
		</div>
	);
};

export default Account;
