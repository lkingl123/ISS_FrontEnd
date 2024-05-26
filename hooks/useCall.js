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

    const validateEmail = (email) => {
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        // Regular expression to validate phone number format (e.g., XXX-XXX-XXXX)
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        return phoneRegex.test(phoneNumber);
    };

    const handleMakeSingleCall = async () => {
        try {
            setIsMakingCall(true);
            setCallSuccess(false);
            setErrorMessage('');
            // Validate data
            if (!singleCallData.firstName || !singleCallData.lastName || !singleCallData.email || !singleCallData.phoneNumber) {
                throw new Error('Please fill in all fields');
            }
            if (!validateEmail(singleCallData.email)) {
                throw new Error('Please enter a valid email');
            }
            if (!validatePhoneNumber(singleCallData.phoneNumber)) {
                throw new Error('Please enter a valid phone number (e.g., 385-XXX-XXXX)');
            }
            // Perform API call for single call
            await initiateCall(singleCallData);
            setIsMakingCall(false);
            setCallSuccess(true);
            resetForm(); // Reset form after successful call
        } catch (error) {
            setIsMakingCall(false);
            setCallSuccess(false);
            setErrorMessage(error.message);
            console.error('Error making single call:', error.message);
        }
    };

    const handleMakeMultipleCalls = async () => {
        try {
            setIsMakingCall(true);
            setCallSuccess(false);
            setErrorMessage('');
            // Validate data
            const hasEmptyFields = multipleCallsData.some(data =>
                !data.firstName || !data.lastName || !data.email || !data.phoneNumber
            );
            if (hasEmptyFields) {
                throw new Error('Please fill in all fields for all forms');
            }
            if (multipleCallsData.some(data => !validateEmail(data.email))) {
                throw new Error('Please enter a valid email for all forms');
            }
            if (multipleCallsData.some(data => !validatePhoneNumber(data.phoneNumber))) {
                throw new Error('Please enter a valid phone number (e.g., 385-XXX-XXXX)');
            }
            // Perform API call for multiple calls
            await Promise.all(multipleCallsData.map(initiateCall));
            setIsMakingCall(false);
            setCallSuccess(true);
            resetForm(); // Reset form after successful call
        } catch (error) {
            setIsMakingCall(false);
            setCallSuccess(false);
            setErrorMessage(error.message);
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
