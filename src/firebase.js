import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAe4S7AQt6LcnrRKq-Asaq6mu7dbnH4qnI",
  authDomain: "web-final-46478.firebaseapp.com",
  databaseURL: "https://web-final-46478-default-rtdb.firebaseio.com",
  projectId: "web-final-46478",
  storageBucket: "web-final-46478.firebasestorage.app",
  messagingSenderId: "119168788239",
  appId: "1:119168788239:web:d7fca0e1823dc0d39e007a"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
