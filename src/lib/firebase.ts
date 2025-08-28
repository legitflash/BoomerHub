
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  "projectId": "boomer-academy",
  "appId": "1:505117928434:web:56384349d9c03b33a4196b",
  "storageBucket": "boomer-academy.firebasestorage.app",
  "apiKey": "AIzaSyAOw7XczLuooO1ZUwWcZAub1R_v48zAOs4",
  "authDomain": "boomer-academy.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "505117928434"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
