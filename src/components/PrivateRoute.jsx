import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../utils/useAuthStatus';
import Spinner from './Spinner';

const PrivateRoute = () => {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return (
			<div className='container'>
				<div style={{ display: 'flex' }}>
					<Spinner />
				</div>
			</div>
		);
	}

	return loggedIn ? <Outlet /> : <Navigate to='/' />;
};

export default PrivateRoute;
