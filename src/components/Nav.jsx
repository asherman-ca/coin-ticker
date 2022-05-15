import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<div className='nav-container'>
			<div className='navbar'>
				<div className='nav-item'>
					<Link to={`/`}>Tickr</Link>
				</div>
				<div className='nav-item'>
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
