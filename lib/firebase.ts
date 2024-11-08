import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBkWdes8kPYkD9YJ4IiTkvv4Fags3LMZ4k",
  authDomain: "smartwave-d1dfd.firebaseapp.com",
  projectId: "smartwave-d1dfd",
  storageBucket: "smartwave-d1dfd.firebasestorage.app",
  messagingSenderId: "623507538124",
  appId: "1:623507538124:web:eb828294b971008e7e8269",
  measurementId: "G-572S0YM7BJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };