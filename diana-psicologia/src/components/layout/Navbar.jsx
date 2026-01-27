// src/components/layout/Navbar.jsx
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
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-panel m-4 w-[calc(100%-2rem)] rounded-full py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => scrollToSection('home')}
          >
            <div className="relative">
              <Brain className={`h-8 w-8 transition-colors duration-300 ${scrolled ? 'text-brand-terra' : 'text-brand-dark'} ...`} />
              <div className="absolute inset-0 bg-brand-sage opacity-30 blur-lg rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className={`text-xl font-serif font-bold tracking-wide transition-colors ${scrolled ? 'text-stone-800' : 'text-stone-900'}`}>DIANA LEDESMA</h1>
              <p className={`text-[10px] tracking-wider uppercase font-medium ${scrolled ? 'text-stone-500' : 'text-stone-600'}`}>Psicología Clínica</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`relative text-sm font-medium transition-colors group ${scrolled ? 'text-stone-600 hover:text-indigo-600' : 'text-stone-800 hover:text-indigo-800'}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-terra transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            {isAdmin && (
               <span className="flex items-center gap-1 text-[10px] text-green-700 font-bold bg-green-100 px-3 py-1 rounded-full border border-green-200 shadow-sm animate-fade-in">
                 <Lock size={10} /> Admin
               </span>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-stone-800 p-2 hover:bg-black/5 rounded-full transition-colors">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-stone-100 absolute w-full shadow-xl animate-fade-in">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left px-3 py-4 text-lg font-medium text-stone-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;