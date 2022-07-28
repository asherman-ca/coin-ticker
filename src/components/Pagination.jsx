import { paginationRange } from './PaginationRange';

const Pagination = ({
	totalCount,
	setCurrentPage,
	currentPage,
	setRowsPerPage,
	rowsPerPage,
	rowsPerPageOptions,
	nextPage,
	prevPage,
	topPosition,
}) => {
	const lastPage =
		totalCount % rowsPerPage === 0
			? totalCount / rowsPerPage
			: Math.floor(totalCount / rowsPerPage) + 1;

	const paginationPages = paginationRange(currentPage, lastPage);

	const onSelect = (selectedValue) => {
		setRowsPerPage(selectedValue);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div className='pagination'>
			{!topPosition ? (
				<div
					className='top-button'
					onClick={() => {
						window.scrollTo({
							top: 0,
							behavior: 'smooth',
						});
					}}
				>
					<i className='fa-solid fa-chevron-up'></i>
				</div>
			) : (
				<div
					className='top-button'
					onClick={() => {
						window.scrollTo(
							0,
							document.body.scrollHeight ||
								document.documentElement.scrollHeight
						);
					}}
				>
					<i className='fa-solid fa-chevron-down'></i>
				</div>
			)}
			<div className='page-buttons'>
				{currentPage !== 1 && (
					<button
						className='page-scroll-button'
						onClick={() => {
							prevPage();
						}}
					>
						<i className='fa-solid fa-chevron-left'></i>
					</button>
				)}

				{paginationPages.map((pageNumber, ind) => {
					if (pageNumber === '...') {
						return (
							<div key={ind} className='dots'>
								...
							</div>
						);
					} else if (pageNumber === currentPage) {
						return (
							<div key={ind} className='page-button active'>
								{pageNumber}
							</div>
						);
					} else {
						return (
							<div
								key={ind}
								className='page-button'
								onClick={() => {
									setCurrentPage(pageNumber);
									window.scrollTo({
										top: 0,
										behavior: 'smooth',
									});
								}}
							>
								{pageNumber}
							</div>
						);
					}
				})}

				{currentPage !== lastPage && (
					<button className='page-scroll-button' onClick={() => nextPage()}>
						<i className='fa-solid fa-chevron-right'></i>
					</button>
				)}
			</div>
			<select
				name=''
				id=''
				value={rowsPerPage}
				onChange={(e) => {
					onSelect(e.target.value);
				}}
			>
				{rowsPerPageOptions.map((option) => (
					<option key={option}>{option}</option>
				))}
			</select>
		</div>
	);
};

export default Pagination;
