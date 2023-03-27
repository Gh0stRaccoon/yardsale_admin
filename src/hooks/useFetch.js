import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch(endpoint, trigger) {
	const [data, setData] = useState([]);

	async function fetchData() {
		const response = await axios.get(endpoint);
		setData(response.data);
	}

	useEffect(() => {
		try {
			fetchData();
		} catch (error) {
			console.error(error);
		}
	}, [endpoint, trigger]);

	return data;
}
