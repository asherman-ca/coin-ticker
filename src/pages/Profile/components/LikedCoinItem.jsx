import React from 'react';

const LikedCoinItem = ({ coin }) => {
	console.log('like', coin);
	return (
		<div className='liked-coin-item'>
			<div>{coin.id}</div>
			<div>Body</div>
			<div>footer</div>
		</div>
	);
};

export default LikedCoinItem;
