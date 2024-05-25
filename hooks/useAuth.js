// src/hooks/useAuth.js
import { useState } from 'react';
import { authorize, revoke } from 'react-native-app-auth';
import { authConfig } from '../authConfig';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [accessToken, setAccessToken] = useState('');

    const handleLogin = async () => {
        try {
            const authState = await authorize(authConfig);
            setIsLoggedIn(true);
            setUsername(authState.tokenAdditionalParameters.preferred_username);
            setAccessToken(authState.accessToken);
        } catch (error) {
            console.error('Login failed', error);
            alert('Login failed. Please try again.');
        }
    };

    return {
        isLoggedIn,
        username,
        handleLogin,
        handleLogout,
    };
};

export default useAuth;
