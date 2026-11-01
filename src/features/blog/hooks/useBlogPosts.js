/**
 * Custom Hook useBlogPosts
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Encapsula la gestión de estado de los artículos del blog, coordinando las
 * llamadas asíncronas con blogService.js sin acoplarse directamente al SDK de Firestore.
 */

import { useState, useEffect, useCallback } from 'react';
import {
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} from '../../../services/firebase/blogService.js';

export const useBlogPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  /**
   * Carga o revalida el listado de publicaciones desde Firestore.
   */
  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchBlogPosts();
      setPosts(data);
    } catch (err) {
      const errorMessage = err?.message || 'Error inesperado al cargar los artículos.';
      setError(errorMessage);
      setNotification({
        type: 'error',
        message: 'No fue posible cargar los artículos. Por favor, verifica tu conexión.',
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  /**
   * Publica un nuevo artículo y refresca el catálogo.
   * @param {Object} postData Datos del formulario
   * @param {Object} user Usuario autenticado
   * @returns {Promise<boolean>} Indica si la operación concluyó exitosamente
   */
  const handleCreate = async (postData, user) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await createBlogPost(postData, user);
      setNotification({
        type: 'success',
        message: 'Artículo publicado correctamente.',
      });
      await loadPosts();
      return true;
    } catch (err) {
      const msg = err?.message || 'No fue posible guardar el artículo.';
      setError(msg);
      setNotification({
        type: 'error',
        message: msg,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Actualiza un artículo existente y preserva su fecha de creación original.
   * @param {string} id Identificador del artículo
   * @param {Object} postData Datos actualizados
   * @returns {Promise<boolean>}
   */
  const handleUpdate = async (id, postData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await updateBlogPost(id, postData);
      setNotification({
        type: 'success',
        message: 'Artículo actualizado correctamente.',
      });
      await loadPosts();
      return true;
    } catch (err) {
      const msg = err?.message || 'No fue posible actualizar el artículo.';
      setError(msg);
      setNotification({
        type: 'error',
        message: msg,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Elimina un artículo previa confirmación.
   * @param {string} id Identificador del artículo
   * @returns {Promise<boolean>}
   */
  const handleDelete = async (id) => {
    try {
      setIsSubmitting(true);
      setError(null);
      await deleteBlogPost(id);
      setNotification({
        type: 'success',
        message: 'Artículo eliminado correctamente.',
      });
      await loadPosts();
      return true;
    } catch (err) {
      const msg = err?.message || 'No fue posible eliminar el artículo.';
      setError(msg);
      setNotification({
        type: 'error',
        message: msg,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearNotification = () => setNotification(null);
  const clearError = () => setError(null);

  return {
    posts,
    loading,
    error,
    isSubmitting,
    notification,
    loadPosts,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearNotification,
    clearError,
  };
};

export default useBlogPosts;
