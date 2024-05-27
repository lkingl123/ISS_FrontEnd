const initiateCall = async (data) => {
    // Check if all required fields are present in the data object
    if (!data.firstName || !data.lastName || !data.email || !data.phoneNumber) {
        throw new Error('Missing required fields in the data object');
    }

    try {
        const response = await fetch('https://dc3b-216-83-134-86.ngrok-free.app/initiate_call', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName: data.firstName,
                lastName: data.lastName,
                phone: data.phoneNumber,
                email: data.email
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to initiate call');
        }

        const responseData = await response.json();
        console.log(responseData); // Log the payload

        return responseData;
    } catch (error) {
        throw new Error('Error initiating call: ' + error.message);
    }
};

export { initiateCall };
