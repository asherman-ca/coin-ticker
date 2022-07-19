import { useEffect, useState } from 'react';

import Pagination from '../../components/Pagination';
import CoinListItem from './components/CoinListItem';
import Spinner from '../../components/Spinner';

const rowsPerPageOptions = [10, 25, 50, 100];

const Home = ({ coins, coinsLoading }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
	const [displayCoins, setDisplayCoins] = useState();
	const [sortParam, setSortParam] = useState('mcap');

	useEffect(() => {
		setDisplayCoins(coins);
	}, [coins]);

	const handleSort = (type) => {
		if (type === 'mcap') {
			setSortParam('mcap');
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) => b.market_data.market_cap.usd - a.market_data.market_cap.usd
				)
			);
		} else if (type === '24hr') {
			setSortParam('24hr');
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) =>
						b.market_data.price_change_percentage_24h -
						a.market_data.price_change_percentage_24h
				)
			);
		} else if (type === '1hr') {
			setSortParam('1hr');
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) =>
						b.market_data.price_change_percentage_1h_in_currency.usd -
						a.market_data.price_change_percentage_1h_in_currency.usd
				)
			);
		} else if (type === '7d') {
			setSortParam('7d');
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) =>
						b.market_data.price_change_percentage_7d -
						a.market_data.price_change_percentage_7d
				)
			);
		} else if (type === 'vol') {
			setSortParam('vol');
			setDisplayCoins((prev) =>
				prev.sort(
					(a, b) =>
						b.market_data.total_volume.usd - a.market_data.total_volume.usd
				)
			);
		}
	};

	const updateRowsPerPage = (rowsNumber) => {
		setRowsPerPage(rowsNumber);
		setCurrentPage(1);
	};

	const nextPage = () => {
		setCurrentPage((prev) => prev + 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	const prevPage = () => {
		setCurrentPage((prev) => prev - 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	if (coinsLoading || !displayCoins) {
		return (
			<div className='container'>
				<div className='home'>
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div className='home-container'>
			<div className='home'>
				<div className='header'>
					<div style={{ lineHeight: '3rem' }}>Live Cryptocurrency Prices</div>

					<span>Top Coins by Market Cap</span>
				</div>

				<div>
					<div className='coin-list'>
						<div className='coin-list-header'>
							<div className='col link-col'>
								<div className='icon-holder' />
								Coin
							</div>
							<div className='col price-col'>Price</div>
							<div className='col hr-col' onClick={() => handleSort('1hr')}>
								<i
									className={
										sortParam === '1hr'
											? 'fa-solid fa-chevron-down'
											: 'fa-solid fa-chevron-down hidden'
									}
								></i>
								1hr
							</div>
							<div className='col daily-col' onClick={() => handleSort('24hr')}>
								<i
									className={
										sortParam === '24hr'
											? 'fa-solid fa-chevron-down'
											: 'fa-solid fa-chevron-down hidden'
									}
								></i>
								24hr
							</div>
							<div className='col weekly-col' onClick={() => handleSort('7d')}>
								<i
									className={
										sortParam === '7d'
											? 'fa-solid fa-chevron-down'
											: 'fa-solid fa-chevron-down hidden'
									}
								></i>
								7d
							</div>
							<div className='col vol-col' onClick={() => handleSort('vol')}>
								<i
									className={
										sortParam === 'vol'
											? 'fa-solid fa-chevron-down'
											: 'fa-solid fa-chevron-down hidden'
									}
								></i>
								Vol
							</div>
							<div className='col mcap-col' onClick={() => handleSort('mcap')}>
								<i
									className={
										sortParam === 'mcap'
											? 'fa-solid fa-chevron-down'
											: 'fa-solid fa-chevron-down hidden'
									}
								></i>
								M Cap
							</div>
						</div>
						{console.log('display', displayCoins)}
						{console.log('coins', coins)}
						{displayCoins
							.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
							.map((coin) => (
								<CoinListItem coin={coin} key={coin.id} />
							))}
					</div>
					<Pagination
						totalCount={coins.length}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
						setRowsPerPage={updateRowsPerPage}
						rowsPerPage={rowsPerPage}
						rowsPerPageOptions={rowsPerPageOptions}
						nextPage={nextPage}
						prevPage={prevPage}
					/>
				</div>
			</div>
		</div>
	);
};

export default Home;
