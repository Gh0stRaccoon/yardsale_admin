import FormProduct from '@/components/FormProduct';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { endPoints } from '@/services/api';
import axios from 'axios';
import { useAlert } from '@/hooks/useAlert';
import { Alert } from '@/common/Alert';

export default function Edit() {
	const [product, setProduct] = useState(null);
	const { alert, setAlert, toggleAlert } = useAlert();
	const router = useRouter();

	const getProduct = async (id) => {
		const { data } = await axios.get(endPoints.products.get(id));
		setProduct(data);
	};

	useEffect(() => {
		const { id } = router.query;
		if (!router.isReady) return;
		getProduct(id);
	}, [router?.isReady, router?.query]);

	return product ? (
		<>
			<Alert alert={alert} handleClose={toggleAlert} />
			<FormProduct setAlert={setAlert} product={product} />
		</>
	) : (
		<>Loading...</>
	);
}
