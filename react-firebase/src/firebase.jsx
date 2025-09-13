// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCJ2hNp9Oo6DJN_WFBGYEWWYmkAhIthl8",
  authDomain: "react-firebase-fb9b7.firebaseapp.com",
  databaseURL: "https://react-firebase-fb9b7-default-rtdb.firebaseio.com",
  projectId: "react-firebase-fb9b7",
  storageBucket: "react-firebase-fb9b7.firebasestorage.app",
  messagingSenderId: "710080678844",
  appId: "1:710080678844:web:e6d8348cc54cadd57bf9b9",
  measurementId: "G-F0EHVTRHV6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getDatabase(app)

export default db;