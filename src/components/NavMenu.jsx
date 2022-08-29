import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { UserAuth } from '../context/AuthContext';

const NavMenu = () => {
	const navigate = useNavigate();
	const { logout, user } = UserAuth();
	const [showDrop, setShowDrop] = useState(false);

	const onLogout = async () => {
		logout();
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
				// navigate('/profile');
				toast.success('Logged in');
			}
		} catch (error) {
			toast.error('Invalid credentials');
		}
	};

	let authButton;
	if (!user) {
		authButton = (
			<div className='nav-link'>
				<button
					className={
						showDrop
							? 'nav-link-button show-drop-button active'
							: 'nav-link-button'
					}
					type='button'
					onClick={() => setShowDrop((prev) => !prev)}
					onBlur={() => setShowDrop(false)}
				>
					<i></i>
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
					<Link to={'/signup'}>
						<i className='fa-solid fa-user-plus'></i>Register
					</Link>
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
							showDrop
								? 'nav-link-button show-drop-button active'
								: 'nav-link-button'
						}
						type='button'
						onClick={() => setShowDrop((prev) => !prev)}
						onBlur={() => setShowDrop(false)}
					>
						{/* <i className='fa-solid fa-bars'></i> */}
						<i></i>
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
						<div onClick={() => navigate('/profile')}>
							<i className='fa-solid fa-user-astronaut'></i>Account
						</div>
						<div
							style={{
								height: '0px',
								padding: '0',
								margin: '.5rem 0',
								borderBottom: '.5px solid grey',
							}}
						></div>
						<div onClick={onLogout}>
							<i className='fa-solid fa-arrow-right-from-bracket'></i>Logout
						</div>
					</div>
				</div>
			</>
		);
	}

	return <div className='nav-item nav-links'>{authButton}</div>;
};

export default NavMenu;
