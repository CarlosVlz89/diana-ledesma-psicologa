/**
 * Servicio de Autenticación de Firebase
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Encapsula la interacción con Firebase Authentication mediante funciones
 * puras y asíncronas, desacopladas de React y de la interfaz de usuario.
 */

import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from './client.js';
import { env } from '../../config/env.js';

/**
 * Inicia sesión mediante el proveedor emergente de Google.
 * @returns {Promise<import('firebase/auth').UserCredential>} Credenciales de la sesión iniciada
 * @throws {Error} Error descriptivo si la autenticación falla
 */
export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(auth, provider);
    return userCredential;
  } catch (error) {
    console.error('[authService.loginWithGoogle] Error al autenticar con Google:', error);
    throw new Error(
      error.code === 'auth/popup-closed-by-user'
        ? 'El inicio de sesión fue cancelado por el usuario.'
        : 'No fue posible iniciar sesión. Verifica tu conexión o permisos.'
    );
  }
};

/**
 * Cierra la sesión activa del usuario.
 * @returns {Promise<void>}
 * @throws {Error} Error si la operación de desconexión falla
 */
export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('[authService.logoutUser] Error al cerrar sesión:', error);
    throw new Error('No fue posible cerrar la sesión correctamente.');
  }
};

/**
 * Suscribe un observador a los cambios de estado de autenticación.
 * @param {(user: import('firebase/auth').User | null) => void} callback Función invocada al cambiar la sesión
 * @returns {() => void} Función de desuscripción (unsubscribe)
 */
export const subscribeToAuth = (callback) => {
  if (typeof callback !== 'function') {
    throw new TypeError('[authService.subscribeToAuth] Se requiere una función callback válida.');
  }

  return onAuthStateChanged(auth, (currentUser) => {
    callback(currentUser);
  }, (error) => {
    console.error('[authService.subscribeToAuth] Error en el observador de autenticación:', error);
    callback(null);
  });
};

/**
 * Determina si una dirección de correo electrónico corresponde a una administradora autorizada.
 * Nota: El control real de autorización está blindado a nivel de servidor por firestore.rules.
 * @param {string | null | undefined} email Correo del usuario a evaluar
 * @returns {boolean} Verdadero si el correo coincide con la lista oficial
 */
export const checkIsAdmin = (email) => {
  if (!email || typeof email !== 'string') {
    return false;
  }
  const normalizedEmail = email.trim().toLowerCase();
  return env.adminEmails.includes(normalizedEmail);
};

export default {
  loginWithGoogle,
  logoutUser,
  subscribeToAuth,
  checkIsAdmin,
};
