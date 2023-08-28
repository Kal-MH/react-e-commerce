// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOJRXOKaawOnDr4okPmo-VUbWL4Ch_jAE",
  authDomain: "react-shop-app-c8d0c.firebaseapp.com",
  projectId: "react-shop-app-c8d0c",
  storageBucket: "react-shop-app-c8d0c.appspot.com",
  messagingSenderId: "634276425124",
  appId: "1:634276425124:web:92aec7f36a9f8ef6042531",
  measurementId: "G-WZ0V5QYLYH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
