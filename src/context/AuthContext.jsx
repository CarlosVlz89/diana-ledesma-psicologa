/**
 * Contexto Global de Autenticación
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Centraliza la sesión del usuario, el cálculo del rol administrativo y el estado
 * de carga inicial (authLoading), difiriendo la inicialización de Firebase Auth
 * para visitas públicas anónimas y erradicando el prop drilling.
 */

import React, { createContext, useState, useEffect } from 'react';
import {
  hasAdminSessionHint,
  subscribeToAuth,
  loginWithGoogle as serviceLoginWithGoogle,
  logoutUser as serviceLogoutUser,
  checkIsAdmin,
} from '../services/firebase/authService.js';

export const AuthContext = createContext(null);

/**
 * Proveedor del contexto de autenticación
 */
export const AuthProvider = ({ children }) => {
  const [shouldLoadAuth, setShouldLoadAuth] = useState(() => hasAdminSessionHint());
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(() => hasAdminSessionHint());

  useEffect(() => {
    if (!shouldLoadAuth) {
      setAuthLoading(false);
      return undefined;
    }

    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setIsAdmin(checkIsAdmin(currentUser?.email));
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, [shouldLoadAuth]);

  const loginWithGoogle = async () => {
    try {
      const userCredential = await serviceLoginWithGoogle();
      setUser(userCredential.user);
      setIsAdmin(checkIsAdmin(userCredential.user?.email));
      setShouldLoadAuth(true);
      return userCredential;
    } catch (error) {
      // Propaga el error para que la UI pueda presentar feedback visual accesible
      throw error;
    }
  };

  const logout = async () => {
    try {
      await serviceLogoutUser();
      setUser(null);
      setIsAdmin(false);
    } catch (error) {
      throw error;
    }
  };

  const contextValue = {
    user,
    isAdmin,
    authLoading,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
