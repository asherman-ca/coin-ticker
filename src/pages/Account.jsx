import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../firebase.config";
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
} from "firebase/firestore";
import { toast } from "react-toastify";

import "../styles/Account.css";
import Spinner from "../components/Spinner";

const Account = () => {
	const auth = getAuth();

	const [loading, setLoading] = useState(false);
	const [coins, setCoins] = useState();
	const [orders, setOrders] = useState();
	const [formType, setFormType] = useState("buy");
	const [formData, setFormData] = useState({
		coin: "",
		price: 0,
		spent: 0,
		userRef: auth.currentUser.uid,
	});

	useEffect(() => {
		const fetchUserOrders = async () => {
			const ordersRef = collection(db, "orders");

			const q = query(
				ordersRef,
				where("userRef", "==", auth.currentUser.uid),
				orderBy("timestamp", "desc")
			);

			const snap = await getDocs(q);

			let orders = [];

			snap.forEach((doc) => {
				return orders.push({ data: doc.data(), id: doc.id });
			});
			setOrders(orders);
			coins && setLoading(false);
		};

		const fetchCoins = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=30`
			);
			if (!ref.ok) {
				throw new Error("Thrown Error Thrown");
			}
			const response = await ref.json();
			setCoins(response);
			setFormData((prev) => ({
				...prev,
				coin: response[0].name,
				price: response[0].market_data.current_price.usd,
			}));

			orders && setLoading(false);
		};

		fetchCoins();
		fetchUserOrders();
	}, [auth.currentUser.uid]);

	const onChange = (e) => {
		setFormData((prev) => ({ ...prev, [e.target.id]: Number(e.target.value) }));
	};

	const onOrder = async (e) => {
		e.preventDefault();

		if (formData.price === 0 || formData.spent === 0) {
			toast.error("Price and spent required");
		} else {
			let formDataCopy = {
				...formData,
				type: formType,
				timestamp: serverTimestamp(),
			};

			const res = await addDoc(collection(db, "orders"), formDataCopy);
			toast.success("Order created");

			setOrders((prev) => [{ data: formDataCopy, id: res.id }, ...prev]);
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
		const ref = doc(db, "orders", id);
		await deleteDoc(ref);
		const updatedOrders = orders.filter((order) => order.id !== id);
		setOrders(updatedOrders);
		toast.success("Order deleted");
	};

	const calcPNL = () => {
		let accounts = {};
		console.log(orders);

		let buys = orders?.filter((order) => order.data.type === "buy");

		let sells = orders?.filter((order) => order.data.type === "sell");

		console.log("buys", buys);

		buys?.forEach((order) => {
			if (!accounts[order.data.coin]) {
				accounts[order.data.coin] = {
					coin: order.data.coin,
					spent: order.data.spent,
					total: order.data.spent / order.data.price,
				};
			} else {
				accounts[order.data.coin].spent += order.data.spent;
				accounts[order.data.coin].total += order.data.spent / order.data.price;
			}
		});

		// let averages = {};

		// Object.values(accounts).forEach((account) => {
		// 	averages[account.coin] = {
		// 		coin: account.coin,
		// 		total: account.total,
		// 		averagePrice: account.spent / account.total,
		// 	};
		// });

		Object.values(accounts).forEach((account) => {
			accounts[account.coin].averagePrice = account.spent / account.total;
		});

		sells?.forEach((order) => {
			accounts[order.data.coin].total -= order.data.spent / order.data.price;
			accounts[order.data.coin].spent -= order.data.spent;
		});

		console.log("accounts", accounts);

		let PNL = [];

		Object.values(accounts).forEach((account) => {
			const currentPrice = coins.filter((coin) => coin.name === account.coin)[0]
				.market_data.current_price.usd;

			// PNL.push({
			// 	coin: account.coin,
			// 	pnl:
			// 		account.spent * (currentPrice / account.averagePrice) - account.spent,
			// });

			console.log("spent", account.total * account.averagePrice);

			console.log("profitability", currentPrice / account.averagePrice);

			PNL.push({
				coin: account.coin,
				pnl:
					account.total *
						account.averagePrice *
						(currentPrice / account.averagePrice) -
					account.spent,
				totalCoins: account.total,
				averagePrice: account.averagePrice,
			});
		});

		// Object.values(averages).forEach((av) => {
		// 	const coinData = coins.filter((coin) => coin.name === av.coin);

		// 	PNL.push({
		// 		coin: av.coin,
		// 		pnl:
		// 			accounts[av.coin].spent *
		// 				(coinData[0].market_data.current_price.usd /
		// 					averages[av.coin].averagePrice) -
		// 			accounts[av.coin].spent,
		// 	});
		// });

		return PNL;
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
									<i
										className='fa-solid fa-trash-can'
										onClick={() => onDelete(order.id)}
									></i>
									<div>{order.data.coin}</div>
									<div>{order.data.type}</div>
									<div
										className={
											order.data.type === "buy" ? "pos-change" : "neg-change"
										}
									>
										${order.data.spent}
									</div>
									<div>@{order.data.price}</div>
								</div>
							))}
						</div>
					</div>
					<div className='accounting'>
						<div className='header'>Unrealized PNL</div>
						<div className='pnl-item-header'>
							<div>Coin</div>
							<div>PNL</div>
							<div>Coins Held</div>
							<div>Avg Price</div>
						</div>
						{calcPNL().map((el) => {
							console.log(el);
							return (
								<div className='pnl-item'>
									<div>{el.coin}</div>
									<div>{el.pnl.toFixed(2)}</div>
									<div>{el.totalCoins.toFixed(4)}</div>
									<div>{el.averagePrice}</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className='secondary-col'>
					<div className='form-div'>
						<div className='header'>
							<span onClick={() => setFormType("buy")}>Buy</span> /{" "}
							<span onClick={() => setFormType("sell")}>Sell</span>
						</div>
						<form onSubmit={onOrder} className='buy-sell-form'>
							<select name='coin' id='coin' onChange={onSelect}>
								{coins?.map((doc) => (
									<option value={doc.name}>{doc.name}</option>
								))}
							</select>
							<input
								onChange={onChange}
								id='price'
								placeholder='$ / Coin'
								value={formData.price}
								type='number'
							/>
							<input
								onChange={onChange}
								id='spent'
								placeholder={formType === "buy" ? "$ Spent" : "$ Received"}
								type='number'
							/>
							<button type='submit' onClick={onOrder}>
								{formType === "buy" ? "Buy" : "Sell"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
