import { useProviderAuth } from '@/hooks/useAuth';
import { createContext } from 'react';

export const AuthContext = createContext();

export function ProviderAuth({ children }) {
	const auth = useProviderAuth();
	return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
