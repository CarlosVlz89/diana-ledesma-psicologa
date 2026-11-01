/**
 * Hook Personalizado useAuth
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Expone la sesión de usuario, estado de permisos y métodos de autenticación
 * consumiendo el AuthContext. Lanza un error descriptivo si se invoca fuera
 * del árbol delimitado por AuthProvider.
 */

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

/**
 * Hook para acceder a la sesión y acciones de autenticación.
 * @returns {{
 *   user: import('firebase/auth').User | null,
 *   isAdmin: boolean,
 *   authLoading: boolean,
 *   loginWithGoogle: () => Promise<import('firebase/auth').UserCredential>,
 *   logout: () => Promise<void>
 * }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      '[useAuth] useAuth debe ser utilizado dentro de un componente envuelto por <AuthProvider>.'
    );
  }

  return context;
};

export default useAuth;
