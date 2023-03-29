import { useState, useContext } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';
import { endPoints } from '@/services/api';
import { AuthContext } from 'context/AuthContext';

export function useProviderAuth() {
	const [user, setUser] = useState(null);
	const [errorLogin, setLoginError] = useState(null);

	const signIn = async ({ email, password }) => {
		const options = {
			headers: {
				accept: '*/*',
				'Content-Type': 'application/json',
			},
		};
		try {
			const {
				data: { access_token },
			} = await axios.post(
				endPoints.auth.login,
				{
					email,
					password,
				},
				options
			);

			if (access_token) {
				Cookie.set('token', access_token, { expires: 5 });

				axios.defaults.headers.Authorization = `Bearer ${access_token}`;
				const { data } = await axios.get(endPoints.auth.profile);

				console.log(data);
				setUser(data);
			}
		} catch (error) {
			if (error.response.data.statusCode === 401) {
				setLoginError('Login Failed: Invalid username or Password.');
			}
		}
	};

	const logout = () => {
		Cookie.remove('token');
		setUser(null);
		delete axios.defaults.headers.authorization;
		window.location.href = '/login';
	};

	return {
		user,
		signIn,
		logout,
		errorLogin,
	};
}

export function useAuth() {
	return useContext(AuthContext);
}
