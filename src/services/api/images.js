import axios from 'axios';
import crypto from 'crypto';
import { endPoints } from '@/services/api';

const PRESET = process.env.NEXT_PUBLIC_C_UPLOAD_PRESET;
const API_KEY = process.env.NEXT_PUBLIC_C_API_KEY;
const API_SECRET = process.env.NEXT_PUBLIC_C_API_SECRET;

export const uploadImage = async (files) => {
	const uploadPromises = [...files].map((file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', PRESET);
		formData.append('api_key', API_KEY);

		return axios.post(endPoints.images.upload, formData);
	});
	const responses = await Promise.all(uploadPromises);
	const uploadedImages = responses.map((res) => ({
		public_id: res.data.public_id,
		secure_url: res.data.secure_url,
	}));

	return uploadedImages;
};

export const deleteImage = async (file) => {
	const formData = new FormData();
	const { signature, timestamp } = generateHash(file);
	formData.append('public_id', file.public_id);
	formData.append('api_key', API_KEY);
	formData.append('timestamp', timestamp);
	formData.append('signature', signature);
	const { data } = await axios.post(endPoints.images.delete, formData);

	return data;
};

const generateHash = ({ public_id }) => {
	const timestamp = Math.floor(Date.now() / 1000);
	const hash = crypto
		.createHash('sha1')
		.update(`public_id=${public_id}&timestamp=${timestamp}${API_SECRET}`)
		.digest('hex');

	return { timestamp, signature: hash };
};
