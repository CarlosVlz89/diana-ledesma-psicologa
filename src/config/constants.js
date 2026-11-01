/**
 * Tokens y Constantes Oficiales de Diseño
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Sincronizados estrictamente con tailwind.config.js.
 * Prohibido introducir clases inexistentes (bg-brand-cream, text-brand-dark, bg-brand-terra).
 */

import { env } from './env.js';

export const colors = Object.freeze({
  bg: 'bg-brand-bg',             // Crema de Té (#FAF3E0)
  primary: 'text-brand-text',     // Carbón Vegetal (#35322F)
  accent: 'text-brand-accent',    // Marrón Arcilla (#BC8A5F)
  accentBg: 'bg-brand-accent',    // Marrón Arcilla (#BC8A5F)
  secondaryBg: 'bg-brand-sage/20',// Verde Salvia suave (#828E82)
  glass: 'glass-panel',           // Efecto cristal líquido
});

// Reexporta la lista validada de administradores desde env.js
export const adminEmails = env.adminEmails;

export default {
  colors,
  adminEmails,
};
