import { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebase';
import { AuthContext } from '../contexts/AuthContext';

const auth = getAuth(app);

export function AuthProvider({ children }) {
	const [currentUser, setCurrentUser] = useState(null);
	const [loading, setLoading] = useState(true);

	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function signIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function signOut() {
		return auth.signOut();
	}

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			setLoading(false);
		});

		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signUp,
		signIn,
		signOut
	};

	return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
