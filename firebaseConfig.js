// firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyCf1jd5vT-BuDPYFKngwUzr4GWNSnSc4T0",
	authDomain: "issexpo.firebaseapp.com",
	projectId: "issexpo",
	storageBucket: "issexpo.appspot.com",
	messagingSenderId: "710985456569",
	appId: "1:710985456569:web:5017fe765fd7699f2af468",
	measurementId: "G-3YDS3S6HX9"
};

let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
	console.log('Firebase initialized with config:', firebaseConfig);
} else {
	firebaseApp = getApps()[0];
	console.log('Firebase app already initialized');
}

const auth = getAuth(firebaseApp);

export { firebaseApp, auth };
