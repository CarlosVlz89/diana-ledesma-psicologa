/**
 * Cliente de Infraestructura Firebase
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Inicializa y expone las instancias centrales de Firebase (App, Auth, Firestore)
 * consumiendo la configuración validada e inmutable de src/config/env.js.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { env } from '../../config/env.js';

// Inicialización de Firebase garantizando el patrón Singleton
export const app = getApps().length === 0 ? initializeApp(env.firebase) : getApp();

// Instancias del SDK oficial
export const auth = getAuth(app);
export const db = getFirestore(app);

export default { app, auth, db };
