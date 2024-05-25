// hooks/useCall.js
import { useState } from 'react';

const useCall = () => {
    const [isSingleCall, setIsSingleCall] = useState(true);
    const [singleCallData, setSingleCallData] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
    const [multipleCallsData, setMultipleCallsData] = useState([]); // Initialize as an empty array
    const [isMakingCall, setIsMakingCall] = useState(false);

    // ...other functions

    return {
        isSingleCall,
        singleCallData,
        multipleCallsData,
        isMakingCall,
        toggleCallMode: () => setIsSingleCall(!isSingleCall),
        handleSingleCallInputChange: (field, value) => setSingleCallData({ ...singleCallData, [field]: value }),
        handleMultipleCallsInputChange: (index, field, value) => {
            const newData = [...multipleCallsData];
            newData[index][field] = value;
            setMultipleCallsData(newData);
        },
        handleMakeSingleCall: async () => {
            setIsMakingCall(true);
            // ... API call logic
            setIsMakingCall(false);
        },
        handleMakeMultipleCalls: async () => {
            setIsMakingCall(true);
            // ... API call logic
            setIsMakingCall(false);
        },
        handleAddForm: () => setMultipleCallsData([...multipleCallsData, { firstName: '', lastName: '', email: '', phoneNumber: '' }])
    };
};

export default useCall;
