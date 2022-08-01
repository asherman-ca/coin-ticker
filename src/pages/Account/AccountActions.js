import { toast } from 'react-toastify';
import { db } from '../../firebase.config';
import {
	doc,
	deleteDoc,
	collection,
	addDoc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { calcPNL, invalidSell, invalidDelete } from '../../utils/accounting';

const onOrder = async (
	e,
	type,
	formData,
	orders,
	setOrders,
	setPnl,
	coins,
	userId,
	user,
	setUser
) => {
	e.preventDefault();

	if (formData.price === 0 || formData.spent === 0) {
		toast.error('Price and amount required');
	} else {
		if (type === 'sell' && invalidSell(orders, formData)) {
			toast.error('Insufficient coins');
		} else if (type === 'buy' && user.testBalance < formData.spent) {
			toast.error('Insufficient funds');
		} else {
			// order tasks
			let formDataCopy = {
				...formData,
				type: type,
				timestamp: serverTimestamp(),
			};

			const res = await addDoc(collection(db, 'orders'), formDataCopy);
			toast.success('Order created');

			await setOrders((prev) => [{ data: formDataCopy, id: res.id }, ...prev]);
			const ordersCopy = [...orders, { data: formDataCopy, id: res.id }];
			setPnl(calcPNL(ordersCopy, coins));

			// balance tasks
			if (type === 'buy') {
				const userRef = doc(db, 'users', userId);
				await updateDoc(userRef, {
					testBalance: user.testBalance - formData.spent,
				});
				setUser((prev) => {
					return {
						...prev,
						testBalance: prev.testBalance - formData.spent,
					};
				});
			} else {
				const userRef = doc(db, 'users', userId);
				await updateDoc(userRef, {
					testBalance: user.testBalance + formData.spent,
				});
				setUser((prev) => {
					return {
						...prev,
						testBalance: prev.testBalance + formData.spent,
					};
				});
			}
		}
	}
};

const onChange = (e, setFormData) => {
	setFormData((prev) => ({ ...prev, [e.target.id]: Number(e.target.value) }));
};

const onSelect = (e, setFormData, coins) => {
	let price;
	let coinId;
	let image;
	let imageLarge;
	coins.forEach((el) => {
		if (el.name === e.target.value) {
			price = el.market_data.current_price.usd;
			coinId = el.id;
			image = el.image.small;
			imageLarge = el.image.large;
		}
	});
	setFormData((prev) => ({
		...prev,
		price,
		coinId,
		image,
		imageLarge,
		coin: e.target.value,
	}));
};

const onDelete = async (id, orders, setOrders, setPnl, coins) => {
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

const onFaucet = async (uid, user, setUser) => {
	const currentSeconds = new Date().getTime() / 1000;
	if (new Date().getTime() / 1000 < user.lastFaucet?.seconds + 86400) {
		toast.error('1 faucet per day');
	} else {
		const userRef = doc(db, 'users', uid);
		await updateDoc(userRef, {
			testBalance: user.testBalance + 1000,
			lastFaucet: serverTimestamp(),
		});
		setUser((prev) => {
			return {
				...prev,
				testBalance: (prev.testBalance += 1000),
				lastFaucet: { seconds: currentSeconds },
			};
		});
	}
};

export { onOrder, onChange, onSelect, onDelete, onFaucet };
