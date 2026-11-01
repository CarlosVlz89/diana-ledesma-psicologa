/**
 * Constantes y Formateadores del Feature de Blog
 * Proyecto: Diana Ledesma | Psicología Clínica
 */

export const CATEGORY_IMAGES = Object.freeze({
  'Bienestar': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
  'Ansiedad': 'https://images.unsplash.com/photo-1499209974431-2761e25234d5?auto=format&fit=crop&q=80&w=600',
  'Depresión': 'https://images.unsplash.com/photo-1474418397713-7ede21d49118?auto=format&fit=crop&q=80&w=600',
  'Crianza': 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=600',
  'Pareja': 'https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?auto=format&fit=crop&q=80&w=600',
});

export const BLOG_CATEGORIES = Object.keys(CATEGORY_IMAGES);

/**
 * Formatea un timestamp de Firestore o valor de fecha al formato en español.
 * @param {{ seconds?: number, toDate?: () => Date } | Date | string | null} timestamp
 * @returns {string} Fecha formateada o "Reciente"
 */
export const formatBlogDate = (timestamp) => {
  if (!timestamp) return 'Reciente';

  let dateObj;
  if (typeof timestamp.toDate === 'function') {
    dateObj = timestamp.toDate();
  } else if (typeof timestamp.seconds === 'number') {
    dateObj = new Date(timestamp.seconds * 1000);
  } else if (timestamp instanceof Date) {
    dateObj = timestamp;
  } else {
    dateObj = new Date(timestamp);
  }

  if (isNaN(dateObj.getTime())) {
    return 'Reciente';
  }

  return dateObj.toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Calcula el tiempo estimado de lectura en minutos a partir del contenido.
 * @param {string} content
 * @returns {string} Tiempo estimado de lectura (ej. "3 min de lectura")
 */
export const calcReadingTime = (content) => {
  if (!content || typeof content !== 'string') return '2 min de lectura';
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min de lectura`;
};

