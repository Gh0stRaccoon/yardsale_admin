import { useState } from 'react';

export function usePaginator({
	itemsPerPage = 10,
	neighbors = 3,
	totalItems = 0,
}) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(totalItems / itemsPerPage);

	const end = Math.min(
		Math.max(neighbors * 2 + 2, neighbors + currentPage + 1),
		totalPages + 1
	);
	const start = Math.min(
		Math.max(end - (neighbors * 2 + 1), 1),
		Math.max(currentPage - neighbors, 1)
	);

	const pages = Array.from(
		{ length: end - start },
		(value, index) => start + index
	);

	const handleNext = () => {
		currentPage < totalPages && setCurrentPage((current) => current + 1);
	};

	const handlePrev = () => {
		currentPage > 1 && setCurrentPage((current) => current - 1);
	};

	const handlePage = (page) => {
		setCurrentPage(page);
	};

	return {
		pages,
		currentPage,
		handlePage,
		handleNext,
		handlePrev,
		totalItems,
		itemsPerPage,
	};
}
