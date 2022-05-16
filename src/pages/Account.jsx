import { useState, useEffect } from 'react';

import '../styles/Account.css';
import Spinner from '../components/Spinner';

const Account = () => {
	const [loading, setLoading] = useState(false);

	if (loading) {
		return (
			<div className='container'>
				<div className='account'>
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div className='container'>
			<div className='account'></div>
		</div>
	);
};

export default Account;
