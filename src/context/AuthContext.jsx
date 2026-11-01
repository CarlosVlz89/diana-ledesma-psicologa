/**
 * Contexto Global de Autenticación
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Centraliza la sesión del usuario, el cálculo del rol administrativo y el estado
 * de carga inicial (authLoading), erradicando el prop drilling en la aplicación.
 */

import React, { createContext, useState, useEffect } from 'react';
import {
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
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((currentUser) => {
      setUser(currentUser);
      setIsAdmin(checkIsAdmin(currentUser?.email));
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async () => {
    try {
      const userCredential = await serviceLoginWithGoogle();
      return userCredential;
    } catch (error) {
      // Propaga el error para que la UI pueda presentar feedback visual accesible
      throw error;
    }
  };

  const logout = async () => {
    try {
      await serviceLogoutUser();
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
