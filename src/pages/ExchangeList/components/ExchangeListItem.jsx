import React from 'react';

const ExchangeListItem = ({ exchange }) => {
	return (
		<div className='exchange-list-item'>
			<div className='list-item-content'>
				<img src={exchange.image} alt='' />
				{exchange.id}
				{console.log('ex', exchange)}
			</div>
		</div>
	);
};

export default ExchangeListItem;
