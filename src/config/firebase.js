// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAT8DGFXa2Y9683kBc_PaTXgvdOsBQOq_w",
  authDomain: "fir-tutorial-170a0.firebaseapp.com",
  projectId: "fir-tutorial-170a0",
  storageBucket: "fir-tutorial-170a0.appspot.com",
  messagingSenderId: "417483198029",
  appId: "1:417483198029:web:5c31f34c3971b31e751604",
  measurementId: "G-4EB1WJX1M7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);