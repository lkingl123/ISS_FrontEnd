// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import styles from '../styles';

const RegisterScreen = ({ navigation, handleRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
            <PaperButton mode="contained" onPress={() => handleRegister(email, password)} style={styles.loginButton}>
                Register
            </PaperButton>
            <PaperButton mode="outlined" onPress={() => navigation.navigate('Login')} style={styles.registerButton}>
                Back to Login
            </PaperButton>
        </View>
    );
};

export default RegisterScreen;
