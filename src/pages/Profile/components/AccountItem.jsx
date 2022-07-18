import React from 'react';

const AccountItem = ({ account }) => {
	console.log('account', account);
	return <div>{account.coin}</div>;
};

export default AccountItem;
