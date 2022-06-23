import React from 'react';

const TickerItem = ({ tickr }) => {
	console.log('tickr item', tickr);
	return (
		<div className='tickr-item'>
			<img
				src={`./exchangeLogos/${tickr.market.identifier}.png`}
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = './logo192.png';
				}}
			/>
			<div>{tickr.market.name}</div>
			<div>{tickr.last}</div>
			<div>{tickr.converted_volume.usd}</div>
		</div>
	);
};

export default TickerItem;
