const cleanDate = (userData) => {
	return userData.timestamp
		.toDate()
		.toDateString()
		.split(' ')
		.slice(1, 4)
		.join(' ');
};

const sortLikes = (userLikes) => {
	return Object.values(userLikes).sort(
		(a, b) =>
			b.market_data.price_change_percentage_24h_in_currency.usd -
			a.market_data.price_change_percentage_24h_in_currency.usd
	);
};

const sortAccounts = (pnl) => {
	return pnl.sort((a, b) => b.totalValue - a.totalValue);
};

export { cleanDate, sortLikes, sortAccounts };
