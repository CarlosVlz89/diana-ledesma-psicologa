/**
 * Módulo de Configuración y Validación de Variables de Entorno
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Lee, valida y congela (Object.freeze) las variables de entorno provistas por Vite (import.meta.env).
 * Garantiza el principio de fail-fast si alguna variable crítica de infraestructura no está definida.
 */

const requiredFirebaseKeys = [
  { key: 'VITE_FIREBASE_API_KEY', prop: 'apiKey' },
  { key: 'VITE_FIREBASE_AUTH_DOMAIN', prop: 'authDomain' },
  { key: 'VITE_FIREBASE_PROJECT_ID', prop: 'projectId' },
  { key: 'VITE_FIREBASE_STORAGE_BUCKET', prop: 'storageBucket' },
  { key: 'VITE_FIREBASE_MESSAGING_SENDER_ID', prop: 'messagingSenderId' },
  { key: 'VITE_FIREBASE_APP_ID', prop: 'appId' },
];

const missingKeys = [];

for (const { key } of requiredFirebaseKeys) {
  const value = import.meta.env[key];
  if (!value || typeof value !== 'string' || value.trim() === '') {
    missingKeys.push(key);
  }
}

if (missingKeys.length > 0) {
  const errorMessage = `[Configuración Crítica Faltante] Las siguientes variables de entorno obligatorias no están definidas o están vacías: ${missingKeys.join(', ')}. Verifica tu archivo .env local o las variables de entorno en tu plataforma de despliegue.`;
  console.error(errorMessage);
  if (import.meta.env.DEV) {
    console.warn('Revisa el archivo .env.example para obtener la plantilla de configuración.');
  }
}

// Parseo seguro de la lista de administradores autorizados
const rawAdminEmails = import.meta.env.VITE_ADMIN_EMAILS || '';
const parsedAdminEmails = rawAdminEmails
  .split(',')
  .map((email) => email.trim().toLowerCase())
  .filter((email) => email.length > 0);

if (parsedAdminEmails.length === 0) {
  console.warn('[Configuración] VITE_ADMIN_EMAILS no contiene correos válidos. Ningún usuario tendrá privilegios de interfaz de administración.');
}

/**
 * Objeto inmutable de configuración de la aplicación
 */
export const env = Object.freeze({
  firebase: Object.freeze({
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  }),
  adminEmails: Object.freeze(parsedAdminEmails),
  isProduction: Boolean(import.meta.env.PROD),
  isDevelopment: Boolean(import.meta.env.DEV),
});

export default env;
