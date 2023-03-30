import { useAuth } from '@/hooks/useAuth';
import { Transition } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { LockClosedIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useRef } from 'react';

export default function LoginPage() {
	const formRef = useRef();
	const auth = useAuth();
	const router = useRouter();

	const submitHandler = (event) => {
		event.preventDefault();
		const formData = new FormData(formRef.current);
		const loginData = Object.fromEntries(formData);

		auth.signIn(loginData).then(() => {
			router.push('/dashboard');
		});
	};

	return (
		<>
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<Image
							width={36}
							height={36}
							className="mx-auto h-12 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
							alt="Your Company"
						/>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
							Sign in to your account
						</h2>
						<p className="mt-2 text-center text-sm text-gray-600">
							Or{' '}
							<a
								href="#"
								className="font-medium text-indigo-600 hover:text-indigo-500"
							>
								start your 14-day free trial
							</a>
						</p>
					</div>
					<form
						className="mt-8 space-y-6"
						action="#"
						method="POST"
						ref={formRef}
						onSubmit={submitHandler}
					>
						<input type="hidden" name="remember" defaultValue="true" />
						<div className="-space-y-px rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									autoComplete="email"
									required
									className="relative block w-full rounded-t-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									required
									className="relative block w-full rounded-b-md border-0 px-3 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									placeholder="Password"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="flex items-center">
								<input
									id="remember-me"
									name="remember-me"
									type="checkbox"
									className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
								/>
								<label
									htmlFor="remember-me"
									className="ml-2 block text-sm text-gray-900"
								>
									Remember me
								</label>
							</div>

							<div className="text-sm">
								<a
									href="#"
									className="font-medium text-indigo-600 hover:text-indigo-500"
								>
									Forgot your password?
								</a>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								<span className="absolute inset-y-0 left-0 flex items-center pl-3">
									<LockClosedIcon
										className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
										aria-hidden="true"
									/>
								</span>
								Sign in
							</button>
						</div>
					</form>
					<Transition
						show={!!auth.errorLogin}
						enter="transition-opacity duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						as="div"
						className="bg-red-400 text-white rounded-md p-2 flex items-center gap-2"
					>
						<ExclamationTriangleIcon className="h-5 w-5 " />
						<p>
							<strong>{auth.errorLogin?.replace(/(?!.*\:)(.*)/g, '')}</strong>{' '}
							{auth.errorLogin?.replace(/(.*?\:)/g, '')}
						</p>
					</Transition>
				</div>
			</div>
		</>
	);
}
