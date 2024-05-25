// hooks/useAuth.js
import { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setIsLoggedIn(true);
            } else {
                setUser(null);
                setIsLoggedIn(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = async (email, password) => {
        if (!email || !password) {
            alert('Email and password fields cannot be empty.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format.');
            return;
        }

        try {
            console.log('Attempting to register with email:', email);
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsLoggedIn(true);
            console.log('Registration successful:', userCredential.user);
        } catch (error) {
            console.error('Registration error:', error);
            alert(`Failed to register. ${error.message}`);
        }
    };

    const handleLogin = async (email, password) => {
        if (!email || !password) {
            alert('Email and password fields cannot be empty.');
            return;
        }

        if (!validateEmail(email)) {
            alert('Invalid email format.');
            return;
        }

        try {
            console.log('Attempting to log in with email:', email);
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            setIsLoggedIn(true);
            console.log('Login successful:', userCredential.user);
        } catch (error) {
            console.error('Login error:', error);
            alert(`Failed to log in. ${error.message}`);
        }
    };

    const handleLogout = async () => {
        try {
            console.log('Attempting to log out');
            await signOut(auth);
            setUser(null);
            setIsLoggedIn(false);
            console.log('Logout successful');
        } catch (error) {
            console.error('Logout error:', error);
            alert('Failed to log out. Please try again.');
        }
    };

    return {
        isLoggedIn,
        user,
        handleRegister,
        handleLogin,
        handleLogout,
    };
};

export default useAuth;
