import React, { useState } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import { initiateCall } from './api/Service';
import CompanyLogo from './assets/logo.png';
import styles from './styles'; // Import styles

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSingleCall, setIsSingleCall] = useState(true);
    const [singleCallData, setSingleCallData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
    });
    const [multipleCallsData, setMultipleCallsData] = useState([
        {
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        },
    ]);
    const [isMakingCall, setIsMakingCall] = useState(false);

    const handleLogin = () => {
        // Simulated login logic
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
        setSingleCallData({
            firstName: '',
            lastName: '',
            email: '',
            phoneNumber: '',
        });
        setMultipleCallsData([
            {
                firstName: '',
                lastName: '',
                email: '',
                phoneNumber: '',
            },
        ]);
        setIsSingleCall(true);
    };


    const toggleCallMode = () => {
        setIsSingleCall(!isSingleCall);
    };

    const handleSingleCallInputChange = (name, value) => {
        setSingleCallData({ ...singleCallData, [name]: value });
    };

    const handleMultipleCallsInputChange = (index, name, value) => {
        const newData = [...multipleCallsData];
        newData[index][name] = value;
        setMultipleCallsData(newData);
    };

    const handleMakeSingleCall = async () => {
        // Log the payload before initiating the call
        console.log('Payload for single call:', singleCallData);
        setIsMakingCall(true);
        try {
            const response = await initiateCall(singleCallData);
            console.log('Call initiated successfully:', response);
            setIsMakingCall(false);
            alert('Call initiated successfully!');
        } catch (error) {
            setIsMakingCall(false);
            console.error('Error initiating call:', error.message);
            alert('Failed to initiate call. Please try again.');
        }
    };

    const handleMakeMultipleCalls = async () => {
        // Check if all forms are filled
        const isAnyFormIncomplete = multipleCallsData.some(
            (data) => !data.firstName || !data.lastName || !data.email || !data.phoneNumber
        );
        if (isAnyFormIncomplete) {
            alert('Please fill in all fields before making the call.');
            return;
        }

        // Log the payload before initiating the calls
        console.log('Payload for multiple calls:', multipleCallsData);

        setIsMakingCall(true);
        try {
            const promises = multipleCallsData.map(data => initiateCall(data));
            const responses = await Promise.all(promises);
            console.log('Calls initiated successfully:', responses);
            setIsMakingCall(false);
            alert('Calls initiated successfully!');
        } catch (error) {
            setIsMakingCall(false);
            console.error('Error initiating calls:', error.message);
            alert('Failed to initiate calls. Please try again.');
        }
    };

    const handleAddForm = () => {
        setMultipleCallsData([...multipleCallsData, { firstName: '', lastName: '', email: '', phoneNumber: '' }]);
    };

    return (
        <PaperProvider>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={[styles.headerContainer, styles.logoContainer]}>
                        <Image source={CompanyLogo} style={styles.logo} />
                        {isLoggedIn && (
                            <PaperButton mode="contained" onPress={handleLogout} color="#ff3333">
                                Logout
                            </PaperButton>
                        )}
                    </View>
                    {isLoggedIn ? (
                        <View style={styles.body}>
                            <Text style={styles.welcomeText}>Welcome to your profile!</Text>
                            <View style={styles.options}>
                                <PaperButton mode="contained" onPress={toggleCallMode}>
                                    {isSingleCall ? 'Single Call' : 'Multiple Calls'}
                                </PaperButton>
                            </View>
                            {isSingleCall ? (
                                <View style={styles.form}>
                                    <PaperTextInput
                                        label="First Name"
                                        value={singleCallData.firstName}
                                        onChangeText={(text) => handleSingleCallInputChange('firstName', text)}
                                        style={styles.input}
                                        required
                                    />
                                    <PaperTextInput
                                        label="Last Name"
                                        value={singleCallData.lastName}
                                        onChangeText={(text) => handleSingleCallInputChange('lastName', text)}
                                        style={styles.input}
                                        required
                                    />
                                    <PaperTextInput
                                        label="Email"
                                        value={singleCallData.email}
                                        onChangeText={(text) => handleSingleCallInputChange('email', text)}
                                        style={styles.input}
                                        required
                                    />
                                    <PaperTextInput
                                        label="Phone Number"
                                        value={singleCallData.phoneNumber}
                                        onChangeText={(text) => handleSingleCallInputChange('phoneNumber', text)}
                                        style={styles.input}
                                        required
                                    />
                                    <View style={styles.buttonContainer}>
                                        <PaperButton
                                            mode="contained"
                                            onPress={handleMakeSingleCall}
                                            disabled={isMakingCall}
                                        >
                                            {isMakingCall ? 'Making Call...' : 'Make Call'}
                                        </PaperButton>
                                    </View>
                                    {isMakingCall && <ActivityIndicator size="large" color="#0000ff" />}
                                </View>
                            ) : (
                                <View>
                                    {multipleCallsData.map((data, index) => (
                                        <View key={index}>
                                            <View style={styles.form}>
                                                <PaperTextInput
                                                    label="First Name"
                                                    value={data.firstName}
                                                    onChangeText={(text) => handleMultipleCallsInputChange(index, 'firstName', text)}
                                                    style={styles.input}
                                                    required
                                                />
                                                <PaperTextInput
                                                    label="Last Name"
                                                    value={data.lastName}
                                                    onChangeText={(text) => handleMultipleCallsInputChange(index, 'lastName', text)}
                                                    style={styles.input}
                                                    required
                                                />
                                                <PaperTextInput
                                                    label="Email"
                                                    value={data.email}
                                                    onChangeText={(text) => handleMultipleCallsInputChange(index, 'email', text)}
                                                    style={styles.input}
                                                    required
                                                />
                                                <PaperTextInput
                                                    label="Phone Number"
                                                    value={data.phoneNumber}
                                                    onChangeText={(text) => handleMultipleCallsInputChange(index, 'phoneNumber', text)}
                                                    style={styles.input}
                                                    required
                                                />
                                            </View>
                                            {index !== multipleCallsData.length - 1 && <View style={styles.separator} />}
                                        </View>
                                    ))}
                                    <PaperButton mode="contained" onPress={handleAddForm}>
                                        Add Form
                                    </PaperButton>
                                    <View style={styles.buttonContainer}>
                                        <PaperButton
                                            mode="contained"
                                            onPress={handleMakeMultipleCalls}
                                            disabled={isMakingCall}
                                        >
                                            {isMakingCall ? 'Making Call...' : 'Make Call'}
                                        </PaperButton>
                                    </View>
                                    {isMakingCall && <ActivityIndicator size="large" color="#0000ff" />}
                                </View>
                            )}
                        </View>
                    ) : (
                        <View style={styles.body}>
                            <Text style={styles.loginText}>Login to access your profile</Text>
                            <PaperTextInput
                                label="Username"
                                value={username}
                                onChangeText={setUsername}
                                style={styles.input}
                            />
                            <PaperTextInput
                                label="Password"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                style={styles.input}
                            />
                            <PaperButton mode="contained" onPress={handleLogin} style={styles.loginButton}>
                                Login
                            </PaperButton>
                        </View>
                    )}
                </View>
            </ScrollView>
        </PaperProvider>
    );
}
