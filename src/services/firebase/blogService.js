/**
 * Servicio de Artículos de Psicoeducación (Blog)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Encapsula todas las operaciones CRUD contra Cloud Firestore utilizando lecturas
 * bajo demanda (getDocs) en lugar de listeners permanentes (onSnapshot).
 * Cumple estrictamente con el esquema y validaciones de firestore.rules.
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from './client.js';

const BLOG_COLLECTION = 'blog_posts';

/**
 * Obtiene el listado completo de artículos ordenados cronológicamente (más recientes primero).
 * Operación bajo demanda optimizada para el plan Spark de Firebase.
 * @returns {Promise<Array<{ id: string, title: string, content: string, category: string, imageUrl: string, author: string, authorId: string, createdAt: any, updatedAt?: any }>>}
 */
export const fetchBlogPosts = async () => {
  try {
    const q = query(
      collection(db, BLOG_COLLECTION),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);

    const posts = snapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));

    return posts;
  } catch (error) {
    console.error('[blogService.fetchBlogPosts] Error al consultar artículos:', error);
    throw new Error('No fue posible cargar los artículos del blog. Por favor, intenta de nuevo más tarde.');
  }
};

/**
 * Obtiene un único artículo por su ID de documento.
 * @param {string} id Identificador único del artículo
 * @returns {Promise<{ id: string, [key: string]: any } | null>}
 */
export const fetchBlogPostById = async (id) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de artículo no válido.');
    }
    const docRef = doc(db, BLOG_COLLECTION, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    };
  } catch (error) {
    console.error(`[blogService.fetchBlogPostById] Error al obtener el post ${id}:`, error);
    throw new Error('No fue posible obtener el artículo solicitado.');
  }
};

/**
 * Crea y persiste un nuevo artículo en Cloud Firestore.
 * Valida que los campos cumplan con el esquema requerido por firestore.rules.
 * @param {Object} postData Datos del artículo (title, content, category, imageUrl)
 * @param {Object} user Usuario autenticado (instancia de Firebase Auth User)
 * @returns {Promise<string>} ID del nuevo documento creado
 */
export const createBlogPost = async (postData, user) => {
  try {
    if (!user || !user.uid) {
      throw new Error('Debes iniciar sesión como administradora para publicar un artículo.');
    }

    const title = (postData.title || '').trim();
    const content = (postData.content || '').trim();

    if (title.length < 5 || title.length > 200) {
      throw new Error('El título debe contener entre 5 y 200 caracteres.');
    }

    if (content.length < 20 || content.length > 50000) {
      throw new Error('El contenido debe contener entre 20 y 50,000 caracteres.');
    }

    // Construcción estricta respetando exclusivamente los campos autorizados en firestore.rules
    const newDocData = {
      title,
      content,
      category: (postData.category || 'Bienestar').trim(),
      imageUrl: (postData.imageUrl || '').trim(),
      author: 'Diana Ledesma',
      authorId: user.uid,
      createdAt: serverTimestamp(),
    };

    const docRef = await addDoc(collection(db, BLOG_COLLECTION), newDocData);
    return docRef.id;
  } catch (error) {
    console.error('[blogService.createBlogPost] Error al crear artículo:', error);
    throw new Error(
      error.message && !error.message.includes('FirebaseError')
        ? error.message
        : 'No fue posible guardar el artículo. Verifica tu conexión y permisos de administradora.'
    );
  }
};

/**
 * Actualiza un artículo existente en Cloud Firestore.
 * Preserva el campo inmutable createdAt y sella el campo updatedAt con la fecha del servidor.
 * @param {string} id Identificador del artículo a actualizar
 * @param {Object} postData Campos a actualizar (title, content, category, imageUrl)
 * @returns {Promise<void>}
 */
export const updateBlogPost = async (id, postData) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de artículo no válido para actualización.');
    }

    const title = (postData.title || '').trim();
    const content = (postData.content || '').trim();

    if (title.length < 5 || title.length > 200) {
      throw new Error('El título debe contener entre 5 y 200 caracteres.');
    }

    if (content.length < 20 || content.length > 50000) {
      throw new Error('El contenido debe contener entre 20 y 50,000 caracteres.');
    }

    // Construcción de la actualización:
    // Omitimos intencionalmente 'createdAt' para que conserve su valor original histórico en Firestore
    const updatePayload = {
      title,
      content,
      category: (postData.category || 'Bienestar').trim(),
      imageUrl: (postData.imageUrl || '').trim(),
      updatedAt: serverTimestamp(),
    };

    const docRef = doc(db, BLOG_COLLECTION, id);
    await updateDoc(docRef, updatePayload);
  } catch (error) {
    console.error(`[blogService.updateBlogPost] Error al actualizar el post ${id}:`, error);
    throw new Error(
      error.message && !error.message.includes('FirebaseError')
        ? error.message
        : 'No fue posible actualizar el artículo. Verifica tu conexión o permisos.'
    );
  }
};

/**
 * Elimina un artículo de Cloud Firestore por su ID.
 * @param {string} id Identificador del artículo a eliminar
 * @returns {Promise<void>}
 */
export const deleteBlogPost = async (id) => {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('Identificador de artículo no válido para eliminación.');
    }

    const docRef = doc(db, BLOG_COLLECTION, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`[blogService.deleteBlogPost] Error al eliminar el post ${id}:`, error);
    throw new Error('No fue posible eliminar el artículo. Verifica tu conexión o permisos de administradora.');
  }
};

export default {
  fetchBlogPosts,
  fetchBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
};
