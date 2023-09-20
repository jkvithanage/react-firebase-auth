import SignUp from './components/SignUp';
import { AuthProvider } from './providers/AuthProvider';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';
import PrivateRoute from './components/PrivateRoute';
import Root from './components/Root';
import ErrorPage from './components/ErrorPage';
import AuthRoute from './components/AuthRoute';
import Home from './components/Home';

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<Home />} />
			<Route errorElement={<ErrorPage />}>
				<Route element={<PrivateRoute />}>
					<Route path="dashboard" element={<Dashboard />} />
				</Route>
				<Route element={<AuthRoute />}>
					<Route path="signup" element={<SignUp />} />
					<Route path="signin" element={<SignIn />} />
				</Route>
			</Route>
		</Route>
	)
);

export default function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}
