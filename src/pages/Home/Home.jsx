import { useEffect, useState } from 'react';

import Pagination from '../../components/Pagination';
import CoinListItem from './components/CoinListItem';
import Spinner from '../../components/Spinner';

const rowsPerPageOptions = [10, 25, 50, 100];

const Home = ({ coins, coinsLoading }) => {
	console.log('coins', coins);
	console.log('coinsloading', coinsLoading);

	const [currentPage, setCurrentPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

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

	if (coinsLoading) {
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
					<span>Live Cryptocurrency Prices</span>

					<span>Top Coins by Market Cap</span>
				</div>

				<div>
					<div className='coin-list'>
						<div className='coin-list-header'>
							<div className='col link-col'>
								<div className='icon-holder' />
								Coin
							</div>
							<div className='col'>Price</div>
							<div className='col hr-col'>1hr</div>
							<div className='col daily-col'>24hr</div>
							<div className='col weekly-col'>7d</div>
							<div className='col vol-col'>Vol</div>
							<div className='col mcap-col'>M Cap</div>
						</div>
						{coins
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
