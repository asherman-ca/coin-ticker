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
	const [param, setParam] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [showDrop, setShowDrop] = useState(false);
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
		if (showDrop) setShowDrop(false);
		setSearchFilter(filterSearchParam(coins, e.target.value));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		navigate(`/coins/${param.toLowerCase()}`);
		setParam('');
		setSearchFilter([]);
	};

	const onSuggestedClick = (suggestedId) => {
		navigate(`/coins/${suggestedId.toLowerCase()}`);
		setParam('');
		setSearchFilter([]);
	};

	const onLogout = () => {
		auth.signOut();
		setLoggedIn(false);
		navigate('/');
		toast.info('Logged Out');
	};

	const onDemo = async () => {
		try {
			const auth = getAuth();

			const userCredential = await signInWithEmailAndPassword(
				auth,
				'asd@asd.com',
				'asdasd'
			);

			if (userCredential.user) {
				navigate('/account');
			}
		} catch (error) {
			toast.error('Invalid credentials');
		}
	};

	let authButton;
	if (loading) {
		authButton = (
			<div className='nav-link'>
				<button className='nav-link-button' type='button' />
			</div>
		);
	} else if (!loggedIn) {
		authButton = (
			<div className='nav-link'>
				<button
					className={
						showDrop ? 'nav-link-button show-drop-button' : 'nav-link-button'
					}
					type='button'
					onClick={() => setShowDrop((prev) => !prev)}
					onBlur={() => setShowDrop(false)}
				>
					<i className='fa-solid fa-bars'></i>
				</button>
				<div
					className={
						showDrop ? 'nav-link-dropdown show-drop' : 'nav-link-dropdown'
					}
				>
					<div onClick={() => navigate('/')}>
						<i className='fa-solid fa-coins'></i>Tickrs
					</div>
					<div onClick={() => navigate('/exchanges')}>
						<i className='fa-solid fa-store'></i>Exchanges
					</div>
					<div
						style={{
							height: '0px',
							padding: '0',
							margin: '.5rem 0',
							borderBottom: '.5px solid grey',
						}}
					></div>
					<Link to={'/signin'}>
						<i className='fa-solid fa-address-card'></i>Login
					</Link>
					<OAuth />
					<div
						style={{
							height: '0px',
							padding: '0',
							margin: '.5rem 0',
							borderBottom: '.5px solid grey',
						}}
					></div>
					<div onClick={onDemo}>
						<i className='fa-solid fa-flask'></i>Guest
					</div>
				</div>
			</div>
		);
	} else {
		authButton = (
			<>
				<div className='nav-link'>
					<button
						className={
							showDrop ? 'nav-link-button show-drop-button' : 'nav-link-button'
						}
						type='button'
						onClick={() => setShowDrop((prev) => !prev)}
						onBlur={() => setShowDrop(false)}
					>
						<i className='fa-solid fa-bars'></i>
					</button>
					<div
						className={
							showDrop ? 'nav-link-dropdown show-drop' : 'nav-link-dropdown'
						}
					>
						<div onClick={() => navigate('/')}>
							<i className='fa-solid fa-coins'></i>Tickrs
						</div>
						<div onClick={() => navigate('/exchanges')}>
							<i className='fa-solid fa-store'></i>Exchanges
						</div>
						<div
							style={{
								height: '0px',
								padding: '0',
								margin: '.5rem 0',
								borderBottom: '.5px solid grey',
							}}
						></div>
						<div onClick={() => navigate('/account')}>
							<i className='fa-solid fa-flask'></i>Testnet
						</div>
						<div onClick={() => navigate('/portfolio')}>
							<i className='fa-solid fa-dice'></i>Portfolio
						</div>
						<div
							style={{
								height: '0px',
								padding: '0',
								margin: '.5rem 0',
								borderBottom: '.5px solid grey',
							}}
						></div>
						<div onClick={() => navigate('/profile')}>
							<i className='fa-solid fa-user-astronaut'></i>Account
						</div>
						<div onClick={onLogout}>
							<i className='fa-solid fa-arrow-right-from-bracket'></i>Logout
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<div className='nav-container'>
			<div className='navbar'>
				<div className='nav-item'>
					<Link className='logo-div' to={`/`} id='logo'>
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
