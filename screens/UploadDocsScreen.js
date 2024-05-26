import React, { useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { Provider as PaperProvider, Button as PaperButton, Card as PaperCard, Snackbar as PaperSnackbar } from 'react-native-paper';
import styles from '../styles';
import { initiateCall } from '../api/Service'; // Import the initiateCall function

const UploadDocsScreen = () => {
    const [excelData, setExcelData] = useState([]);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [callingIndex, setCallingIndex] = useState(null);

    const handleFilePick = async () => {
        setLoading(true);
        let result = await DocumentPicker.getDocumentAsync({
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        console.log('DocumentPicker result:', result);

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const fileUri = result.assets[0].uri;
            console.log('File URI:', fileUri);

            const fileData = await fetch(fileUri);
            const fileBlob = await fileData.blob();
            const reader = new FileReader();

            reader.onload = (e) => {
                const data = new Uint8Array(e.target.result);
                console.log('FileReader data:', data);

                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                console.log('Parsed JSON data:', jsonData);

                setExcelData(jsonData);
                setLoading(false);
                setSnackbarVisible(true); // Show success message
            };

            reader.readAsArrayBuffer(fileBlob);
        } else {
            setLoading(false);
        }
    };

    const handleCall = async (index) => {
        const data = excelData[index];
        const payload = {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            phoneNumber: data.phone_number,
        };

        setCallingIndex(index);

        try {
            const response = await initiateCall(payload);
            console.log('Call initiated:', response);
            alert('Call initiated successfully');
        } catch (error) {
            console.error('Error initiating call:', error);
            alert('Failed to initiate call');
        } finally {
            setCallingIndex(null);
        }
    };

    const handleCancel = (index) => {
        // Remove the selected item from the list
        const newData = [...excelData];
        newData.splice(index, 1);
        setExcelData(newData);
    };

    return (
        <PaperProvider>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.container}>
                    <Text style={styles.title}>Upload Excel Document</Text>
                    <PaperButton mode="contained" onPress={handleFilePick} style={styles.uploadButton}>
                        Pick an Excel file
                    </PaperButton>
                    {loading && <ActivityIndicator size="large" color="#0000ff" />}
                    <ScrollView style={styles.dataContainer}>
                        {excelData.map((item, index) => (
                            <PaperCard key={index} style={styles.dataItem}>
                                <PaperCard.Content>
                                    <Text style={styles.dataText}>First Name: {item.first_name}</Text>
                                    <Text style={styles.dataText}>Last Name: {item.last_name}</Text>
                                    <Text style={styles.dataText}>Email: {item.email}</Text>
                                    <Text style={styles.dataText}>Phone Number: {item.phone_number}</Text>
                                </PaperCard.Content>
                                <PaperCard.Actions>
                                    <PaperButton
                                        mode="contained"
                                        onPress={() => handleCall(index)}
                                        style={styles.callButton}
                                        disabled={callingIndex === index}
                                    >
                                        {callingIndex === index ? (
                                            <View style={styles.loadingContainer}>
                                                <ActivityIndicator size="small" color="#ffffff" />
                                            </View>
                                        ) : (
                                            'Call'
                                        )}
                                    </PaperButton>
                                    <PaperButton
                                        mode="contained"
                                        onPress={() => handleCancel(index)}
                                        style={styles.cancelButton}
                                    >
                                        Cancel
                                    </PaperButton>
                                </PaperCard.Actions>
                            </PaperCard>
                        ))}
                    </ScrollView>
                    <PaperSnackbar
                        visible={snackbarVisible}
                        onDismiss={() => setSnackbarVisible(false)}
                        duration={3000}
                    >
                        File uploaded successfully!
                    </PaperSnackbar>
                </View>
            </ScrollView>
        </PaperProvider>
    );
};

export default UploadDocsScreen;
