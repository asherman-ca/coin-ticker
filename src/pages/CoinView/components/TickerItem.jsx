import React from 'react';

const TickerItem = ({ tickr }) => {
	console.log('tickr item', tickr);
	return (
		<div className='tickr-item'>
			<img
				src={`./exchangeLogos/${tickr.market.identifier}.png`}
				// onError="this.src='./logo182.png'"
				onError={({ currentTarget }) => {
					currentTarget.onerror = null;
					currentTarget.src = './logo192.png';
				}}
			/>
			{tickr.market.name}
			{tickr.last}
			{tickr.converted_volume.usd}
		</div>
	);
};

export default TickerItem;
