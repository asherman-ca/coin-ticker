import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';
import Home from './pages/Home/Home';
import CoinView from './pages/CoinView/CoinView';
import Account from './pages/Account/Account';
import SignUp from './pages/Auth/SignUp';
import SignIn from './pages/Auth/SignIn';
import PasswordReset from './pages/Auth/PasswordReset';
import NotFound from './components/NotFound';
import ExchangeList from './pages/ExchangeList/ExchangeList';
import ExchangeView from './pages/ExchangeView/ExchangeView';
import Profile from './pages/Profile/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthContextProvider } from './context/AuthContext';

function App() {
	const [coins, setCoins] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/coins?per_page=200`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();
			setCoins(response);

			setLoading(false);
		};
		apiFetch();
		// setInterval(apiFetch, 15000);
	}, []);

	return (
		<>
			<AuthContextProvider>
				<Nav coinsLoading={loading} coins={coins} />
				<Routes>
					<Route
						path='/'
						element={<Home coins={coins} coinsLoading={loading} />}
					/>
					<Route path='/coins/:coinId' element={<CoinView />} />
					<Route path='/signup' element={<SignUp />} />
					<Route path='/signin' element={<SignIn />} />
					<Route path='/password-reset' element={<PasswordReset />} />
					<Route
						path='/account'
						element={
							<ProtectedRoute>
								<Account />
							</ProtectedRoute>
						}
					/>
					<Route
						path='/profile'
						element={
							<ProtectedRoute>
								<Profile coins={coins} coinsLoading={loading} />
							</ProtectedRoute>
						}
					/>
					<Route path='/exchanges' element={<ExchangeList />} />
					<Route path='/exchanges/:exchangeId' element={<ExchangeView />} />

					<Route path='*' element={<NotFound />} />
				</Routes>
			</AuthContextProvider>
			<ToastContainer />
		</>
	);
}

export default App;
