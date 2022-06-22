import { paginationRange } from '../../../components/PaginationRange';

const Pagination = ({
	totalCount,
	setCurrentPage,
	currentPage,
	setRowsPerPage,
	rowsPerPage,
	rowsPerPageOptions,
	nextPage,
	prevPage,
}) => {
	const lastPage =
		totalCount % rowsPerPage == 0
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
			<div className='page-buttons'>
				{currentPage != 1 && (
					<button
						onClick={() => {
							prevPage();
						}}
					>
						<i className='fa-solid fa-chevron-left'></i>
					</button>
				)}

				{paginationPages.map((pageNumber, ind) => {
					if (pageNumber == '...') {
						return <div key={ind}>...</div>;
					} else if (pageNumber == currentPage) {
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

				{currentPage != lastPage && (
					<button onClick={() => nextPage()}>
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
