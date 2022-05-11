import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import CoinView from './pages/CoinView';

function App() {
	return (
		<Router>
			<Nav />
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/:coinId' element={<CoinView />} />
			</Routes>
		</Router>
	);
}

export default App;
