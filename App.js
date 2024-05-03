import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, ActivityIndicator } from 'react-native';

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
        if (username === 'user' && password === 'password') {
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

    const handleMakeSingleCall = () => {
        // Simulated call initiation logic
        setIsMakingCall(true);
        setTimeout(() => {
            setIsMakingCall(false);
            alert('Call initiated successfully!');
        }, 3000); // Simulating a 3-second delay for the call to be made
    };

    const handleMakeMultipleCalls = () => {
        // Check if all forms are filled
        const isAnyFormIncomplete = multipleCallsData.some(
            (data) => !data.firstName || !data.lastName || !data.email || !data.phoneNumber
        );
        if (isAnyFormIncomplete) {
            alert('Please fill in all fields before making the call.');
            return;
        }

        // Simulated call initiation logic
        setIsMakingCall(true);
        setTimeout(() => {
            setIsMakingCall(false);
            alert('Call initiated successfully!');
        }, 3000); // Simulating a 3-second delay for the call to be made
    };

    const handleAddForm = () => {
        setMultipleCallsData([...multipleCallsData, { firstName: '', lastName: '', email: '', phoneNumber: '' }]);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Profile</Text>
                    {isLoggedIn && (
                        <Button title="Logout" onPress={handleLogout} color="#ff3333" />
                    )}
                </View>
                {isLoggedIn ? (
                    <View style={styles.body}>
                        <Text>Welcome to your profile!</Text>
                        <View style={styles.options}>
                            <Button title={isSingleCall ? 'Single Call' : 'Multiple Calls'} onPress={toggleCallMode} />
                        </View>
                        {isSingleCall ? (
                            <View style={styles.form}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="First Name"
                                    value={singleCallData.firstName}
                                    onChangeText={(text) => handleSingleCallInputChange('firstName', text)}
                                    required
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Last Name"
                                    value={singleCallData.lastName}
                                    onChangeText={(text) => handleSingleCallInputChange('lastName', text)}
                                    required
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={singleCallData.email}
                                    onChangeText={(text) => handleSingleCallInputChange('email', text)}
                                    required
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Phone Number"
                                    value={singleCallData.phoneNumber}
                                    onChangeText={(text) => handleSingleCallInputChange('phoneNumber', text)}
                                    required
                                />
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={isMakingCall ? 'Making Call...' : 'Make Call'}
                                        onPress={handleMakeSingleCall}
                                        disabled={isMakingCall}
                                    />
                                </View>
                                {isMakingCall && <ActivityIndicator size="large" color="#0000ff" />}
                            </View>
                        ) : (
                            <View>
                                {multipleCallsData.map((data, index) => (
                                    <View key={index}>
                                        <View style={styles.form}>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="First Name"
                                                value={data.firstName}
                                                onChangeText={(text) => handleMultipleCallsInputChange(index, 'firstName', text)}
                                                required
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Last Name"
                                                value={data.lastName}
                                                onChangeText={(text) => handleMultipleCallsInputChange(index, 'lastName', text)}
                                                required
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Email"
                                                value={data.email}
                                                onChangeText={(text) => handleMultipleCallsInputChange(index, 'email', text)}
                                                required
                                            />
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Phone Number"
                                                value={data.phoneNumber}
                                                onChangeText={(text) => handleMultipleCallsInputChange(index, 'phoneNumber', text)}
                                                required
                                            />
                                        </View>
                                        {index !== multipleCallsData.length - 1 && <View style={styles.separator} />}
                                    </View>
                                ))}
                                <Button title="Add Form" onPress={handleAddForm} />
                                <View style={styles.buttonContainer}>
                                    <Button
                                        title={isMakingCall ? 'Making Call...' : 'Make Call'}
                                        onPress={handleMakeMultipleCalls}
                                        disabled={isMakingCall}
                                    />
                                </View>
                                {isMakingCall && <ActivityIndicator size="large" color="#0000ff" />}
                            </View>
                        )}
                    </View>
                ) : (
                    <View style={styles.body}>
                        <Text>Login to access your profile</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                        <Button title="Login" onPress={handleLogin} />
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    body: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#888',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
    },
    options: {
        marginTop: 20,
        marginBottom: 20,
    },
    form: {
        width: '100%',
        marginBottom: 20,
    },
    separator: {
        borderBottomWidth: 1,
        borderBottomColor: '#888',
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 10,
        marginBottom: 20,
        width: '100%',
    },
});
