const DOTS = '...';

const paginationRange = (currentPage, lastPage) => {
	// returns a list of clickable page buttons that's configured by total pages and current pagination position
	if (lastPage <= 3) {
		let pageNumbers = [];
		for (let i = 1; i <= lastPage; i++) {
			pageNumbers.push(i);
		}
		return pageNumbers;
	} else if (currentPage < 3) {
		return [1, 2, 3, DOTS, lastPage];
	} else if (currentPage + 1 < lastPage) {
		return [
			1,
			DOTS,
			currentPage - 1,
			currentPage,
			currentPage + 1,
			DOTS,
			lastPage,
		];
	} else {
		return [1, DOTS, lastPage - 2, lastPage - 1, lastPage];
	}
};

export { paginationRange, DOTS };
