// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHmNXwydVPbefIRuewLAh3U4G33XwIw2s",
  authDomain: "news-smg.firebaseapp.com",
  projectId: "news-smg",
  storageBucket: "news-smg.firebasestorage.app",
  messagingSenderId: "779129977612",
  appId: "1:779129977612:web:52679eba24b0e7a2e3a729"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export default app;