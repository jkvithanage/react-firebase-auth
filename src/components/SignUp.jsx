import { Form, Button, Card, Alert, FloatingLabel, Container } from 'react-bootstrap';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { signUp } = useContext(AuthContext);
	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError('Passwords do not match');
		}

		try {
			setError('');
			setLoading(true);
			await signUp(emailRef.current.value, passwordRef.current.value);
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
						<h1>Sign Up</h1>
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
							<Form.Group id="password-confirm" className="mb-3">
								<FloatingLabel controlId="floatingConfirmPassword" label="Password Confirmation">
									<Form.Control type="password" ref={passwordConfirmRef} placeholder="Confirm password" required />
								</FloatingLabel>
							</Form.Group>
							<Button disabled={loading} className="w-100 btn-lg" type="submit">
								Sign Up
							</Button>
						</Form>
					</Card.Body>
				</Card>
				<div className="w-100 text-center mt-3">
					Already have an account? <Link to="/signin">Sign In</Link>
				</div>
			</div>
		</Container>
	);
}
