/**
 * Barra de Navegación Principal (Navbar)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Header flotante con comportamiento dinámico de pastilla cápsula (Floating Pill)
 * y Smart Scroll (auto-ocultamiento direccional con reaparición suave).
 *
 * Características técnicas y UX clínica:
 * - Wordmark Editorial de autor: "Diana Ledesma" en Playfair Display Italic y
 *   "PSICOLOGÍA CLÍNICA" como micro-etiqueta en sans-serif con tracking abierto.
 * - Detección pasiva optimizada de scroll mediante requestAnimationFrame ({ passive: true }).
 * - Estado en el tope (scrollY <= 40): Extensión completa borde a borde (w-full), plano y transparente.
 * - Estado desplazado (isScrolled): Cápsula centrada con cristal cálido (bg-brand-surface/95, backdrop-blur-md).
 * - Scroll direccional: Oculta hacia arriba en descenso (-translate-y-28 opacity-0) y reaparece en ascenso (translate-y-0 opacity-100).
 * - Excepción de menú móvil: Permanece forzosamente visible mientras isMenuOpen sea true.
 * - Botón primario de "Agendar cita": Terracota sólido ineludible (bg-[#854B24] text-white),
 *   geometría redondeada (rounded-full) y ortotipografía estricta en Sentence Case.
 * - Accesibilidad: WAI-ARIA dialog para menú móvil, cierre con tecla Escape y bloqueo de scroll de fondo.
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Calendar, Phone } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll.js';
import { useAuth } from '../../hooks/useAuth.js';

export const Navbar = () => {
  const { isAdmin } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Lógica de Smart Scroll y detección de posición
  useEffect(() => {
    let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      // 1. Detección de estado desplazado (transición a cápsula/pastilla)
      setIsScrolled(currentScrollY > 40);

      // 2. Comportamiento de Smart Scroll (visibilidad direccional)
      if (currentScrollY <= 40) {
        // En el tope: la barra siempre es visible
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 60) {
        // Scroll descendente: ocultar barra
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scroll ascendente: reaparición inmediata fluida
        setIsVisible(true);
      }

      // Prevenir rebotes negativos (overscroll en Safari/iOS)
      lastScrollY = Math.max(0, currentScrollY);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Verificación inicial del scroll al montar
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Bloqueo de scroll en body al desplegar menú móvil
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Accesibilidad: Cierre del menú móvil mediante tecla Escape
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  // Enlaces de navegación One-Page con anclajes semánticos
  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Sobre mí', id: 'about' },
    { name: 'Servicios', id: 'services' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contacto', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsMenuOpen(false);
  };

  // Excepción de visibilidad: si el menú móvil está abierto, la barra debe permanecer visible
  const showNavbar = isVisible || isMenuOpen;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled && !isMenuOpen ? 'px-3 sm:px-6' : 'px-0'
        } ${
          showNavbar
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-28 opacity-0 pointer-events-none'
        }`}
      >
        <nav
          aria-label="Navegación principal"
          className={`w-full transition-all duration-300 ease-in-out ${
            isScrolled && !isMenuOpen
              ? 'max-w-5xl mx-auto mt-2 sm:mt-3 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full bg-brand-surface/95 backdrop-blur-md border border-brand-sage/20 shadow-soft-md'
              : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 bg-transparent border border-transparent shadow-none'
          }`}
        >
          <div className="flex justify-between items-center">
            {/* Wordmark Editorial de Autor */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              aria-label="Ir al inicio - Diana Ledesma Psicología Clínica"
              className="group flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-terracotta rounded-lg shrink-0 cursor-pointer relative z-50 py-0.5"
            >
              <span className="font-serif italic text-xl sm:text-2xl text-brand-text group-hover:text-brand-terracotta transition-colors leading-tight font-normal">
                Diana Ledesma
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-brand-muted font-medium mt-0.5">
                Psicología Clínica
              </span>
            </a>

            {/* Menú de Escritorio con CTA */}
            <div className="hidden md:flex space-x-5 lg:space-x-7 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className="relative text-sm font-medium text-brand-text hover:text-brand-terracotta transition-colors group py-1 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854B24] rounded cursor-pointer"
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 bg-[#854B24]" />
                </button>
              ))}

              {isAdmin && (
                <span className="flex items-center gap-1 text-[10px] text-brand-text font-bold bg-brand-sage-light px-3 py-1 rounded-full border border-brand-sage/30 whitespace-nowrap">
                  <Lock size={10} /> Admin
                </span>
              )}

              {/* CTA Primario "Agendar cita" en Terracota Sólido */}
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                aria-label="Agendar cita psicoterapéutica"
                className="inline-flex items-center gap-2 bg-[#854B24] text-white hover:bg-[#6e3d1d] px-5 py-2 rounded-full font-medium text-sm shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854B24] focus-visible:ring-offset-2 whitespace-nowrap active:scale-95 cursor-pointer"
              >
                <Calendar size={14} className="shrink-0" />
                <span>Agendar cita</span>
              </button>
            </div>

            {/* Botón Disparador de Menú Móvil */}
            <div className="md:hidden relative z-50">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
                aria-expanded={isMenuOpen}
                className="p-2 rounded-xl transition-colors text-brand-text hover:bg-brand-sage/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854B24] cursor-pointer"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Menú Móvil Pantalla Completa Refinado (WAI-ARIA Dialog) */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú móvil de navegación"
          className="fixed inset-0 z-40 bg-brand-surface/98 backdrop-blur-2xl animate-fade-in flex flex-col justify-between items-center py-20 px-6"
        >
          {/* Acentos de fondo cálidos difuminados */}
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute bottom-0 left-0 w-64 h-64 bg-brand-sage/15 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* Enlaces Principales Móviles */}
          <div className="space-y-6 text-center relative z-10 my-auto">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                style={{ animationDelay: `${idx * 80}ms` }}
                className="block w-full text-2xl font-serif font-bold text-brand-text hover:text-brand-terracotta transition-all duration-300 hover:scale-105 animate-fade-in-up cursor-pointer"
              >
                {link.name}
              </button>
            ))}

            {isAdmin && (
              <div className="pt-2 animate-fade-in-up">
                <span className="inline-flex items-center gap-2 text-xs text-brand-sage-dark font-bold bg-brand-sage-light px-4 py-1.5 rounded-full border border-brand-sage/30">
                  <Lock size={12} /> Modo administrador activo
                </span>
              </div>
            )}
          </div>

          {/* Accesos Directos Móviles de Contacto Rápido */}
          <div className="w-full max-w-xs space-y-3 relative z-10 pt-6 border-t border-brand-sage/20">
            <a
              href="https://wa.me/523318363829?text=Hola%20Diana,%20me%20gustar%C3%ADa%20solicitar%20informaci%C3%B3n%20sobre%20tus%20consultas%20de%20psicolog%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-4 rounded-xl text-sm font-medium shadow-soft-sm hover:shadow-soft-md transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            >
              <Phone size={16} /> WhatsApp directo
            </a>
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="w-full flex items-center justify-center gap-2 bg-[#854B24] text-white hover:bg-[#6e3d1d] py-3 px-4 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#854B24] focus-visible:ring-offset-2 cursor-pointer"
            >
              <Calendar size={16} /> Agendar cita
            </button>
            <p className="text-center text-brand-muted text-xs tracking-wider uppercase font-sans pt-2">
              Construyendo bienestar integral
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
