import React, { useState, useEffect } from 'react';

const NumberTickr = ({ newVal }) => {
	const [displayVal, setDisplayVal] = useState(newVal);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (newVal < displayVal) {
				if (displayVal - newVal < 1) {
					setDisplayVal((prev) => prev - (displayVal - newVal));
				} else {
					setDisplayVal((prev) => prev - 1);
				}
			} else if (newVal > displayVal) {
				if (Math.abs(displayVal - newVal) < 1) {
					setDisplayVal((prev) => prev - Math.abs(displayVal - newVal));
				} else {
					setDisplayVal((prev) => prev + 1);
				}
			}
		}, 0.001);
		return () => clearTimeout(timer);
	}, [newVal, displayVal]);

	return <div>{displayVal}</div>;
};

export default NumberTickr;
