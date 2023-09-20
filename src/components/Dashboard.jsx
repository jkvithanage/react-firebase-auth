import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Alert, Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
	const [error, setError] = useState('');
	const { currentUser, signOut } = useContext(AuthContext);

	const navigate = useNavigate();

	async function handleSignOut() {
		try {
			setError('');
			await signOut();
			navigate('/signin');
		} catch (error) {
			setError(error.message);
		}
	}

	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="text-center">
				{error && <Alert variant="danger">{error}</Alert>}
				<h1>Dashboard</h1>
				<p className="fw-bold">Welcome {currentUser.email}</p>
				<Button variant="primary" onClick={handleSignOut}>
					Sign Out
				</Button>
			</div>
		</Container>
	);
}
