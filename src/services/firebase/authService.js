/**
 * Servicio de Autenticación de Firebase (Carga Diferida)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Encapsula la interacción con Firebase Authentication mediante importación dinámica
 * y funciones puras/asíncronas desacopladas de React y de la interfaz de usuario.
 */

import { getAuthInstance } from './client.js';
import { env } from '../../config/env.js';

export const ADMIN_SESSION_HINT_KEY = 'diana_admin_session_hint';

/**
 * Indica si existe un hint ligero de sesión previa en este navegador.
 * Nota de seguridad: este indicador nunca otorga permisos de administrador;
 * únicamente decide si se carga el SDK de Auth al inicializar la página.
 * @returns {boolean}
 */
export const hasAdminSessionHint = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage?.getItem(ADMIN_SESSION_HINT_KEY) === '1';
  } catch {
    return false;
  }
};

const setAdminSessionHint = () => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage?.setItem(ADMIN_SESSION_HINT_KEY, '1');
    }
  } catch {
    // Ignorar errores de almacenamiento restringido en navegación privada
  }
};

const clearAdminSessionHint = () => {
  try {
    if (typeof window !== 'undefined') {
      window.localStorage?.removeItem(ADMIN_SESSION_HINT_KEY);
    }
  } catch {
    // Ignorar errores de almacenamiento restringido
  }
};

/**
 * Inicia sesión mediante el proveedor emergente de Google (cargando Auth bajo demanda).
 * @returns {Promise<import('firebase/auth').UserCredential>} Credenciales de la sesión iniciada
 * @throws {Error} Error descriptivo si la autenticación falla
 */
export const loginWithGoogle = async () => {
  try {
    const [{ GoogleAuthProvider, signInWithPopup }, auth] = await Promise.all([
      import('firebase/auth'),
      getAuthInstance(),
    ]);
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const userCredential = await signInWithPopup(auth, provider);
    setAdminSessionHint();
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
 * Cierra la sesión activa del usuario y limpia el hint de sesión local.
 * @returns {Promise<void>}
 * @throws {Error} Error si la operación de desconexión falla
 */
export const logoutUser = async () => {
  try {
    const [{ signOut }, auth] = await Promise.all([
      import('firebase/auth'),
      getAuthInstance(),
    ]);
    await signOut(auth);
    clearAdminSessionHint();
  } catch (error) {
    console.error('[authService.logoutUser] Error al cerrar sesión:', error);
    throw new Error('No fue posible cerrar la sesión correctamente.');
  }
};

/**
 * Suscribe un observador a los cambios de estado de autenticación de forma diferida.
 * @param {(user: import('firebase/auth').User | null) => void} callback Función invocada al cambiar la sesión
 * @returns {() => void} Función de desuscripción (unsubscribe)
 */
export const subscribeToAuth = (callback) => {
  if (typeof callback !== 'function') {
    throw new TypeError('[authService.subscribeToAuth] Se requiere una función callback válida.');
  }

  let isCancelled = false;
  let unsubscribeAuth = () => {};

  (async () => {
    try {
      const [{ onAuthStateChanged }, auth] = await Promise.all([
        import('firebase/auth'),
        getAuthInstance(),
      ]);

      if (isCancelled) return;

      unsubscribeAuth = onAuthStateChanged(
        auth,
        (currentUser) => {
          if (currentUser) {
            setAdminSessionHint();
          } else {
            clearAdminSessionHint();
          }
          callback(currentUser);
        },
        (error) => {
          console.error('[authService.subscribeToAuth] Error en el observador de autenticación:', error);
          callback(null);
        }
      );
    } catch (error) {
      console.error('[authService.subscribeToAuth] Error al inicializar Firebase Auth:', error);
      if (!isCancelled) {
        callback(null);
      }
    }
  })();

  return () => {
    isCancelled = true;
    unsubscribeAuth();
  };
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
  ADMIN_SESSION_HINT_KEY,
  hasAdminSessionHint,
  loginWithGoogle,
  logoutUser,
  subscribeToAuth,
  checkIsAdmin,
};
