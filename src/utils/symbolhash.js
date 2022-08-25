const symbolConverter = (symbol) => {
	const symbolHash = {
		btc: 'BINANCE:BTCUSDT',
		eth: 'BINANCE:ETHUSDT',
		sol: 'BINANCE:SOLUSD',
		doge: 'BINANCE:DOGEUSDT',
		bnb: 'BINANCE:BNBUSDT',
		ada: 'BINANCE:ADAUSDT',
		xrp: 'BINANCE:XRPUSDT',
		dot: 'BINANCE:DOTUSDT',
	};

	return symbolHash[symbol];
};

export default symbolConverter;
