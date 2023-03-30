import { useEffect, useRef, useState } from 'react';
import { uploadProductValidation } from 'utils/validationSchemas';
import { addProduct, updateProduct } from '@/services/api/products';
import { errorHandling } from 'utils/errorHandling';
import { ArrowPathIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import { deleteImage, uploadImage } from '@/services/api/images';
import Image from 'next/image';

export default function FormProduct({ setOpen, setAlert, product }) {
	const router = useRouter();
	const formRef = useRef(null);
	const [errors, setErrors] = useState(null);
	const [loading, setLoading] = useState(false);
	const [images, setImages] = useState([]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const formData = new FormData(formRef.current);
		const data = Object.fromEntries(formData);
		try {
			const validateData = await uploadProductValidation.validate(
				{ ...data, images: [...images.map((image) => image.secure_url)] },
				{ abortEarly: false }
			);
			if (product) {
				await updateProduct(product.id, validateData);
				setLoading(false);
				router.replace('/dashboard/products');
			} else {
				await addProduct(validateData);
				setAlert({
					active: true,
					message: 'Product added succesfully',
					type: 'success',
					autoClose: false,
				});
				setLoading(false);
				setOpen(false);
			}
		} catch (error) {
			errorHandling(error, setErrors);
			setLoading(false);
		}
	};

	if (errors?.general) {
		setAlert({
			active: true,
			message: errors.general,
			type: 'error',
			autoClose: false,
		});
	}

	const handleImages = async (event) => {
		const images = event.target.files;
		const updatedImages = await uploadImage(images);
		setImages((prevState) => [...prevState, ...updatedImages]);
		event.target.value = null;
	};

	const handleImgRemove = async (image) => {
		const data = await deleteImage(image);
		console.log(data);
		setImages((prevState) =>
			prevState.filter((prevImage) => prevImage.public_id !== image.public_id)
		);
	};

	useEffect(() => {
		console.log(product);
		if (product) {
			setImages(
				product.images.map((image) => ({
					secure_url: image,
					public_id: image.replace(
						/^(https:\/\/res.cloudinary.com\/\w+\/\w+\/\w+\/v\d+\/)|\.(gif|png|jpg|jpeg|webp)$/g,
						''
					),
				}))
			);
		}
	}, [product]);

	return (
		<form ref={formRef} onSubmit={handleSubmit}>
			<div className="overflow-hidden">
				<div className="px-4 py-5 bg-white sm:p-6">
					<div className="grid grid-cols-6 gap-6">
						<div className="col-span-6 sm:col-span-3">
							<label
								htmlFor="title"
								className="block text-sm font-medium text-gray-700"
							>
								Title
							</label>
							<input
								disabled={loading}
								type="text"
								name="title"
								id="title"
								defaultValue={product?.title}
								className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
							/>
							{errors?.title && (
								<span className="text-red-500 text-sm">{errors?.title}</span>
							)}
						</div>
						<div className="col-span-6 sm:col-span-3">
							<label
								htmlFor="price"
								className="block text-sm font-medium text-gray-700"
							>
								Price
							</label>
							<input
								disabled={loading}
								type="number"
								name="price"
								id="price"
								defaultValue={product?.price}
								className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
							/>
							{errors?.price && (
								<span className="text-red-500 text-sm">{errors?.price}</span>
							)}
						</div>
						<div className="col-span-6">
							<label
								htmlFor="categoryId"
								className="block text-sm font-medium text-gray-700"
							>
								Category
							</label>
							<select
								disabled={loading}
								id="categoryId"
								name="categoryId"
								autoComplete="category-name"
								defaultValue={product?.category?.id}
								className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							>
								<option value="1">Clothes</option>
								<option value="2">Electronics</option>
								<option value="3">Furniture</option>
								<option value="4">Toys</option>
								<option value="5">Others</option>
							</select>
							{errors?.categoryId && (
								<span className="text-red-500 text-sm">
									{errors?.categoryId}
								</span>
							)}
						</div>

						<div className="col-span-6">
							<label
								htmlFor="description"
								className="block text-sm font-medium text-gray-700"
							>
								Description
							</label>
							<textarea
								disabled={loading}
								name="description"
								id="description"
								autoComplete="description"
								rows="3"
								defaultValue={product?.description}
								className="form-textarea mt-1 block w-full mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
							/>
							{errors?.description && (
								<span className="text-red-500 text-sm">
									{errors?.description}
								</span>
							)}
						</div>
						<div className="col-span-6">
							<div>
								<label className="block text-sm font-medium text-gray-700">
									Cover photo
								</label>
								<div className="flex flex-wrap gap-2 my-1">
									{images.map((image) => (
										<div
											key={image.public_id}
											className="h-full h-24 w-24 relative"
										>
											<XCircleIcon
												onClick={() => handleImgRemove(image)}
												className="bg-white rounded-full text-red-400 w-5 h-5 -top-2 -right-2 absolute"
											/>
											<Image
												fill
												src={image.secure_url}
												className="rounded-md h-full object-cover"
											/>
										</div>
									))}
								</div>
								<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
									<div className="space-y-1 text-center">
										<svg
											className="mx-auto h-12 w-12 text-gray-400"
											stroke="currentColor"
											fill="none"
											viewBox="0 0 48 48"
											aria-hidden="true"
										>
											<path
												d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
												strokeWidth={2}
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
										<div className="flex text-sm text-gray-600">
											<label
												htmlFor="images"
												className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
											>
												<span>Upload a file</span>
												<input
													disabled={loading}
													id="images"
													name="images"
													type="file"
													className="sr-only"
													onChange={handleImages}
												/>
											</label>
											<p className="pl-1">or drag and drop</p>
										</div>
										<p className="text-xs text-gray-500">
											PNG, JPG, GIF up to 10MB
										</p>
									</div>
								</div>
								{errors?.images && (
									<span className="text-red-500 text-sm">{errors?.images}</span>
								)}
							</div>
						</div>
					</div>
				</div>
				<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
					<button
						disabled={loading}
						type="submit"
						className="inline-flex justify-center items-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						{loading ? (
							<>
								<ArrowPathIcon className="h-4 w-4 animate-spin mr-2" />{' '}
								Processing...
							</>
						) : (
							'Save'
						)}
					</button>
				</div>
			</div>
		</form>
	);
}
