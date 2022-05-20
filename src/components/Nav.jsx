import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import OAuth from "../components/OAuth";

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
						<i className='fa-solid fa-coins'></i>Tickr
					</Link>
				</div>
				<form action='' onSubmit={onSubmit} className='nav-item search-div'>
					<i className='fa-solid fa-magnifying-glass'></i>
					<input type='text' placeholder='Search Coins' onChange={onChange} />
				</form>
				<div className='nav-item nav-links'>
					<i
						onClick={() => navigate("/account")}
						className='fa-solid fa-circle-user'
					></i>
					<OAuth />
				</div>
			</div>
		</div>
	);
};

export default Nav;
