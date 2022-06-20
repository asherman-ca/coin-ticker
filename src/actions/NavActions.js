const filterSearchParam = (coins, searchParam) => {
	console.log('search param filter', searchParam);
	if (searchParam) {
		return coins;
	} else {
		// return coins;
		return [];
	}
};

export { filterSearchParam };
