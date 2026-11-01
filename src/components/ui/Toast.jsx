/**
 * Componente de Retroalimentación Visual (Toast / Notificación)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Muestra notificaciones flotantes o banners accesibles para operaciones
 * exitosas o fallidas, dando cumplimiento a la regla de no silenciar errores
 * de AGENTS.md.
 */

import React, { useEffect } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

/**
 * @param {{
 *   message: string,
 *   type?: 'success' | 'error' | 'info',
 *   onClose: () => void,
 *   autoCloseMs?: number
 * }} props
 */
export const Toast = ({
  message,
  type = 'info',
  onClose,
  autoCloseMs = 5000,
}) => {
  useEffect(() => {
    if (!message || autoCloseMs <= 0) return;

    const timer = setTimeout(() => {
      onClose();
    }, autoCloseMs);

    return () => clearTimeout(timer);
  }, [message, autoCloseMs, onClose]);

  if (!message) return null;

  const typeStyles = {
    success: 'bg-emerald-50 text-emerald-900 border-emerald-200',
    error: 'bg-red-50 text-red-900 border-red-200',
    info: 'bg-brand-bg text-brand-text border-brand-sage/30',
  };

  const iconMap = {
    success: <CheckCircle className="text-emerald-600 shrink-0" size={20} />,
    error: <AlertCircle className="text-red-600 shrink-0" size={20} />,
    info: <Info className="text-brand-accent shrink-0" size={20} />,
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`fixed bottom-6 right-6 z-[100] max-w-md w-[calc(100vw-3rem)] p-4 rounded-2xl border shadow-xl backdrop-blur-md animate-fade-in flex items-start gap-3 ${typeStyles[type] || typeStyles.info}`}
    >
      <div className="mt-0.5">{iconMap[type] || iconMap.info}</div>
      <div className="flex-1 text-sm font-sans font-medium leading-relaxed">
        {message}
      </div>
      <button
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="p-1 hover:bg-black/5 rounded-full transition-colors shrink-0 text-current opacity-70 hover:opacity-100"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default Toast;
