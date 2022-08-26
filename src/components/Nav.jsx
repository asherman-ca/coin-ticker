import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { filterSearchParam } from '../actions/NavActions';
import NavMenu from './NavMenu';

const Nav = ({ coinsLoading, coins }) => {
	const navigate = useNavigate();
	const [param, setParam] = useState('');
	const [searchFilter, setSearchFilter] = useState([]);

	const onChange = (e) => {
		e.preventDefault();
		setParam(e.target.value);
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
				<NavMenu />
			</div>
		</div>
	);
};

export default Nav;
