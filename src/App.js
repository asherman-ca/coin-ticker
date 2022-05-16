import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './styles/App.css';
import 'react-toastify/dist/ReactToastify.css';

import Nav from './components/Nav';
import Home from './pages/Home';
import CoinView from './pages/CoinView';
import Account from './pages/Account';
import PrivateRoute from './components/PrivateRoute';

function App() {
	return (
		<>
			<Router>
				<Nav />
				<Routes>
					<Route path='/' element={<Home />} />
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
