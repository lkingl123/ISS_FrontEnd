import { useState } from 'react';

const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        if (username === 'a' && password === 'a') {
            setIsLoggedIn(true);
        } else {
            alert('Invalid username or password. Please try again.');
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
        setPassword('');
    }; 
      
    return {
        isLoggedIn,
        username,
        password,
        setUsername,
        setPassword,
        handleLogin,
        handleLogout,
    };
};

export default useAuth;
