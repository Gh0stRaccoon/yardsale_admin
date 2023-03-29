import axios from 'axios';
import { endPoints } from '@/services/api';

export const addProduct = async (payload) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			accept: '*/*',
		},
	};
	const { data } = await axios.post(endPoints.products.post, payload, config);
	return data;
};

export const deleteProduct = async (payload) => {
	const { data } = await axios.delete(endPoints.products.delete(payload));
	return data;
};

export const updateProduct = async (id, payload) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
			accept: '*/*',
		},
	};
	const { data } = await axios.put(endPoints.products.put(id), payload, config);
	return data;
};
