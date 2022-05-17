import { useState, useEffect } from 'react';

import '../styles/Account.css';
import Spinner from '../components/Spinner';

const Account = () => {
	const [loading, setLoading] = useState(false);
	const [formType, setFormType] = useState('buy');
	const [formData, setFormData] = useState({
		coin: '',
		spend: 0,
		quantity: 0,
	});

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
			<div className='account'>
				<div className='primary-col'>
					<div className='header'>Transactions</div>
				</div>
				<div className='secondary-col'>
					<div className='form-div'>
						<div className='header'>
							<span onClick={() => setFormType('buy')}>Buy</span> /{' '}
							<span onClick={() => setFormType('sell')}>Sell</span>
						</div>
						{formType === 'buy' ? (
							<form action='' className='buy-sell-form'>
								<input type='text' />
								<input type='number' />
								<input type='number' />
								<button>Buy</button>
							</form>
						) : (
							<form action='' className='buy-sell-form'>
								<input type='text' />
								<input type='number' />
								<input type='number' />
								<button>Sell</button>
							</form>
						)}
					</div>
					<div className='accounting'>PNL</div>
				</div>
			</div>
		</div>
	);
};

export default Account;
