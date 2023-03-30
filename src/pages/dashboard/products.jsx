import { Fragment, useEffect, useState } from 'react';
import {
	ChevronDownIcon,
	PlusIcon,
	XCircleIcon,
} from '@heroicons/react/20/solid';
import { Menu, Transition } from '@headlessui/react';
import Paginator from '@/common/Paginator';
import { useFetch } from '@/hooks/useFetch';
import { usePaginator } from '@/hooks/usePaginator';
import { endPoints } from '@/services/api';
import Modal from '@/common/Modal';
import FormProduct from '@/components/FormProduct';
import { Alert } from '@/common/Alert';
import { useAlert } from '@/hooks/useAlert';
import { deleteProduct } from '@/services/api/products';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';

export default function Products() {
	const [open, setOpen] = useState(false);
	const { alert, setAlert, toggleAlert } = useAlert();
	const allProducts = useFetch(endPoints.products.getAll(0, 0), alert);
	const [products, setProducts] = useState([]);

	const totalItems = allProducts.length;
	const ITEMS_PER_PAGE = 10;

	const paginatorConfig = usePaginator({
		url: endPoints.products.getAll,
		itemsPerPage: ITEMS_PER_PAGE,
		neighbors: 2,
		totalItems,
	});

	const getAllProducts = async () => {
		const { data } = await axios.get(
			endPoints.products.getAll(
				ITEMS_PER_PAGE,
				ITEMS_PER_PAGE * (paginatorConfig.currentPage - 1)
			)
		);

		setProducts(data);
	};

	const handleDelete = (id) => {
		deleteProduct(id)
			.then(() => {
				setAlert({
					active: true,
					message: 'Delete product succesfully',
					type: 'error',
					autoClose: true,
				});
			})
			.catch((err) => {
				setAlert({
					active: true,
					message: err.message,
					type: 'error',
					autoClose: true,
				});
			});
	};

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	useEffect(() => {
		try {
			getAllProducts();
		} catch (error) {
			setAlert({
				active: true,
				message: error.message,
				type: 'error',
				autoClose: true,
			});
		}
	}, [alert, paginatorConfig.currentPage]);

	return (
		<>
			<Alert alert={alert} handleClose={toggleAlert} />
			<div className="lg:flex lg:items-center lg:justify-between mb-8">
				<div className="min-w-0 flex-1">
					<h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
						List of products
					</h2>
				</div>
				<div className="mt-5 flex lg:mt-0 lg:ml-4">
					<span className="sm:ml-3">
						<button
							type="button"
							onClick={() => setOpen(true)}
							className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							<PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
							Add product
						</button>
					</span>

					{/* Dropdown */}
					<Menu as="div" className="relative ml-3 sm:hidden">
						<Menu.Button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
							More
							<ChevronDownIcon
								className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Menu.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-200"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 z-10 mt-2 -mr-1 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}
										>
											Edit
										</a>
									)}
								</Menu.Item>
								<Menu.Item>
									{({ active }) => (
										<a
											href="#"
											className={classNames(
												active ? 'bg-gray-100' : '',
												'block px-4 py-2 text-sm text-gray-700'
											)}
										>
											View
										</a>
									)}
								</Menu.Item>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Name
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Category
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Price
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Id
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">Edit</span>
										</th>
										<th scope="col" className="relative px-6 py-3">
											<span className="sr-only">Delete</span>
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{products.map((product) => (
										<tr key={`product-item-dashboard-${product.id}`}>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<Image
															width={40}
															height={40}
															className="h-10 w-10 rounded-full"
															src={product.images[0]}
															alt={product.title}
														/>
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{product.title}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-900">
													{product.category.name}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
													${product.price}
												</span>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
												{product.id}
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<Link
													href={`/dashboard/edit/${product.id}`}
													className="text-indigo-600 hover:text-indigo-900"
												>
													Edit
												</Link>
											</td>
											<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
												<XCircleIcon
													className="flex-shrink-0 h-6 w-6 text-gray-400 cursor-pointer hover:text-red-400 ease-in duration-150"
													aria-hidden="true"
													onClick={() => handleDelete(product.id)}
												/>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
			<Paginator config={paginatorConfig} />
			<Modal open={open} setOpen={setOpen}>
				<FormProduct setOpen={setOpen} setAlert={setAlert} />
			</Modal>
		</>
	);
}
