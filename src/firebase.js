/**
 * Capa de Compatibilidad Transitoria (Legacy Bridge)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Reexporta las instancias oficiales desde src/services/firebase/client.js.
 * Garantiza que los componentes preexistentes continúen operando de forma
 * segura mientras se completa la migración a la arquitectura de 3 capas.
 */

import { app, auth, db } from './services/firebase/client.js';

export { app, auth, db };

// ID de la aplicación para preservar compatibilidad con código heredado
export const appId = 'diana-ledesma-psicologia';

export default { app, auth, db, appId };
