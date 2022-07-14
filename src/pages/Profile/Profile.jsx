import React, { useEffect, useState } from 'react';

import { calcPNL } from '../../utils/accounting';

const Profile = () => {
	const [userInfo, setUserInfo] = useState();
	const [pnl, setPnl] = useState();
	const [likes, setUserLikes] = useState();

	return (
		<div className='container'>
			<div className='profile'>
				<div className='header-row'>Header</div>
				<div className='accounts-row'>accounts</div>
				<div className='likes-row'>likes</div>
			</div>
		</div>
	);
};

export default Profile;
