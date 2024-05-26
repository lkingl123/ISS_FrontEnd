// hooks/useCall.js
import { useState } from 'react';
import { initiateCall } from '../api/Service'; // Import the API function

const useCall = () => {
    const [isSingleCall, setIsSingleCall] = useState(true);
    const [singleCallData, setSingleCallData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    const [multipleCallsData, setMultipleCallsData] = useState([{ firstName: '', lastName: '', email: '', phoneNumber: '' }]);
    const [isMakingCall, setIsMakingCall] = useState(false);
    const [callSuccess, setCallSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const resetForm = () => {
        setSingleCallData({ firstName: '', lastName: '', email: '', phoneNumber: '' });
        setMultipleCallsData([{ firstName: '', lastName: '', email: '', phoneNumber: '' }]);
    };

    const handleMakeSingleCall = async () => {
        try {
            setIsMakingCall(true);
            setCallSuccess(false);
            // Perform API call for single call
            await initiateCall(singleCallData);
            setIsMakingCall(false);
            setCallSuccess(true);
            resetForm(); // Reset form after successful call
        } catch (error) {
            setIsMakingCall(false);
            setCallSuccess(false);
            setErrorMessage('Error making single call: ' + error.message);
            console.error('Error making single call:', error.message);
        }
    };

    const handleMakeMultipleCalls = async () => {
        try {
            setIsMakingCall(true);
            setCallSuccess(false);
            // Perform API call for multiple calls
            await Promise.all(multipleCallsData.map(initiateCall));
            setIsMakingCall(false);
            setCallSuccess(true);
            resetForm(); // Reset form after successful call
        } catch (error) {
            setIsMakingCall(false);
            setCallSuccess(false);
            setErrorMessage('Error making multiple calls: ' + error.message);
            console.error('Error making multiple calls:', error.message);
        }
    };

    const handleAddForm = () => {
        setMultipleCallsData([...multipleCallsData, { firstName: '', lastName: '', email: '', phoneNumber: '' }]);
    };

    const handleSingleCallInputChange = (field, value) => {
        setSingleCallData({ ...singleCallData, [field]: value });
        // Clear error message when user starts typing
        setErrorMessage('');
    };

    const handleMultipleCallsInputChange = (index, field, value) => {
        const newData = [...multipleCallsData];
        newData[index][field] = value;
        setMultipleCallsData(newData);
        // Clear error message when user starts typing
        setErrorMessage('');
    };

    return {
        isSingleCall,
        singleCallData,
        multipleCallsData,
        isMakingCall,
        callSuccess,
        errorMessage,
        toggleCallMode: () => setIsSingleCall(!isSingleCall),
        handleSingleCallInputChange,
        handleMultipleCallsInputChange,
        handleMakeSingleCall,
        handleMakeMultipleCalls,
        handleAddForm
    };
};

export default useCall;
