// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './screens/HomeScreen';
import UploadDocsScreen from './screens/UploadDocsScreen'; // Import the new screen
import useAuth from './hooks/useAuth';

const Stack = createStackNavigator();

export default function App() {
    const {
        isLoggedIn,
        user,
        handleRegister,
        handleLogin,
        handleLogout,
    } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isLoggedIn ? (
                    <>
                        <Stack.Screen name="Home">
                            {(props) => (
                                <HomeScreen
                                    {...props}
                                    user={user}
                                    handleLogout={handleLogout}
                                    navigation={props.navigation} // Pass navigation prop
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="UploadDocs">
                            {(props) => (
                                <UploadDocsScreen
                                    {...props}
                                    navigation={props.navigation} // Pass navigation prop
                                />
                            )}
                        </Stack.Screen>
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Login">
                            {(props) => (
                                <LoginScreen
                                    {...props}
                                    handleLogin={handleLogin}
                                />
                            )}
                        </Stack.Screen>
                        <Stack.Screen name="Register">
                            {(props) => (
                                <RegisterScreen
                                    {...props}
                                    handleRegister={handleRegister}
                                />
                            )}
                        </Stack.Screen>
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
