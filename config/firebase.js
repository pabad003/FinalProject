import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAGvYIQWpV-k3_B6o6y6i34G2T_45NG5Iw",
    authDomain: "cs110-3510d.firebaseapp.com",
    projectId: "cs110-3510d",
    storageBucket: "cs110-3510d.appspot.com",
    messagingSenderId: "965182604106",
    appId: "1:965182604106:web:54e03b4d162eb8738437b3",
    measurementId: "G-NJ164KJQDN"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
