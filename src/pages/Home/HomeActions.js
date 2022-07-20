const handleSort = (type, sortParam, setSortParam, setDisplayCoins) => {
	if (type === 'mcap') {
		if (sortParam.type === 'mcap' && sortParam.direction === 'desc') {
			// already mcap sorted, so flip it
			setSortParam({ type: 'mcap', direction: 'asc' });
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) => a.market_data.market_cap.usd - b.market_data.market_cap.usd
				)
			);
		} else {
			// set to descending
			setSortParam({ type: 'mcap', direction: 'desc' });
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) => b.market_data.market_cap.usd - a.market_data.market_cap.usd
				)
			);
		}
	} else if (type === '24hr') {
		setSortParam({ type: '24hr', direction: 'desc' });
		setDisplayCoins((prev) =>
			prev.sort(
				(a, b) =>
					b.market_data.price_change_percentage_24h -
					a.market_data.price_change_percentage_24h
			)
		);
	} else if (type === '1hr') {
		setSortParam({ type: '1hr', direction: 'desc' });
		setDisplayCoins((prev) =>
			prev.sort(
				(a, b) =>
					b.market_data.price_change_percentage_1h_in_currency.usd -
					a.market_data.price_change_percentage_1h_in_currency.usd
			)
		);
	} else if (type === '7d') {
		setSortParam({ type: '7d', direction: 'desc' });
		setDisplayCoins((prev) =>
			prev.sort(
				(a, b) =>
					b.market_data.price_change_percentage_7d -
					a.market_data.price_change_percentage_7d
			)
		);
	} else if (type === 'vol') {
		setSortParam({ type: 'vol', direction: 'desc' });
		setDisplayCoins((prev) =>
			prev.sort(
				(a, b) =>
					b.market_data.total_volume.usd - a.market_data.total_volume.usd
			)
		);
	}
};

export { handleSort };
