import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function AuthRoute() {
	const { currentUser } = useContext(AuthContext);

	return !currentUser ? <Outlet /> : <Navigate to="/dashboard" />;
}
