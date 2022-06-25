const invalidDelete = (orders, order) => {
	let accounts = {};

	let buys = orders.filter((order) => order.data.type === 'buy');

	let sells = orders.filter((order) => order.data.type === 'sell');

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

	sells?.forEach((order) => {
		accounts[order.data.coin].total -= order.data.spent / order.data.price;
	});

	if (
		order.data.type === 'buy' &&
		accounts[order.data.coin].total - order.data.spent / order.data.price < 0
	) {
		return true;
	}
	return false;
};

const invalidSell = (orders, newOrder) => {
	if (!orders.length) {
		return true;
	}

	let accounts = {};

	let buys = orders.filter((order) => order.data.type === 'buy');

	let sells = orders.filter((order) => order.data.type === 'sell');

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

	sells?.forEach((order) => {
		accounts[order.data.coin].total -= order.data.spent / order.data.price;
	});

	if (accounts[newOrder.coin].total - newOrder.spent / newOrder.price < 0) {
		return true;
	}
	return false;
};

const calcPNL = (orders, coins) => {
	let accounts = {};

	let buys = orders.filter((order) => order.data.type === 'buy');

	let sells = orders.filter((order) => order.data.type === 'sell');

	buys?.forEach((order) => {
		if (!accounts[order.data.coin]) {
			accounts[order.data.coin] = {
				coin: order.data.coin,
				spent: order.data.spent,
				total: order.data.spent / order.data.price,
				totalSold: 0,
				earn: 0,
				coinId: order.data.coinId,
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
		accounts[order.data.coin].earn += order.data.spent;
		accounts[order.data.coin].totalSold += order.data.spent / order.data.price;
	});

	let PNL = [];

	Object.values(accounts).forEach((account) => {
		const currentPrice = coins?.filter((coin) => coin.name === account.coin)[0]
			.market_data.current_price.usd;

		PNL.push({
			coin: account.coin,
			pnl:
				account.total *
				account.averagePrice *
				(currentPrice / account.averagePrice - 1),
			totalCoins: account.total,
			averagePrice: account.averagePrice,
			rpnl: account.earn - account.totalSold * account.averagePrice,
			coinId: account.coinId,
		});
	});

	return PNL;
};

export { calcPNL, invalidSell, invalidDelete };
