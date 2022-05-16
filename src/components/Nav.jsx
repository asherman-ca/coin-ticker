import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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

	const onError = () => {
		console.log('hits');
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
					<i class='fa-solid fa-circle-user'></i>
					<i className='fa-solid fa-wallet' onClick={onError}></i>
					{/* <a
						href='https://asherman-ca.github.io/'
						target='_blank'
						rel='noopener noreferrer'
					>
						<span>- Alex Sherman</span>
					</a> */}
				</div>
			</div>
		</div>
	);
};

export default Nav;
