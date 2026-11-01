/**
 * Hook useOnScreen (IntersectionObserver Optimizado)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Detecta cuándo un elemento entra en el viewport del navegador para disparar
 * animaciones de entrada. Desestructura propiedades primitivas para evitar
 * fugas de memoria y re-instanciaciones infinitas por dependencias de objetos.
 */

import { useState, useEffect, useRef } from 'react';

/**
 * @param {{
 *   threshold?: number | number[],
 *   rootMargin?: string,
 *   root?: Element | Document | null
 * }} [options] Opciones del IntersectionObserver
 * @returns {[import('react').RefObject<HTMLElement>, boolean]} Tupla con la referencia y el estado de visibilidad
 */
export const useOnScreen = (options = {}) => {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  // Desestructuración de propiedades primitivas para evitar comparaciones por referencia
  const threshold = options?.threshold ?? 0.1;
  const rootMargin = options?.rootMargin ?? '0px';
  const root = options?.root ?? null;

  useEffect(() => {
    // Si el elemento ya fue revelado, no recrear ni mantener listeners
    if (isVisible) return;

    const element = ref.current;
    if (!element) return;

    // Soporte para navegadores que no implementan IntersectionObserver
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, root, isVisible]);

  return [ref, isVisible];
};

export default useOnScreen;
