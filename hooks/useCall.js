import { useState } from 'react';
import { initiateCall } from '../api/Service';

const useCall = () => {
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
        const isAnyFormIncomplete = multipleCallsData.some(
            (data) => !data.firstName || !data.lastName || !data.email || !data.phoneNumber
        );
        if (isAnyFormIncomplete) {
            alert('Please fill in all fields before making the call.');
            return;
        }

        setIsMakingCall(true);
        try {
            const promises = multipleCallsData.map((data) => initiateCall(data));
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

    return {
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
    };
};

export default useCall;
