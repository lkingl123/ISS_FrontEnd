// src/App.js
import React from 'react';
import AppLayout from './components/AppLayout';
import useAuth from './hooks/useAuth';
import useCall from './hooks/useCall';

export default function App() {
    const {
        isLoggedIn,
        username,
        handleLogin,
        handleLogout,
    } = useAuth();

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
    } = useCall();

    return (
        <AppLayout
            isLoggedIn={isLoggedIn}
            username={username}
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
