/**
 * Componente Reveal (Animación Suave de Entrada en Scroll)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Envuelve elementos de la interfaz para revelar su visibilidad con
 * transición vertical al entrar en el viewport del navegador.
 */

import React from 'react';
import { useOnScreen } from '../../hooks/useOnScreen.js';

const REVEAL_OPTIONS = Object.freeze({ threshold: 0.1 });

export const Reveal = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useOnScreen(REVEAL_OPTIONS);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default Reveal;
