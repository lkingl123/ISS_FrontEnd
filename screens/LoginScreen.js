// screens/LoginScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles';

const LoginScreen = ({ navigation, handleLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            setEmail('');
            setPassword('');
        }
    }, [isFocused]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            sessionStorage.setItem('email', '');
            sessionStorage.setItem('password', '');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    useEffect(() => {
        setEmail(sessionStorage.getItem('email') || '');
        setPassword(sessionStorage.getItem('password') || '');
    }, []);

    useEffect(() => {
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('password', password);
    }, [email, password]);

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Login to access your profile</Text>
            <PaperTextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                disabled={false}
                autoCompleteType="off"
                textContentType="none"
                autoComplete="off"
            />
            <PaperTextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
                disabled={false}
                autoCompleteType="off"
                textContentType="none"
                autoComplete="off"
            />
            <PaperButton mode="contained" onPress={() => handleLogin(email, password)} style={styles.loginButton}>
                Login
            </PaperButton>
            <PaperButton mode="outlined" onPress={() => navigation.navigate('Register')} style={styles.registerButton}>
                Register
            </PaperButton>
        </View>
    );
};

export default LoginScreen;
