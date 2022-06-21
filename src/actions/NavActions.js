const filterSearchParam = (coins, searchParam) => {
	if (searchParam) {
		return coins.filter((coin) =>
			coin.name.toLowerCase().includes(searchParam.toLowerCase())
		);
	} else {
		return [];
	}
};

export { filterSearchParam };
