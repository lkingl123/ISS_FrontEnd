import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import styles from '../styles';

const RegisterScreen = ({ navigation, handleRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const onRegister = () => {
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError('');
        handleRegister(email, password);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.loginText}>Register to create a new account</Text>
            <PaperTextInput
                label="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
                disabled={false}
            />
            <PaperTextInput
                label="Password"
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                style={styles.input}
                disabled={false}
            />
            <PaperTextInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(text) => setConfirmPassword(text)}
                secureTextEntry
                style={styles.input}
                disabled={false}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <PaperButton mode="contained" onPress={onRegister} style={styles.loginButton}>
                Register
            </PaperButton>
            <PaperButton mode="outlined" onPress={() => navigation.navigate('Login')} style={styles.registerButton}>
                Back to Login
            </PaperButton>
        </View>
    );
};

export default RegisterScreen;
