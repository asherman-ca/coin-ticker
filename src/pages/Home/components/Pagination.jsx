import { paginationRange } from '../../../components/PaginationRange';

const Pagination = ({
	totalCount,
	setCurrentPage,
	currentPage,
	setRowsPerPage,
	rowsPerPage,
	rowsPerPageOptions,
}) => {
	const lastPage =
		totalCount % rowsPerPage == 0
			? totalCount / rowsPerPage
			: Math.floor(totalCount / rowsPerPage) + 1;

	const paginationPages = paginationRange(currentPage, lastPage);

	const nextPage = () => {
		setCurrentPage(currentPage + 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	const prevPage = () => {
		console.log('current page', currentPage);
		setCurrentPage(currentPage - 1);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

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
				<button
					disabled={currentPage == 1}
					onClick={() => {
						prevPage();
					}}
				>
					<i className='fa-solid fa-chevron-left'></i>
				</button>

				{paginationPages.map((pageNumber, ind) => {
					if (pageNumber == '...') {
						return <div key={ind}>...</div>;
					} else {
						return (
							<div
								key={ind}
								className={
									currentPage == pageNumber
										? 'page-button active'
										: 'page-button'
								}
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

				<button disabled={currentPage == lastPage} onClick={() => nextPage()}>
					<i className='fa-solid fa-chevron-right'></i>
				</button>
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
