import React from 'react';

const ExchangeListItem = ({ exchange }) => {
	return (
		<div>
			<img src={exchange.image} alt='' />
			{exchange.id}
			{console.log('ex', exchange)}
		</div>
	);
};

export default ExchangeListItem;
