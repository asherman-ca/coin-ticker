const capitalize = (string) => {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

const changeDirection = (changePercent) => {
	if (changePercent < -0.05) {
		return 'neg-change';
	} else if (changePercent > 0.05) {
		return 'pos-change';
	} else {
		return '';
	}
};

const decimalReducer = (number) => {
	return Math.round(number * 10) / 10;
};

const nameReducer = (string) => {
	if (string.split(' ')[1] === 'Exchange') {
		return string.split(' ')[0];
	} else {
		return string;
	}
};

export { capitalize, changeDirection, decimalReducer, nameReducer };
