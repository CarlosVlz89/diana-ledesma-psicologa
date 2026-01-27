import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TUS CREDENCIALES REALES (Descomentadas para que funcione en tu web)
const firebaseConfig = {
  apiKey: "AIzaSyCKQxD283QgSB7hotsQQIXhMDgVbLgR9j0",
  authDomain: "diana-psicologia.firebaseapp.com",
  projectId: "diana-psicologia",
  storageBucket: "diana-psicologia.firebasestorage.app",
  messagingSenderId: "713339277261",
  appId: "1:713339277261:web:d706901838cf6436243e84"
};

// Inicializamos Firebase con tus datos reales
const app = initializeApp(firebaseConfig);

// Exportamos las herramientas para usarlas en los otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);

// Definimos el ID de la app (Lo dejamos fijo porque ya no dependemos del chat)
export const appId = 'diana-ledesma-psicologia';