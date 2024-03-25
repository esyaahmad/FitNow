// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {getFirestore} from 'firebase/firestore'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY_FIREBASE,
  authDomain: "crested-athlete-412912.firebaseapp.com",
  databaseURL:
    "https://crested-athlete-412912-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "crested-athlete-412912",
  storageBucket: "crested-athlete-412912.appspot.com",
  messagingSenderId: "917780056581",
  appId: "1:917780056581:web:1862ea5814bab947fc6a6c",
  measurementId: "G-SBTKD15R0J",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
