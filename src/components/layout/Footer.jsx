/**
 * Pie de Página Editorial (Footer)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Arquitectura editorial en 3 niveles con remate superior redondeado:
 * - Nivel 1: Cabecera institucional con logotipo WebP optimizado, credenciales sanitarias
 *   (Cédula Profesional: 14728021), enfoque clínico y lema institucional.
 * - Nivel 2: Malla de navegación y consultorio balanceada en 2 columnas simétricas en móvil
 *   y distribución fluida en escritorio.
 * - Nivel 3: Sub-footer con copyright oficial, enlaces a modales legales (Aviso de privacidad
 *   y Reglamento de citas) y micro-utilidad administrativa discreta.
 */

import React from 'react';
import {
  LogOut,
  Lock,
  Loader2,
  MapPin,
  MessageCircle,
  Mail,
  ExternalLink,
} from 'lucide-react';
import { scrollToSection } from '../../utils/scroll.js';
import { useAuth } from '../../hooks/useAuth.js';

/**
 * @param {{
 *   onOpenPrivacy: () => void,
 *   onOpenRegulations: () => void
 * }} props
 */
export const Footer = ({ onOpenPrivacy, onOpenRegulations }) => {
  const { user, isAdmin, authLoading, loginWithGoogle, logout } = useAuth();

  const handleAuthAction = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error('[Footer] Error al iniciar sesión:', error);
    }
  };

  const handleLogoutAction = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('[Footer] Error al cerrar sesión:', error);
    }
  };

  const adminDisplayName =
    user?.displayName || (user?.email ? user.email.split('@')[0] : 'Sesión activa');

  return (
    <footer className="bg-brand-text text-brand-bg/90 rounded-t-[2.5rem] sm:rounded-t-[3rem] pt-12 sm:pt-16 pb-8 px-6 sm:px-12 relative overflow-hidden mt-12">
      {/* Resplandor ambiental decorativo sutil en el fondo */}
      <div
        className="bg-brand-sage/10 w-96 h-96 rounded-full blur-3xl absolute -top-40 right-0 pointer-events-none -z-0"
        aria-hidden="true"
      />
      <div
        className="bg-brand-terracotta/5 w-80 h-80 rounded-full blur-3xl absolute -bottom-20 left-10 pointer-events-none -z-0"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Nivel 1: Cabecera Institucional y Respaldo Sanitario */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-brand-bg/15">
          <div className="flex flex-col text-left">
            <span className="font-serif italic text-2xl sm:text-3xl text-white font-normal leading-tight">
              Diana Ledesma
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-brand-bg/70 font-semibold mt-1">
              Psicología Clínica
            </span>
            <p className="text-xs text-brand-bg/60 font-sans mt-2">
              Terapia Cognitivo-Conductual y Terapias Contextuales (ACT / DBT)
            </p>
          </div>

          <div className="text-left md:text-right text-xs text-brand-bg/75 font-sans">
            <p className="font-medium text-white/95">
              Lic. Diana Ledesma · Cédula Profesional: 14728021
            </p>
            <p className="italic text-brand-bg/60 mt-0.5">
              "Construyendo bienestar integral."
            </p>
          </div>
        </div>

        {/* Nivel 2: Malla de Navegación y Ubicación (2 Columnas simétricas en móvil) */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-12 md:gap-8 my-8 sm:my-10">
          {/* Columna 1: Navegación Principal (col-span-1 en móvil, col-span-5 en desktop) */}
          <div className="col-span-1 md:col-span-5">
            <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-3 font-sans">
              Navegación
            </p>
            <ul className="space-y-1.5 font-sans">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-brand-bg/75 hover:text-white transition-colors py-0.5 block text-left bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
                >
                  Inicio
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-brand-bg/75 hover:text-white transition-colors py-0.5 block text-left bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
                >
                  Sobre mí
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-brand-bg/75 hover:text-white transition-colors py-0.5 block text-left bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
                >
                  Servicios
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('blog')}
                  className="text-sm text-brand-bg/75 hover:text-white transition-colors py-0.5 block text-left bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-brand-bg/75 hover:text-white transition-colors py-0.5 block text-left bg-transparent border-none cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
                >
                  Contacto
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 2: Consultorio y Canales (col-span-1 en móvil, col-span-7 en desktop) */}
          <div className="col-span-1 md:col-span-7">
            <p className="text-xs uppercase tracking-wider text-brand-accent font-semibold mb-3 font-sans">
              Consultorio y canales
            </p>
            <div className="space-y-2.5 font-sans text-sm">
              <div className="flex items-start gap-2 text-brand-bg/85">
                <MapPin size={15} className="text-brand-accent shrink-0 mt-0.5" />
                <span>Colonia Monraz, Guadalajara, Jal.</span>
              </div>

              <div className="pt-1 flex flex-col gap-2">
                <a
                  href="https://wa.me/523318363829"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-brand-bg/75 hover:text-white transition-colors py-0.5 group"
                >
                  <MessageCircle size={15} className="text-[#25D366] shrink-0" />
                  <span>Mensaje directo</span>
                </a>

                <a
                  href="mailto:contacto@dianaledesma.com"
                  className="inline-flex items-center gap-2 text-brand-bg/75 hover:text-white transition-colors py-0.5 group"
                >
                  <Mail size={15} className="text-brand-accent shrink-0" />
                  <span>contacto@dianaledesma.com</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Colonia+Monraz,+Guadalajara,+Jalisco"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-accent hover:text-white transition-colors pt-1 w-fit group"
                >
                  <span>Abrir en Google Maps</span>
                  <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Nivel 3: Sub-footer Legal y Administración Discreta */}
        <div className="border-t border-brand-bg/15 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-bg/60 font-sans">
          {/* Izquierda: Copyright Oficial */}
          <p className="text-center sm:text-left">
            © {new Date().getFullYear()} Diana Ledesma. Todos los derechos reservados.
          </p>

          {/* Centro: Modales Legales */}
          <div className="flex items-center gap-2 text-center">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="text-brand-bg/75 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
            >
              Aviso de privacidad
            </button>
            <span className="text-brand-bg/30">·</span>
            <button
              type="button"
              onClick={onOpenRegulations}
              className="text-brand-bg/75 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded"
            >
              Reglamento de citas
            </button>
          </div>

          {/* Derecha: Área Administrativa Rediseñada */}
          <div>
            {authLoading ? (
              <div className="inline-flex items-center gap-1.5 text-[11px] text-brand-bg/50">
                <Loader2 size={12} className="animate-spin" />
                <span>Verificando...</span>
              </div>
            ) : user ? (
              <div className="inline-flex items-center gap-2 bg-brand-bg/10 border border-brand-bg/20 px-3 py-1 rounded-full text-[11px] text-brand-bg/80">
                <span className="font-medium text-white/95">
                  Admin: {adminDisplayName}
                </span>
                <span className="text-brand-bg/30">•</span>
                <button
                  type="button"
                  onClick={handleLogoutAction}
                  className="hover:text-red-300 transition-colors inline-flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-red-400 rounded"
                  aria-label="Cerrar sesión de administración"
                >
                  <LogOut size={12} />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleAuthAction}
                className="inline-flex items-center gap-1.5 text-xs text-brand-bg/60 hover:text-white transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-brand-accent rounded py-0.5"
                aria-label="Acceso a consola de administración"
              >
                <Lock size={12} className="opacity-75" />
                <span>Acceso administración</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
