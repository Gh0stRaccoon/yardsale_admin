// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { uploadImage } from '@/services/api/images';

export default function handler(req, res) {
	uploadImage(image)
		.then((res) => {
			res.json();
		})
		.then((res) => res.status(200).json())
		.catch((err) => console.log(err));
}
