import { doc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';
import { toast } from 'react-toastify';

export const onLike = async (user, setLikes, setUserLike, userLike, coin) => {
	if (!user) {
		toast.error('Must be logged in');
	} else {
		if (userLike) {
			await deleteDoc(doc(db, 'likes', userLike.id));
			setLikes((prev) => {
				return prev.filter((like) => like.id !== userLike.id);
			});
			setUserLike(null);
		} else {
			const newDoc = await addDoc(collection(db, 'likes'), {
				userRef: user.uid,
				coinId: coin.id,
			});
			setUserLike({
				id: newDoc.id,
				data: {
					userRef: user.uid,
					coinId: coin.id,
				},
			});
			setLikes((prev) => {
				return [
					...prev,
					{
						id: newDoc.id,
						data: {
							userRef: user.uid,
							coinId: coin.id,
						},
					},
				];
			});
		}
	}
};

export const tickerFilter = (coin) => {
	const compare = (a, b) => {
		if (a.last < b.last) {
			return -1;
		} else {
			return 1;
		}
	};

	const based = coin.tickers?.filter(
		(el) => el.target === 'USDT' || el.target === 'USD'
	);

	return based
		.filter((el) => coin.symbol.toUpperCase() === el.base)
		.slice(0, 24)
		.sort((a, b) => compare(a, b));
};
