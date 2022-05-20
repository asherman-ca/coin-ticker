const symbolConverter = (symbol) => {
	const symbolHash = {
		btc: "BINANCE:BTCUSDT",
	};

	return symbolHash[symbol];
};

export default symbolConverter;
