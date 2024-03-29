import React, { useState, useEffect } from 'react';

import Spinner from '../../components/Spinner';
import Pagination from '../../components/Pagination';
import ExchangeListItem from './components/ExchangeListItem';

const rowsPerPageOptions = [10, 20];

const ExchangeList = () => {
	const [exchanges, setExchanges] = useState();
	const [loading, setLoading] = useState(true);
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

	useEffect(() => {
		const apiFetch = async () => {
			const ref = await fetch(
				`https://api.coingecko.com/api/v3/exchanges?per_page=20`
			);
			if (!ref.ok) {
				throw new Error('Thrown Error Thrown');
			}
			const response = await ref.json();

			setExchanges(response);

			setLoading(false);
		};
		apiFetch();
	}, []);

	if (loading) {
		return (
			<div className='container'>
				<div className='exchange-list'>
					<Spinner />
				</div>
			</div>
		);
	}

	return (
		<div className='container exchange-container'>
			<div className='exchange-list'>
				<div className='exchange-list-header'>
					<div style={{ lineHeight: '3rem' }}>Top Crypto Exchanges</div>
					<span>Sorted by Trust Rank</span>
				</div>
				<div className='exchanges'>
					<div className='list'>
						{exchanges
							.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
							.map((exchange, idx) => {
								return (
									<ExchangeListItem
										key={`${exchange.id} - ${idx}`}
										exchange={exchange}
									/>
								);
							})}
					</div>
					<div className='footer'>
						<Pagination
							totalCount={exchanges.length}
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
		</div>
	);
};

export default ExchangeList;
