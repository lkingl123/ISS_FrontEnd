import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperTextInput, Button as PaperButton, Snackbar } from 'react-native-paper';
import styles from '../styles';
import CompanyLogo from '../assets/logo.png';
import useCall from '../hooks/useCall';

const HomeScreen = ({ user, handleLogout }) => {
    const {
        isSingleCall,
        singleCallData,
        multipleCallsData,
        isMakingCall,
        toggleCallMode,
        handleSingleCallInputChange,
        handleMultipleCallsInputChange,
        handleMakeSingleCall,
        handleMakeMultipleCalls,
        handleAddForm,
        callSuccess, // New state for indicating call success
        errorMessage, // New state for displaying error message
    } = useCall();

    const formStyle = [styles.form, isSingleCall ? styles.singleCallForm : styles.multipleCallForm];

    const [visible, setVisible] = useState(false); // State for controlling success Snackbar visibility

    useEffect(() => {
        if (callSuccess) {
            setVisible(true); // Show success Snackbar when callSuccess changes to true
        }
    }, [callSuccess]);

    const onDismissSnackBar = () => setVisible(false); // Function to handle success Snackbar dismissal

    return (
        <PaperProvider>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <View style={[styles.headerContainer, styles.logoContainer]}>
                        <Image source={CompanyLogo} style={styles.logo} />
                        <PaperButton mode="contained" onPress={handleLogout} color="#ff3333">
                            Logout
                        </PaperButton>
                    </View>
                    <View style={styles.body}>
                        <Text style={styles.welcomeText}>Welcome, {user.email}</Text>
                        <View style={styles.options}>
                            <PaperButton mode="contained" onPress={toggleCallMode}>
                                {isSingleCall ? 'Single Call' : 'Multiple Calls'}
                            </PaperButton>
                        </View>
                        <View style={formStyle}>
                            {isSingleCall ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                    {multipleCallsData.map((data, index) => (
                                        <View key={index}>
                                            <PaperTextInput
                                                label="First Name"
                                                value={data.firstName}
                                                onChangeText={(text) =>
                                                    handleMultipleCallsInputChange(index, 'firstName', text)
                                                }
                                                style={styles.input}
                                                required
                                            />
                                            <PaperTextInput
                                                label="Last Name"
                                                value={data.lastName}
                                                onChangeText={(text) =>
                                                    handleMultipleCallsInputChange(index, 'lastName', text)
                                                }
                                                style={styles.input}
                                                required
                                            />
                                            <PaperTextInput
                                                label="Email"
                                                value={data.email}
                                                onChangeText={(text) =>
                                                    handleMultipleCallsInputChange(index, 'email', text)
                                                }
                                                style={styles.input}
                                                required
                                            />
                                            <PaperTextInput
                                                label="Phone Number"
                                                value={data.phoneNumber}
                                                onChangeText={(text) =>
                                                    handleMultipleCallsInputChange(index, 'phoneNumber', text)
                                                }
                                                style={styles.input}
                                                required
                                            />
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
                                </>
                            )}
                        </View>
                        <Snackbar
                            visible={visible} // Set visible prop based on success state
                            onDismiss={onDismissSnackBar} // Call onDismissSnackBar when Snackbar is dismissed
                        >
                            Call successful! {/* Snackbar message */}
                        </Snackbar>
                        <Snackbar
                            visible={!!errorMessage} // Display validation error Snackbar only when errorMessage is present
                            onDismiss={() => handleAddForm()} // Dismiss Snackbar when user interacts with the form
                        >
                            {errorMessage}
                        </Snackbar>
                    </View>
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

export default HomeScreen;
