
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDGqT73prVbeLmhGloF6dx4EwmIMoabTYk",
    authDomain: "properteehub-9d941.firebaseapp.com",
    projectId: "properteehub-9d941",
    storageBucket: "properteehub-9d941.firebasestorage.app",
    messagingSenderId: "1010466322358",
    appId: "1:1010466322358:web:d91f22fb286a895d43b317"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
