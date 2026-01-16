import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// PEGA AQUÍ TUS CREDENCIALES REALES DE FIREBASE
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKQxD283QgSB7hotsQQIXhMDgVbLgR9j0",
  authDomain: "diana-psicologia.firebaseapp.com",
  projectId: "diana-psicologia",
  storageBucket: "diana-psicologia.firebasestorage.app",
  messagingSenderId: "713339277261",
  appId: "1:713339277261:web:d706901838cf6436243e84"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);