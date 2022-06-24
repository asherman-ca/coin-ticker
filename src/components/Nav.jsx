import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { filterSearchParam } from '../actions/NavActions';
import OAuth from '../components/OAuth';

const Nav = ({ coinsLoading, coins }) => {
	const auth = getAuth();
	const navigate = useNavigate();
	const [param, setParam] = useState();
	const [loggedIn, setLoggedIn] = useState(false);
	const isMounted = useRef(true);

	const [searchFilter, setSearchFilter] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				} else {
					setLoggedIn(false);
				}
				setLoading(false);
			});
		}
	}, [isMounted]);

	const onChange = (e) => {
		e.preventDefault();
		setParam(e.target.value);
		setSearchFilter(filterSearchParam(coins, e.target.value));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		navigate(`/${param.toLowerCase()}`);
		setParam('');
		setSearchFilter([]);
	};

	const onSuggestedClick = (suggestedId) => {
		navigate(`/${suggestedId.toLowerCase()}`);
		setParam('');
		setSearchFilter([]);
	};

	const onLogout = () => {
		auth.signOut();
		setLoggedIn(false);
		navigate('/');
		toast.info('Logged Out');
	};

	let authButton;
	if (loading) {
		authButton = <div></div>;
	} else if (!loggedIn) {
		authButton = <OAuth />;
	} else {
		authButton = (
			<>
				<div className='nav-link'>
					Account
					<div className='nav-link-dropdown'>
						<div onClick={() => navigate('/account')}>Spot</div>
						<div onClick={() => navigate('/account')}>Derivative</div>
						<div onClick={() => navigate('/account')}>TestNet</div>
					</div>
				</div>
				<div onClick={onLogout} className='nav-link'>
					Logout
				</div>
			</>
		);
	}

	return (
		<div className='nav-container'>
			<div className='navbar'>
				<div className='nav-item'>
					<Link className='logo-div' to={`/`}>
						<i className='fa-solid fa-coins'></i>Tickr
					</Link>
				</div>
				<form action='' onSubmit={onSubmit} className='nav-item search-div'>
					<i className='fa-solid fa-magnifying-glass'></i>
					<input
						type='text'
						placeholder='Search Coins'
						value={param}
						onChange={onChange}
					/>
					{searchFilter.length > 0 && (
						<div className='search-prefill'>
							{searchFilter.map((coin) => (
								<div
									className='prefill-item'
									onClick={() => onSuggestedClick(coin.id)}
									key={coin.id}
								>
									<img src={coin.image.thumb} alt='' />
									<div>{coin.name}</div>
								</div>
							))}
						</div>
					)}
				</form>
				<div className='nav-item nav-links'>{authButton}</div>
			</div>
		</div>
	);
};

export default Nav;
