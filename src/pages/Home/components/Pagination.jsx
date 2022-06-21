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

	const onSelect = (selectedValue) => {
		console.log('value', selectedValue);
		setRowsPerPage(selectedValue);
	};

	return (
		<div className='pagination'>
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
