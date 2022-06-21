import { paginationRange } from '../../../components/PaginationRange';

const Pagination = ({
	totalCount,
	setCurrentPage,
	currentPage,
	setRowsPerPage,
	rowsPerPage,
	rowsPerPageOptions,
}) => {
	const nextPage = () => {
		setCurrentPage(currentPage + 1);
	};
	const prevPage = () => {
		setCurrentPage(currentPage - 1);
	};

	const lastPage =
		totalCount % rowsPerPage == 0
			? totalCount / rowsPerPage
			: Math.floor(totalCount / rowsPerPage) + 1;

	const paginationPages = paginationRange(currentPage, lastPage);

	const onSelect = (selectedValue) => {
		setRowsPerPage(selectedValue);
	};

	console.log('lastpage', lastPage);

	return (
		<div className='pagination'>
			<button disabled={currentPage == 1} onClick={() => prevPage()}>
				<i className='fa-solid fa-circle-chevron-left'></i>
			</button>

			{paginationPages.map((pageNumber) => {
				return (
					<div
						className={
							currentPage == pageNumber ? 'page-button active' : 'page-button'
						}
						onClick={() => setCurrentPage(pageNumber)}
					>
						{pageNumber}
					</div>
				);
			})}

			<button disabled={currentPage == lastPage} onClick={() => nextPage()}>
				<i className='fa-solid fa-circle-chevron-right' />
			</button>

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
