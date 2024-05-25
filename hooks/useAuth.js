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

    const handleLogout = async () => {
        try {
            await revoke(authConfig, {
                tokenToRevoke: accessToken,
            });
            setIsLoggedIn(false);
            setUsername('');
            setAccessToken('');
        } catch (error) {
            console.error('Logout failed', error);
            alert('Logout failed. Please try again.');
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
