import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
export default function Paginator({
	config: {
		pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		currentPage = 1,
		handlePage,
		handleNext,
		handlePrev,
		totalItems = 100,
		itemsPerPage = 10,
	},
}) {
	const isActiveClass = (page) =>
		currentPage === page
			? 'relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
			: 'relative inline-flex items-center rounded-r-md px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0';

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			<div className="flex flex-1 justify-between sm:hidden">
				<span
					onClick={handlePrev}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Previous
				</span>
				<span
					onClick={handleNext}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
				>
					Next
				</span>
			</div>
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing{' '}
						<span className="font-medium">
							{currentPage * itemsPerPage - (itemsPerPage - 1)}
						</span>{' '}
						to <span className="font-medium">{currentPage * itemsPerPage}</span>{' '}
						of <span className="font-medium">{totalItems}</span> results
					</p>
				</div>
				<div>
					<nav
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
						aria-label="Pagination"
					>
						<span
							onClick={handlePrev}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
						</span>
						{pages.map((page) => (
							<button
								key={`paginator-${page}`}
								aria-current="page"
								className={isActiveClass(page)}
								onClick={() => handlePage(page)}
							>
								{page}
							</button>
						))}
						<span
							onClick={handleNext}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
						</span>
					</nav>
				</div>
			</div>
		</div>
	);
}
