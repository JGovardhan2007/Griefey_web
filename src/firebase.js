
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpvooFMUgulKy7oMG0vN3yPIYLt2LyLDs",
  authDomain: "bubble-new-70fa8.firebaseapp.com",
  projectId: "bubble-new-70fa8",
  storageBucket: "bubble-new-70fa8.appspot.com",
  messagingSenderId: "160803873628",
  appId: "1:160803873628:web:402a3ad7638ad7e0c6d799",
  measurementId: "G-D66DL3T75C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
