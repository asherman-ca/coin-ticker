import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import OAuth from '../components/OAuth';

const Nav = () => {
	const [param, setParam] = useState();
	const navigate = useNavigate();

	const onChange = (e) => {
		e.preventDefault();
		setParam(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		navigate(`/${param.toLowerCase()}`);
	};

	return (
		<div className='nav-container'>
			<div className='navbar'>
				<div className='nav-item'>
					<Link className='logo-div' to={`/`}>
						<i class='fa-solid fa-dice'></i>Tickr
					</Link>
				</div>
				<form action='' onSubmit={onSubmit} className='nav-item search-div'>
					<input type='text' placeholder='Search Coins' onChange={onChange} />
				</form>
				<div className='nav-item nav-links'>
					<i
						onClick={() => navigate('/account')}
						className='fa-solid fa-circle-user'
					></i>
					{/* <i className='fa-solid fa-wallet'></i> */}
					{/* <a
						href='https://asherman-ca.github.io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<span>- Alex Sherman</span>
					</a> */}
					<OAuth />
				</div>
			</div>
		</div>
	);
};

export default Nav;
