const API = process.env.NEXT_PUBLIC_API_URL;
const VERSION = process.env.NEXT_PUBLIC_API_VERSION;

export const endPoints = {
	auth: {
		login: `${API}/api/${VERSION}/auth/login`,
		profile: `${API}/api/${VERSION}/auth/profile`,
		refreshToken: `${API}/api/${VERSION}/auth/refresh-token`,
	},
	products: {
		getAll: (limit = 0, offset = 0) =>
			`${API}/api/${VERSION}/products?limit=${limit}&offset=${offset}`,
		post: `${API}/api/${VERSION}/products`,
		get: (id) => `${API}/api/${VERSION}/products/${id}`,
		put: (id) => `${API}/api/${VERSION}/products/${id}`,
		delete: (id) => `${API}/api/${VERSION}/products/${id}`,
	},
	users: {
		getAll: (limit) => `${API}/api/${VERSION}/users?limit=${limit}`,
		post: `${API}/api/${VERSION}/users`,
		get: (id) => `${API}/api/${VERSION}/user/${id}`,
		put: (id) => `${API}/api/${VERSION}/user/${id}`,
		delete: (id) => `${API}/api/${VERSION}/user/${id}`,
		available: `${API}/api/${VERSION}/user/is-available`,
	},
	categories: {
		getAll: `${API}/api/${VERSION}/categories`,
		post: `${API}/api/${VERSION}/categories`,
		get: (id) => `${API}/api/${VERSION}/categories/${id}`,
		put: (id) => `${API}/api/${VERSION}/categories/${id}`,
		delete: (id) => `${API}/api/${VERSION}/categories/${id}`,
		products: (id) => `${API}/api/${VERSION}/categories/${id}/products`,
	},
	files: {
		upload: `${API}/api/${VERSION}/files/upload`,
		get: (filename) => `${API}/api/${VERSION}/files/${filename}`,
	},
};
