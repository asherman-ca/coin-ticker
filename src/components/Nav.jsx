import {
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import OAuth from "../components/OAuth";

const Nav = () => {
	const auth = getAuth();

	const navigate = useNavigate();
	const [param, setParam] = useState();
	const [loading, setLoading] = useState(true);
	// const [currentUser, setCurrentUser] = useState(auth.currentUser);
	const [loggedIn, setLoggedIn] = useState(false);
	const isMounted = useRef(true);

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
	};

	const onSubmit = (e) => {
		e.preventDefault();
		navigate(`/${param.toLowerCase()}`);
	};

	const onLogout = () => {
		auth.signOut();
		setLoggedIn(false);
		navigate("/");
		toast.info("Logged Out");
	};

	let authButton;
	if (!loggedIn) {
		authButton = <OAuth />;
	} else {
		authButton = (
			<>
				<i
					onClick={() => navigate("/account")}
					className='fa-solid fa-circle-user'
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
				<div className='nav-item nav-links'>{authButton}</div>
			</div>
		</div>
	);
};

export default Nav;
