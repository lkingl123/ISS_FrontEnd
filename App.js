import React, { useState } from 'react';
import AppLayout from './AppLayout';
import { initiateCall } from './api/Service';

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
        // Simulated call initiation logic
        setIsMakingCall(true);
        try {
            const response = await initiateCall(singleCallData);
            console.log('Call initiated successfully:', response);
            // Handle the response data as needed
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

        // Simulated call initiation logic
        setIsMakingCall(true);
        try {
            const promises = multipleCallsData.map(data => initiateCall(data));
            const responses = await Promise.all(promises);
            console.log('Calls initiated successfully:', responses);
            // Handle the response data as needed
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
        <AppLayout
            isLoggedIn={isLoggedIn}
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
            isSingleCall={isSingleCall}
            singleCallData={singleCallData}
            multipleCallsData={multipleCallsData}
            isMakingCall={isMakingCall}
            handleLogout={handleLogout}
            toggleCallMode={toggleCallMode}
            handleSingleCallInputChange={handleSingleCallInputChange}
            handleMultipleCallsInputChange={handleMultipleCallsInputChange}
            handleMakeSingleCall={handleMakeSingleCall}
            handleMakeMultipleCalls={handleMakeMultipleCalls}
            handleAddForm={handleAddForm}
            handleLogin={handleLogin}
        />
    );
}
