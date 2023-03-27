import { errorReducer } from './validationSchemas';

export const errorHandling = (error, setErrors) => {
	switch (error.name) {
		case 'ValidationError':
			setErrors(errorReducer(error.inner));
			break;
		case 'AxiosError':
			if (error.response) {
				console.log('response');
				setErrors({ general: error.response.data.message[0] });
			} else if (error.request) {
				if (error.request.readyState === 4 && error.request.status === 0) {
					setErrors({ general: 'Internet disconnected' });
				} else {
					setErrors({ general: error.request.responseText });
				}
			} else {
				setErrors({ general: error.message });
			}
			break;

		default:
			setErrors({ general: error.message });
			break;
	}
};
