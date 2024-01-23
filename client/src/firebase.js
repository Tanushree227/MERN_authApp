// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-authapp-6f833.firebaseapp.com",
  projectId: "mern-authapp-6f833",
  storageBucket: "mern-authapp-6f833.appspot.com",
  messagingSenderId: "15145896618",
  appId: "1:15145896618:web:0d07a5c44ae46045dd5ed3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);