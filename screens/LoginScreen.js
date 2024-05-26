import React, { useState, useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import styles from '../styles';
import CompanyLogo from '../assets/logo.png'; // Import the logo image

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

    return (
        <View style={styles.container}>
            <Image source={CompanyLogo} style={styles.logo} /> {/* Add the logo image */}
            <Text style={styles.loginText}>Login to access your profile</Text>
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
