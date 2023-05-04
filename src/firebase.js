// Import the functions you need from the SDKs you need
// import firebase from 'firebase/app'
import { initializeApp } from "firebase/app";
import { getFirestore  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsjx1AtQlUJRnm9GzSRMDgrCp2wDYz0N8",
  authDomain: "boop-b62d0.firebaseapp.com",
  projectId: "boop-b62d0",
  storageBucket: "boop-b62d0.appspot.com",
  messagingSenderId: "741365956520",
  appId: "1:741365956520:web:86218db6e242e3099c279d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);