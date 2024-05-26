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
        padding: 20, // Added padding for better spacing
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
    },
    logo: {
        height: 200, // Adjust the height as needed
        width: 200, // Adjust the width as needed
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
        flexDirection: 'row', // Added for row layout
        justifyContent: 'space-between', // Added for spacing between buttons
    },
    input: {
        marginBottom: 10,
    },
    loginText: {
        marginTop:-50,
        marginBottom: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginButton: {
        marginTop: 10,
    },
    registerButton: {
        marginTop: 10,
        marginBottom:10,
    },
    welcomeText: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 'bold',
    },
    // New styles for UploadDocsScreen
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    dataContainer: {
        marginTop: 20,
        width: '100%',
    },
    dataItem: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        width: '100%',
    },
    dataText: {
        fontSize: 16,
        marginBottom: 5,
    },
    actionButton: {
        padding: 10,
        borderRadius: 5,
    },
    callButton: {
        backgroundColor: '#4CAF50',
    },
    cancelButton: {
        backgroundColor: '#F44336',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    uploadButton: {
        marginTop: 20, // Added margin top for better spacing
    },
    loadingContainer: {
        padding: 5, // Added padding around the ActivityIndicator
    },
});

export default styles;
