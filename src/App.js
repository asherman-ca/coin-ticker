import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';
import Home from './pages/Home/Home';
import CoinView from './pages/CoinView/CoinView';
import Account from './pages/Account/Account';
import PrivateRoute from './components/PrivateRoute';

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
			<Router>
				{console.log('top coins', coins)}
				<Nav coinsLoading={loading} coins={coins} />
				<Routes>
					<Route path='/' element={<Home coins={coins} loading={loading} />} />
					<Route path='/:coinId' element={<CoinView />} />
					<Route path='/account' element={<PrivateRoute />}>
						<Route path='/account' element={<Account />} />
					</Route>
				</Routes>
			</Router>
			<ToastContainer />
		</>
	);
}

export default App;
