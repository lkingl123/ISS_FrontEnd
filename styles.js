// styles.js

import { StyleSheet } from 'react-native';

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
    logo: {
        height: 100,
        width: 100,
        resizeMode: 'contain',
    },
    body: {
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
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
    input: {
        marginBottom: 10,
    },
    loginText: {
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginButton: {
        marginTop: 10,
    },
    welcomeText: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default styles;
