const filterSearchParam = (coins, searchParam) => {
	console.log('search param filter', searchParam);
	console.log('coins in filter', coins);
	if (searchParam) {
		return coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchParam.toLowerCase())
		);
	} else {
		// return coins;
		return [];
	}
};

export { filterSearchParam };
