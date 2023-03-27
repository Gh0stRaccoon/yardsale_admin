import { object, string, number, array } from 'yup';

export const uploadProductValidation = object({
	categoryId: number().required(),
	description: string().required().min(5).max(250),
	images: array().of(string().required()),
	price: number().required().moreThan(0),
	title: string().required().min(3).max(50),
});

export const errorReducer = (errors) =>
	errors.reduce(
		(acc, cur) => ({
			...acc,
			[cur.path.replace(/\[\"\d*\"\]/g, '')]: acc[
				cur.path.replace(/\[\"\d*\"\]/g, '')
			]
				? acc[cur.path.replace(/\[\"\d*\"\]/g, '')]
				: cur.message.replace(/\[\"\d*\"\]/g, ''),
		}),
		{}
	);
