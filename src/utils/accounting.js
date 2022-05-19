const calcPNL = (orders, coins) => {
	let accounts = {};

	let buys = orders?.filter((order) => order.data.type === "buy");

	let sells = orders?.filter((order) => order.data.type === "sell");

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

	return PNL;
};

export { calcPNL };

// const calcPNL = () => {
// 	let accounts = {};
// 	console.log(orders);

// 	let buys = orders?.filter((order) => order.data.type === "buy");

// 	let sells = orders?.filter((order) => order.data.type === "sell");

// 	console.log("buys", buys);

// 	buys?.forEach((order) => {
// 		if (!accounts[order.data.coin]) {
// 			accounts[order.data.coin] = {
// 				coin: order.data.coin,
// 				spent: order.data.spent,
// 				total: order.data.spent / order.data.price,
// 			};
// 		} else {
// 			accounts[order.data.coin].spent += order.data.spent;
// 			accounts[order.data.coin].total += order.data.spent / order.data.price;
// 		}
// 	});

// 	// let averages = {};

// 	// Object.values(accounts).forEach((account) => {
// 	// 	averages[account.coin] = {
// 	// 		coin: account.coin,
// 	// 		total: account.total,
// 	// 		averagePrice: account.spent / account.total,
// 	// 	};
// 	// });

// 	Object.values(accounts).forEach((account) => {
// 		accounts[account.coin].averagePrice = account.spent / account.total;
// 	});

// 	sells?.forEach((order) => {
// 		accounts[order.data.coin].total -= order.data.spent / order.data.price;
// 		accounts[order.data.coin].spent -= order.data.spent;
// 	});

// 	console.log("accounts", accounts);

// 	let PNL = [];

// 	Object.values(accounts).forEach((account) => {
// 		const currentPrice = coins.filter((coin) => coin.name === account.coin)[0]
// 			.market_data.current_price.usd;

// 		// PNL.push({
// 		// 	coin: account.coin,
// 		// 	pnl:
// 		// 		account.spent * (currentPrice / account.averagePrice) - account.spent,
// 		// });

// 		console.log("spent", account.total * account.averagePrice);

// 		console.log("profitability", currentPrice / account.averagePrice);

// 		PNL.push({
// 			coin: account.coin,
// 			pnl:
// 				account.total *
// 					account.averagePrice *
// 					(currentPrice / account.averagePrice) -
// 				account.spent,
// 			totalCoins: account.total,
// 			averagePrice: account.averagePrice,
// 		});
// 	});

// 	// Object.values(averages).forEach((av) => {
// 	// 	const coinData = coins.filter((coin) => coin.name === av.coin);

// 	// 	PNL.push({
// 	// 		coin: av.coin,
// 	// 		pnl:
// 	// 			accounts[av.coin].spent *
// 	// 				(coinData[0].market_data.current_price.usd /
// 	// 					averages[av.coin].averagePrice) -
// 	// 			accounts[av.coin].spent,
// 	// 	});
// 	// });

// 	return PNL;
// };
