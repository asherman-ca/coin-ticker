const symbolConverter = (symbol) => {
	const symbolHash = {
		btc: "BINANCE:BTCUSDT",
		eth: "BINANCE:ETHUSDT",
	};

	return symbolHash[symbol];
};

export default symbolConverter;
