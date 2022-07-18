import React from 'react';

const LikedCoinItem = ({ coin }) => {
	console.log('like', coin);
	return (
		<div className='liked-coin-item'>
			<div className='content'>
				<div>{coin.id}</div>
				<div>Body</div>
				<div>footer</div>
			</div>
		</div>
	);
};

export default LikedCoinItem;
