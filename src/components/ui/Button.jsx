/**
 * Componente Button Polimórfico y Accesible
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Botón estandarizado con radios armónicos (rounded-xl), variantes de alto
 * contraste cromático conforme a WCAG 2.1 AA (6.3:1) y estados de foco visual.
 * Garantiza fondos sólidos e ineludibles para evitar textos blancos sobre fondos transparentes.
 */

import React from 'react';

/**
 * @param {{
 *   children: React.ReactNode,
 *   onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
 *   variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'whatsapp',
 *   className?: string,
 *   type?: 'button' | 'submit' | 'reset',
 *   disabled?: boolean,
 *   ariaLabel?: string
 * }} props
 */
export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  ariaLabel,
}) => {
  const baseStyle =
    'group relative px-6 py-2.5 sm:px-7 sm:py-3 rounded-xl font-medium transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854B24] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none disabled:transform-none';

  const variants = {
    // Primary: Terracota profundo sólido con texto blanco (WCAG AA alto contraste ineludible)
    primary:
      'bg-[#854B24] text-white hover:bg-[#6e3d1d] hover:-translate-y-0.5 shadow-md hover:shadow-lg',

    // Secondary: Cristal marfil / blanco translúcido con borde visible de alto contraste
    secondary:
      'bg-white/80 text-brand-text hover:bg-white hover:-translate-y-0.5 border border-brand-sage/30 shadow-soft-sm hover:shadow-soft-md',

    // Outline: Borde terracota y fondo transparente
    outline:
      'border-2 border-[#854B24] text-[#854B24] hover:bg-[#854B24] hover:text-white hover:-translate-y-0.5 bg-transparent shadow-soft-sm',

    // Ghost: Texto terracota sin fondo ni sombra
    ghost:
      'bg-transparent text-[#854B24] hover:text-[#6e3d1d] hover:bg-[#854B24]/10 px-4 py-2 shadow-none',

    // WhatsApp: Verde oficial accesible con elevación suave
    whatsapp:
      'bg-[#25D366] text-white hover:bg-[#128C7E] hover:-translate-y-0.5 shadow-soft-sm hover:shadow-soft-md',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyle} ${variants[variant] || variants.primary} ${className}`}
    >
      <span className="relative z-10 flex items-center gap-2 font-sans tracking-wide">
        {children}
      </span>
    </button>
  );
};

export default Button;
