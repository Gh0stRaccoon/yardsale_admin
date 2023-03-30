/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			'images.unsplash.com',
			'api.lorem.space',
			'placeimg.com',
			'res.cloudinary.com',
		],
	},
};

module.exports = nextConfig;
