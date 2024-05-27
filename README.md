
# ISS_FrontEnd

## Overview
This application is a front-end interface for a call management system built with React Native and Expo. It integrates with a backend service to initiate calls and upload contact information from Excel files. Users can log in, view their profile, make single or multiple calls, and upload Excel documents to manage contacts.

## Features
1. **User Authentication**: Log in and register functionalities.
2. **Home Screen**: Allows users to toggle between single and multiple call modes, initiate calls, and navigate to the document upload screen.
3. **Upload Documents**: Users can upload Excel files to view and manage contact data.
4. **API Integration**: Connects to a backend service for initiating calls.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ISS_FrontEnd.git
   cd ISS_FrontEnd
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npx expo start
   ```

## Dependencies
- React Native
- Expo
- react-native-paper
- axios
- dotenv
- xlsx

## File Structure
- `App.js`: Main entry point of the application.
- `screens/`: Contains all screen components (LoginScreen, RegisterScreen, HomeScreen, UploadDocsScreen).
- `hooks/`: Custom hooks used in the application.
- `api/Service.js`: Contains functions for making API calls.
- `styles.js`: Styles used throughout the application.
- `.env`: Environment variables for sensitive information (not included in the repository).

## Usage
1. **Login/Register**: Users can log in or register to access the app.
2. **Home Screen**: View profile, initiate calls, and navigate to the document upload screen.
3. **Upload Documents**: Upload Excel files to view and manage contact information.

## Environment Variables
Create a `.env` file in the root directory with the following variables:
```
AIR_API_KEY=your_air_api_key
```

## Contributing
Contributions are welcome! Please create a pull request or open an issue for any feature requests or bug reports.

