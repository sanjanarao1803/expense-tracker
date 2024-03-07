// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKFIYAoDQqDE9uZU2Py97CHZMVYCj-yIo",
  authDomain: "expense-tracker-e5458.firebaseapp.com",
  projectId: "expense-tracker-e5458",
  storageBucket: "expense-tracker-e5458.appspot.com",
  messagingSenderId: "91539590265",
  appId: "1:91539590265:web:33f4170c1cd77cc4ff58a8",
  measurementId: "G-09R72CCZYV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider(); 
export const db = getFirestore(app);