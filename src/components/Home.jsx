import { useContext } from 'react';
import { Button, Container } from 'react-bootstrap';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
	const { currentUser } = useContext(AuthContext);

	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="text-center">
				<h1>React Firebase Authentication</h1>
				<>
					{currentUser ? (
						<div>
							<p className="mb-3">You are already signed in as {currentUser.email}</p>
							<Link to="/dashboard">
								<Button variant="primary">Go to dashboard</Button>
							</Link>
						</div>
					) : (
						<div>
							<p className="mb-3">You need to sign in first</p>
							<Link to="/signin">
								<Button variant="primary">Sign In</Button>
							</Link>
						</div>
					)}
				</>
			</div>
		</Container>
	);
}
