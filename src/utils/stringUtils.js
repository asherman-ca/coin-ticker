const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const changeDirection = (changePercent) => {
	if (changePercent < -0.08) {
		return 'neg-change';
	} else if (changePercent > 0.08) {
		return 'pos-change';
	} else {
		return '';
	}
};

const decimalReducer = (number) => {
	return Math.round(number * 10) / 10;
};

export { capitalize, changeDirection, decimalReducer };
