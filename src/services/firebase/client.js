/**
 * Cliente de Infraestructura Firebase
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Inicializa y expone la instancia ligera de Firestore (firebase/firestore/lite)
 * para consultas REST bajo demanda sin WebChannel (Listen/channel) y difiere
 * dinámicamente la carga e inicialización de Firebase Auth hasta que sea requerida.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { env } from '../../config/env.js';

// Inicialización de Firebase garantizando el patrón Singleton
export const app = getApps().length === 0 ? initializeApp(env.firebase) : getApp();

// Instancia ligera REST de Cloud Firestore (sin canal persistente Listen/channel)
export const db = getFirestore(app);

let authInstancePromise = null;

/**
 * Carga e inicializa Firebase Auth de forma diferida (lazy dynamic import).
 * Evita descargar auth/iframe.js y ejecutar getProjectConfig en visitas anónimas.
 * @returns {Promise<import('firebase/auth').Auth>}
 */
export const getAuthInstance = async () => {
  if (!authInstancePromise) {
    authInstancePromise = import('firebase/auth').then(({ getAuth }) => getAuth(app));
  }
  return authInstancePromise;
};

export default { app, db, getAuthInstance };
