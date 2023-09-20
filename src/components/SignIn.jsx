import { Form, Button, Card, Alert, FloatingLabel, Container } from 'react-bootstrap';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { signIn } = useContext(AuthContext);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			setError('');
			setLoading(true);
			await signIn(emailRef.current.value, passwordRef.current.value);
			navigate('/dashboard');
		} catch (error) {
			setError(error.message);
		}

		setLoading(false);
	}

	return (
		<Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
			<div className="w-100" style={{ maxWidth: '500px' }}>
				<Card className="bg-light">
					<Card.Header className="bg-secondary text-white text-center">
						<h1>Sign In</h1>
					</Card.Header>
					<Card.Body className="p-5">
						{error && <Alert variant="danger">{error}</Alert>}
						<Form onSubmit={handleSubmit}>
							<Form.Group id="email" className="mb-3">
								<FloatingLabel controlId="floatingEmail" label="Email Address">
									<Form.Control type="email" ref={emailRef} placeholder="name@example.com" required />
								</FloatingLabel>
							</Form.Group>
							<Form.Group id="password" className="mb-3">
								<FloatingLabel controlId="floatingPassword" label="Password">
									<Form.Control type="password" ref={passwordRef} placeholder="Password" required />
								</FloatingLabel>
							</Form.Group>
							<Button disabled={loading} className="w-100 btn-lg" type="submit">
								Sign In
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-3">
					Need an account? <Link to="/signup">Sign Up</Link>
				</div>
			</div>
		</Container>
	);
}
