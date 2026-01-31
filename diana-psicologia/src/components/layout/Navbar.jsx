import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, Lock } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

const Navbar = ({ user, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
  }, [isOpen]);
  
  const navLinks = [
    { name: 'Inicio', id: 'home' },
    { name: 'Sobre Mí', id: 'about' },
    { name: 'Servicios', id: 'services' },
    { name: 'Blog', id: 'blog' },
    { name: 'Contacto', id: 'contact' },
  ];

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* CORRECCIÓN DE VELOCIDAD: Cambié 'duration-700' por 'duration-300' */}
      <nav className={`fixed w-full top-0 z-50 transition-all duration-100 ${scrolled ? 'bg-brand-sage/90 backdrop-blur-xl border-b border-white/20 py-3 shadow-lg' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* LOGO */}
            <div 
              className="flex items-center gap-2 cursor-pointer group relative z-50"
              onClick={() => scrollToSection('home')}
            >
              <div className="relative">
                <Brain className={`h-8 w-8 transition-colors duration-500 ${scrolled || isOpen ? 'text-brand-bg' : 'text-brand-accent'} group-hover:scale-110 transform`} />
                <div className="absolute inset-0 bg-white opacity-20 blur-lg rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className={`text-xl font-serif font-bold tracking-wide transition-colors duration-300 ${isOpen ? 'text-brand-bg' : 'text-brand-text'}`}>DIANA LEDESMA</h1>
                <p className={`text-[10px] tracking-wider uppercase font-bold transition-colors ${isOpen ? 'text-brand-bg/60' : (scrolled ? 'text-brand-bg/80' : 'text-brand-sage')}`}>Psicología Clínica</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative text-sm font-medium transition-colors group ${scrolled ? 'text-brand-text hover:text-white' : 'text-brand-text hover:text-brand-accent'}`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0 ${scrolled ? 'bg-brand-bg' : 'bg-brand-accent'}`}></span>
                </button>
              ))}
              {isAdmin && (
                 <span className="flex items-center gap-1 text-[10px] text-brand-text font-bold bg-white/20 px-3 py-1 rounded-full border border-white/30">
                   <Lock size={10} /> Admin
                 </span>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-50">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-2 rounded-full transition-colors ${isOpen ? 'text-brand-bg hover:bg-white/10' : 'text-brand-text hover:bg-white/20'}`}
              >
                {isOpen ? <X size={32} /> : <Menu size={32} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menú Móvil Full Screen (Se mantiene igual) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-brand-sage/95 backdrop-blur-xl animate-fade-in flex flex-col justify-center items-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-accent/20 rounded-full blur-3xl -ml-20 -mb-20"></div>
          <div className="space-y-8 text-center relative z-10">
            {navLinks.map((link, idx) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                style={{ animationDelay: `${idx * 100}ms` }}
                className="block w-full text-3xl font-serif font-bold text-brand-bg hover:text-brand-accent transition-all duration-300 hover:scale-110 animate-fade-in-up"
              >
                {link.name}
              </button>
            ))}
            {isAdmin && (
               <div className="pt-4 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                 <span className="inline-flex items-center gap-2 text-xs text-brand-bg/60 font-bold bg-black/10 px-4 py-2 rounded-full border border-white/10">
                   <Lock size={12} /> Modo Administrador Activo
                 </span>
               </div>
            )}
          </div>
          <div className="absolute bottom-12 text-center">
            <p className="text-brand-bg/40 text-xs tracking-widest uppercase font-sans">
              Construyendo bienestar integral
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;