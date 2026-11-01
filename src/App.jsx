/**
 * Componente Principal de la Aplicación (App)
 * Proyecto: Diana Ledesma | Psicología Clínica
 *
 * Orquestador principal de la Single Page Application (One-Page).
 * Envuelto en AuthProvider y optimizado con Code Splitting (React.lazy / Suspense)
 * para diferir la carga de modales legales y secundarios fuera del bundle inicial.
 */

import React, { useState, useEffect, lazy, Suspense } from 'react';

// Proveedor de Autenticación Global
import { AuthProvider } from './context/AuthContext.jsx';

// Tokens de Diseño
import { colors } from './config/constants.js';

// Componentes de Layout
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';

// Secciones del Primer y Segundo Pliegue
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Services from './sections/Services.jsx';
import Blog from './sections/Blog.jsx';
import Contact from './sections/Contact.jsx';

// Carga Perezosa de Modales Fuera de Ruta Crítica (Code Splitting)
const PrivacyModal = lazy(() => import('./components/ui/PrivacyModal.jsx'));
const RegulationsModal = lazy(() => import('./components/ui/RegulationsModal.jsx'));

const AppContent = () => {
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isRegulationsOpen, setIsRegulationsOpen] = useState(false);

  useEffect(() => {
    document.title = 'Diana Ledesma | Psicóloga Clínica';
  }, []);

  return (
    <div
      className={`min-h-screen ${colors.bg} font-sans text-brand-text selection:bg-brand-sage/30 selection:text-brand-text`}
    >
      <Navbar />

      <main className="animate-fade-in">
        <Hero />
        <About />
        <Services />
        <Blog />
        <Contact />
      </main>

      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenRegulations={() => setIsRegulationsOpen(true)}
      />

      {/* Modales cargados bajo demanda vía Suspense */}
      <Suspense fallback={null}>
        {isPrivacyOpen && (
          <PrivacyModal
            isOpen={isPrivacyOpen}
            onClose={() => setIsPrivacyOpen(false)}
          />
        )}

        {isRegulationsOpen && (
          <RegulationsModal
            isOpen={isRegulationsOpen}
            onClose={() => setIsRegulationsOpen(false)}
          />
        )}
      </Suspense>
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
