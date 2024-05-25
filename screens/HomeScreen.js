// screens/HomeScreen.js
import React from 'react';
import { ScrollView, View, Text, Image, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider, TextInput as PaperTextInput, Button as PaperButton } from 'react-native-paper';
import styles from '../styles';
import CompanyLogo from '../assets/logo.png';

const HomeScreen = ({
    user,
    handleLogout,
    isSingleCall,
    singleCallData,
    multipleCallsData = [], // Default to an empty array
    isMakingCall,
    toggleCallMode,
    handleSingleCallInputChange,
    handleMultipleCallsInputChange,
    handleMakeSingleCall,
    handleMakeMultipleCalls,
    handleAddForm,
}) => {
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
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

export default HomeScreen;
