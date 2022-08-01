import { useEffect, useState } from 'react';

import { handleSort } from './HomeActions';
import Pagination from '../../components/Pagination';
import CoinListItem from './components/CoinListItem';
import Spinner from '../../components/Spinner';
import TrendingCard from './components/TrendingCard';

const rowsPerPageOptions = [10, 25, 50, 100];

const Home = ({ coins, coinsLoading }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[1]);
	const [displayCoins, setDisplayCoins] = useState();
	const [sortParam, setSortParam] = useState({
		type: 'mcap',
		direction: 'desc',
	});

	useEffect(() => {
		setDisplayCoins(coins);
	}, [coins]);

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

	const displayCoinsCopy = [...displayCoins];

	return (
		<div className='home-container'>
			<div className='home'>
				{/* <div className='header'>
					<div style={{ lineHeight: '3rem' }}>Live Cryptocurrency Prices</div>

					<span>Top Coins by Market Cap</span>
				</div> */}

				<div className='trending-row'>
					<TrendingCard
						title='Daily Trends'
						coins={displayCoinsCopy
							.sort(
								(a, b) =>
									Math.abs(b.market_data.price_change_percentage_24h) -
									Math.abs(a.market_data.price_change_percentage_24h)
							)
							.slice(0, 5)}
					/>
					<TrendingCard
						title='7d Trends'
						coins={displayCoinsCopy
							.sort(
								(a, b) =>
									Math.abs(b.market_data.price_change_percentage_7d) -
									Math.abs(a.market_data.price_change_percentage_7d)
							)
							.slice(0, 5)}
					/>
				</div>

				<div>
					<div className='coin-list'>
						<div className='coin-list-header'>
							<div className='col link-col'>
								<div className='icon-holder' />
								Name
							</div>
							<div className='col price-col'>Price</div>
							<div
								className='col hr-col'
								onClick={() =>
									handleSort('1hr', sortParam, setSortParam, setDisplayCoins)
								}
							>
								<i
									className={
										sortParam.type === '1hr'
											? sortParam.direction === 'desc'
												? 'fa-solid fa-chevron-down'
												: 'fa-solid fa-chevron-up'
											: 'hidden'
									}
								></i>
								1hr
							</div>
							<div
								className='col daily-col'
								onClick={() =>
									handleSort('24hr', sortParam, setSortParam, setDisplayCoins)
								}
							>
								<i
									className={
										sortParam.type === '24hr'
											? sortParam.direction === 'desc'
												? 'fa-solid fa-chevron-down'
												: 'fa-solid fa-chevron-up'
											: 'hidden'
									}
								></i>
								24hr
							</div>
							<div
								className='col weekly-col'
								onClick={() =>
									handleSort('7d', sortParam, setSortParam, setDisplayCoins)
								}
							>
								<i
									className={
										sortParam.type === '7d'
											? sortParam.direction === 'desc'
												? 'fa-solid fa-chevron-down'
												: 'fa-solid fa-chevron-up'
											: 'hidden'
									}
								></i>
								7d
							</div>
							<div
								className='col vol-col'
								onClick={() =>
									handleSort('vol', sortParam, setSortParam, setDisplayCoins)
								}
							>
								<i
									className={
										sortParam.type === 'vol'
											? sortParam.direction === 'desc'
												? 'fa-solid fa-chevron-down'
												: 'fa-solid fa-chevron-up'
											: 'hidden'
									}
								></i>
								Vol
							</div>
							<div
								className='col mcap-col'
								onClick={() =>
									handleSort('mcap', sortParam, setSortParam, setDisplayCoins)
								}
							>
								<i
									className={
										sortParam.type === 'mcap'
											? sortParam.direction === 'desc'
												? 'fa-solid fa-chevron-down'
												: 'fa-solid fa-chevron-up'
											: 'hidden'
									}
								></i>
								M Cap
							</div>
						</div>
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
