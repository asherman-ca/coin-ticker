import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from 'firebase/auth';
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
	// const [loading, setLoading] = useState(true);
	// const [currentUser, setCurrentUser] = useState(auth.currentUser);

	useEffect(() => {
		if (isMounted) {
			const auth = getAuth();
			onAuthStateChanged(auth, (user) => {
				if (user) {
					setLoggedIn(true);
				} else {
					setLoggedIn(false);
				}
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
	};

	const onLogout = () => {
		auth.signOut();
		setLoggedIn(false);
		navigate('/');
		toast.info('Logged Out');
	};

	let authButton;
	if (!loggedIn) {
		authButton = <OAuth />;
	} else {
		authButton = (
			<>
				<i
					onClick={() => navigate('/account')}
					className='fa-solid fa-wallet'
				></i>
				<i
					onClick={onLogout}
					className='fa-solid fa-arrow-right-from-bracket'
				></i>
			</>
		);
	}

	return (
		<div className='nav-container'>
			{/* {console.log('navloading', coinsLoading)} */}
			{/* {console.log('coins nav', coins)} */}
			{console.log('search filter', searchFilter)}
			<div className='navbar'>
				<div className='nav-item'>
					<Link className='logo-div' to={`/`}>
						<i className='fa-solid fa-coins'></i>Tickr
					</Link>
				</div>
				<form action='' onSubmit={onSubmit} className='nav-item search-div'>
					<i className='fa-solid fa-magnifying-glass'></i>
					<input type='text' placeholder='Search Coins' onChange={onChange} />
					{searchFilter.length > 0 && (
						<div className='search-prefill'>
							<div className='prefill-item'>item</div>
							<div className='prefill-item'>item</div>
						</div>
					)}
				</form>
				<div className='nav-item nav-links'>{authButton}</div>
			</div>
		</div>
	);
};

export default Nav;
