// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getDatabase,ref,push,set} from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6wEBWbLkLsrxxB9ljpFAOOlalKF2hMic",
  authDomain: "react-project-febf2.firebaseapp.com",
  databaseURL: "https://react-project-febf2-default-rtdb.firebaseio.com",
  projectId: "react-project-febf2",
  storageBucket: "react-project-febf2.firebasestorage.app",
  messagingSenderId: "559582230104",
  appId: "1:559582230104:web:71a848246e63d9451d7c2d",
  measurementId: "G-SCKZH3PVCX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getDatabase(app)

export default db;