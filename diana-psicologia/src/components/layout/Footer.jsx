import React from 'react';
import { LogOut, Lock } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

const Footer = ({ onOpenPrivacy, onOpenRegulations, handleLogin, user, isAdmin, handleLogout }) => (
  // FONDO VERDE SALVIA (Bosque)
  <footer className="bg-brand-sage text-brand-bg/80 py-16 border-t border-white/10 relative overflow-hidden">
    
    {/* Decoración de fondo sutil */}
    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/noise-lines.png')]"></div>

    <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-10 text-sm relative z-10">
      
      {/* Columna 1 */}
      <div>
        <h3 className="text-brand-bg font-serif font-bold text-2xl mb-4">Diana Ledesma</h3>
        <p className="mb-6 font-sans font-light leading-relaxed max-w-xs text-brand-text/80">
          Psicología Clínica Cognitivo Conductual y Contextual. <br/>
          <span className="italic text-brand-bg/60">"Construyendo bienestar integral."</span>
        </p>
      </div>

      {/* Columna 2 */}
      <div>
        <h4 className="text-brand-text font-bold mb-5 uppercase tracking-wider text-xs">Navegación</h4>
        <ul className="space-y-3">
          <li><button onClick={() => scrollToSection('home')} className="hover:text-brand-text transition-colors">Inicio</button></li>
          <li><button onClick={() => scrollToSection('services')} className="hover:text-brand-text transition-colors">Servicios</button></li>
          <li><button onClick={() => scrollToSection('blog')} className="hover:text-brand-text transition-colors">Blog</button></li>
          <li><button onClick={onOpenPrivacy} className="hover:text-brand-text transition-colors">Aviso de Privacidad</button></li>
          <li><button onClick={onOpenRegulations} className="hover:text-brand-text transition-colors text-left">Reglamento de Citas</button></li>
        </ul>
      </div>

      {/* Columna 3 */}
      <div>
        <h4 className="text-brand-text font-bold mb-5 uppercase tracking-wider text-xs">Administración</h4>
        {user ? (
          <div>
            <p className="mb-2 text-brand-bg font-medium">Hola, {user.displayName || user.email}</p>
            {isAdmin && <p className="text-xs text-brand-text mb-3 bg-brand-text/10 inline-block px-2 py-1 rounded">★ Administrador</p>}
            <button onClick={handleLogout} className="text-brand-bg/60 hover:text-red-200 flex items-center gap-2 transition-colors mt-2">
              <LogOut size={14}/> Cerrar Sesión
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="flex items-center gap-2 text-brand-bg hover:text-white transition-colors border border-brand-bg/30 px-5 py-2.5 rounded-xl hover:bg-brand-bg/10 backdrop-blur-sm">
            <Lock size={14} /> Acceso Psicóloga
          </button>
        )}
        <p className="mt-10 text-xs opacity-60 font-sans">
          © {new Date().getFullYear()} Diana Ledesma.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;