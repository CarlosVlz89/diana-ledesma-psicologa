/**
 * Componente Primitivo Modal Accesible (WAI-ARIA Dialog)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Diálogo modal reutilizable con soporte completo de accesibilidad:
 * - role="dialog" y aria-modal="true"
 * - Atrapamiento de foco (Focus Trap)
 * - Cierre mediante tecla Escape y clic en telón de fondo
 * - Bloqueo de desplazamiento (scroll) en el documento
 * - Retorno de foco al elemento que originó la apertura tras cerrarse
 */

import React, { useEffect, useRef, useId } from 'react';
import { X } from 'lucide-react';

/**
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   title?: React.ReactNode,
 *   subtitle?: string,
 *   children: React.ReactNode,
 *   footer?: React.ReactNode,
 *   maxWidth?: string,
 *   className?: string,
 *   closeAriaLabel?: string,
 *   headerContent?: React.ReactNode
 * }} props
 */
export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  maxWidth = 'max-w-2xl',
  className = '',
  closeAriaLabel = 'Cerrar ventana modal',
  headerContent,
}) => {
  const generatedId = useId();
  const titleId = `modal-title-${generatedId}`;
  const modalRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    // Guarda el elemento que tenía el foco antes de abrir el modal
    triggerRef.current = document.activeElement;

    // Bloquea el scroll del fondo
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Foco inicial en el contenedor del modal
    const focusTimer = setTimeout(() => {
      if (modalRef.current) {
        // Busca el primer elemento interactivo o enfoca el contenedor
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length > 0) {
          focusableElements[0].focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    // Manejador de teclado: Escape y Focus Trap (Tab)
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && modalRef.current) {
        const focusables = modalRef.current.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );

        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow || 'unset';
      window.removeEventListener('keydown', handleKeyDown);

      // Devuelve el foco al elemento disparador
      if (triggerRef.current && typeof triggerRef.current.focus === 'function') {
        triggerRef.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6"
    >
      {/* Telón de fondo (Backdrop) */}
      <div
        className="absolute inset-0 bg-brand-text/50 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor del Diálogo */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={`w-full ${maxWidth} max-h-[90vh] overflow-y-auto relative z-10 animate-fade-in-up bg-brand-bg rounded-3xl shadow-2xl border border-white/60 focus:outline-none flex flex-col ${className}`}
      >
        {/* Encabezado Opcional */}
        {(title || headerContent) && (
          <div className="sticky top-0 bg-brand-bg/95 backdrop-blur-md z-20 border-b border-brand-sage/20 p-6 flex justify-between items-center shadow-sm">
            <div>
              {title && (
                <h3 id={titleId} className="text-2xl font-serif font-bold text-brand-text">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs text-brand-sage font-bold tracking-wider uppercase mt-1">
                  {subtitle}
                </p>
              )}
              {headerContent}
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label={closeAriaLabel}
              className="p-2 hover:bg-brand-sage/10 rounded-full text-brand-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            >
              <X size={22} />
            </button>
          </div>
        )}

        {/* Cuerpo del Diálogo */}
        <div className="p-6 sm:p-8 flex-1">
          {children}
        </div>

        {/* Pie del Diálogo Opcional */}
        {footer && (
          <div className="p-6 border-t border-brand-sage/20 bg-brand-bg/95 flex flex-wrap justify-end gap-3 rounded-b-3xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
