import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
					<Link to={`/`}>Tickr</Link>
				</div>
				<form action='' onSubmit={onSubmit} className='nav-item search-div'>
					<input type='text' placeholder='Search Coins' onChange={onChange} />
				</form>
				<div className='nav-item nav-links'>
					<i className='fa-solid fa-wallet'></i>
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
