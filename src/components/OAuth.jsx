import { useNavigate } from 'react-router-dom';

import { UserAuth } from '../context/AuthContext';

function OAuth() {
	const navigate = useNavigate();
	const { oAuth } = UserAuth();

	const onGoogleClick = async () => {
		oAuth(navigate);
	};

	return (
		<div onClick={onGoogleClick} className='oauth'>
			<img className='oauth-logo' src='../google.png' alt='' />
		</div>
	);
}

export default OAuth;
