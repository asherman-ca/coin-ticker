import React from 'react';
import { Link } from 'react-router-dom';

import { changeDirection, cleanInt } from '../../../utils/stringUtils';

const AccountItem = ({ account }) => {
	const changeType = changeDirection(account.pnl + account.rpnl);

	return (
		<Link to='/account' className='account-item'>
			<div className='content'>
				<div className='title-col'>
					<img src={account.imageLarge} alt='' />
					<div>{account.coin}</div>
				</div>

				<div className='meta-col'>
					<div>${cleanInt(account.totalValue)}</div>
					<div className={changeType}>
						${cleanInt(account.pnl + account.rpnl)}
					</div>
				</div>
			</div>
		</Link>
	);
};

export default AccountItem;
