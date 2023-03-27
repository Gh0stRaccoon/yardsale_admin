import { ProviderAuth } from 'context/AuthContext';
import MainLayout from '@/layout/MainLayout';
import '@/styles/tailwind.css';

export default function App({ Component, pageProps }) {
	return (
		<>
			<ProviderAuth>
				<MainLayout>
					<Component {...pageProps} />
				</MainLayout>
			</ProviderAuth>
		</>
	);
}
