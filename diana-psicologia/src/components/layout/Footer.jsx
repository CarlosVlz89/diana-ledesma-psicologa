import React from 'react';
import { LogOut, Lock } from 'lucide-react';
import { scrollToSection } from '../../utils/scroll';

const Footer = ({ onOpenPrivacy, onOpenRegulations, handleLogin, user, isAdmin, handleLogout }) => (
  <footer className="bg-brand-dark text-stone-400 py-12">
    <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-3 gap-8 text-sm">
      
      <div>
        <h3 className="text-white font-serif font-bold text-lg mb-4">Diana Ledesma</h3>
        <p className="mb-4 font-light">Psicología Clínica Cognitivo Conductual y Contextual.</p>
        <p className="italic">"Construyendo bienestar integral."</p>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Navegación</h4>
        <ul className="space-y-2">
          <li><button onClick={() => scrollToSection('home')} className="hover:text-white transition-colors">Inicio</button></li>
          <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Servicios</button></li>
          <li><button onClick={() => scrollToSection('blog')} className="hover:text-white transition-colors">Blog</button></li>
          
          {/* Botones Legales (Visibles para todos) */}
          <li><button onClick={onOpenPrivacy} className="hover:text-white transition-colors">Aviso de Privacidad</button></li>
          <li><button onClick={onOpenRegulations} className="hover:text-white transition-colors text-left mt-1">Reglamento de Citas</button></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4">Administración</h4>
        {user ? (
          <div>
            <p className="mb-2">Hola, {user.displayName || user.email}</p>
            {isAdmin && <p className="text-xs text-brand-sage mb-2">★ Administrador</p>}
            <button onClick={handleLogout} className="text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors">
              <LogOut size={14}/> Cerrar Sesión
            </button>
          </div>
        ) : (
          <button onClick={handleLogin} className="flex items-center gap-2 hover:text-white transition-colors border border-stone-700 px-4 py-2 rounded-lg hover:border-stone-500">
            <Lock size={14} /> Acceso Psicóloga
          </button>
        )}
        <p className="mt-8 text-xs opacity-50 font-light">
          © {new Date().getFullYear()} Diana Ledesma. Todos los derechos reservados.
        </p>
      </div>

    </div>
  </footer>
);

export default Footer;